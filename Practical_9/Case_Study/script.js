/* ==========================================================================
   Practical Experiment No. 9: Schedule Planner
   Demonstrating HTML5, CSS3, JavaScript Event Listeners, localStorage, and sessionStorage
   ========================================================================== */

// 1. Structured Schedule Data Array
const scheduleData = [
    { day: "Monday", begin: "8:00 a.m.", end: "5:00 p.m.", topic: "Introduction to XML" },
    { day: "Monday", begin: "8:00 a.m.", end: "5:00 p.m.", topic: "Validity: DTD and Relax NG" },
    { day: "Tuesday", begin: "8:00 a.m.", end: "11:00 a.m.", topic: "XPath" },
    { day: "Tuesday", begin: "11:00 a.m.", end: "2:00 p.m.", topic: "XSL Transformations" },
    { day: "Tuesday", begin: "2:00 p.m.", end: "5:00 p.m.", topic: "XSL Transformations" },
    { day: "Wednesday", begin: "8:00 a.m.", end: "12:00 p.m.", topic: "XSL Formatting Objects" }
];

// DOM Elements
const scheduleBody = document.getElementById('scheduleBody');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');
const themeText = document.getElementById('themeText');
const sessionDisplay = document.getElementById('sessionDisplay');

// Storage Keys
const LOCAL_STORAGE_THEME_KEY = 'practical9_theme';
const SESSION_STORAGE_EVENT_KEY = 'practical9_last_event';

/* ==========================================================================
   2. Dynamic Table Generation with Rowspan Formatting
   ========================================================================== */
function renderScheduleTable() {
    scheduleBody.innerHTML = '';

    // Row 0: Monday (1)
    const tr0 = createRow(0);
    tr0.appendChild(createCell('td', 'Monday', 'day-cell', 2));
    tr0.appendChild(createCell('td', '8:00 a.m.', 'bg-yellow', 2));
    tr0.appendChild(createCell('td', '5:00 p.m.', 'bg-purple', 2));
    tr0.appendChild(createCell('td', scheduleData[0].topic, 'topic-cell'));
    scheduleBody.appendChild(tr0);

    // Row 1: Monday (2) - Day, Begin, End rowspanned from Row 0
    const tr1 = createRow(1);
    tr1.appendChild(createCell('td', scheduleData[1].topic, 'topic-cell'));
    scheduleBody.appendChild(tr1);

    // Row 2: Tuesday (1) - 8:00 a.m. to 11:00 a.m.
    const tr2 = createRow(2);
    tr2.appendChild(createCell('td', 'Tuesday', 'day-cell', 3));
    tr2.appendChild(createCell('td', '8:00 a.m.', 'bg-yellow'));
    tr2.appendChild(createCell('td', '11:00 a.m.', 'bg-green'));
    tr2.appendChild(createCell('td', scheduleData[2].topic, 'topic-cell')); // XPath (1 row)
    scheduleBody.appendChild(tr2);

    // Row 3: Tuesday (2) - 11:00 a.m. to 2:00 p.m.
    const tr3 = createRow(3);
    tr3.appendChild(createCell('td', '11:00 a.m.', 'bg-yellow'));
    tr3.appendChild(createCell('td', '2:00 p.m.', 'bg-green'));
    tr3.appendChild(createCell('td', scheduleData[3].topic, 'topic-cell', 2)); // XSL Transformations spans 2 rows
    scheduleBody.appendChild(tr3);

    // Row 4: Tuesday (3) - 2:00 p.m. to 5:00 p.m. (XSL Transformations spanned from Row 3)
    const tr4 = createRow(4);
    tr4.appendChild(createCell('td', '2:00 p.m.', 'bg-green')); // Green Begin
    tr4.appendChild(createCell('td', '5:00 p.m.', 'bg-purple')); // Purple End
    scheduleBody.appendChild(tr4);

    // Row 5: Wednesday (1)
    const tr5 = createRow(5);
    tr5.appendChild(createCell('td', 'Wednesday', 'day-cell'));
    tr5.appendChild(createCell('td', '8:00 a.m.', 'bg-yellow'));
    tr5.appendChild(createCell('td', '12:00 p.m.', 'bg-green'));
    tr5.appendChild(createCell('td', scheduleData[5].topic, 'topic-cell'));
    scheduleBody.appendChild(tr5);
}

// Helper to create tr with data attribute
function createRow(index) {
    const tr = document.createElement('tr');
    tr.className = 'event-row';
    tr.dataset.index = index;
    return tr;
}

// Helper to create td cell with optional rowspan and colspan
function createCell(tag, text, className, rowspan = 1, colspan = 1) {
    const cell = document.createElement(tag);
    cell.textContent = text;
    cell.className = className;
    if (rowspan > 1) cell.rowSpan = rowspan;
    if (colspan > 1) cell.colSpan = colspan;
    return cell;
}

/* ==========================================================================
   3. Event Handling: Row Click, Alert, and Session Storage Update
   ========================================================================== */
function attachTableEventListeners() {
    // Event delegation on table body (clean listener, no inline onclick)
    scheduleBody.addEventListener('click', function (event) {
        const row = event.target.closest('tr.event-row');
        if (!row) return;

        const index = row.dataset.index;
        const item = scheduleData[index];

        if (item) {
            // Requirement: Alert showing Day, Time and Topic
            const alertMsg = `Day: ${item.day}\nTime: ${item.begin} - ${item.end}\nTopic: ${item.topic}`;
            
            // 1. Save last clicked event to sessionStorage
            saveEventToSessionStorage(item);
            
            // 2. Update UI display for sessionStorage
            renderSessionStorageDisplay();

            // 3. Show Alert Box
            alert(alertMsg);
        }
    });
}

/* ==========================================================================
   4. LocalStorage Logic (Theme Persistence across sessions/reloads)
   ========================================================================== */
/**
 * Restores the theme preference saved in localStorage.
 * Theme stays saved even if the browser is closed and reopened.
 */
function initializeThemeFromLocalStorage() {
    try {
        const savedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
        if (savedTheme === 'dark') {
            applyTheme(true);
        } else {
            applyTheme(false);
        }
    } catch (e) {
        console.warn('LocalStorage access issue:', e);
        applyTheme(false);
    }
}

/**
 * Toggles theme and saves user selection into localStorage.
 */
function handleThemeToggle() {
    const isCurrentlyDark = document.body.classList.contains('dark-theme');
    const newDarkState = !isCurrentlyDark;

    applyTheme(newDarkState);

    // Save choice in localStorage
    try {
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newDarkState ? 'dark' : 'light');
    } catch (e) {
        console.warn('Failed to write to localStorage:', e);
    }
}

function applyTheme(isDark) {
    if (isDark) {
        document.body.classList.add('dark-theme');
        if (themeIcon) themeIcon.textContent = '☀️';
        if (themeText) themeText.textContent = 'Light Mode';
    } else {
        document.body.classList.remove('dark-theme');
        if (themeIcon) themeIcon.textContent = '🌙';
        if (themeText) themeText.textContent = 'Dark Mode';
    }
}

/* ==========================================================================
   5. SessionStorage Logic (Last Event Persistence within session)
   ========================================================================== */
/**
 * Saves clicked schedule item into sessionStorage.
 * Persists during the current browser tab session and clears on tab close.
 */
function saveEventToSessionStorage(item) {
    try {
        sessionStorage.setItem(SESSION_STORAGE_EVENT_KEY, JSON.stringify(item));
    } catch (e) {
        console.warn('Failed to write to sessionStorage:', e);
    }
}

/**
 * Reads from sessionStorage and updates the visible status box on the page (if present).
 */
function renderSessionStorageDisplay() {
    if (!sessionDisplay) return;
    try {
        const storedJson = sessionStorage.getItem(SESSION_STORAGE_EVENT_KEY);
        if (storedJson) {
            const item = JSON.parse(storedJson);
            if (item && item.day && item.begin && item.end && item.topic) {
                sessionDisplay.innerHTML = `
                    <strong>Day:</strong> <span class="highlight">${escapeHTML(item.day)}</span> &bull; 
                    <strong>Time:</strong> <span class="highlight">${escapeHTML(item.begin)} – ${escapeHTML(item.end)}</span> &bull; 
                    <strong>Topic:</strong> <span class="highlight">${escapeHTML(item.topic)}</span>
                `;
                return;
            }
        }
    } catch (e) {
        console.warn('Error parsing sessionStorage data:', e);
    }
    
    // Default display if no session data exists yet
    sessionDisplay.innerHTML = '<em>No schedule item selected yet in this session. Click any row below!</em>';
}

// Simple HTML escaping helper for safe text rendering
function escapeHTML(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/* ==========================================================================
   6. Initialization on DOMContentLoaded
   ========================================================================== */
document.addEventListener('DOMContentLoaded', function () {
    // Render dynamic table
    renderScheduleTable();

    // Attach event listeners
    attachTableEventListeners();
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', handleThemeToggle);
    }

    // Initialize state from Storage APIs
    initializeThemeFromLocalStorage();
    renderSessionStorageDisplay();
});
