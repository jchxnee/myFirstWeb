document.addEventListener("DOMContentLoaded", function () {
    const movieList = document.getElementById("movieList");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    let movies = [
        { title: "아바타2", genre: "action", src: "./movie/아바타2.jpeg" },
        { title: "알라딘", genre: "comedy", src: "./movie/알라딘.jpeg" },
        { title: "범죄도시4", genre: "action", src: "./movie/범죄도시4.jpeg" },
        { title: "베테랑2", genre: "drama", src: "./movie/베테랑2.jpeg" },
        { title: "기생충", genre: "drama", src: "./movie/기생충1.jpeg" },
        { title: "해리포터", genre: "comedy", src: "./movie/해리포터.jpeg" },
        { title: "쥬라기월드3", genre: "action", src: "./movie/쥬라기월드.jpeg" },
        { title: "시민덕희", genre: "drama", src: "./movie/시민덕희.jpeg" },
        { title: "분노의질주6", genre: "action", src: "./movie/분노의질주.jpeg" },
        { title: "엘리멘탈", genre: "drama", src: "./movie/엘리멘탈.jpeg" },
        { title: "파묘", genre: "drama", src: "./movie/파묘.jpeg" },
        { title: "대도시의 사랑법", genre: "drama", src: "./movie/대도시의 사랑법.jpeg" },
        { title: "서울의봄", genre: "action", src: "./movie/서울의봄.jpeg" },
        
    ];

    
    const moviesPerPage = 6; 
    let currentPage = 0;
    let totalPages = Math.ceil(movies.length / moviesPerPage);

    /*-----------------------------------드라마js---------------------*/

    const dramaMovieList = document.getElementById("dramaMovieList");
    const dramaPrevBtn = document.querySelector(".drama-prev-btn");
    const dramaNextBtn = document.querySelector(".drama-next-btn");
    
    let dramaMovies = [
        { title: "그해우리는", genre: "drama", src: "./drama/그해우리는.jpeg" },
        { title: "더글로리2", genre: "action", src: "./drama/더글로리.jpeg" },
        { title: "사냥개들", genre: "action", src: "./drama/사냥개들.jpeg" },
        { title: "슬기로운 의사생활", genre: "comedy", src: "./drama/슬기로운의사생활.jpeg" },
        { title: "알고있지만", genre: "drama", src: "./drama/알고있지만.jpeg" },
        { title: "엄마친구아들", genre: "comedy", src: "./drama/엄마친구아들.jpeg" },
        { title: "오징어게임2", genre: "action", src: "./drama/오징어게임.jpeg" },
        { title: "옥씨부인전", genre: "comedy", src: "./drama/옥씨부인전.jpeg" },
        { title: "응답하라1988", genre: "drama", src: "./drama/응답하라1988.jpeg" },
        { title: "이번생도잘부탁해", genre: "drama", src: "./drama/이번생도잘부탁해.jpeg" },
        { title: "재벌집막내아들", genre: "drama", src: "./drama/재벌집막내아들.jpeg" },
        { title: "정신병동에도아침이와요", genre: "drama", src: "./drama/정신병동.jpeg" },
        { title: "트렁크", genre: "action", src: "./drama/트렁크.jpeg" },
    ];


    const dramaMoviesPerPage = 6;
    let currentDramaPage = 0;
    let totalDramaPages = Math.ceil(dramaMovies.length / dramaMoviesPerPage);

    
    function paginateMovies(movies) {
        const pages = [];
        for (let i = 0; i < movies.length; i += moviesPerPage) {
            pages.push(movies.slice(i, i + moviesPerPage));
        }
        return pages;
    }

    
    function renderMoviePages(pages) {
        let movieListHtml = "";
    
        for (let i = 0; i < pages.length; i++) {
            let moviePageHtml = "";
    
            for (let j = 0; j < pages[i].length; j++) {
                let movie = pages[i][j];
                moviePageHtml += `
                    <a href="movies.page.html" class="movie ${movie.genre}">
                        <img src="${movie.src}" alt="${movie.title}" class="movie">
                    </a>
                `;
            }
    
            movieListHtml += `<div class="movie-page">${moviePageHtml}</div>`;
        }
    
        movieList.innerHTML = movieListHtml;
    }

    
    function updatePage() {
        movieList.style.transform = `translateX(-${currentPage * 100}%)`;
    }

    
    function goToNextPage() {
        if (currentPage < totalPages - 1) {
            currentPage++;
            updatePage();
        }
    }

    
    function goToPrevPage() {
        if (currentPage > 0) {
            currentPage--;
            updatePage();
        }
    }

    
    

    
    function paginateDramaMovies(movies) {
        const pages = [];
        for (let i = 0; i < movies.length; i += dramaMoviesPerPage) {
            pages.push(movies.slice(i, i + dramaMoviesPerPage));
        }
        return pages;
    }

   
    function renderDramaMovies(pages) {
        let movieListHtml = "";
    
        for (let i = 0; i < pages.length; i++) {
            let moviePageHtml = "";
    
            for (let j = 0; j < pages[i].length; j++) {
                let movie = pages[i][j];
                moviePageHtml += `
                    <a href="drama.page.html" class="movie ${movie.genre}">
                        <img src="${movie.src}" alt="${movie.title}" class="movie">
                    </a>
                `;
            }
    
            movieListHtml += `<div class="movie-page">${moviePageHtml}</div>`;
        }
    
        dramaMovieList.innerHTML = movieListHtml;
    }

    
    function updateDramaPage() {
        dramaMovieList.style.transform = `translateX(-${currentDramaPage * 100}%)`;
    }

   
    function goToNextDramaPage() {
        if (currentDramaPage < totalDramaPages - 1) {
            currentDramaPage++;
            updateDramaPage();
        }
    }

    
    function goToPrevDramaPage() {
        if (currentDramaPage > 0) {
            currentDramaPage--;
            updateDramaPage();
        }
    }

    window.saveEmailAndRedirect = function(){
        var email = document.getElementById('emailInput').value;
        if (email) { 
          localStorage.setItem('email', email);
          window.location.href = 'createMember.html';
        } else {
          alert('이메일 주소를 입력해주세요.'); 
        }
      }

      $(".qa-box > div").click(function(){
        console.log(this);
        console.log($(this).next());//선택된 요소 뒤에있는 요소

        const $p = $(this).next();
        if($p.css("display") === "none"){
            $(".qa-box > p").slideUp();
            $p.slideDown();
        } else{
            $p.slideUp();
        }
    })


    // 초기 영화 렌더링
    const initialPages = paginateMovies(movies);
    totalPages = initialPages.length;
    renderMoviePages(initialPages);
    updatePage();

    // 초기 드라마 렌더링
    const initialDramaPages = paginateDramaMovies(dramaMovies);
        totalDramaPages = initialDramaPages.length;
        renderDramaMovies(initialDramaPages);
        updateDramaPage();

    // 영화 이벤트 리스너 등록
    nextBtn.addEventListener("click", goToNextPage);
    prevBtn.addEventListener("click", goToPrevPage);

    // 드라마 이벤트 리스너 등록
    dramaNextBtn.addEventListener("click", goToNextDramaPage);
    dramaPrevBtn.addEventListener("click", goToPrevDramaPage);

    function getMoviesPerPage() {
        if (window.innerWidth <= 480) return 2;
        if (window.innerWidth <= 768) return 4;
        if (window.innerWidth <= 1024) return 6;
        return 6; // 기본값
    }
    
    function updateMovies() {
        moviesPerPage = getMoviesPerPage();
        const updatedPages = paginateMovies(movies);
        totalPages = updatedPages.length;
        renderMoviePages(updatedPages);
        updatePage();
    }
    
    function updateDramaMovies() {
        dramaMoviesPerPage = getMoviesPerPage();
        const updatedDramaPages = paginateDramaMovies(dramaMovies);
        totalDramaPages = updatedDramaPages.length;
        renderDramaMovies(updatedDramaPages);
        updateDramaPage();
    }
    
    // 창 크기 변경될 때 자동 업데이트
    window.addEventListener("resize", () => {
        updateMovies();
        updateDramaMovies();
    });
    
    // 초기 실행
    updateMovies();
    updateDramaMovies();
    
});