let currentAudio = null;

function playMedia(type, src, title = "Bhajan Audio") {
  const modal = document.getElementById("playerModal");
  const container = document.getElementById("playerContainer");

  container.innerHTML = "";

  /* VIDEO PLAYER (UNCHANGED) */
  if (type === "video") {
    container.innerHTML = `
      <video controls autoplay width="700">
        <source src="${src}" type="video/mp4">
      </video>
    `;
    modal.style.display = "flex";
    return;
  }

  /* CUSTOM AUDIO PLAYER */
  container.innerHTML = `
    <div class="audio-player">
      <h3>${title}</h3>

      <audio id="customAudio" src="${src}"></audio>

      <div class="controls">
        <button id="playPauseBtn">▶</button>
        <span id="currentTime">0:00</span>

        <input type="range" id="progressBar" value="0">

        <span id="duration">0:00</span>
      </div>
    </div>
  `;

  modal.style.display = "flex";

  setupAudioPlayer();
}

function setupAudioPlayer() {
  const audio = document.getElementById("customAudio");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const progressBar = document.getElementById("progressBar");
  const currentTimeEl = document.getElementById("currentTime");
  const durationEl = document.getElementById("duration");

  currentAudio = audio;

  playPauseBtn.onclick = () => {
    if (audio.paused) {
      audio.play();
      playPauseBtn.textContent = "⏸";
    } else {
      audio.pause();
      playPauseBtn.textContent = "▶";
    }
  };

  audio.onloadedmetadata = () => {
    progressBar.max = Math.floor(audio.duration);
    durationEl.textContent = formatTime(audio.duration);
  };

  audio.ontimeupdate = () => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTimeEl.textContent = formatTime(audio.currentTime);
  };

  progressBar.oninput = () => {
    audio.currentTime = progressBar.value;
  };
}

function closePlayer() {
  if (currentAudio) {
    currentAudio.pause();
  }
  document.getElementById("playerModal").style.display = "none";
  document.getElementById("playerContainer").innerHTML = "";
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}




