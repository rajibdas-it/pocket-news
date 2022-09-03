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
            <p class="fw-bold">${
              news.author.name ? news.author.name : "no data found"
            }</p>
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