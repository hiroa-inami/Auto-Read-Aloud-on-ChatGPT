// ==UserScript==
// @name         Auto Read Aloud on ChatGPT
// @namespace    https://github.com/iha-hiroa/
// @copyright    MIT
// @version      0.1.1
// @description  Automatically clicks "Read aloud" buttons on chatgpt.com
// @author       hiroa
// @match        https://chatgpt.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chatgpt.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log(`Auto Read Aloud on ChatGPT: loaded`);

    const clickedButtons = new WeakSet();

    function checkAndClickButtons() {
        const buttons = document.querySelectorAll('button[aria-label="Read aloud"]');
        if (buttons.length > 0){
            let button = buttons[buttons.length - 1]
            if (clickedButtons.has(button)) return;
            button.click();
            clickedButtons.add(button);
        }
    }

    const interval = 1000; // Check every 1 second
    setInterval(checkAndClickButtons, interval);
})();
