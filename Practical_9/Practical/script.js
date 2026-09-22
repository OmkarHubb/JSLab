// Theme Preference Switcher Script with LocalStorage Persistence

document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'theme-preference';

    // DOM Elements
    const htmlElement = document.documentElement;
    const btnLight = document.getElementById('btn-light');
    const btnDark = document.getElementById('btn-dark');
    const btnClear = document.getElementById('btn-clear');
    
    const activeThemeBadge = document.getElementById('active-theme-badge');
    const storageValueCode = document.getElementById('storage-value');
    const persistenceStatus = document.getElementById('persistence-status');

    /**
     * Update the visual state and DOM attributes for the active theme
     * @param {string} theme - 'light' or 'dark'
     * @param {boolean} isSaved - Whether the preference is stored in localStorage
     */
    function updateUI(theme, isSaved) {
        // Set root HTML attribute for CSS theme selectors
        htmlElement.setAttribute('data-theme', theme);

        // Update button active states
        if (theme === 'light' && isSaved) {
            btnLight.classList.add('active');
            btnDark.classList.remove('active');
        } else if (theme === 'dark' && isSaved) {
            btnDark.classList.add('active');
            btnLight.classList.remove('active');
        } else {
            btnLight.classList.remove('active');
            btnDark.classList.remove('active');
        }

        // Update Storage Status Card details
        activeThemeBadge.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
        
        if (isSaved) {
            storageValueCode.textContent = `"${theme}"`;
            persistenceStatus.className = 'status-indicator active';
            persistenceStatus.innerHTML = `<span class="dot"></span> Saved in Browser Storage`;
        } else {
            storageValueCode.textContent = 'null (Cleared)';
            persistenceStatus.className = 'status-indicator cleared';
            persistenceStatus.innerHTML = `<span class="dot"></span> Default (No Storage Preference)`;
        }
    }

    /**
     * Save theme preference to localStorage and apply theme
     * @param {string} theme - 'light' or 'dark'
     */
    function setTheme(theme) {
        try {
            localStorage.setItem(STORAGE_KEY, theme);
            updateUI(theme, true);
            console.log(`Theme preference saved to storage: "${theme}"`);
        } catch (e) {
            console.error('Failed to save theme to localStorage:', e);
        }
    }

    /**
     * Remove theme preference from localStorage and reset to default
     */
    function clearTheme() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            // Default to light mode when preference is cleared
            const defaultTheme = 'light';
            updateUI(defaultTheme, false);
            console.log('Theme preference cleared from storage.');
        } catch (e) {
            console.error('Failed to clear theme from localStorage:', e);
        }
    }

    /**
     * Initialize theme on page load by reading from localStorage
     */
    function initTheme() {
        try {
            const savedTheme = localStorage.getItem(STORAGE_KEY);
            if (savedTheme === 'light' || savedTheme === 'dark') {
                updateUI(savedTheme, true);
                console.log(`Loaded saved theme preference from storage: "${savedTheme}"`);
            } else {
                // Fallback to system preference or default light theme
                const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                const defaultTheme = prefersDark ? 'dark' : 'light';
                updateUI(defaultTheme, false);
                console.log(`No saved preference found. Using system/default theme: "${defaultTheme}"`);
            }
        } catch (e) {
            console.error('Failed to read theme from localStorage:', e);
            updateUI('light', false);
        }
    }

    // Event Listeners
    btnLight.addEventListener('click', () => setTheme('light'));
    btnDark.addEventListener('click', () => setTheme('dark'));
    btnClear.addEventListener('click', () => clearTheme());

    // Initialize application state
    initTheme();
});
