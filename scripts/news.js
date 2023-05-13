"use strict";

// declare
const container = document.getElementById("news-container");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");

// setting
if (getFromStorage("settingNews")) {
  settingNews = JSON.parse(getFromStorage("settingNews"));
  sources = settingNews[1];
  pageSize = Number(settingNews[0]);
}

//  get data from api
btnPrev.style.display = "none";
async function getData() {
  const response = await fetch(
    `https://newsapi.org/v2/everything?${sources}&pageSize=${pageSize}&page=${currentPage}&apiKey=fab8c06bbd8b4922991395d80cf2904e`
  );
  const data = await response.json();
  return data;
}

// render news function
async function renderNews() {
  let html = ``;
  container.innerHTML = "";
  try {
    const data = await getData();

    data.articles.forEach(el => {
      html += `
      <div class="card flex-row flex-wrap">
              <div class="card mb-3">
                <div class="row no-gutters">
                  <div class="col-md-4">
                    <img
                      src="${el.urlToImage != null ? el.urlToImage : ""}"
                      class="card-img"
                      alt="${el.publishedAt}-Picture"
                    />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">
                        ${el.title}
                      </h5>
                      <p class="card-text">
                        ${el.description != null ? el.description : ""}
                      </p>
                      <a
                        href="${el.url}"
                        class="btn btn-primary"
                        >View</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
      `;
    });
    container.innerHTML = html;
  } catch (err) {
    console.error(err);
  }
}
renderNews();

//Pagination function

async function pagination() {
  const data = await getData();
  const totalNews = data.totalResults;
  console.log(totalNews);
  // press next button
  btnNext.addEventListener("click", function () {
    currentPage++;
    if (currentPage * pageSize >= totalNews) {
      btnNext.style.display = "none";
    }
    btnPrev.style.display = "block";
    pageNum.textContent = currentPage;
    renderNews();
  });
  // press previous button
  btnPrev.addEventListener("click", function () {
    currentPage--;
    if (currentPage === 1) {
      btnPrev.style.display = "none";
    }
    btnNext.style.display = "block";
    pageNum.textContent = currentPage;
    renderNews();
  });
}
pagination();
