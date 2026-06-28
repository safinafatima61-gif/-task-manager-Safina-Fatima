const StatsController = {
    updateDashboardStats(tasks) {
        const total = tasks.length;
        const todo = tasks.filter(t => t.column === 'To Do').length;
        const progress = tasks.filter(t => t.column === 'In Progress').length;
        const completed = tasks.filter(t => t.column === 'Done').length;
        
        let overdue = 0;
        tasks.forEach(task => {
            if (TaskController.isOverdue(task.dueDate, task.column)) {
                overdue++;
            }
        });

        document.getElementById('statTotal').innerText = total;
        document.getElementById('statProgress').innerText = progress;
        document.getElementById('statCompleted').innerText = completed;
        document.getElementById('statOverdue').innerText = overdue;
        
        document.getElementById('countTodo').innerText = todo;
        document.getElementById('countProgress').innerText = progress;
        document.getElementById('countDone').innerText = completed;

        const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
        document.getElementById('statRate').innerText = `${rate}%`;
        document.getElementById('statProgressFill').style.width = `${rate}%`;
    }
};