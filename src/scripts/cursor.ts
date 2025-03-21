document.addEventListener('DOMContentLoaded', () => {
  const customCursor = document.getElementById('custom-cursor') as HTMLDivElement;
  const customCursorOutline = document.getElementById('custom-cursor-outline') as HTMLDivElement;
  const cursorToggleBtn = document.getElementById('cursorToggle') as HTMLButtonElement;
  const cursorIcon = cursorToggleBtn.querySelector('i');

  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;

  let cursorVisible = localStorage.getItem('cursorVisible') !== 'false';

  // Apply initial visibility state
  if (!cursorVisible) {
    customCursor.classList.add('cursor-hidden');
    customCursorOutline.classList.add('cursor-hidden');
    cursorIcon?.classList.replace('bi-cursor', 'bi-cursor-fill');
  }

  if (customCursor && customCursorOutline) {
    document.addEventListener('mousemove', (e: MouseEvent) => {
      const cursorSize = customCursor.offsetWidth / 2;
      mouseX = e.clientX + window.scrollX;
      mouseY = e.clientY + window.scrollY;

      if (cursorVisible) {
        customCursor.style.left = `${mouseX - cursorSize}px`;
        customCursor.style.top = `${mouseY - cursorSize}px`;
      }
    });

    cursorToggleBtn.addEventListener('click', () => {
      cursorVisible = !cursorVisible;

      // Toggle display for both cursors
      customCursor.classList.toggle('cursor-hidden', !cursorVisible);
      customCursorOutline.classList.toggle('cursor-hidden', !cursorVisible);

      // Toggle icon class between cursor and cursor-fill
      if (cursorIcon) {
        cursorIcon.classList.toggle('bi-cursor-fill', !cursorVisible);
        cursorIcon.classList.toggle('bi-cursor', cursorVisible);
      }

      // Save the current state to localStorage
      localStorage.setItem('cursorVisible', cursorVisible.toString());
    });

    document.addEventListener('mousedown', () => {
      customCursor.style.transform = 'scale(2)';
      customCursor.style.backgroundColor = 'var(--color-accent-extra)';

      customCursorOutline.style.transform = 'scale(2)';
      customCursorOutline.style.borderColor = 'var(--color-accent-extra)';
    });

    document.addEventListener('mouseup', () => {
      customCursor.style.transform = 'scale(1)';
      customCursor.style.backgroundColor = 'var(--color-accent-light)';

      customCursorOutline.style.transform = 'scale(1)';
      customCursorOutline.style.borderColor = 'var(--color-accent-light)';
    });

    const interactiveElements = ['a', 'button', 'input', 'textarea', '[role="button"]'];
    interactiveElements.forEach(selector => {
      const elements = document.querySelectorAll<HTMLElement>(selector);
      
      elements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          customCursor.style.transform = 'scale(1.5)';
          customCursor.style.backgroundColor = 'var(--color-accent-extra)';
          customCursor.style.opacity = '0.5';

          customCursorOutline.style.transform = 'scale(1.5)';
          customCursorOutline.style.borderColor = 'var(--color-accent-extra)';
          customCursorOutline.style.opacity = '0.5';

        });
        element.addEventListener('mouseleave', () => {
          customCursor.style.transform = 'scale(1)';
          customCursor.style.backgroundColor = 'var(--color-accent-light)';
          customCursor.style.opacity = '1';

          customCursorOutline.style.transform = 'scale(1)';
          customCursorOutline.style.borderColor = 'var(--color-accent-light)';
          customCursorOutline.style.opacity = '1';
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
