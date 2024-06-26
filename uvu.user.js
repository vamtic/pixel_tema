// ==UserScript==
// @name     ppf_theme
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
    pickerContainer.style.borderRadius = '10px';
    pickerContainer.style.color = 'white';
    pickerContainer.style.fontFamily = 'Arial, sans-serif';
    pickerContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    pickerContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 10px;">
            <h2 style="margin: 0; font-size: 16px;">Gradient Picker</h2>
        </div>
        <div id="colorPickers">
            <div class="colorPicker">
                <label for="color1">1. szín:</label>
                <input type="color" id="color1" name="color1" value="#00ced1">
            </div>
            <div class="colorPicker">
                <label for="color2">2. szín:</label>
                <input type="color" id="color2" name="color2" value="#4682b4">
            </div>
        </div>
        <button id="addColor" style="margin-top: 10px; background-color: #4682b4; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Add Color</button>
        <button id="applyGradient" style="margin-top: 10px; background-color: #00ced1; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Apply Gradient</button>
    `;
    document.body.appendChild(pickerContainer);

    let colorCount = 2;

    document.getElementById('addColor').addEventListener('click', () => {
        colorCount++;
        const colorPickers = document.getElementById('colorPickers');
        const newColorPicker = document.createElement('div');
        newColorPicker.className = 'colorPicker';
        newColorPicker.innerHTML = `
            <label for="color${colorCount}">Color ${colorCount}:</label>
            <input type="color" id="color${colorCount}" name="color${colorCount}" value="#ffffff">
        `;
        colorPickers.appendChild(newColorPicker);
    });

    function applyGradient() {
        const colors = [];
        for (let i = 1; i <= colorCount; i++) {
            colors.push(document.getElementById(`color${i}`).value);
        }
        const gradient = `linear-gradient(${colors.join(', ')})`;

        GM_addStyle(`
            a:link, .modallink {
                color: ${colors[0]};
            }

            a:visited {
                color: ${colors[1]};
            }

            a:hover, .modallink:hover {
                color: ${colors[1]};
            }

            .inarea {
                border-color: ${colors[0]};
            }

            .tab-list-item {
                color: ${colors[0]}; 
            }
            .tab-list-item.active {
                background-color: ${colors[1]};
                color: white;
            }
            .tab-list-item:not(.active):hover {
                background-color: ${colors[0]};
            }

            tr:nth-child(even) {
                background-color: ${colors[0]};
            }

            .window, .popup {
                background: ${gradient};
                color: #f4f4f4;
            }
            .window {
                border-radius: 5px;
            }

            .win-title {
                background-color: ${colors[0]};
            }

            .win-topbar, .modal-topbtn {
                color: black;
            }

            .win-title:hover {
                background-color: ${colors[1]};
            }

            .win-topbtn, .modal-topbtn {
                background-color: ${colors[0]};
            }

            .win-topbtn:hover, .modal-topbtn:hover {
                background-color: ${colors[1]};
            }

            .channeldd, .contextmenu {
                background-color: ${colors[0]};
                color: #efefef;
                border-radius: 8px;
            }

            .chntop {
                margin-top: 4px;
            }

            .chn, .chntype, .contextmenu > div {
                background-color: ${colors[0]};
            }

            .chn.selected, .chn:hover, .chntype.selected, .chntype:hover,
            .contextmenu > div:hover {
                background-color: ${colors[1]};
            }

            .actionbuttons, .coorbox, .onlinebox, .cooldownbox, #historyselect {
                background: ${gradient};
                color: #f4f4f4;
                border-radius: 21px;
            }

            #pencilbutton.ppencil {
                background-color: ${colors[0]};
            }
            #pencilbutton.phistory {
                background-color: ${colors[1]};
            }
            #pencilbutton.poverlay {
                background-color: ${colors[0]};
            }

            .menu > div {
                z-index: 1;
                background-color: ${colors[1]};
            }

            .modal, .Alert {
                background: ${gradient};
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
                color: ${colors[0]};
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
                background-color: ${colors[0]};
            }
            .mention {
                background-color: ${colors[1]};
            }
            .chatmsg:hover {
                background-color: ${colors[0]};
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
                background-color: ${colors[1]};
            }
        `);
    }

    // Event listener for the apply gradient button
    document.getElementById('applyGradient').addEventListener('click', applyGradient);

    // Initial application of the default colors
    applyGradient();
})();
