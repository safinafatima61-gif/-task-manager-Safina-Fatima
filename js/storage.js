





const StorageController = {
    getTasks() {
        const tasks = localStorage.getItem('zenith_kanban_tasks');
        return tasks ? JSON.parse(tasks) : [];
    },
    saveTasks(tasks) {
        localStorage.setItem('zenith_kanban_tasks', JSON.stringify(tasks));
    },
    getTheme() {
        return localStorage.getItem('zenith_kanban_theme') || 'light';
    },
    saveTheme(theme) {
        localStorage.setItem('zenith_kanban_theme', theme);
    }
};

