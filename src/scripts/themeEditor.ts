type Theme = Record<string, string>;

const defaultTheme: Theme = {
    '--color-bg-dark': '#1e1e2e',
    '--color-bg-dark-alpha': '#1e1e2e',
    '--color-bg-darker': '#11111b',
    '--color-bg-darker-alpha': '#11111b',
    '--color-bg-medium': '#313244',
    '--color-bg-medium-alpha': '#313244',
    '--color-bg-light': '#45475a',
    '--color-bg-light-alpha': '#45475a',
    '--color-border': '#45475a',
    '--color-text': '#cdd6f4',
    '--color-placeholder': '#a6adc8',
    '--color-hover': '#313244',
    '--color-hover-light': '#45475a',
    '--color-close-hover': '#f38ba8',
    '--color-scrollbar-bg': '#2e3440',
    '--color-scrollbar-thumb': '#4c566a',
    '--color-scrollbar-thumb-hover': '#5e81ac',
    '--color-button-download': '#b4befe',
    '--color-button-download-hover': '#e3e7ff',
    '--color-button-download-text': '#11111b'
};

function loadTheme(): Theme {
    return { ...defaultTheme };
}

let theme: Theme = loadTheme();

document.addEventListener("DOMContentLoaded", () => {
    console.log("Page loaded, applying theme...");
    console.log(theme); // Debugging

    applyTheme(theme);
    generateInputs();

    document.getElementById("importThemeButton")?.addEventListener("click", () => {
        (document.getElementById("importTheme") as HTMLInputElement).click();
    });

    document.getElementById("importTheme")?.addEventListener("change", importTheme);
    document.getElementById("exportThemeButton")?.addEventListener("click", exportTheme);
    document.getElementById("resetThemeButton")?.addEventListener("click", resetTheme);
});

function applyTheme(theme: Theme): void {
    const preview = document.getElementById("theme-preview");
    
    if (!preview) {
        console.error("theme-preview element not found!");
        return;
    }

    console.log("Applying theme to preview...", theme); // Debugging

    Object.keys(theme).forEach((key) => {
        preview.style.setProperty(key, theme[key]);
        document.documentElement.style.setProperty(key, theme[key]);
    });

    // Save theme to localStorage
    localStorage.setItem("theme", JSON.stringify(theme));
}

function generateInputs(): void {
    const container = document.getElementById("themeInputs");
    if (!container) return;

    container.innerHTML = "";

    Object.keys(theme).forEach((key) => {
        const div = document.createElement("div");
        div.classList.add("theme-input");

        const label = document.createElement("label");
        label.textContent = key;

        const inputContainer = document.createElement("div");
        inputContainer.classList.add("input-container");

        const colorInput = document.createElement("input");
        colorInput.type = "color";
        colorInput.value = theme[key];
        colorInput.addEventListener("input", (e) => {
            const value = (e.target as HTMLInputElement).value;
            updateTheme(key, value);
            div.style.backgroundColor = value;
        });

        const textInput = document.createElement("input");
        textInput.type = "text";
        textInput.value = theme[key];
        textInput.addEventListener("input", (e) => {
            const value = (e.target as HTMLInputElement).value;
            updateTheme(key, value);
            div.style.backgroundColor = value;
        });

        inputContainer.appendChild(colorInput);
        inputContainer.appendChild(textInput);
        div.appendChild(label);
        div.appendChild(inputContainer);
        container.appendChild(div);
    });
}

function updateTheme(key: string, value: string): void {
    theme[key] = value;
    applyTheme(theme);
}

function resetTheme(): void {
    theme = { ...defaultTheme };
    applyTheme(theme);
    generateInputs();
}

function importTheme(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (!fileInput.files || fileInput.files.length === 0) return;

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        try {
            theme = JSON.parse(reader.result as string);
            applyTheme(theme);
            generateInputs();
        } catch (e) {
            alert("Invalid theme file.");
        }
    };

    reader.readAsText(file);
}

function exportTheme(): void {
    const nameInput = document.getElementById("themeNameInput") as HTMLInputElement;
    if (!nameInput || !nameInput.value.trim()) {
        alert("Please enter a theme name before exporting.");
        return;
    }

    const themeName = nameInput.value.trim();
    const themeData = { [themeName]: theme };

    const blob = new Blob([JSON.stringify(themeData, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${themeName}.json`;
    a.click();
}