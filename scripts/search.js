"use strict";

// declare
const container = document.getElementById("news-container");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNum = document.getElementById("page-num");
const inputQuery = document.getElementById("input-query");
const btnSearch = document.getElementById("btn-submit");

// validate
const validate = function () {
  if (inputQuery.value == "") {
    alert("Please enter the key words");
    return false;
  }
  return true;
};

// press search button
btnPrev.style.display = "none";
btnSearch.addEventListener("click", function () {
  if (validate()) {
    let search = inputQuery.value;
    //  get data from api
    async function getData() {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${search}&pageSize=${pageSize}&page=${currentPage}&apiKey=fab8c06bbd8b4922991395d80cf2904e`
      );
      const data = await response.json();
      return data;
    }
    // render function
    const render = function (data) {
      let html = ``;
      container.innerHTML = "";
      data.forEach(el => {
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
    };
    async function renderNews() {
      try {
        const data = await getData();
        let result = data.articles;

        render(result);
      } catch (err) {
        console.error(err);
      }
    }
    renderNews();

    // press next button
    btnNext.addEventListener("click", function () {
      currentPage++;
      if (currentPage * pageSize >= 10) {
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
});
