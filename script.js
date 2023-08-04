// $('burger').on('click', function (){
//     $('modal-nav').classList.toggle('active');
// });
// toggle modal-nav
const btnX = document.querySelector('.burger');
const modalNav = document.querySelector('.modal-nav');
btnX.onclick = (e) => {
    e.preventDefault();
    modalNav.classList.toggle('active');
}

// toggle search
const showSearch = document.querySelector('.show-search');
const searchBox = document.querySelector('.search');
showSearch.onclick = (e) => {
    e.preventDefault();
   searchBox.classList.toggle('active');
}


// 

document.addEventListener('click', function (e) {
    if(!btnX.contains(e.target) && !modalNav.contains(e.target)){
        modalNav.classList.remove('active');
    }
});


// api

const url ='https://api.themoviedb.org/3';
const imgURL ='https://image.tmdb.org/t/p/w500';
const apiKey ='35875193f1927b1538d0690111ec63a1';

const row = document.querySelector('.row');
let data = '';
const conn = async () => {
    const conn = await fetch(`${url}/movie/popular?api_key=${apiKey}`);
    data = await conn.json();
    data = data.results;
    // data = JSON.stringify(data);
    let str = '';
    data.forEach((item) => {
        str +=`
        <div class="card">
        <div class="card-img">
          <img src="${imgURL+item.poster_path}" alt="">
          <div class="overlay">
            <i data-feather="play-circle" class="play"></i>
          </div>
        </div>

        <div class="title">${item.title}</div>
      </div>`
    });
    row.innerHTML = str;
    return data;
} 


// `${url}/search/movie?query=${q}&api_key=${apiKey}`
// `${url}/search/movie?query=${q}&api_key=${apiKey}`

// search film 

const searchBtn = document.querySelector('#search');
const query = document.querySelector('.query');
searchBtn.addEventListener('click' , (e) => {
    e.preventDefault();
    console.log(query.value);
    search(query.value);
});

const search = async (q) => {
    const s = await fetch(`${url}/search/movie?query=${q}&api_key=${apiKey}`);
    data = await s.json();
    data = data.results;

    let str = '';
    data.forEach((item) => {
        str +=`
        <div class="card">
        <div class="card-img">
          <img src="${imgURL+item.poster_path}" alt="">
          <div class="overlay">
            <i data-feather="play-circle" class="play"></i>
          </div>
        </div>

        <div class="title">${item.title}</div>
      </div>`
    });
    // document.querySelector(swiper-container).style.display = 'none';
    document.querySelector('.header').innerHTML = 'Hasil pencarian...';
    row.innerHTML = str;
    return data;
}
