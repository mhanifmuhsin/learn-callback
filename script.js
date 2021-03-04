// Using Ajax and jQuery
// $('.btn-search').on('click', function(){
//     $.ajax({
//         url: 'http://www.omdbapi.com/?apikey=e2b77af0&s='+ $('.input-movie').val(),
//         success: result => {
//             const movies = result.Search;
//             let cards = '';

//             movies.forEach(m => {
//                 cards += showMovie(m);
//             });
//             // console.log(movies);
//             $('.movie-container').html(cards);

//             // Ketika tombol di klik

//             $('.modal-detail-button').on('click', function () {
//                 $.ajax({
//                     url: 'http://www.omdbapi.com/?apikey=e2b77af0&i='+ $(this).data('imdbid'),
//                     success: m => {
//                         // console.log($(this).data('imdbid'));
//                         // console.log(m);
//                         const movieDetail = detailMovie(m);

//                         $('.modal-body').html(movieDetail);

//                     },
//                     error: (e) => {
//                         console.log(e.responText);
//                     }

//                 });
//             });

//         },
//         error: (e) => {
//             console.log(e.responText);
//         }
//     });
// });


/*
 Using Fetch
 event input keyword movie and click button
*/
const searchButton = document.querySelector('.btn-search');
searchButton.addEventListener('click', function () {

    const inputKeyword = document.querySelector('.input-movie');
    // console.log(inputKeyword.value);

    //Call API
    fetch('http://www.omdbapi.com/?apikey=e2b77af0&s=' + inputKeyword.value)
        .then(response => response.json())
        .then(response => {
            const movies = response.Search;
            let cards = '';
            movies.forEach(m => cards += showMovie(m));
            const movieContainer = document.querySelector('.movie-container');
            movieContainer.innerHTML = cards;

            /*
            Using Fetch 
            event click button show detail movie
            */
            const buttonShowDetail = document.querySelectorAll('.modal-detail-button');

            buttonShowDetail.forEach(btn => {
                btn.addEventListener('click', function () {
                    // console.log(this);
                    const dataImdbid = this.dataset.imdbid;
                    // console.log(dataImdbid);

                    // Call API
                    fetch('http://www.omdbapi.com/?apikey=e2b77af0&i='+ dataImdbid)
                    .then(response => response.json())
                    .then(m => {
                        const movieDetail = detailMovie(m);
                        const modalBody = document.querySelector('.modal-body');
                        modalBody.innerHTML=movieDetail;
                    })


                });
            });
        })
});






function showMovie(m) {
    return ` <div class="col-md-4 my-3">
    <div class="card" >
        <img class="card-img-top" src="${m.Poster}" alt="Image">
        <div class="card-body">
          <h5 class="card-title">${m.Title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
          <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#movieDetail" data-imdbid="${m.imdbID}">Show Details</a>
        </div>
      </div>
</div>`;
}

function detailMovie(m) {
    return ` <div class="container-fluid">
    <div class="row">
        <div class="col-md-3">
            <img src="${m.Poster}" alt="" class="img-fluid">
        </div>
        <div class="col-md">
          <ul class="list-group">
              <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
              <li class="list-group-item"><strong>Director : </strong> ${m.Director}</li>
              <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
              <li class="list-group-item"><strong>Writer :</strong>${m.Writer}</li>
              <li class="list-group-item"><strong>Plot : </strong>${m.Plot}</li>
            </ul>
        </div>
    </div>
</div>`;
}