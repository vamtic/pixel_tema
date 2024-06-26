// ==UserScript==
// @name     ppf_tema
// @grant    GM_addStyle
// @run-at   document-start
// @author   vamtic
// @include  https://pixelplanet.fun/*
// ==/UserScript==

(function() {
    // Function to load colors from localStorage or set defaults
    function loadColors() {
        const colors = localStorage.getItem('customColors');
        return colors ? JSON.parse(colors) : ['#00ced1', '#23FF01'];
    }

    // Function to save colors to localStorage
    function saveColors(colors) {
        localStorage.setItem('customColors', JSON.stringify(colors));
    }

    // Load colors from localStorage or set defaults
    let colors = loadColors();

    // Create UI for color selection and border-radius toggle
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
            <h2 style="margin: 0; font-size: 16px;">Átmenet Kiválasztása és Lekerekítés Kapcsolása</h2>
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
        <button id="toggleBorderRadius" style="margin-top: 10px; background-color: #ff9800; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Lekerekítés Kapcsolása</button>
    `;
    document.body.appendChild(pickerContainer);

    // Variable to toggle border-radius
    let enableBorderRadius = true;

    // Function to update color pickers UI
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

    // Event listener for adding a new color
    document.getElementById('addColor').addEventListener('click', () => {
        colors.push('#ffffff');
        updateColorPickers();
        saveColors(colors);
    });

    // Function to apply gradient styles
    function applyGradient() {
        colors = colors.map((_, i) => document.getElementById(`color${i + 1}`).value);
        saveColors(colors);
        
        // Calculate background luminance for text color inversion
        function calculateLuminance(color) {
            const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
            const r = parseInt(rgb[1], 16);
            const g = parseInt(rgb[2], 16);
            const b = parseInt(rgb[3], 16);
            return 0.2126 * r + 0.7152 * g + 0.0722 * b; // ITU-R BT.709 luminance calculation
        }
        
        const bgLuminance = calculateLuminance(colors[0]);
        let textColor = '#f4f4f4'; // Default text color for dark background
        if (bgLuminance > 128) {
            textColor = '#333'; // Use darker text for lighter background
        }
        
        const gradient = `linear-gradient(${colors.join(', ')})`;

        GM_addStyle(`
            /* General text color inversion based on background */
            body {
                background-color: ${colors[0]};
                color: ${textColor};
            }

            /* Example: Specific styles using the gradient */
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

            /* Add more styles as needed */

            /* Example: Gradient background for specific elements */
            .window, .popup {
                background: ${gradient};
                color: #f4f4f4;
                ${enableBorderRadius ? 'border-radius: 5px;' : ''}
            }
            .window {
                border-radius: 5px;
            }

            /* Add more gradient styles for other elements */

            /* Example: Toggle border-radius */
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

            /* Add more styles as needed */
        `);
    }

    // Event listener for applying gradient styles
    document.getElementById('applyGradient').addEventListener('click', applyGradient);

    // Event listener to toggle border-radius with 'toggleBorderRadius' button
    document.getElementById('toggleBorderRadius').addEventListener('click', () => {
        enableBorderRadius = !enableBorderRadius;
        applyGradient();
    });

    // Apply default colors and styles on page load
    updateColorPickers();
    applyGradient();
})();
