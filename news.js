const loadCategory = () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategoryName(data.data.news_category));
};

const displayCategoryName = (categories) => {
  console.log(categories);
  const categoriesSection = document.getElementById("categories-section");
  categories.forEach((category) => {
    categoryDiv = document.createElement("div");
    categoryDiv.classList.add("col");
    categoryDiv.innerHTML = `
    <a href="" class="btn btn-light">${category.category_name}</a>
    `;
    categoriesSection.appendChild(categoryDiv);
  });
};

loadCategory();
