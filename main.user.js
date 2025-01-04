// ==UserScript==
// @name         Auto Read Aloud on ChatGPT
// @namespace    https://github.com/iha-hiroa/
// @copyright    MIT
// @version      0.2
// @description  Automatically clicks "Read aloud" buttons on chatgpt.com
// @author       hiroa
// @match        https://chatgpt.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chatgpt.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const playedTurns = []
    let talkingTurn = null
    const PARSE_INTERVAL = 400;

    function getGptTurns(){
        const h6Elements = document.querySelectorAll('h6.sr-only');
        const saidElements = Array.from(h6Elements).filter(heading => {
            return heading.textContent.trim() === "ChatGPT said:";
        });
        const gptTurns = saidElements.map(element => {
            return element.parentElement;
        });
        return gptTurns
    }

    function getNewTurn(){
        const gptTurns = getGptTurns();
        for (const [i, turn] of gptTurns.entries()) {
            if (!playedTurns.includes(turn)){
                return turn
            }
        }
    }

    function getTalkButton(turn){
        return turn.querySelector('button[aria-label="Read aloud"]')
    }

    function letGptTalk(turn){
        if(!turn){return}
        if(talkingTurn){return}
        const button = getTalkButton(turn)
        if(!button){return}

        button.click()
        talkingTurn = turn
        playedTurns.push(turn)
    }

    function checkTalkIsFinished(turn){
        if (turn === null){return}
        const button = getTalkButton(turn)
        if(button){
            talkingTurn = null
        }
    }

    function parseMain(){
        if (talkingTurn){ checkTalkIsFinished(talkingTurn) }
        const newTurn = getNewTurn()
        if (newTurn) {letGptTalk(newTurn)}
    }

    function init(){
        console.log("init: Auto Read Aloud on ChatGPT")
        playedTurns.push(...getGptTurns())
        setInterval(parseMain, PARSE_INTERVAL)
    }

    setTimeout(init, 3000);
})();
