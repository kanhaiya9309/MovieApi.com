// alert("Hello")


var memeGenerateButton = document.querySelector('.meme-Generator')
let memeGenaratorDiv = document.getElementById('meme-Generator-div');
// let memeTitle = document.getElementById('title');
// let memeImg = document.getElementById('meme_img');
// let memeAuthor = document.getElementById('author');
//let memeApi = "https://meme-api.com/gimme/wholesomememes";

// let moviesApi  = 'http://localhost:3000/movies';

// let moviesYear2023 = "http://localhost:3000/MoviesOfYear"


let moviesApi  = 'https://movieapi-89q6.onrender.com/Movies';

let moviesYear2023 = "https://movieapi-89q6.onrender.com/MoviesOfYear"



memeGenerateButton.addEventListener('click',generateMoviesofYear);

window.onload = generateMovies()

async function generateMovies (){

let response = await fetch(moviesApi);

  if(!response.ok){
   console.log(`Request failed with status ${response.status}`)
  }
 
 let data = await response.json();

 if(data.status == "success"){
   let movies = data.data ;

   console.log("Movies: ",movies)



   if(movies.length===0){
      console.log('No movies found');
      return
   }

   memeGenaratorDiv.innerHTML = '';

   movies.forEach((movie)=>{
      let movieDiv = document.createElement('div');
       movieDiv.className = 'movie-card'

      //  console.log(movie)

       movieDiv.innerHTML = `
        <h2>${movie.title}</h2>
        <img  src="${movie.posterImageUrl}" alt="Movies"/>
        <h3> Director : ${movie.director}</h3>
      
        <h3> Cast : ${movie.cast.join(",")}</h3>

        <h4> Genre : ${movie.genre.join(",")}</h4>
       `
   memeGenaratorDiv.appendChild(movieDiv)
   })

 }

}

async function generateMoviesofYear (){

   let response = await fetch(moviesYear2023);
   
     if(!response.ok){
      console.log("Server problem")
     }
    
    let data = await response.json();
   
    if(data.status == "success"){
      let movies = data.data ;
   
      console.log("Movies: ",movies)
   
   
   
      if(movies.length===0){
         console.log('No movies found');
         return
      }
   
      memeGenaratorDiv.innerHTML = '';
   
      movies.forEach((movie)=>{
         let movieDiv = document.createElement('div');
          movieDiv.className = 'movie-card'
   
         //  console.log(movie)
   
          movieDiv.innerHTML = `
         <h2>${movie.title}</h2>
         <img  src="${movie.image}" alt="Movies"/>
         <h3>${movie.synopsis}</h3>
         <p>${movie.director}</p>
         
          `
      memeGenaratorDiv.appendChild(movieDiv)
      })
   
    }
   
   }

// prompt("Hello How are you ")






