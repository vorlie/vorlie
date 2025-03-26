document.addEventListener('DOMContentLoaded', () => {
  const lockIcons = document.querySelectorAll('.auth-lock'); // Select all lock icons

  lockIcons.forEach(lockIcon => {
    const authElement = lockIcon.closest('.auth');
    const method = authElement.getAttribute('data-method'); // Get HTTP method
    const apiType = authElement.getAttribute('data-api'); // Get API type (users, actions)

    const tooltip = document.createElement('div'); // Create a tooltip for each lock
    tooltip.classList.add('tooltip');

    // Determine API key based on data-api
    let apiKey = "YOUR_API_KEY";
    if (apiType === "actions") {
      apiKey = "YOUR_ACTIONS_API_KEY";
    }

    // Define headers based on the method type
    let headers = `<pre><code class="language-bash">Authorization: Bearer ${apiKey}</code></pre>`;
    if (method === "PUT" || method === "POST") {
      headers = `<pre><code class="language-bash">Authorization: Bearer ${apiKey}
Content-Type: application/json</code></pre>`;
    }

    tooltip.innerHTML = `
      <p class="exp"><strong>Required Headers:</strong></p>
      <div class="bash-sample">${headers}</div>
    `;
    document.body.appendChild(tooltip); // Append tooltip to the body

    // Show tooltip on hover
    lockIcon.addEventListener('mouseenter', (e) => {
      tooltip.classList.add('active');

      // Position tooltip near the hovered lock icon
      const rect = lockIcon.getBoundingClientRect();
      tooltip.style.position = "absolute";
      tooltip.style.top = `${rect.bottom + window.scrollY}px`;
      tooltip.style.left = `${rect.left + window.scrollX}px`;
    });

    // Hide tooltip when the cursor leaves the icon or tooltip
    lockIcon.addEventListener('mouseleave', () => {
      tooltip.classList.remove('active');
    });

    tooltip.addEventListener('mouseleave', () => {
      tooltip.classList.remove('active');
    });
  });
});
