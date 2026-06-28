























const UIController = {
    currentTags: [],

    openTaskModal(columnName = 'To Do', taskToEdit = null) {
        const modal = document.getElementById('taskModal');
        const form = document.getElementById('taskForm');
        form.reset();
        this.currentTags = [];
        this.renderTagChips();
        
        document.getElementById('taskTitle').parentElement.classList.remove('has-error');
        document.getElementById('taskDueDate').parentElement.classList.remove('has-error');

        if (taskToEdit) {
            document.getElementById('modalTitleText').innerText = 'Edit Task';
            document.getElementById('saveTaskBtn').innerText = 'Save Changes';
            document.getElementById('taskId').value = taskToEdit.id;
            document.getElementById('taskTitle').value = taskToEdit.title;
            document.getElementById('taskDescription').value = taskToEdit.description;
            document.getElementById('taskPriority').value = taskToEdit.priority;
            document.getElementById('taskDueDate').value = taskToEdit.dueDate;
            document.getElementById('taskColumn').value = taskToEdit.column;
            this.currentTags = [...taskToEdit.tags];
            this.renderTagChips();
        } else {
            document.getElementById('modalTitleText').innerText = 'Create Task';
            document.getElementById('saveTaskBtn').innerText = 'Create Task';
            document.getElementById('taskId').value = '';
            document.getElementById('taskColumn').value = columnName;
        }
        modal.classList.add('active');
    },

    closeTaskModal() { document.getElementById('taskModal').classList.remove('active'); },
    openSuccessModal() { document.getElementById('successModal').classList.add('active'); },
    closeSuccessModal() { document.getElementById('successModal').classList.remove('active'); },

    handleTagInput(e) {
        const input = e.target;
        const val = input.value.trim();
        if ((e.key === 'Enter' || e.key === ',') && val !== '') {
            e.preventDefault();
            if (!this.currentTags.includes(val)) {
                this.currentTags.push(val);
                this.renderTagChips();
            }
            input.value = '';
        }
    },

    renderTagChips() {
        const container = document.getElementById('tagsContainer');
        const input = document.getElementById('taskTagsInput');
        container.querySelectorAll('.tag-input-chip').forEach(c => c.remove());

        this.currentTags.forEach((tag, idx) => {
            const chip = document.createElement('div');
            chip.className = 'tag-input-chip';
            chip.innerHTML = `${tag} <span data-idx="${idx}">&times;</span>`;
            chip.querySelector('span').addEventListener('click', (e) => {
                this.currentTags.splice(parseInt(e.target.dataset.idx), 1);
                this.renderTagChips();
            });
            container.insertBefore(chip, input);
        });
    }
};