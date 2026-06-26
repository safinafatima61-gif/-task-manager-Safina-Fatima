// ==========================================================================
// RENDERING LAYER (BoardRenderer)
// Dynamically constructs and updates HTML task card structures inside columns
// ==========================================================================

const BoardRenderer = {
    // Renders the board view based on processed filter parameters
    render: function() {
        const visibleTasks = FilterManager.getFilteredAndSortedTasks();

        // Target column list containers from index.html
        const containers = {
            todo: document.getElementById('todo-tasks'),
            inprogress: document.getElementById('inprogress-tasks'),
            done: document.getElementById('done-tasks')
        };

        // Target column summary numeric indicators from index.html
        const counters = {
            todo: document.getElementById('todo-count'),
            inprogress: document.getElementById('inprogress-count'),
            done: document.getElementById('done-count')
        };

        // Clear previous state artifacts to prevent duplicate appended DOM nodes
        Object.keys(containers).forEach(col => {
            if (containers[col]) containers[col].innerHTML = '';
            if (counters[col]) counters[col].textContent = '0';
        });

        const counts = { todo: 0, inprogress: 0, done: 0 };
        const todayStr = new Date().toISOString().split('T')[0];

        // Loop over processed data structures and generate explicit HTML cards
        visibleTasks.forEach(task => {
            if (!containers[task.column]) return;

            counts[task.column]++;

            const card = document.createElement('div');
            card.className = 'task-card';
            card.dataset.id = task.id;

            // Apply special UI treatments based on system rule assertions
            const isOverdue = task.column !== 'done' && task.dueDate < todayStr;
            if (isOverdue) card.classList.add('overdue-card-treatment');
            if (task.column === 'done') card.classList.add('completed-card-treatment');

            // Format date presentation string nicely (e.g., Aug 28, 2026)
            const parts = task.dueDate.split('-');
            let dateString = task.dueDate;
            if (parts.length === 3) {
                const dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
                dateString = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            }

            // Construct standard inner layout block following assignment preview scheme
            card.innerHTML = `
                <div class="card-header">
                    <span class="task-title">
                        ${task.column === 'done' ? '<i class="fa-solid fa-circle-check completed-icon"></i>' : ''}
                        ${task.title}
                    </span>
                    <div class="badge-group">
                        <span class="badge badge-${task.priority}">${task.priority}</span>
                        ${isOverdue ? '<span class="badge badge-overdue">Overdue</span>' : ''}
                    </div>
                </div>
                <p class="task-desc">${task.description || '<i>No description provided.</i>'}</p>
                <div class="tags-wrapper">
                    ${task.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
                </div>
                <div class="card-footer">
                    <span class="task-date"><i class="fa-regular fa-calendar"></i> ${dateString}</span>
                    <div class="card-actions">
                        ${task.column !== 'todo' ? `<button class="action-btn move-left-btn" title="Move Left"><i class="fa-solid fa-arrow-left"></i></button>` : ''}
                        <button class="action-btn edit-btn" title="Edit Task"><i class="fa-solid fa-pencil"></i></button>
                        <button class="action-btn delete-btn" title="Delete Task"><i class="fa-solid fa-trash"></i></button>
                        ${task.column !== 'done' ? `<button class="action-btn move-right-btn" title="Move Right"><i class="fa-solid fa-arrow-right"></i></button>` : ''}
                    </div>
                </div>
            `;

            containers[task.column].appendChild(card);
        });

        // Sync numerical counters assigned next to headers
        Object.keys(counters).forEach(col => {
            if (counters[col]) counters[col].textContent = counts[col];
        });

        // Trigger updates down to metrics view component
        StatsManager.updateDashboard();
    }
};