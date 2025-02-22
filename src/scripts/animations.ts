function animateElements(selector: string, className: string): void {
    const elements: NodeListOf<HTMLElement> = document.querySelectorAll(selector);
    elements.forEach((element: HTMLElement) => {
        element.classList.add(className);
    });
}

window.addEventListener('load', () => {
    try {
        animateElements('.main-container, .activity-container, .projects-page, .pc-spec, .footer', 'loaded'); // Option 2
    } catch (error) {
        console.error('Error applying entrance animations:', error);
    }
});