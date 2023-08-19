const btnX = document.querySelector(".burger");
const modalNav = document.querySelector(".modal-nav");

btnX.onclick = (e) => {
  e.preventDefault();
  modalNav.classList.toggle("active");
};

// toggle search
const showSearch = document.querySelector(".show-search");
const searchBox = document.querySelector(".search");
showSearch.onclick = (e) => {
  e.preventDefault();
  searchBox.classList.toggle("active");
};

//

document.addEventListener("click", function (e) {
  if (!btnX.contains(e.target) && !modalNav.contains(e.target)) {
    modalNav.classList.remove("active");
  }
  if (btnX.contains(e.target) && !showSearch.contains(e.target)) {
    searchBox.classList.remove("active");
  }
});

// api

const url = "https://api.themoviedb.org/3";
const imgURL = "https://image.tmdb.org/t/p/w500";
const apiKey = "35875193f1927b1538d0690111ec63a1";

const row = document.querySelector(".row");
let data = "";
const conn = async () => {
  const conn = await fetch(`${url}/movie/popular?api_key=${apiKey}`);
  data = await conn.json();
  data = data.results;
  // data = JSON.stringify(data);
  let str = "";
  data.forEach((item) => {
    str += `
        <div class="card">
        <div class="card-img">
          <a href="" class="detail" data-id=${item.id}></a>
          <img src="${imgURL + item.poster_path}" alt="">
          <div class="overlay">
            <i data-feather="play-circle" class="play"></i>
          </div>
        </div>

        <div class="title">${item.title}</div>
      </div>`;
  });
  row.innerHTML = str;
  re_render();
  return data;
};

// jika halaman di kunjungi jalankan function ini
conn();

// search film

const searchBtn = document.querySelector("#search");
const query = document.querySelector(".query");
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(query.value);
  search(query.value);
});

const search = async (q) => {
  const s = await fetch(`${url}/search/movie?query=${q}&api_key=${apiKey}`);
  data = await s.json();
  data = data.results;

  let str = "";
  data.forEach((item) => {
    str += `
        <div class="card">
        <div class="card-img">
          <a href="" class="detail" data-id=${item.id}></a>
          <img src="${imgURL + item.poster_path}" alt="">
          <div class="overlay">
            <i data-feather="play-circle" class="play"></i>
          </div>
        </div>

        <div class="title">${item.title}</div>
      </div>`;
  });
  // document.querySelector(swiper-container).style.display = 'none';
  document.querySelector(".header").innerHTML = "Hasil pencarian...";
  row.innerHTML = str;
  re_render();
  return data;
};

// info detail
function re_render() {
  let btnDetail = document.querySelectorAll(".detail");
  btnDetail.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      const ids = item.getAttribute("data-id");
      detailInfo(ids);
      console.log(ids);
      // detailInfo();
    });
  });
}

// target detail

async function detailInfo(id) {
  const sId = id.toString();
  const s = await fetch(`${url}/movie/${sId}?api_key=${apiKey}`);
  data = await s.json();
  const box = document.querySelector(".box");
  box.innerHTML = showModal(data);
  box.classList.add("active");
  console.log(data);
  // close modal detail
  const btnClose = document.querySelector(".close");
  const modalDetail = document.querySelector(".box");
  
  btnClose.addEventListener("click", (e) => {
    e.preventDefault();
    modalDetail.classList.remove("active");
  });
}

// show modalDetail

function showModal(x) {
  return ` 
  <div class="modal">
  <a class="close">
  <span></span>
  <span></span>
  </a>
  <div class="modal-header">
    <div class="modal-img">
      <img src="${imgURL + x.poster_path}" alt=""  />
    </div>
    <div class="rating">Rating: ${x.vote_average}</div>
  </div>

  <div class="modal-content">
    <div class="title">
      <h1>${x.title}</h1>
    </div>
    <ul class="modal-info">
      <li>
        <p class="release">Release: ${x.release_date}</p>
      </li>
    </ul>
    <div class="summary">
      <h3>Sinopsis</h3>
      <p class="text">
       ${x.overview}
      </p>
    </div>
  </div>
</div>
`;
}
