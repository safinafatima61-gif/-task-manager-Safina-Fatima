// ==========================================================================
// APPLICATION APPLICATION INITIALIZATION LAYER (App Bootstrapper)
// Fires on DOM ready state to connect layer architectures together
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Load data records from localStorage into system runtime memory
    TaskManager.init();

    // 2. Attach UI DOM node event hooks, validation rules, and click event flows
    UIManager.init();

    // 3. Update the theme switcher button layout based on active document configurations
    const themeBtn = document.getElementById('theme-toggle');
    if (document.documentElement.classList.contains('dark-theme')) {
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i> Theme';
    } else {
        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i> Theme';
    }

    // 4. Fire the presentation layer engine to populate cards and metric graphs
    BoardRenderer.render();
});