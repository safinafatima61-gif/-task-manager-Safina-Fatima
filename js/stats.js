// ==========================================================================
// STATISTICS LAYER (StatsManager)
// Computes and updates all 5 dashboard metrics in real-time
// ==========================================================================

const StatsManager = {
    // Recalculates all stats and updates the DOM elements
    updateDashboard: function() {
        const tasks = TaskManager.getAllTasks();
        const todayStr = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

        // 1. Calculate metric values using array filter methods
        const total = tasks.length;
        const inProgress = tasks.filter(task => task.column === 'inprogress').length;
        const completed = tasks.filter(task => task.column === 'done').length;
        
        // Overdue tasks: Not in 'done' column and due date is strictly less than today
        const overdue = tasks.filter(task => task.column !== 'done' && task.dueDate < todayStr).length;
        
        // Completion Percentage calculation
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        // 2. Update text content in DOM elements matching index.html IDs
        document.getElementById('stat-total').textContent = total;
        document.getElementById('stat-inprogress').textContent = inProgress;
        document.getElementById('stat-completed').textContent = completed;
        document.getElementById('stat-overdue').textContent = overdue;

        // Highlight overdue wrapper if any tasks are past due
        const overdueWrapper = document.getElementById('stat-overdue-wrapper');
        if (overdue > 0) {
            overdueWrapper.classList.add('overdue-active');
        } else {
            overdueWrapper.classList.remove('overdue-active');
        }

        // 3. Update linear completion progress bar visual and percentage text
        document.getElementById('progress-percent').textContent = `${percentage}%`;
        document.getElementById('progress-bar-fill').style.width = `${percentage}%`;
    }
};