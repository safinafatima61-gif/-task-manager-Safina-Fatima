const BoardController = {
    renderBoard(filteredTasks) {
        const todoList = document.getElementById('listTodo');
        const progressList = document.getElementById('listProgress');
        const doneList = document.getElementById('listDone');
        
        todoList.innerHTML = '';
        progressList.innerHTML = '';
        doneList.innerHTML = '';
        
        filteredTasks.forEach(task => {
            const card = this.createTaskCardDOM(task);
            if (task.column === 'To Do') todoList.appendChild(card);
            else if (task.column === 'In Progress') progressList.appendChild(card);
            else if (task.column === 'Done') doneList.appendChild(card);
        });
    },
        createTaskCardDOM(task) {
        const isOverdue = TaskController.isOverdue(task.dueDate, task.column);
        const remainsText = TaskController.getDaysRemainingText(task.dueDate, task.column);
        
        const card = document.createElement('div');
        // Is line ko change kiya hai taaki 'Done' wale task par alag class lag sake
        card.className = `task-card ${task.column === 'Done' ? 'task-done' : ''}`;
        card.dataset.id = task.id;
        let dateHtml = '';
        if (task.dueDate) {
            const formattedDate = new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            dateHtml = `<div class="date-line"><i class="fa-regular fa-calendar"></i> ${formattedDate}</div>`;
        }

        let remainsHtml = '';
        if (remainsText) {
            const remainsClass = isOverdue ? 'days-overdue' : 'days-remaining';
            remainsHtml = `<div class="${remainsClass}">${remainsText}</div>`;
        }
        
        const tagsHtml = task.tags.map(tag => `<span class="tag-badge">${tag}</span>`).join('');

        card.innerHTML = `
            <div class="card-top-row">
                <h3>${task.title}</h3>
                <span class="priority-badge priority-${task.priority.toLowerCase()}">${task.priority}</span>
            </div>
            <p>${task.description || 'No description.'}</p>
            <div class="task-tags">${tagsHtml}</div>
            <div class="task-meta">
                <div class="task-date">
                    ${dateHtml}
                    ${remainsHtml}
                </div>
                <div class="task-actions">
                    ${task.column !== 'To Do' ? `<button class="action-btn move-left-btn" title="Move Left"><i class="fa-solid fa-arrow-left"></i></button>` : ''}
                    <button class="action-btn edit-task-btn" title="Edit"><i class="fa-solid fa-pen"></i></button>
                    <button class="action-btn delete-btn delete-task-btn" title="Delete"><i class="fa-solid fa-trash-can"></i></button>
                    ${task.column !== 'Done' ? `<button class="action-btn move-right-btn" title="Move Right"><i class="fa-solid fa-arrow-right"></i></button>` : ''}
                </div>
            </div>
        `;
        return card;
    }
};


const BoardController = {
    renderBoard(filteredTasks) {
        const todoList = document.getElementById('listTodo');
        const progressList = document.getElementById('listProgress');
        const doneList = document.getElementById('listDone');
        
        todoList.innerHTML = '';
        progressList.innerHTML = '';
        doneList.innerHTML = '';
        
        filteredTasks.forEach(task => {
            const card = this.createTaskCardDOM(task);
            if (task.column === 'todo') todoList.appendChild(card);
            else if (task.column === 'inprogress') progressList.appendChild(card);
            else if (task.column === 'done') doneList.appendChild(card);
        });
    },

    createTaskCardDOM(task) {
        // Overdue aur remaining text checking
        const isOverdue = TaskController.isOverdue ? TaskController.isOverdue(task.dueDate, task.column) : false;
        const remainsText = TaskController.getDaysRemainingText ? TaskController.getDaysRemainingText(task.dueDate, task.column) : '';
        
        const card = document.createElement('div');
        // 'done' task par automatically .task-done class lagayega line-through ke liye
        card.className = `task-card ${task.column === 'done' ? 'task-done' : ''}`;
        card.dataset.id = task.id;
        
        let dateHtml = '';
        if (task.dueDate) {
            const formattedDate = new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            dateHtml = `<div class="date-line"><i class="fa-regular fa-calendar"></i> ${formattedDate}</div>`;
        }

        let remainsHtml = '';
        if (remainsText) {
            const remainsClass = isOverdue ? 'days-overdue' : 'days-remaining';
            remainsHtml = `<div class="${remainsClass}">${remainsText}</div>`;
        }
        
        const tagsHtml = task.tags ? task.tags.map(tag => `<span class="tag-badge">${tag}</span>`).join('') : '';
        const priorityDisplay = task.priority ? task.priority.toUpperCase() : 'LOW';

        card.innerHTML = `
            <div class="card-top-row">
                <h3>${task.title}</h3>
                <span class="priority-badge priority-${task.priority ? task.priority.toLowerCase() : 'low'}">${priorityDisplay}</span>
            </div>
            <p>${task.description || 'No description.'}</p>
            <div class="task-tags">${tagsHtml}</div>
            <div class="task-meta">
                <div class="task-date">
                    ${dateHtml}
                    ${remainsHtml}
                </div>
                <div class="task-actions">
                    ${task.column !== 'todo' ? `<button class="action-btn move-left-btn" title="Move Left"><i class="fa-solid fa-arrow-left"></i></button>` : ''}
                    <button class="action-btn edit-task-btn" title="Edit"><i class="fa-solid fa-pen"></i></button>
                    <button class="action-btn delete-btn delete-task-btn" title="Delete"><i class="fa-solid fa-trash-can"></i></button>
                    ${task.column !== 'done' ? `<button class="action-btn move-right-btn" title="Move Right"><i class="fa-solid fa-arrow-right"></i></button>` : ''}
                </div>
            </div>
        `;
        return card;
    }
};