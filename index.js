const tendanceIds = [
  "tt26443597",
  "tt30144839",
  "tt1312221",
  "tt12300742",
  "tt9603208",
  "tt26581740",
];

async function tendance() {
  const container = document.getElementById("filmsTend");
  try {
    const fetchPromises = tendanceIds.map((id) =>
      fetch(`http://www.omdbapi.com/?apikey=ca0d0c1b&i=${id}`).then((res) =>
        res.json()
      )
    );
    const data = await Promise.all(fetchPromises);

    data.forEach((movie) => {
      if (movie.Response === "True") {
        const card = document.createElement("div");
        card.classList.add("movie-card");
        const imgElement = document.createElement("img");
        imgElement.src = movie.Poster;
        const title = document.createElement("p");
        title.textContent = movie.Title;
        const date = document.createElement("p");
        date.textContent = `Année de sortie : ${movie.Year}`;
        const detailsBtn = document.createElement("button");
        const summary = document.createElement("p");
        summary.textContent = ` Sommaire: ${movie.Plot}`;
        summary.classList.add("movie-plot");
        detailsBtn.textContent = `Détails`;
        detailsBtn.addEventListener("click", () => {
          window.location.href = `movie.html?id=${movie.imdbID}`;
        });
        card.appendChild(imgElement);
        card.appendChild(title);
        card.appendChild(date);
        card.appendChild(summary);
        card.appendChild(detailsBtn);
        container.appendChild(card);
      }
    });
  } catch (error) {
    console.log(error);
  }
}
tendance();
