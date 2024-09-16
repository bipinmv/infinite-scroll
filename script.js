let pageNum = 1;
let isLoading = false;
const container = document.querySelector(".container");
const loadingContainer = document.querySelector(".loading-container");
const resultContainer = document.querySelector(".result-container");

function fetchData() {
  if (isLoading) return;
  isLoading = true;
  loadingContainer.innerHTML = "Loading ...";
  fetch(`https://api.github.com/repositories/1300192/issues?page=${pageNum}`)
    .then((res) => {
      res
        .json()
        .then((finalRes) => {
          finalRes.forEach((item) => {
            const resultDiv = document.createElement("div");
            resultDiv.textContent = item.title;
            resultDiv.classList.add("search-data");
            resultContainer.appendChild(resultDiv);
          });
          isLoading = false;
          loadingContainer.innerHTML = "";
        })
        .catch((e) => {
          isLoading = false;
          loadingContainer.innerHTML = "";
        });
    })
    .catch((err) => {
      isLoading = false;
      loadingContainer.innerHTML = "";
    });
}

container.onscroll = () => {
  if (isLoading) return;

  if (
    Math.ceil(container.clientHeight + container.scrollTop) >=
    container.scrollHeight
  ) {
    pageNum++;
    fetchData();
  }
};

fetchData();
