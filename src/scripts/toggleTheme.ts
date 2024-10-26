const toggleTheme = () => {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    console.log(`Theme changed to: ${newTheme}`);

    const toggleButton = document.getElementById('themeToggle') as HTMLButtonElement;

    // Update the icon based on the theme
    const icon = toggleButton.querySelector('i') as HTMLElement;
    icon.className = newTheme === 'dark' ? 'bi bi-lightbulb' : 'bi bi-lightbulb-fill';
};

// Function to initialize the theme from localStorage
const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark theme
    document.body.setAttribute('data-theme', savedTheme);

    const toggleButton = document.getElementById('themeToggle') as HTMLButtonElement;

    // Set the initial icon based on the saved theme
    const icon = toggleButton.querySelector('i') as HTMLElement;
    icon.className = savedTheme === 'dark' ? 'bi bi-lightbulb' : 'bi bi-lightbulb-fill';
};

// Initialize the theme on page load
initializeTheme();
document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
