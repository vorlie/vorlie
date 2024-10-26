const toggleTheme = () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    console.log(`Theme changed to: ${newTheme}`);

    // Update the icon for both buttons
    const toggleButtons = [
        document.getElementById('themeToggle'),
        document.getElementById('themeToggle2')
    ];

    toggleButtons.forEach(button => {
        if (button) { // Null check
            const icon = button.querySelector('i') as HTMLElement;
            icon.className = newTheme === 'dark' ? 'bi bi-lightbulb' : 'bi bi-lightbulb-fill';
        }
    });
};

// Function to initialize the theme from localStorage
const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark theme
    document.body.setAttribute('data-theme', savedTheme);

    // Set the initial icon for both buttons
    const toggleButtons = [
        document.getElementById('themeToggle'),
        document.getElementById('themeToggle2')
    ];

    toggleButtons.forEach(button => {
        if (button) { // Null check
            const icon = button.querySelector('i') as HTMLElement;
            icon.className = savedTheme === 'dark' ? 'bi bi-lightbulb' : 'bi bi-lightbulb-fill';
        }
    });
};

// Initialize the theme on page load
initializeTheme();
const themeToggle1 = document.getElementById('themeToggle');
const themeToggle2 = document.getElementById('themeToggle2');

if (themeToggle1) {
    themeToggle1.addEventListener('click', toggleTheme);
}

if (themeToggle2) {
    themeToggle2.addEventListener('click', toggleTheme);
}
