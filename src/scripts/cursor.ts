const customCursor = document.getElementById('custom-cursor') as HTMLDivElement | null;

if (customCursor) {
  document.addEventListener('mousemove', (e: MouseEvent) => {
    const cursorSize = customCursor.offsetWidth / 2;

    customCursor.style.left = `${e.clientX + window.scrollX - cursorSize}px`;
    customCursor.style.top = `${e.clientY + window.scrollY - cursorSize}px`;
    customCursor.style.display = 'block';
  });

  document.addEventListener('mousedown', () => {
    customCursor.style.transform = 'scale(2)'; 
    customCursor.style.backgroundColor = 'var(--color-2)'; 
  });

  document.addEventListener('mouseup', () => {
    customCursor.style.transform = 'scale(1)'; 
    customCursor.style.backgroundColor = 'var(--color-1)';
  });

  const interactiveElements = ['a', 'button', 'input', 'textarea', '[role="button"]'];
  interactiveElements.forEach(selector => {
    const elements = document.querySelectorAll<HTMLElement>(selector);
    
    elements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        customCursor.style.transform = 'scale(1.5)';
        customCursor.style.backgroundColor = 'var(--color-3)'; 
      });
      element.addEventListener('mouseleave', () => {
        customCursor.style.transform = 'scale(1)';
        customCursor.style.backgroundColor = 'var(--color-1)';
        customCursor.style.display = 'block';
      });
    });
  });

  window.addEventListener('mouseout', (e: MouseEvent) => {
    if (!e.relatedTarget || (e.relatedTarget as HTMLElement).nodeName === "HTML") {
      customCursor.style.display = 'none'; 
    }
  });

  window.addEventListener('mouseenter', () => {
    customCursor.style.display = 'block';
  });
}