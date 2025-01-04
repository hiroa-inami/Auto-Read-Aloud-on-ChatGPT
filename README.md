# Auto Read Aloud on ChatGPT
userscript that automatically clicks "Read aloud" buttons on chatgpt.com  

Tested 2024/11/30 on chrome/tampermonkey 
I'm using this script, bugfix will be quick but not guaranteed.  
Feel free to adjust/re-publish the script.

# How to install
1. Enable Developer mode in Extensions (chrome://extensions)  
   [Enabling Developer mode](https://www.tampermonkey.net/faq.php?locale=en#Q209) might take time. If you have already installed Tampermonkey, disable and re-enable it after enabling dev mode.
1. Install [Tampermonkey](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) 
1. Click [Install the script](https://github.com/hiroa-inami/Auto-Read-Aloud-on-ChatGPT/raw/refs/heads/main/main.user.js)
2. Go https://chatgpt.com/
3. Login ChatGPT to show "Read aloud" button

# How works
1. Every 1 second, check the element 'button[aria-label="Read aloud"]'
2. If find it, and it's not clicked before, click it.
```
(function() {
    // Initialize a Set to keep track of clicked button selectors
    const clickedButtons = new Set();

    // Function to find and click new buttons
    function checkAndClickButtons() {
        // Find all buttons with the specified aria-label
        const buttons = document.querySelectorAll('button[aria-label="Read aloud"]');

        buttons.forEach(button => {
            // Get the full selector for the button
            const selector = button;

            // Skip if the button was already clicked
            if (clickedButtons.has(selector)) return;

            // Click the button
            button.click();

            // Remember the button as clicked
            clickedButtons.add(selector);
        });
    }

    // Run the check periodically
    const interval = 1000; // Check every 1 second
    setInterval(checkAndClickButtons, interval);
})();
```
