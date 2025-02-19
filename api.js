const apiKey = '3ffb37e0c8f0ad94393b387700ac1867'; // TMDb API 키
const baseUrl = 'https://api.themoviedb.org/3'; 

document.addEventListener("DOMContentLoaded", function () {
    const movieList = document.getElementById("movieList");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    fetch(`${baseUrl}/movie/popular?api_key=3ffb37e0c8f0ad94393b387700ac1867&language=ko-KR`)
        .then(response => response.json())
        .then(data => {
            console.log(data); // API 응답 데이터 확인
            renderMovies(data.results);
        });

    let scrollAmount = 0;
    const scrollStep = 250; // 한 번에 이동할 거리

    nextBtn.addEventListener("click", function () {
        scrollAmount = Math.min(scrollAmount + scrollStep, movieList.scrollWidth - movieList.clientWidth);
        movieList.style.transform = `translateX(-${scrollAmount}px)`;
    });

    prevBtn.addEventListener("click", function () {
        scrollAmount = Math.max(scrollAmount - scrollStep, 0);
        movieList.style.transform = `translateX(-${scrollAmount}px)`;
    });

    function renderMovies(movies) {
        let movieListHtml = movies.map(movie => {
            return `
                <a href="#" class="movie ${getGenreClass(movie.genre_ids)}">
                    <div class="movie-card">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="movie-poster">
                        <video width="100%" height="100%" preload="metadata" muted loop>
                            <source src="" type="video/mp4">
                        </video>
                        <div class="movie-info" style="display: none;">
                            <h3>${movie.title}</h3>
                            <p>${movie.overview}</p>
                        </div>
                    </div>
                </a>
            `;
        }).join("");

        movieList.innerHTML = movieListHtml;

        document.querySelectorAll(".movie-poster").forEach((poster, index) => {
            poster.addEventListener("mouseover", async () => {
                const movieId = getMovieId(poster, movies);
                if (movieId) {
                    const trailerUrl = await getTrailerUrl(movieId);
                    const trailer = poster.parentNode.querySelector("video");
                    trailer.src = trailerUrl;
                    trailer.play();
                }
            });
        });

        document.querySelectorAll(".movie-card").forEach(card => {
            card.addEventListener("click", (e) => {
                e.preventDefault();
                const movieInfo = card.querySelector(".movie-info");
                movieInfo.style.display = movieInfo.style.display === "block" ? "none" : "block";
            });
        });

        scrollAmount = 0;
        movieList.style.transform = `translateX(0px)`;
    }

    function getMovieId(poster, movies) {
        const movieTitle = poster.alt;
        const movie = movies.find(m => m.title === movieTitle);
        return movie ? movie.id : null;
    }

    async function getTrailerUrl(movieId) {
        const response = await fetch(`${baseUrl}/movie/${movieId}/videos?api_key=3ffb37e0c8f0ad94393b387700ac1867&language=ko-KR`);
        const data = await response.json();
        return data.results.length > 0 ? `https://www.youtube.com/embed/${data.results[0].key}` : "";
    }

    function getGenreClass(genreIds) {
        const genreClasses = { 28: "action", 35: "comedy", 18: "drama" };
        const genreClass = genreIds.find(id => Object.keys(genreClasses).includes(String(id)));
        return genreClass ? genreClasses[genreClass] : "";
    }

    function filterMovies() {
        const selectedGenre = document.getElementById("genre").value;
        const genreId = getGenreId(selectedGenre);
        fetch(`${baseUrl}/discover/movie?api_key=3ffb37e0c8f0ad94393b387700ac1867&language=ko-KR&with_genres=${genreId}`)
            .then(response => response.json())
            .then(data => {
                renderMovies(data.results);
            });
    }

    function getGenreId(genre) {
        const genreIds = { "all": "", "action": "28", "comedy": "35", "drama": "18" };
        return genreIds[genre];
    }

    function searchMovies() {
        const searchQuery = document.getElementById("searchInput").value;
        fetch(`${baseUrl}/search/movie?api_key=3ffb37e0c8f0ad94393b387700ac1867&language=ko-KR&query=${searchQuery}`)
            .then(response => response.json())
            .then(data => {
                renderMovies(data.results);
            });
    }
});
