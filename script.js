$('.search-btn').on('click', function(){
    $.ajax({
        url: 'http://www.omdbapi.com/?apikey=eb1c49d2&s=' + $('.input-keyword').val(),
        success: result => {
            const movies = result.Search;
            // card kosong
            let cards = '';
            movies.forEach(mov => {
                    cards += showMovies(mov); 
            });
            $('.movie-container').html(cards);
    
            // ketika tombol detail di klik
            $('.modal-detail-button').on('click', function(){
                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=eb1c49d2&i=' + $(this).data('imdbid'),
                    success: mov => {
                        const movieDetail = showMoviesDetails(mov);
                        $('.modal-body').html(movieDetail);
                    },
                    error: (err) => {
                        console.log(err.responseText)
                    }  
                })
            });
    
        },
        error: (err) => {
            console.log(err.responseText)
        }   
    });

});


function showMovies(mov){
    return `<div class="col-md-4 my-5">
    <div class="card">
        <img src="${mov.Poster}" class="card-img-top" alt="${mov.Poster}">
        <div class="card-body">
        <h5 class="card-title">${mov.Title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${mov.Year}</h6>
        <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${mov.imdbID}">Show Details</a>
        </div>
    </div>
</div>`
};


function showMoviesDetails(mov){
    return `<div class="container-fluid">
    <div class="row">
        <div class="col-md-3">
            <img class="img-fluid" src="${mov.Poster}" alt="${mov.Poster}">
        </div>
        <div class="col-md">
            <ul class="list-group">
                <li class="list-group-item"><h4>${mov.Title} (${mov.Year})</h4></li>
                <li class="list-group-item"><h6>Genre : </h6>${mov.Genre}</li>
                <li class="list-group-item"><h6>Director : </h6>${mov.Director}</li>
                <li class="list-group-item"><h6>Actors : </h6>${mov.Actors}</li>
                <li class="list-group-item"><h6>Runtime : </h6>${mov.Runtime}</li>
            </div>
        </ul>
    </div>
</div>`
};

