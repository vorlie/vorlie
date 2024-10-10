document.addEventListener('DOMContentLoaded', () => {
  const customCursor = document.getElementById('custom-cursor') as HTMLDivElement;
  const customCursorOutline = document.getElementById('custom-cursor-outline') as HTMLDivElement;
  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;

  if (customCursor && customCursorOutline) {
    document.addEventListener('mousemove', (e: MouseEvent) => {
      const cursorSize = customCursor.offsetWidth / 2;
      mouseX = e.clientX + window.scrollX;
      mouseY = e.clientY + window.scrollY;

      customCursor.style.left = `${mouseX - cursorSize}px`;
      customCursor.style.top = `${mouseY - cursorSize}px`;
    });

    document.addEventListener('mousedown', () => {
      customCursor.style.transform = 'scale(2)';
      customCursor.style.backgroundColor = 'var(--color-sapphire)';

      customCursorOutline.style.transform = 'scale(2)';
      customCursorOutline.style.borderColor = 'var(--color-sapphire)';
    });

    document.addEventListener('mouseup', () => {
      customCursor.style.transform = 'scale(1)';
      customCursor.style.backgroundColor = 'var(--color-lavender)';

      customCursorOutline.style.transform = 'scale(1)';
      customCursorOutline.style.borderColor = 'var(--color-lavender)';
    });

    const interactiveElements = ['a', 'button', 'input', 'textarea', '[role="button"]'];
    interactiveElements.forEach(selector => {
      const elements = document.querySelectorAll<HTMLElement>(selector);
      
      elements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          customCursor.style.transform = 'scale(1.5)';
          customCursor.style.backgroundColor = 'var(--color-sapphire)';

          customCursorOutline.style.transform = 'scale(1.5)';
          customCursorOutline.style.borderColor = 'var(--color-sapphire)';
        });
        element.addEventListener('mouseleave', () => {
          customCursor.style.transform = 'scale(1)';
          customCursor.style.backgroundColor = 'var(--color-lavender)';

          customCursorOutline.style.transform = 'scale(1)';
          customCursorOutline.style.borderColor = 'var(--color-lavender)';
        });
      });
    });

    // Function to move the outline with a delay
    function animateOutline() {
      outlineX += (mouseX - outlineX) * 0.1;
      outlineY += (mouseY - outlineY) * 0.1;

      const outlineSize = customCursorOutline.offsetWidth / 2;
      customCursorOutline.style.left = `${outlineX - outlineSize}px`;
      customCursorOutline.style.top = `${outlineY - outlineSize}px`;

      requestAnimationFrame(animateOutline);
    }

    animateOutline();
  }
});
