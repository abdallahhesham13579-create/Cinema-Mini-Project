let currentPage = 1;

function newSearch() {
  currentPage = 1;
  document.getElementById("filmPoster").innerHTML = ""; // Clear old results
  fetchData(false); // Call the main function
}
async function fetchData(isLoadMore) {
  try {
    const filmName = document.getElementById("filmName").value.toLowerCase();

    const response = await fetch(
      `http://www.omdbapi.com/?apikey=ca0d0c1b&s=${filmName}&type=movie&page=${currentPage}`
    );
    const data = await response.json();
    console.log(data);

    if (data.Response === "True") {
      const container = document.getElementById("filmPoster");
      data.Search.forEach((movie) => {
        if (movie.Poster !== "N/A") {
          const card = document.createElement("div");
          card.classList.add("movie-card");
          const imgElement = document.createElement("img");
          imgElement.src = movie.Poster;
          const title = document.createElement("p");
          title.textContent = movie.Title;
          const date = document.createElement("p");
          date.textContent = `Année de sortie : ${movie.Year}`;
          const detailsBtn = document.createElement("button");
          detailsBtn.textContent = `Détails`;
          detailsBtn.href = `movie.html?id=${movie.imdbID}`;
          detailsBtn.addEventListener("click", () => {
            window.location.href = `movie.html?id=${movie.imdbID}`;
          });
          card.appendChild(imgElement);
          card.appendChild(title);
          card.appendChild(date);
          card.appendChild(detailsBtn);
          container.appendChild(card);
        }
      });
      document.getElementById("loadMoreBtn").style.display = "block";
      if (isLoadMore) {
        currentPage++;
      } else {
        currentPage = 2;
      }
    }
  } catch (error) {
    console.log(error);
  }
}
