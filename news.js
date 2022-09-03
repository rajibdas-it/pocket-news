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
  console.log(news_id);
  const url = `https://openapi.programming-hero.com/api/news/category/${news_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNews(data.data));
};

const displayNews = (items) => {
  console.log(items);
  const alertMsg = document.getElementById("alert-msg");
  if (items.length > 0) {
    alertMsg.classList.remove("d-none");
    alertMsg.innerText = `${items.length} items found`;
  } else {
    alertMsg.classList.remove("d-none");
    alertMsg.innerText = `No items found`;
  }
};

loadCategory();
