const search=document.querySelector('#search')
const movieWrapper=document.querySelector('.movie-wrapper')
const spinner=document.querySelector('.spinner')
const modal=document.querySelector('.modal')
const apiKey='f0e3eee9'
// let movieData=[]
const url=`https://www.omdbapi.com/?apikey=${apiKey}&s=${search}`
// async function fetchData() {
//   spinner.style.display='block';
//   const res = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}`)
//   const data = await res.json()
//   movieData=data
//   renderData(movieData)
//   console.log(movieData)
// }
// fetchData()
function fetchData(url){
   spinner.style.display='block';
  fetch(url).then((res)=>res.json()).then((data)=>{
     movieWrapper.innerHTML = ''
    movieData=data.Search
     for(let i=0; i<data.Search.length; i++) {
    const el = `
      <article class='card'>
          <img src="${data.Search[i].Poster}" alt="${data.Search[i].Title}"/>
          <h4 class='title' data-id="${data.Search[i].imdbID}" onmouseover={showData(event)} onmouseout={hideData(event)}>
          ${data.Search[i].Title}</h4>
          <h4>${data.Search[i].Type}</h4>
      </article>
    `
    movieWrapper.innerHTML += el;
       spinner.style.display='none';
  } 
  })
    .catch((err)=>console.log(err))
                                                                                 
//  renderData(movieData)
}
// fetchData()

// function renderData(movies){
//   console.log(movies)
//   modal.innerHTML=''
//    modal.innerHTML += `
//     <article>
//      <p>${movies.Title}</p>
//      <p>${movies.Year}</p>
//      <p>${movies.Director}</p>
//      <p>${movies.Ratings[0].Value}</p>
//     </article>
//     `
// }

search.addEventListener('input', function (event) {
  const name = event.target.value;
  const filteredData=fetchData(`https://www.omdbapi.com/?apikey=${apiKey}&s=${name}`)
  // renderData(filteredData);
});

const title=document.querySelector('.title')

function showData(event){
    const titleId=event.target.dataset.id
    
   const filteredData = fetch(`https://www.omdbapi.com/?i=${titleId}&apikey=${apiKey}`).then((res)=>res.json()).then((movies)=>{
     const modalDiv=document.createElement('div')
     // modalDiv.classList.add("modal")
     modalDiv.style.position='absolute'
     modalDiv.style.left='100%'
     modalDiv.style.top='10%'
     modalDiv.style.zIndex='2000'
     modalDiv.style.background='white'
     modalDiv.style.width='15vw'
     modalDiv.style.textAlign='center'
     // renderData(movies)
     modalDiv.innerHTML+=`
     <div>
     <p><strong>Title:</strong> ${movies.Title}</p>
    <p><strong>Year:</strong> ${movies.Year}</p>
    <p><strong>Director:</strong> ${movies.Director}</p>
    <p style={"color:red;"}><strong>Rating:</strong> ${movies.Ratings[0].Value}</p>
    </div>`
     event.target.parentElement.appendChild(modalDiv)
   })
}

function hideData(event){
  event.target.parentElement.children[3].style.display='none'
}


