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
        },
        {
            title: "Deadly Guns & Dimitri K - Drunk At The Rave",
            source: "/audio/deadlyguns-dimitrik-drunk_at_the_rave.aac"
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

    function hexToRgb(hex: string) {
        // Convert hex color to RGB
        const bigint = parseInt(hex.slice(1), 16);
        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255,
        };
    }
    
    function renderVisualizer() {
        requestAnimationFrame(renderVisualizer);
        analyzer.getByteFrequencyData(dataArray);
        canvasContext.clearRect(0, 0, visualizer.width, visualizer.height);
    
        const barWidth = 6;
        const barHeightFactor = visualizer.height / 255;
    
        // Determine current theme
        const rootElement = document.documentElement;
        const rootStyles = getComputedStyle(rootElement);
    
        // Fetch theme-specific variables
        const accentLightRgb = hexToRgb(rootStyles.getPropertyValue('--color-accent-light').trim());
        const accentDarkRgb = hexToRgb(rootStyles.getPropertyValue('--color-accent-dark').trim());
        const accentExtraRgb = hexToRgb(rootStyles.getPropertyValue('--color-accent-extra').trim());
    
        for (let i = 0; i < dataArray.length; i++) {
            const barHeight = dataArray[i] * barHeightFactor;
    
            // Mix colors dynamically (example logic)
            const red = Math.min(accentLightRgb.r + barHeight / 2, 255);
            const green = Math.min(accentDarkRgb.g + barHeight / 4, 255);
            const blue = Math.min(accentExtraRgb.b + barHeight / 6, 255);
    
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
