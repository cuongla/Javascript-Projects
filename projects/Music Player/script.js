const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

// Music 
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design',
        musicUrl: 'https://res.cloudinary.com/dqm3b7avx/video/upload/v1640667408/Javascript%20Projects/Music%20Player/jacinto-1_s7md62.mp3',
        imageUrl: 'https://res.cloudinary.com/dqm3b7avx/image/upload/v1640664948/Javascript%20Projects/Music%20Player/jacinto-1_b1zl6r.jpg'
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design',
        musicUrl: 'https://res.cloudinary.com/dqm3b7avx/video/upload/v1640667443/Javascript%20Projects/Music%20Player/jacinto-2_bqjwyn.mp3',
        imageUrl: 'https://res.cloudinary.com/dqm3b7avx/image/upload/v1640664948/Javascript%20Projects/Music%20Player/jacinto-2_i3zxfu.jpg'
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design',
        musicUrl: 'https://res.cloudinary.com/dqm3b7avx/video/upload/v1640667462/Javascript%20Projects/Music%20Player/jacinto-3_hf3ovc.mp3',
        imageUrl: 'https://res.cloudinary.com/dqm3b7avx/image/upload/v1640664948/Javascript%20Projects/Music%20Player/jacinto-3_mxsyiu.jpg'
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design',
        musicUrl: 'https://res.cloudinary.com/dqm3b7avx/video/upload/v1640667457/Javascript%20Projects/Music%20Player/metric-1_svyizy.mp3',
        imageUrl: 'https://res.cloudinary.com/dqm3b7avx/image/upload/v1640664947/Javascript%20Projects/Music%20Player/metric-1_l9exjf.jpg'
    }
]

// Check if playing
let isPlaying = false;

// Play Song
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause Song
function stopSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause event listener
playBtn.addEventListener('click', () => isPlaying ? stopSong() : playSong());

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = song.musicUrl;
    image.src = song.imageUrl;
}

// Current Song 
let songIndex = 0;

// On Load - Select First Song
loadSong(songs[songIndex]);

// Prev Song 
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Calculate play time
function calculatePlaytime() {

}

// Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
        // Delay switching duration Element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        }
        // Calculate display for current
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
}

function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener('click', setProgressBar)