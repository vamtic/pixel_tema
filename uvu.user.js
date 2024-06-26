// ==UserScript==
// @name     ppf_tema
// @grant    GM_addStyle
// @run-at   document-start
// @author   vamtic:
// @include  https://pixelplanet.fun/*
// ==/UserScript==

(function() {
    function loadColors() {
        const colors = localStorage.getItem('customColors');
        return colors ? JSON.parse(colors) : ['#00ced1', '#23FF01'];
    }

    function saveColors(colors) {
        localStorage.setItem('customColors', JSON.stringify(colors));
    }

    let colors = loadColors();

    const pickerContainer = document.createElement('div');
    pickerContainer.style.position = 'fixed';
    pickerContainer.style.left = '10px';
    pickerContainer.style.top = '50%';
    pickerContainer.style.transform = 'translateY(-50%)';
    pickerContainer.style.zIndex = '1000';
    pickerContainer.style.backgroundColor = 'rgba(0,0,0,0.8)';
    pickerContainer.style.padding = '10px';
    pickerContainer.style.color = 'white';
    pickerContainer.style.fontFamily = 'Arial, sans-serif';
    pickerContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    pickerContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 10px;">
            <h2 style="margin: 0; font-size: 16px;">Átmenet Kiválasztása</h2>
        </div>
        <div id="colorPickers">
            ${colors.map((color, index) => `
                <div class="colorPicker">
                    <label for="color${index + 1}">Szín ${index + 1}:</label>
                    <input type="color" id="color${index + 1}" name="color${index + 1}" value="${color}">
                    ${index >= 2 ? `<button class="removeColor" data-index="${index}" style="margin-left: 5px; background-color: #ff4c4c; color: white; border: none; padding: 2px 5px; border-radius: 5px; cursor: pointer;">X</button>` : ''}
                </div>
            `).join('')}
        </div>
        <button id="addColor" style="margin-top: 10px; background-color: #4682b4; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Szín Hozzáadása</button>
        <button id="applyGradient" style="margin-top: 10px; background-color: #00ced1; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Átmenet Alkalmazása</button>
    `;
    document.body.appendChild(pickerContainer);

    let enableBorderRadius = true;

    function updateColorPickers() {
        const colorPickers = document.getElementById('colorPickers');
        colorPickers.innerHTML = colors.map((color, index) => `
            <div class="colorPicker">
                <label for="color${index + 1}">Szín ${index + 1}:</label>
                <input type="color" id="color${index + 1}" name="color${index + 1}" value="${color}">
                ${index >= 2 ? `<button class="removeColor" data-index="${index}" style="margin-left: 5px; background-color: #ff4c4c; color: white; border: none; padding: 2px 5px; border-radius: 5px; cursor: pointer;">X</button>` : ''}
            </div>
        `).join('');
        
        document.querySelectorAll('.removeColor').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                colors.splice(index, 1);
                updateColorPickers();
                saveColors(colors);
                applyGradient();
            });
        });
    }

    document.getElementById('addColor').addEventListener('click', () => {
        colors.push('#ffffff');
        updateColorPickers();
        saveColors(colors);
    });

    function applyGradient() {
        colors = colors.map((_, i) => document.getElementById(`color${i + 1}`).value);
        saveColors(colors);
        
        const gradient = `linear-gradient(${colors.join(', ')})`;

        GM_addStyle(`
            body {
                background: ${colors[0]};
                color: ${colors[1]};
            }

            a:link, .modallink {
                color: ${colors[1]};
            }

            a:visited {
                color: ${colors[2]};
            }

            a:hover, .modallink:hover {
                color: ${colors[2]};
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
                ${enableBorderRadius ? 'border-radius: 5px;' : ''}
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
                ${enableBorderRadius ? 'border-radius: 21px;' : ''}
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
