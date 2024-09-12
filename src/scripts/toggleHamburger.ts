let isPopoverVisible = false;

// Function to toggle the blur effect and visibility
const toggleVisibility = (isVisible: boolean) => {
  const backdrop = document.getElementById('backdrop') as HTMLDivElement;
  const content = document.querySelector('body') as HTMLBodyElement;
  const invisibleCloseButton = document.getElementById('invisible-close-button') as HTMLDivElement;
  const popover = document.getElementById('nav-hamburgertarget') as HTMLDivElement;

  if (isVisible) {
    backdrop.style.display = 'block'; // Show backdrop
    invisibleCloseButton.style.display = 'block'; // Show invisible close button
    content.style.filter = 'blur(5px)'; // Apply blur effect
    content.style.overflow = 'hidden'; // Disable scrolling on body
    popover.classList.add('visible'); // Show popover with fade-in
  } else {
    backdrop.style.display = 'none'; // Hide backdrop
    invisibleCloseButton.style.display = 'none'; // Hide invisible close button
    content.style.filter = 'none'; // Remove blur effect
    content.style.overflow = ''; // Restore scrolling on body
    popover.classList.remove('visible'); // Hide popover with fade-out
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('nav-hamburger') as HTMLButtonElement;
  const popover = document.getElementById('nav-hamburgertarget') as HTMLDivElement;
  const invisibleCloseButton = document.getElementById('invisible-close-button') as HTMLDivElement;

  if (hamburger && popover && invisibleCloseButton) {
    hamburger.addEventListener('click', () => {
      isPopoverVisible = !isPopoverVisible;
      toggleVisibility(isPopoverVisible); // Toggle popover visibility and blur effect
    });

    // Close popover if clicking outside of it
    document.addEventListener('click', (event: MouseEvent) => {
      if (isPopoverVisible && !popover.contains(event.target as Node) && !hamburger.contains(event.target as Node)) {
        isPopoverVisible = false;
        toggleVisibility(false); // Hide popover and remove blur effect
      }
    });

    // Close popover if clicking on the invisible close button
    invisibleCloseButton.addEventListener('click', () => {
      if (isPopoverVisible) {
        isPopoverVisible = false;
        toggleVisibility(false); // Hide popover and remove blur effect
      }
    });
  }
});
