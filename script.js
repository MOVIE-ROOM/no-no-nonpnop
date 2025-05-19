document.addEventListener("DOMContentLoaded", () => {
    // API options to be used for both endpoints
    const apiOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YmEzZjAxNWQwNTIxNzdlZjY4Y2QwMjEzYmM3YjQ4MSIsIm5iZiI6MTc0MzM3NjQzMS43NTAwMDAyLCJzdWIiOiI2N2U5ZDAyZjE2Y2FjMmIzYTNmNmU4NWMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.RzYMQz19YM25klS3wxfzPKf8xBozZpg5Vl92NbLVs1o'
      }
    };
  
    // Video modal elements
    const videoModal = document.getElementById("videoModal");
    const videoPlayer = document.getElementById("videoPlayer");
    const videoSource = document.getElementById("videoSource");
    const closeModal = document.getElementById("closeModal");
  
    // --- BILLBOARD: Load a featured movie using the NOW PLAYING endpoint ---
    fetch('C:\Users\Anthony\Documents\movie room\public\video\How I Met Your Mother season 3\How.I.Met.Your.Mother.S03E01.720p.WEB-DL.2CH.x265.HEVC-PSA.mkv', apiOptions)
      .then(res => res.json())
      .then(data => {
        const movies = data.results;
        if (movies && movies.length > 0) {
          const featured = movies[0];
          const backdropPath = featured.backdrop_path;
          const backdropUrl = backdropPath ? `C:\Users\Anthony\Documents\movie room\public\image\How I Met Your Mother S3.png${backdropPath}` : '';
          const billboard = document.getElementById("billboard");
          const billboardContent = document.getElementById("billboardContent");
          billboard.style.backgroundImage = `url('${backdropUrl}')`;
          billboardContent.innerHTML = `
            <h1>${featured.title}</h1>
            <p>${featured.overview}</p>
            <button class="play-button" id="playFeatured"><i class="fas fa-play"></i> Play</button>
          `;
          // When the featured movie's play button is clicked, open the video modal
          document.getElementById("playFeatured").addEventListener("click", () => {
            // For demo purposes, using a sample video URL
            videoSource.src = "C:\Users\Anthony\Documents\movie room\public\video";
            videoPlayer.load();
            videoModal.style.display = "flex";
          });
        }
      })
      .catch(err => console.error(err));
  
    // --- UPCOMING MOVIES: Load upcoming movies from the UPCOMING endpoint ---
    fetch('C:\Users\Anthony\Documents\movie room\public\video', apiOptions)
      .then(res => res.json())
      .then(data => {
        const movies = data.results;
        const movieGrid = document.getElementById("movieGrid");
        movies.forEach(movie => {
          const posterPath = movie.poster_path;
          const posterUrl = posterPath
            ? `public\image${posterPath}`
            : 'public\image';
          const movieCard = document.createElement("div");
          movieCard.classList.add("movie-card");
          movieCard.innerHTML = `
            <img src="${posterUrl}" alt="${movie.title}" />
            <div class="overlay">
              <h2>${movie.title}</h2>
              <div class="play-button" data-video="https://www.w3schools.com/html/mov_bbb.mp4">
                <i class="fas fa-play"></i> Play
              </div>
            </div>
          `;
          movieGrid.appendChild(movieCard);
        });
        // Add click event listeners for play buttons in upcoming movies
        const playButtons = document.querySelectorAll(".movie-card .play-button");
        playButtons.forEach(button => {
          button.addEventListener("click", () => {
            const videoUrl = button.getAttribute("data-video");
            if (videoUrl) {
              videoSource.src = videoUrl;
              videoPlayer.load();
              videoModal.style.display = "flex";
            }
          });
        });
      })
      .catch(err => console.error(err));
  
    // --- Close the Video Modal ---
    closeModal.addEventListener("click", () => {
      videoModal.style.display = "none";
      videoPlayer.pause();
    });
    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) {
        videoModal.style.display = "none";
        videoPlayer.pause();
      }
    });
  });
  