// const loadCategory = () => {
//   const url = "https://openapi.programming-hero.com/api/news/categories";
//   fetch(url)
//     .then((res) => res.json())
//     .then((data) => displayCategoryName(data.data.news_category));
// };

// const displayCategoryName = (categories) => {
//   //   console.log(categories);
//   const categoriesSection = document.getElementById("categories-section");
//   categories.forEach((category) => {
//     categoryDiv = document.createElement("div");
//     categoryDiv.classList.add("col");
//     categoryDiv.innerHTML = `
//       <button class="btn p-2 mb-3 fw-bold" onclick="loadNews('${category.category_id}')">${category.category_name}</button>
//       `;
//     categoriesSection.appendChild(categoryDiv);
//   });
// };

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
    <a onclick="loadNews('${category_id}')" class="nav-link text-black  btn" href="#">${category_name}</a>
    `;
    categoriesDiv.appendChild(li);
  });
};

const loadNews = (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${news_id}`;
  console.log(url);
};

loadCategory();
