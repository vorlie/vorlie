document.addEventListener('DOMContentLoaded', () => {
    const copyButton = document.getElementById('copyButton');
    const copyNotification = document.getElementById('copyNotification');

    if (copyButton) {
        copyButton.addEventListener('click', async () => {
            console.log('Button clicked');
            const iframeCode = '<a href="https://vorlie.pl/" target="_blank"><img src="https://vorlie.pl/images/vorlie.png" alt="vorlie button" width="88" height="31" loading="lazy" /></a>';
            try {
                if (navigator.clipboard) {
                    await navigator.clipboard.writeText(iframeCode);
                    console.log('Copied to clipboard using navigator.clipboard');
                } else {
                    // Fallback for browsers without clipboard support
                    const textArea = document.createElement("textarea");
                    textArea.value = iframeCode;
                    textArea.style.position = 'fixed';
                    textArea.style.top = '-1000px';
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    document.execCommand("copy");
                    document.body.removeChild(textArea);
                    console.log('Copied to clipboard using fallback method');
                }
                if (copyNotification) {
                    copyNotification.style.display = 'block';
                    setTimeout(() => {
                        copyNotification.style.display = 'none';
                    }, 2000);
                }
            } catch (error) {
                console.error('Failed to copy iframe code: ', error);
            }
        });
    }
});