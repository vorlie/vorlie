function animateOnIntersection(selector: string, className: string): void {
    const elements: NodeListOf<HTMLElement> = document.querySelectorAll(selector);
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(className);
            // observer.unobserve(entry.target); // Keep observing to handle when it goes out of view
          } else {
            entry.target.classList.remove(className); // Revert to initial state
          }
        });
      },
      {
        threshold: 0.25, // Trigger when 10% of the element is visible
      },
    );
  
    elements.forEach((element: HTMLElement) => {
      observer.observe(element);
    });
  }
  
  window.addEventListener('load', () => {
    try {
      animateOnIntersection(
        '.main-container, .activity-container, .projects-page, .pc-spec, .footer',
        'loaded',
      );
    } catch (error) {
      console.error('Error applying entrance animations:', error);
    }
  });
  