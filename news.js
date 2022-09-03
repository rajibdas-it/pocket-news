const loadCategory = () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategoryName(data.data.news_category));
};

const displayCategoryName = (categories) => {
  //   console.log(categories);
  const categoriesSection = document.getElementById("categories-section");
  categories.forEach((category) => {
    categoryDiv = document.createElement("div");
    categoryDiv.classList.add("col");
    categoryDiv.innerHTML = `
    <button class="btn p-2 mb-3 fw-bold" onclick="loadNews('${category.category_id}')">${category.category_name}</button>
    `;
    categoriesSection.appendChild(categoryDiv);
  });
};

const loadNews = (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${news_id}`;
  fetch(url)
    .then((res) => res.json())
    //Using set time out to show loading spinner work.
    // .then((data) => displayNews(data.data))
    .then((data) =>
      setTimeout(() => {
        displayNews(data.data);
      }, 1000)
    )
    .catch((err) => console.log(err));
  toggleSpinner(true);
};

const displayNews = (items) => {
  //console.log(items);
  const alertMsg = document.getElementById("alert-msg");
  if (items.length > 0) {
    alertMsg.classList.remove("d-none");
    alertMsg.innerText = `${items.length} items found`;
  } else {
    alertMsg.classList.remove("d-none");
    alertMsg.innerText = `No items found`;
  }

  const newsSection = document.getElementById("news-section");
  newsSection.textContent = "";
  items.forEach((news) => {
    const newsDiv = document.createElement("div");
    newsDiv.innerHTML = `
    <div class="mx-auto card mb-3">
    <div class="row g-0">
      <div class="col-md-4">
        <img
          src=${news.thumbnail_url ? news.thumbnail_url : "No image found!"}
          class="img-fluid h-100 w-100 rounded-start"
          alt="..."
        />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${news.title}</h5>
          <p class="card-text">
            <small class="text-muted">Published on: ${
              news.author.published_date
                ? news.author.published_date
                : "data not found"
            }</small>
          </p>
          <p class="card-text">${
            news.details.length > 580
              ? news.details.slice(0, 580) + "..."
              : news.details
          }</p>
          
        </div>
        <div class="mb-1 d-flex gap-1 position-bottom-0">
          <div class="ms-3 d-flex flex-column flex-md-row align-items-center justify-content-center">
            <img
              style="width: 50px; height: 50px"
              src=${news.author.img ? news.author.img : "no data found"}
              class="img-fluid rounded-circle p-2"
              alt=""
            />
            <h3>${news.author.name ? news.author.name : "no data found"}</h3>
          </div>
          <div class="ms-3">
            <p><i class="fa-solid fa-eye"></i>${
              news.total_view ? news.total_view : "no data found"
            }</p>
          </div>
          <div class="ms-3">
            <p>rating ${
              news.rating.number ? news.rating.number : "no data found"
            }</p>
          </div>
          <div class="ms-3 me-3">
          <button onclick="loadDetailsNews('${
            news._id
          }')"  type="button" class="btn text-info fw-bold fs-4 me-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
  // console.log(news);
  const modalTitle = document.getElementById("modal-title");
  modalTitle.innerText = news.title;
  const modalBody = document.getElementById("modal-body");
  // const modalFooter = document.getElementById("modal-footer");
  modalBody.innerHTML = `
        <div class="row">
          <div class="col-10 mx-auto w-100">
            <img src=${
              news.image_url ? news.image_url : "No Image"
            } class="img-fluid rounded" alt="" />
          </div>

          <h1 class="mt-3">${news.title}</h1>
          <div class="d-flex flex-row">
           <div>
           <img
           style="width: 50px; height: 50px"
           src=${news.author.img ? news.author.img : "no data found"}
           class="img-fluid rounded-circle p-2"
           alt=""
         />
           </div>
            <div>
            <p class="mt-3"><small>${
              news.author.name ? news.author.name : "no data found"
            }</small></div>
          </div>
          
          <p class="mt-3">${news.details}</p>
     
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

// toggleSpinner(true);
// toggleSpinner(false);
loadNews("04");
loadCategory();
