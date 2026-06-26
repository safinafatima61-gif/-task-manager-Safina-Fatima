
// =========================================================================// STORAGE LAYER (StorageManager)
// Handles reading and writing task and theme data to localStorage
// ==========================================================================

const StorageManager = {
    STORAGE_KEY: 'tasks',
    THEME_KEY: 'theme',

    // Retrieve all tasks array from localStorage
    getTasks: function() {
        try {
            // Assignment requirement: Use JSON.parse to extract data
            return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
        } catch (e) {
            console.error("Error parsing tasks from localStorage:", e);
            return [];
        }
    },

    // Save tasks array to localStorage as a string
    saveTasks: function(tasks) {
        // Assignment requirement: Use JSON.stringify to persist data
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    },

    // Get the saved theme preference (light or dark)
    getTheme: function() {
        return localStorage.getItem(this.THEME_KEY) || 'light';
    },

    // Save the new theme preference to localStorage
    setTheme: function(theme) {
        localStorage.setItem(this.THEME_KEY, theme);
    }
};