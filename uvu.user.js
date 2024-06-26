// ==UserScript==
// @name     ppf_theme_with_gradient
// @grant    GM_addStyle
// @run-at   document-start
// @author   vamtic:
// @include  https://pixelplanet.fun/*
// ==/UserScript==

(function() {
    // Create the UI for color selection
    const pickerContainer = document.createElement('div');
    pickerContainer.style.position = 'fixed';
    pickerContainer.style.left = '10px';
    pickerContainer.style.top = '50%';
    pickerContainer.style.transform = 'translateY(-50%)';
    pickerContainer.style.zIndex = '1000';
    pickerContainer.style.backgroundColor = 'rgba(0,0,0,0.8)';
    pickerContainer.style.padding = '10px';
    pickerContainer.style.borderRadius = '5px';
    pickerContainer.style.color = 'white';
    pickerContainer.innerHTML = `
        <label for="color1">Color 1:</label>
        <input type="color" id="color1" name="color1" value="#00ced1">
        <br><br>
        <label for="color2">Color 2:</label>
        <input type="color" id="color2" name="color2" value="#4682b4">
        <br><br>
        <button id="applyGradient">Apply Gradient</button>
    `;
    document.body.appendChild(pickerContainer);

    // Function to apply the gradient
    function applyGradient() {
        const color1 = document.getElementById('color1').value;
        const color2 = document.getElementById('color2').value;

        GM_addStyle(`
            a:link, .modallink {
                color: ${color1};
            }

            a:visited {
                color: ${color2};
            }

            a:hover, .modallink:hover {
                color: ${color2};
            }

            .inarea {
                border-color: ${color1};
            }

            .tab-list-item {
                color: ${color1}; 
            }
            .tab-list-item.active {
                background-color: ${color2};
                color: white;
            }
            .tab-list-item:not(.active):hover {
                background-color: ${color1};
            }

            tr:nth-child(even) {
                background-color: ${color1};
            }

            .window, .popup {
                background: linear-gradient(${color1}, ${color2});
                color: #f4f4f4;
            }
            .window {
                border-radius: 5px;
            }

            .win-title {
                background-color: ${color1};
            }

            .win-topbar, .modal-topbtn {
                color: black;
            }

            .win-title:hover {
                background-color: ${color2};
            }

            .win-topbtn, .modal-topbtn {
                background-color: ${color1};
            }

            .win-topbtn:hover, .modal-topbtn:hover {
                background-color: ${color2};
            }

            .channeldd, .contextmenu {
                background-color: ${color1};
                color: #efefef;
                border-radius: 8px;
            }

            .chntop {
                margin-top: 4px;
            }

            .chn, .chntype, .contextmenu > div {
                background-color: ${color1};
            }

            .chn.selected, .chn:hover, .chntype.selected, .chntype:hover,
            .contextmenu > div:hover {
                background-color: ${color2};
            }

            .actionbuttons, .coorbox, .onlinebox, .cooldownbox, #historyselect {
                background: linear-gradient(${color1}, ${color2});
                color: #f4f4f4;
                border-radius: 21px;
            }

            #pencilbutton.ppencil {
                background-color: ${color1};
            }
            #pencilbutton.phistory {
                background-color: ${color2};
            }
            #pencilbutton.poverlay {
                background-color: ${color1};
            }

            .menu > div {
                z-index: 1;
                background-color: ${color2};
            }

            .modal, .Alert {
                background: linear-gradient(${color1}, ${color2});
                color: #f4f4f4;
            }

            .modal {
                border-radius: 21px;
            }

            .Alert {
                border-radius: 12px;
            }

            .modal-content, .win-content, .popup-content {
                color: #f4f4f4;
            }

            h3, h4 {
                color: ${color1};
            }

            .modaldesc {
                color: hsla(180, 100%, 75%, 0.6);
            }

            .modaldivider {
                background-color: hsla(180, 100%, 75%, 0.3);
            }

            .modalinfo, .tmpitm-desc span {
                color: #ddd;
            }

            .modalcvtext, .tmpitm-desc {
                color: hsla(180, 100%, 75%, 0.6);
            }

            .overlay {
                background-color: rgba(72, 209, 204, 0.75);
            }

            .chatname {
                background-color: ${color1};
            }
            .mention {
                background-color: ${color2};
            }
            .chatmsg:hover {
                background-color: ${color1};
            }
            .msg {
                color: #f3f3f3;
            }
            .msg.info{
                color: #ff91a6;
            }
            .msg.event{
                color: #9dc8ff;
            }
            .msg.greentext{
                color: #94ff94;
            }
            .ebex {
                color: #fff4bd;
            }

            .chatlink {
                color: #f9edde;
            }

            .statvalue {
                color: #ecc9ff;
            }

            .actionbuttons:hover, .coorbox:hover, .menu > div:hover {
                background-color: ${color2};
            }
        `);
    }

    // Event listener for the button
    document.getElementById('applyGradient').addEventListener('click', applyGradient);

    // Initial application of the default colors
    applyGradient();
})();
