// ==========================================================================
// TASK MANAGEMENT LAYER (TaskManager)
// Handles CRUD operations for tasks following the required data structure
// ==========================================================================

const TaskManager = {
    // Array to hold task objects in memory
    tasks: [],

    // Initialize tasks by loading them from StorageManager
    init: function() {
        this.tasks = StorageManager.getTasks();
    },

    // Get all tasks
    getAllTasks: function() {
        return this.tasks;
    },

    // Get a single task by its unique ID
    getTaskById: function(id) {
        return this.tasks.find(task => task.id === parseInt(id));
    },

    // Create and add a new task
    createTask: function(title, description, priority, dueDate, column, tags) {
        const newTask = {
            id: Date.now(), // Unique ID using creation timestamp
            title: title.trim(),
            description: description.trim(),
            priority: priority, // 'high' | 'medium' | 'low'
            column: column,     // 'todo' | 'inprogress' | 'done'
            dueDate: dueDate,   // YYYY-MM-DD
            tags: tags,         // Array of string tags
            createdAt: Date.now()
        };

        this.tasks.push(newTask);
        StorageManager.saveTasks(this.tasks);
        return newTask;
    },

    // Update an existing task
    updateTask: function(id, updatedFields) {
        const taskIndex = this.tasks.findIndex(task => task.id === parseInt(id));
        if (taskIndex !== -1) {
            // Merge existing task data with updated fields
            this.tasks[taskIndex] = {
                ...this.tasks[taskIndex],
                ...updatedFields,
                title: updatedFields.title ? updatedFields.title.trim() : this.tasks[taskIndex].title,
                description: updatedFields.description ? updatedFields.description.trim() : this.tasks[taskIndex].description
            };
            StorageManager.saveTasks(this.tasks);
            return this.tasks[taskIndex];
        }
        return null;
    },

    // Delete a task permanently by ID
    deleteTask: function(id) {
        this.tasks = this.tasks.filter(task => task.id !== parseInt(id));
        StorageManager.saveTasks(this.tasks);
    },

    // Move a task to a different column (Left / Right / Dropdown change)
    moveTaskColumn: function(id, newColumn) {
        return this.updateTask(id, { column: newColumn });
    }
};