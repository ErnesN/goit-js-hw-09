!function(){var t={startButton:document.querySelector("button[data-start]"),stopButton:document.querySelector("button[data-stop]")};t.startButton.addEventListener("click",(function(){timerId=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)})),t.stopButton.setAttribute("disabled",!0),t.startButton.addEventListener("click",(function(){t.startButton.setAttribute("disabled",!0),t.stopButton.removeAttribute("disabled")})),t.stopButton.addEventListener("click",(function(){clearInterval(timerId)})),t.stopButton.addEventListener("click",(function(){t.startButton.removeAttribute("disabled"),t.stopButton.setAttribute("disabled",!0)}))}();
//# sourceMappingURL=01-color-switcher.209bd0c5.js.map