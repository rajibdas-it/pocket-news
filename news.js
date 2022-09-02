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
    <button class="btn p-2 mb-3" onclick="loadNews('${category.category_id}')">${category.category_name}</button>
    `;
    categoriesSection.appendChild(categoryDiv);
  });
};

const loadNews = (news_id) => {
  console.log(news_id);
  const url = `https://openapi.programming-hero.com/api/news/category/${news_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => console.log(data.data));
  // '${category.category_id}'
};

loadCategory();
