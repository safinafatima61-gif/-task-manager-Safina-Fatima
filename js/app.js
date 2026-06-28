



















document.addEventListener('DOMContentLoaded', () => {
    // Direct requirements wale format 'tasks' key se localStorage read karna
    let allTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const activeTheme = localStorage.getItem('zenith_kanban_theme') || 'light';
    if (activeTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.getElementById('themeToggleBtn').innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    function syncInterfaceData() {
        const query = document.getElementById('searchInput').value;
        const priority = document.getElementById('priorityFilter').value;
        const sorting = document.getElementById('sortBySelect').value;

        const processed = FilterController.filterAndSort(allTasks, query, priority, sorting);
        BoardController.renderBoard(processed);
        if (StatsController && StatsController.updateDashboardStats) {
            StatsController.updateDashboardStats(allTasks);
        }
    }

    document.getElementById('themeToggleBtn').addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('zenith_kanban_theme', 'dark');
            document.getElementById('themeToggleBtn').innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            localStorage.setItem('zenith_kanban_theme', 'light');
            document.getElementById('themeToggleBtn').innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    });

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.open-modal-btn');
        if (btn) {
            let colAttr = btn.dataset.column;
            let targetCol = 'todo';
            if(colAttr === 'In Progress') targetCol = 'inprogress';
            if(colAttr === 'Done') targetCol = 'done';
            UIController.openTaskModal(targetCol);
        }
    });

    document.getElementById('closeModalBtn').addEventListener('click', UIController.closeTaskModal);
    document.getElementById('cancelModalBtn').addEventListener('click', UIController.closeTaskModal);
    document.getElementById('taskTagsInput').addEventListener('keydown', (e) => UIController.handleTagInput(e));
    document.getElementById('successOkBtn').addEventListener('click', UIController.closeSuccessModal);

    document.getElementById('taskForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('taskId').value;
        const title = document.getElementById('taskTitle').value.trim();
        const description = document.getElementById('taskDescription').value.trim();
        const priorityInput = document.getElementById('taskPriority').value;
        const dueDate = document.getElementById('taskDueDate').value;
        const columnInput = document.getElementById('taskColumn').value;
        
        let isValid = true;
        if (title.length < 3) {
            document.getElementById('taskTitle').parentElement.classList.add('has-error');
            isValid = false;
        } else {
            document.getElementById('taskTitle').parentElement.classList.remove('has-error');
        }

        if (!dueDate) {
            document.getElementById('taskDueDate').parentElement.classList.add('has-error');
            isValid = false;
        } else {
            document.getElementById('taskDueDate').parentElement.classList.remove('has-error');
        }

        if (!isValid) return;

        let targetCol = 'todo';
        if(columnInput === 'In Progress') targetCol = 'inprogress';
        if(columnInput === 'Done') targetCol = 'done';

        if (id) {
            const numericId = parseInt(id);
            const idx = allTasks.findIndex(t => t.id === numericId || t.id == id);
            if (idx !== -1) {
                allTasks[idx] = { 
                    ...allTasks[idx], 
                    title, 
                    description, 
                    priority: priorityInput.toLowerCase(), 
                    dueDate, 
                    column: targetCol, 
                    tags: [...UIController.currentTags] 
                };
            }
            UIController.closeTaskModal();
        } else {
            const timestamp = Date.now();
            const newTask = {
                id: timestamp,
                title: title,
                description: description,
                priority: priorityInput.toLowerCase(),
                column: targetCol,
                dueDate: dueDate,
                tags: [...UIController.currentTags],
                createdAt: timestamp
            };
            allTasks.push(newTask);
            UIController.closeTaskModal();
            UIController.openSuccessModal();
        }

        localStorage.setItem('tasks', JSON.stringify(allTasks));
        syncInterfaceData();
    });

    document.addEventListener('click', (e) => {
        const target = e.target;
        const card = target.closest('.task-card');
        if (!card) return;
        
        const taskId = card.dataset.id;
        const idx = allTasks.findIndex(t => t.id == taskId);
        if (idx === -1) return;

        if (target.closest('.delete-task-btn')) {
            allTasks.splice(idx, 1);
        } else if (target.closest('.edit-task-btn')) {
            UIController.openTaskModal(allTasks[idx].column, allTasks[idx]);
            return;
        } else if (target.closest('.move-left-btn')) {
            if (allTasks[idx].column === 'inprogress') allTasks[idx].column = 'todo';
            else if (allTasks[idx].column === 'done') allTasks[idx].column = 'inprogress';
        } else if (target.closest('.move-right-btn')) {
            if (allTasks[idx].column === 'todo') allTasks[idx].column = 'inprogress';
            else if (allTasks[idx].column === 'inprogress') allTasks[idx].column = 'done';
        }
        localStorage.setItem('tasks', JSON.stringify(allTasks));
        syncInterfaceData();
    });

    document.getElementById('searchInput').addEventListener('input', syncInterfaceData);
    document.getElementById('priorityFilter').addEventListener('change', syncInterfaceData);
    document.getElementById('sortBySelect').addEventListener('change', syncInterfaceData);

    window.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            e.preventDefault();
            document.getElementById('searchInput').focus();
        }
    });

    document.getElementById('loadDemoBtn').addEventListener('click', () => {
        const baselineTime = Date.now();
        allTasks = [
            { id: baselineTime, title: 'HTML Project', description: 'Create the structure of the website using HTML.', priority: 'high', dueDate: '2026-08-28', tags: ['html', 'structure'], column: 'todo', createdAt: baselineTime },
            { id: baselineTime + 1, title: 'Plan Content', description: 'Plan and write the content for the website.', priority: 'medium', dueDate: '2026-08-30', tags: ['plan', 'content'], column: 'todo', createdAt: baselineTime + 1 },
            { id: baselineTime + 2, title: 'CSS Design', description: 'Style the website using CSS.', priority: 'medium', dueDate: '2026-08-25', tags: ['css', 'design'], column: 'inprogress', createdAt: baselineTime + 2 },
            { id: baselineTime + 3, title: 'JavaScript Functionality', description: 'Add interactivity using JavaScript.', priority: 'high', dueDate: '2026-08-29', tags: ['javascript', 'functionality'], column: 'inprogress', createdAt: baselineTime + 3 },
            { id: baselineTime + 4, title: 'Project Setup', description: 'Setup the project folder and files.', priority: 'low', dueDate: '2026-08-20', tags: ['setup'], column: 'done', createdAt: baselineTime + 4 }
        ];
        localStorage.setItem('tasks', JSON.stringify(allTasks));
        syncInterfaceData();
    });

    syncInterfaceData();
});