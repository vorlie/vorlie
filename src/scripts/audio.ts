// audio.ts
document.addEventListener("DOMContentLoaded", () => {
    const audioPlayer = document.getElementById("audioPlayer") as HTMLAudioElement;
    const playButton = document.getElementById("playButton") as HTMLButtonElement;
    const pauseButton = document.getElementById("pauseButton") as HTMLButtonElement;
    const muteButton = document.getElementById("muteButton") as HTMLButtonElement;
    const previousButton = document.getElementById("previousButton") as HTMLButtonElement;
    const nextButton = document.getElementById("nextButton") as HTMLButtonElement;
    const seekBar = document.getElementById("seekBar") as HTMLInputElement;
    const volumeBar = document.getElementById("volumeBar") as HTMLInputElement;
    const visualizer = document.getElementById('visualizer') as HTMLCanvasElement;
    const songTitle = document.getElementById("songTitle") as HTMLParagraphElement;
    const canvasContext = visualizer.getContext('2d')!;

    let audioContext: AudioContext;
    let analyzer: AnalyserNode;
    let source: MediaElementAudioSourceNode;
    let dataArray: Uint8Array;
    let currentTrackIndex = 0;

    const playlist =  [
        {
            title: "Ray Volpe - Song Request",
            source: "/audio/rayvolpe-songrequest.aac"
        },
        {
            title: "Eliminate - BREAKSH!T",
            source: "/audio/eliminate-breakshit.aac"
        },
        {
            title: "PinocchioP - Loveit",
            source: "/audio/pinocchiop-loveit.aac"
        }
    ];
    function initializeAudioContext() {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyzer = audioContext.createAnalyser();
        source = audioContext.createMediaElementSource(audioPlayer);
        source.connect(analyzer);
        analyzer.connect(audioContext.destination);
        analyzer.fftSize = 256;
        const bufferLength = analyzer.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        renderVisualizer();
    }
    playButton.addEventListener("click", function () {
        if (audioPlayer.src) {
            audioPlayer.play();
            if (!audioContext) {
                initializeAudioContext();
            }
        } else {
            playTrack(currentTrackIndex);
        }
    });
    
    function playTrack(index: number) {
        if (index >= 0 && index < playlist.length) {
            audioPlayer.src = playlist[index].source;
            audioPlayer.load();
            audioPlayer.play();
            if (!audioContext) {
                initializeAudioContext();
            }
            updateTrackInfo(index);
        }
    }
    function updateTrackInfo(index: number) {
        seekBar.value = "0";
        const trackTitle = playlist[index].title;
        songTitle.textContent = trackTitle;

    }

    previousButton.addEventListener("click", function () {
        currentTrackIndex--;
        if (currentTrackIndex < 0) {
            currentTrackIndex = playlist.length - 1; 
        }
        playTrack(currentTrackIndex);
    });

    nextButton.addEventListener("click", function () {
        currentTrackIndex++;
        if (currentTrackIndex >= playlist.length) {
            currentTrackIndex = 0; 
        }
        playTrack(currentTrackIndex);
    });
    pauseButton.addEventListener('click', () => {
        audioPlayer.pause();
    });

    muteButton.addEventListener('click', () => {
        audioPlayer.muted = !audioPlayer.muted;
        muteButton.textContent = audioPlayer.muted ? 'Unmute' : 'Mute';
    });

    seekBar.addEventListener('input', () => {
        const seekTime = audioPlayer.duration * (seekBar.valueAsNumber / 100);
        audioPlayer.currentTime = seekTime;
    });

    audioPlayer.addEventListener('timeupdate', () => {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        seekBar.value = progress.toString();
    });

    volumeBar.addEventListener('input', () => {
        audioPlayer.volume = volumeBar.valueAsNumber;
    });

    function renderVisualizer() {
        requestAnimationFrame(renderVisualizer);
        analyzer.getByteFrequencyData(dataArray);
        canvasContext.clearRect(0, 0, visualizer.width, visualizer.height);
        
        const barWidth = 6;
        const barHeightFactor = visualizer.height / 255;
    
        for (let i = 0; i < dataArray.length; i++) {
            const barHeight = dataArray[i] * barHeightFactor;
    
            const red = barHeight + 100;
            const green = 65;
            const blue = 96;
    
            canvasContext.fillStyle = `rgb(${red}, ${green}, ${blue})`;
            canvasContext.fillRect(
                i * barWidth, 
                visualizer.height - barHeight, 
                barWidth, 
                barHeight
            );
        }
    }
});
