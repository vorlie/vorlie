// clock.ts
function updateClock() {
    const now = new Date();
    const clock = document.getElementById('clock');
    if (clock) {
        clock.textContent = now.toLocaleTimeString();
    }
}

setInterval(updateClock, 1000);