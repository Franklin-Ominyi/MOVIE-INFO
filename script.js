$(document).ready(()=>{
  $('#searchForm').on('submit', (e)=>{
   let searchText = $('#searchText').val();
   getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText){
  
  axios.get(`https://www.omdbapi.com/?apikey=c3f3b90&s=${searchText}`)
    .then((response)=>{
      var data = response.data.Search;
      var output = "";
      
      data.forEach(data => {
       output += `
       
       <div class="col-md-4" id="movie">
       <a href="#" onclick="movieSelected('${data.imdbID}')"><img src="${data.Poster}"><h3><strong style="color: white">Title:</strong> ${data.Title}</h3></a>
       </div>

       `
      });
      $('#movies').html(output);

    
      

    })
    .catch((err)=>{
      console.log(err)
    })
}


const movieSelected = (id) =>{
  sessionStorage.setItem("movieID", id);
  window.location = "movie.html";
  return false;
}



function getMovie(){
  let movieID = sessionStorage.getItem("movieID")
  axios.get(`https://www.omdbapi.com/?apikey=c3f3b90&i=${movieID}`)
    .then((response)=>{
      var movie = response.data;
      var output = "";
      console.log(response)
      
       output += `
       <div class="row">
       <div class="col-md-8">
        <h2>${movie.Title}</h2>
        <ul class="list-group">
          <li class="list-group-item"><strong>Genre: </strong>${movie.Genre}</li>
          <li class="list-group-item"><strong>Released: </strong>${movie.Released}</li>
          <li class="list-group-item"><strong>Rated: </strong>${movie.Rated}</li>
          <li class="list-group-item"><strong>IMDB Rating: </strong>${movie.imdbRating}</li>
          <li class="list-group-item"><strong>Director: </strong>${movie.Director}</li>
          <li class="list-group-item"><strong>Writer: </strong>${movie.Writer}</li>
          <li class="list-group-item"><strong>Actors: </strong>${movie.Actors}</li>
        <ul>
       </div>

       <div class="col-md-4">
        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank"><img src="${movie.Poster}" class="thumnail"></a>
       </div>
       
       </div>
     <div class="row container">
      <div class="well">
        <h3>Plot</h3>
        ${movie.Plot}
        <hr>
        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="mb-5 btn btn-info">View IMDB</a>
        <a href="inde.html" target="_blank" class="btn btn-danger mb-5">Back to Search</a>
      </div>
     </div>
     `
      
    
      $('#movies').html(output);

    
      

    })
    // .catch((err)=>{
    //   console.log(err)
    // })
}

