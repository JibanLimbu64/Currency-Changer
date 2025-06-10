document.addEventListener('DOMContentLoaded', () => {
    // Get references to the HTML elements
    const countrySelector = document.getElementById('country-selector');
    const countryFlag = document.getElementById('country-flag');
    const countryName = document.getElementById('country-name');

    // Function to update the flag and country name
    function updateCountryInfo() {
        const selectedOption = countrySelector.options[countrySelector.selectedIndex];
        const countryCode = selectedOption.value.toLowerCase(); // e.g., 'us', 'gb'
        const fullCountryName = selectedOption.textContent; // e.g., 'United States'

        // Update the flag image source
        // Using flagcdn.com as a reliable source for flags
        countryFlag.src = `https://flagcdn.com/w160/${countryCode}.png`;
        countryFlag.alt = `${fullCountryName} Flag`;

        // Update the country name text
        countryName.textContent = fullCountryName;

        // Add a temporary animation class to the flag
        countryFlag.classList.remove('flag-pop'); // Remove if already present
        void countryFlag.offsetWidth; // Trigger reflow to restart animation
        countryFlag.classList.add('flag-pop'); // Add the class to trigger animation
    }

    // Add a CSS animation for the flag change
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
        @keyframes flagPopAnimation {
            0% { transform: scale(0.8); opacity: 0; }
            50% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
        }

        .flag-pop {
            animation: flagPopAnimation 0.5s ease-out;
        }
    `;
    document.head.appendChild(styleSheet);


    // Add event listener for when the country selection changes
    countrySelector.addEventListener('change', updateCountryInfo);

    // Initial update when the page loads to ensure correct display
    updateCountryInfo();
});
