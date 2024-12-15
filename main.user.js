// ==UserScript==
// @name         Auto Read Aloud on ChatGPT
// @namespace    https://github.com/iha-hiroa/
// @copyright    MIT
// @version      0.1
// @description  Automatically clicks "Read aloud" buttons on chatgpt.com
// @author       hiroa
// @match        https://chatgpt.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chatgpt.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log(`Auto Read Aloud on ChatGPT: loaded`);

    // Initialize a Set to keep track of clicked button selectors
    const clickedButtons = new WeakSet();

    // Function to find and click new buttons
    function checkAndClickButtons() {
        // console.log(`Auto Click Read Aloud on ChatGPT: Checking`);

        // Find all buttons with the specified aria-label
        const buttons = document.querySelectorAll('button[aria-label="Read aloud"]');

        buttons.forEach(button => {
            // Get the full selector for the button
            const selector = button;

            // Skip if the button was already clicked
            if (clickedButtons.has(selector)) return;

            // Click the button
            button.click();
            // console.log(`Auto Click Read Aloud on ChatGPT: Clicked`);

            // Remember the button as clicked
            clickedButtons.add(selector);
        });
    }

    // Run the check periodically
    const interval = 1000; // Check every 1 second
    setInterval(checkAndClickButtons, interval);
})();
