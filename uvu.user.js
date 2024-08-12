// ==UserScript==
// @name     pixelya_tema
// @grant    GM_addStyle
// @run-at   document-start
// @author   vamtic
// @include  https://pixelya.fun/*
// ==/UserScript==

(function() {
    function loadColors() {
        const colors = localStorage.getItem('customColors');
        return colors ? JSON.parse(colors) : ['#00ced1', '#23FF01'];
    }

    function loadRounding() {
        return localStorage.getItem('borderRadius') === 'true';
    }

    function saveColors(colors) {
        localStorage.setItem('customColors', JSON.stringify(colors));
    }

    function saveRounding(rounded) {
        localStorage.setItem('borderRadius', rounded.toString());
    }

    let colors = loadColors();
    let rounded = loadRounding();

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
        <label style="display: block; margin-top: 10px; color: white;">
            <input type="checkbox" id="toggleRounding" ${rounded ? 'checked' : ''}> Lekerekítés
        </label>
    `;
    document.body.appendChild(pickerContainer);

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

    document.getElementById('toggleRounding').addEventListener('change', (e) => {
        rounded = e.target.checked;
        saveRounding(rounded);
        applyGradient();
    });

    function applyGradient() {
        colors = colors.map((_, i) => document.getElementById(`color${i + 1}`).value);
        saveColors(colors);

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

            .window, .popup {
                background: ${gradient};
                color: mix-blend-mode: difference;
            }

            tr:nth-child(even) {
                background-color: ${colors[0]};
            }

            .actionbuttons, .coorbox, .onlinebox, .cooldownbox, #historyselect {
                background: ${gradient};
                color: mix-blend-mode: difference;
            }

            .menu > div {
                z-index: 1;
                background-color: ${colors[1]};
            }

            .modal, .Alert {
                background: ${gradient};
                color: mix-blend-mode: difference;
            }

            .chatname {
                color: mix-blend-mode: difference;
            }
            .mention {
                background-color: ${colors[1]};
            }
            .chatmsg:hover {
                background-color: ${colors[0]};
            }
            .msg {
                color: mix-blend-mode: difference;
            }
            .msg.info {
                color: #ff91a6;
            }
            .msg.event {
                color: #9dc8ff;
            }
            .msg.greentext {
                color: #94ff94;
            }
            .statvalue {
                color: #ecc9ff;
            }
        `);

        if (rounded) {
            GM_addStyle(`
                .window, .popup {
                    border-radius: 5px;
                }
                .channeldd, .contextmenu {
                    border-radius: 8px;
                }
                .actionbuttons, .coorbox, .onlinebox, .cooldownbox, #historyselect {
                    border-radius: 21px;
                }
                .modal {
                    border-radius: 21px;
                }
                .Alert {
                    border-radius: 12px;
                }
            `);
        } else {
            GM_addStyle(`
                .window, .popup, .channeldd, .contextmenu, .actionbuttons, .coorbox, .onlinebox, .cooldownbox, #historyselect, .modal, .Alert {
                    border-radius: 0;
                }
            `);
        }
    }

    document.getElementById('applyGradient').addEventListener('click', applyGradient);

    updateColorPickers();
    applyGradient();
})();
