// Helper functions
function closePopup() {
  document.getElementById("uploadPopup").style.display = "none";
  document.getElementById("youtubeFields").style.display = "none";
}

function showYouTubeFields() {
  document.getElementById("youtubeFields").style.display = "block";
}

function uploadYouTubeVideo(section) {
  const videoId = document.getElementById("youtubeId").value.trim();
  if (videoId) {
    const videoData = { id: videoId };
    const storageKey =
      section === 'entertainment' ? 'entertainmentVideos' :
      section === 'biblestudy' ? 'biblestudyVideos' :
      'sermonVideos';

    let videos = JSON.parse(localStorage.getItem(storageKey)) || [];
    videos.push(videoData);
    localStorage.setItem(storageKey, JSON.stringify(videos));

    renderUploadedVideos(section);
    closePopup();
  } else {
    alert("Please enter a YouTube video ID.");
  }
}

function renderUploadedVideos(section) {
  const storageKey =
    section === 'entertainment' ? 'entertainmentVideos' :
    section === 'biblestudy' ? 'biblestudyVideos' :
    'sermonVideos';

  const galleryClass = section === 'entertainment' ? '.image-gallery' : '.video-grid';
  const gallery = document.querySelector(galleryClass);
  if (!gallery) return;

  gallery.innerHTML = ''; // Clear existing content first

  const videos = JSON.parse(localStorage.getItem(storageKey)) || [];

  videos.forEach(video => {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${video.id}`;
    iframe.allowFullscreen = true;
    iframe.style.width = "100%";
    iframe.style.height = "315px";
    iframe.style.marginTop = "15px";
    iframe.style.border = "none";
    iframe.style.borderRadius = "10px";
    gallery.appendChild(iframe);
  });
}

// Event Listeners
document.getElementById("homeBtn").addEventListener("click", function () {
  const content = document.getElementById("content-area");
  content.innerHTML = `
    <h2>About Us</h2>
    <p>
      The Church of God 7th Day observes and practices the divine scriptures
      as contained in the Holy book. This article gives an account of how
      the Church Of God Seventh-day in Kenya was born.
    </p>
    <p>
      Established following missionary work by Andrew N. Dugger through Elder Shoemaker in 1970.
      We continue to preach through Bible tracts and open-air meetings.
    </p>
  `;
});

// Sermons
document.getElementById("sermonsBtn").addEventListener("click", function () {
  const content = document.getElementById("content-area");
  content.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h2>Sermons LIVE</h2>
      <button id="uploadTrigger" style="margin-left: auto;">⬆️ Upload</button>
    </div>
    <div class="video-grid"></div>
    <div id="uploadPopup" class="popup" style="display: none;">
      <div class="popup-content">
        <h3>Upload to Sermons</h3>
        <p>Do you want to upload a YouTube video?</p>
        <button onclick="showYouTubeFields()">Yes</button>
        <button onclick="closePopup()">No</button>

        <div id="youtubeFields" style="display: none; margin-top: 15px;">
          <label>YouTube Video ID:</label>
          <input type="text" id="youtubeId" placeholder="Enter YouTube ID" />
          <button style="margin-top:10px;" onclick="uploadYouTubeVideo('sermons')">Upload</button>
        </div>
      </div>
    </div>
  `;
  document.getElementById("uploadTrigger").addEventListener("click", function () {
    document.getElementById("uploadPopup").style.display = "block";
  });
  renderUploadedVideos('sermons');
});

// Entertainment
document.getElementById("entertainmentBtn").addEventListener("click", function () {
  const content = document.getElementById("content-area");
  content.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h2>🎬 Entertainment</h2>
      <button id="uploadTrigger" style="margin-left: auto;">⬆️ Upload</button>
    </div>
    <p>Enjoy our collection of entertaining moments, concerts, and highlights.</p>
    <div class="image-gallery"></div>
    <div id="uploadPopup" class="popup" style="display: none;">
      <div class="popup-content">
        <h3>Upload to Entertainment</h3>
        <p>Do you want to upload a YouTube video?</p>
        <button onclick="showYouTubeFields()">Yes</button>
        <button onclick="closePopup()">No</button>

        <div id="youtubeFields" style="display: none; margin-top: 15px;">
          <label>YouTube Video ID:</label>
          <input type="text" id="youtubeId" placeholder="Enter YouTube ID" />
          <button style="margin-top:10px;" onclick="uploadYouTubeVideo('entertainment')">Upload</button>
        </div>
      </div>
    </div>
  `;
  document.getElementById("uploadTrigger").addEventListener("click", function () {
    document.getElementById("uploadPopup").style.display = "block";
  });
  renderUploadedVideos('entertainment');
});

// Bible Study
document.getElementById("bibleStudyBtn").addEventListener("click", function () {
  const content = document.getElementById("content-area");
  content.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h2>📖 Bible Study</h2>
      <button id="uploadTrigger" style="margin-left: auto;">⬆️ Upload</button>
    </div>
    <div class="video-grid"></div>
    <div id="uploadPopup" class="popup" style="display: none;">
      <div class="popup-content">
        <h3>Upload to Bible Study</h3>
        <p>Do you want to upload a YouTube video?</p>
        <button onclick="showYouTubeFields()">Yes</button>
        <button onclick="closePopup()">No</button>

        <div id="youtubeFields" style="display: none; margin-top: 15px;">
          <label>YouTube Video ID:</label>
          <input type="text" id="youtubeId" placeholder="Enter YouTube ID" />
          <button style="margin-top:10px;" onclick="uploadYouTubeVideo('biblestudy')">Upload</button>
        </div>
      </div>
    </div>
  `;
  document.getElementById("uploadTrigger").addEventListener("click", function () {
    document.getElementById("uploadPopup").style.display = "block";
  });
  renderUploadedVideos('biblestudy');
});

// Firebase setup (if you're using it)
const firebaseConfig = {
  apiKey: "YOUR-API-KEY",
  authDomain: "YOUR.firebaseapp.com",
  databaseURL: "https://YOUR.firebaseio.com",
  projectId: "YOUR-ID",
  storageBucket: "YOUR.appspot.com",
  messagingSenderId: "SENDER-ID",
  appId: "APP-ID"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Toggle navigation (if needed)
function toggleNav() {
  var nav = document.getElementById("mobileNav");
  if (nav) {
    nav.classList.toggle("active");
  }
}