async function getMovieDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");
  const container = document.getElementById("movie-details");

  if (!movieId) {
    container.innerHTML = "<p>No movie selected. Go back to search.</p>";
    return;
  }

  container.innerHTML = "<p>Loading movie details...</p>";

  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=ca0d0c1b&i=${movieId}&plot=full`
    );
    const data = await response.json();

    container.innerHTML = `
            <div id = "filmDetails">
                <img src="${data.Poster}" alt="${data.Title}">
                <div>
                    <h1>${data.Title}</h1>
                    <p style="color: gray;">${data.Year} • ${data.Runtime} • ${data.Rated}</p>
                    <p><strong>Genre:</strong> ${data.Genre}</p>
                    <p><strong>Cast:</strong> ${data.Actors}</p>
                    <p><strong>Director:</strong> ${data.Director}</p>
                    <p><strong>Rating:</strong> ⭐ ${data.imdbRating}/10</p>
                    <hr>
                    <h3>Plot</h3>
                    <p style="line-height: 1.6;">${data.Plot}</p>
                </div>
            </div>
        `;
  } catch (error) {
    container.innerHTML =
      "<p>Something went wrong. Please try again later.</p>";
    console.error(error);
  }
}

getMovieDetails();
