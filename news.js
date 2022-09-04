const loadCategory = () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategory(data.data.news_category))
    .catch((err) => console.log(err));
};

const displayCategory = (categories) => {
  const categoriesDiv = document.getElementById("show-category");
  categories.forEach((category) => {
    const { category_id, category_name } = category;
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.innerHTML = `
    <a onclick="loadNews('${category_id}')" class="nav-link text-black fw-semibold btn btn-outline-info m-1" href="#">${category_name}</a>
    `;
    categoriesDiv.appendChild(li);
  });
};

//Default news show when home page loading

const loadDefaultNews = () => {
  const url = `https://openapi.programming-hero.com/api/news/category/08`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDefaultNews(data.data))
    .catch((err) => console.log(err));
  toggleSpinner(true);
};

const displayDefaultNews = (items) => {
  //news item sorted accroding to the highest view.
  const sortedNews = items.sort((a, b) => {
    return b.total_view - a.total_view;
  });
  const newsSection = document.getElementById("news-section");
  newsSection.textContent = "";
  sortedNews.forEach((news) => {
    //object destructuring
    const { _id, rating, total_view, title, author, thumbnail_url, details } =
      news;
    const { number, badge } = rating;
    const { name, published_date, img } = author;

    const newsDiv = document.createElement("div");
    newsDiv.innerHTML = `
    <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img
              style="height: 300px"
              src=${thumbnail_url ? thumbnail_url : "no data found"}
              class="img-fluid rounded-start w-100 "
              alt="..."
            />
          </div>
          <div class="col-md-8 d-flex flex-column justify-content-between">
            <div class="card-body">
              <h5 class="card-title">${title ? title : "no data found"}</h5>
              <p class="card-text">
                <small class="text-muted">Published on: ${
                  published_date ? published_date : "no data found"
                }</small>
              </p>
              <p class="card-text">
              ${
                details.length > 250
                  ? details.slice(0, 250) + "..."
                  : news.details
              }
              </p>
            </div>
            <div class="card-footer d-flex justify-content-between flex-row">
              <div class="d-flex justify-content-around flex-row">
                <img
                  style="width: 50px; height: 50px"
                  class="rounded-circle img-fluid img-thumbnail"
                  src=${img ? img : "no data found"}
                  alt=""
                />
                <p class="ms-2">${name ? name : "no data found"}</p>
              </div>
              <div class="total-view">
                <p><i class="fa-solid fa-eye"></i>${
                  total_view ? total_view : "no data found"
                }</p>
              </div>
              <div class="total-rating">
                <p>
                <span style="color: orange;" class="fa fa-star"></span>
                <span style="color: orange;" class="fa fa-star"></span>
                <span style="color: orange;" class="fa fa-star"></span>
                <span style="color: orange;" class="fa fa-star"></span>
                <span class="fa fa-star"></span> ${
                  number ? number : "no data found"
                }
                </p>
               
              </div>
              <div class="read-more">
                <button
                  onclick="loadDetailsNews('${_id}')"
                  type="button"
                  class="btn text-info fw-bold fs-3"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  
    `;
    newsSection.appendChild(newsDiv);
  });
  toggleSpinner(false);
};

// news show click on category button
const loadNews = (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${news_id}`;
  fetch(url)
    .then((res) => res.json())
    //Using setTimeOut function to show loading spinner works.
    // .then((data) => displayNews(data.data))
    .then((data) =>
      setTimeout(() => {
        displayNews(data.data);
      }, 500)
    )
    .catch((err) => console.log(err));
  toggleSpinner(true);
};

const displayNews = (items) => {
  // alertMsg(items);
  //console.log(items);

  const alertMsg = document.getElementById("alert-msg");
  alertMsg.classList.add("d-none");
  if (items.length > 0) {
    alertMsg.classList.remove("d-none");
    alertMsg.innerText = `${items.length} items found.`;
  } else {
    alertMsg.classList.remove("d-none");
    alertMsg.innerText = `No items found`;
  }

  //news item sorted accroding to the highest view.
  const sortedNews = items.sort((a, b) => {
    return b.total_view - a.total_view;
  });
  const newsSection = document.getElementById("news-section");
  newsSection.textContent = "";
  sortedNews.forEach((news) => {
    //object destructuring
    const { _id, rating, total_view, title, author, thumbnail_url, details } =
      news;
    const { number, badge } = rating;
    const { name, published_date, img } = author;

    const newsDiv = document.createElement("div");
    newsDiv.innerHTML = `
    <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img
              style="height: 300px"
              src=${thumbnail_url ? thumbnail_url : "no data found"}
              class="img-fluid rounded-start w-100 "
              alt="..."
            />
          </div>
          <div class="col-md-8 d-flex flex-column justify-content-between">
            <div class="card-body">
              <h5 class="card-title">${title ? title : "no data found"}</h5>
              <p class="card-text">
                <small class="text-muted">Published on: ${
                  published_date ? published_date : "no data found"
                }</small>
              </p>
              <p class="card-text">
              ${
                details.length > 250
                  ? details.slice(0, 250) + "..."
                  : news.details
              }
              </p>
            </div>
            <div class="card-footer d-flex justify-content-between flex-row">
              <div class="d-flex justify-content-around flex-row">
                <img
                  style="width: 50px; height: 50px"
                  class="rounded-circle img-fluid img-thumbnail"
                  src=${img ? img : "no data found"}
                  alt=""
                />
                <p class="ms-2">${name ? name : "no data found"}</p>
              </div>
              <div class="total-view">
                <p><i class="fa-solid fa-eye"></i>${
                  total_view ? total_view : "no data found"
                }</p>
              </div>
              <div class="total-rating">
                <p>
                <span style="color: orange;" class="fa fa-star"></span>
                <span style="color: orange;" class="fa fa-star"></span>
                <span style="color: orange;" class="fa fa-star"></span>
                <span style="color: orange;" class="fa fa-star"></span>
                <span class="fa fa-star"></span> ${
                  number ? number : "no data found"
                }
                </p>
               
              </div>
              <div class="read-more">
                <button
                  onclick="loadDetailsNews('${_id}')"
                  type="button"
                  class="btn text-info fw-bold fs-3"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  
    `;
    newsSection.appendChild(newsDiv);
  });
  toggleSpinner(false);
};

const loadDetailsNews = (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  // console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDetailsNews(data.data[0]))
    .catch((err) => console.log(err));
};

const displayDetailsNews = (news) => {
  const modalTitle = document.getElementById("modal-title");
  modalTitle.innerText = news.title;
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
        <div class="row">
          <div class="col-10 mx-auto w-100">
            <img src=${
              news.image_url ? news.image_url : "No Image"
            } class="img-fluid rounded" alt="" />
          </div>

          <h1 class="mt-3">${news.title}</h1>
          <div class="d-flex flex-row align-content-center">
            <div>
              <img
              style="width: 50px; height: 50px"
              src=${news.author.img ? news.author.img : "no data found"}
              class="img-fluid rounded-circle p-2"
              alt=""
            />
            </div>
              <div>
                <p class="mt-2"><small>${
                  news.author.name ? news.author.name : "no data found"
                }</small> | <small>${
    news.author.published_date
  }</small> <small><i class="fa-solid fa-eye"></i>${news.total_view}</small>
              </div>
            </div>                  
          <p class="mt-1">${news.details}</p>
     
        </div>
  
  `;
};

const toggleSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading === true) {
    loadingSpinner.classList.remove("d-none");
  } else {
    loadingSpinner.classList.add("d-none");
  }
};

// const alertMsg = (isMsg, category_name) => {
//   const alertMsg = document.getElementById("alert-msg");
//   if (isMsg === false) {
//     alertMsg.classList.add("d-none");
//   }
//   if (isMsg.length > 0) {
//     alertMsg.classList.remove("d-none");
//     alertMsg.innerText = `${isMsg.length} items found`;
//   } else {
//     alertMsg.classList.remove("d-none");
//     alertMsg.innerText = `No items found`;
//   }
// };

// loadNews("08");
loadDefaultNews();
loadCategory();
