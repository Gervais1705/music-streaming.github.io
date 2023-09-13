const audioPlayer = document.getElementById('audio-player');
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const progressBar = document.getElementById('progress-bar');
const trackTitle = document.getElementById('track-title');
const fileInput = document.getElementById('file-input');

playButton.addEventListener('click', () => {
    audioPlayer.play();
});

pauseButton.addEventListener('click', () => {
    audioPlayer.pause();
});

audioPlayer.addEventListener('timeupdate', () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = `${progress}%`;
});

audioPlayer.addEventListener('play', () => {
    playButton.disabled = true;
    pauseButton.disabled = false;
    startFlyingEmojis();
});

audioPlayer.addEventListener('pause', () => {
    playButton.disabled = false;
    pauseButton.disabled = true;
    stopFlyingEmojis();
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const objectURL = URL.createObjectURL(file);
        audioPlayer.src = objectURL;
        trackTitle.textContent = file.name;
        audioPlayer.play();
    }
});

function startFlyingEmojis() {
    const emojisContainer = document.querySelector('.emojis');
    const emojis = ['🎵', '🎶', '🎼', '🎤', '🎸', '🎹', '🎷', '🥁'];

    const createEmoji = () => {
        const emoji = document.createElement('span');
        emoji.classList.add('emoji');
        emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = `${Math.random() * 100}vw`;
        emoji.style.animationDuration = `${Math.random() * 2 + 2}s`; 
        emojisContainer.appendChild(emoji);
        setTimeout(() => {
            emoji.remove();
        }, 4000);
    };

    const emojiInterval = setInterval(createEmoji, 300);

    setTimeout(() => {
        clearInterval(emojiInterval);
    }, audioPlayer.duration * 1000);
}

function stopFlyingEmojis() {
    const emojisContainer = document.querySelector('.emojis');
    emojisContainer.innerHTML = '';
}
