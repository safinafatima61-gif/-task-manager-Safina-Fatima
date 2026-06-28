const TaskController = {
    createTaskObject(title, description, priority, dueDate, tags, column) {
        return {
            id: 'task_' + Date.now(),
            title,
            description,
            priority,
            dueDate,
            tags: tags || [],
            column: column || 'To Do',
            dateCreated: new Date().toISOString()
        };
    },

    isOverdue(dueDateStr, currentColumn) {
        if (currentColumn === 'Done' || !dueDateStr) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const taskDate = new Date(dueDateStr);
        taskDate.setHours(0, 0, 0, 0);
        return taskDate < today;
    },

    getDaysRemainingText(dueDateStr, currentColumn) {
        if (!dueDateStr) return '';
        if (currentColumn === 'Done') return '';
        
        const today = new Date();
        today.setHours(0,0,0,0);
        const taskDate = new Date(dueDateStr);
        taskDate.setHours(0,0,0,0);
        
        const diffTime = taskDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) return 'Overdue';
        if (diffDays === 0) return 'Due today';
        if (diffDays === 1) return 'Due tomorrow';
        return `Due in ${diffDays} days`;
    }
};