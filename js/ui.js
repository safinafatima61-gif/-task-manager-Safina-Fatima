// ==========================================================================
// INTERACTIVE UI LAYER (UIManager)
// Manages modals, captures keyboard events for tags, and runs validation checks
// ==========================================================================

const UIManager = {
    currentTags: [],
    deletingTaskId: null,

    init: function() {
        this.cacheDOM();
        this.bindEvents();
    },

    


    cacheDOM: function() {
        this.modal = document.getElementById('task-modal');
        this.form = document.getElementById('task-form');
        this.modalTitle = document.getElementById('modal-title');
        this.taskIdInput = document.getElementById('task-id');
        
        // Input Fields
        this.titleInput = document.getElementById('task-title-input');
        this.descInput = document.getElementById('task-desc-input');
        this.priorityInput = document.getElementById('task-priority-input');
        this.dateInput = document.getElementById('task-date-input');
        this.columnInput = document.getElementById('task-column-input');
        this.tagField = document.getElementById('tag-input-field');
        this.tagsWrapper = document.getElementById('tags-pill-wrapper');

        // Error Nodes
        this.errTitle = document.getElementById('error-title');
        this.errDate = document.getElementById('error-date');

        // Global Action Elements (یہاں ہم نے آئی ڈی بالکل درست کر دی ہے)
        this.globalAddBtn = document.getElementById('global-add-task-btn');
        this.closeModalBtn = document.getElementById('close-modal-btn');
        this.cancelModalBtn = document.getElementById('cancel-task-btn');
        this.themeToggleBtn = document.getElementById('theme-toggle');

        // Custom Delete Confirmation Modal Elements
        this.confirmModal = document.getElementById('confirm-modal');
        this.confirmDeleteBtn = document.getElementById('confirm-delete-btn');
        this.confirmCancelBtn = document.getElementById('confirm-cancel-btn');
    },

    bindEvents: function() {
        // اگر globalAddBtn موجود ہو تو ہی کلک کا ایونٹ لگائے تاکہ ایرر نہ آئے
        if (this.globalAddBtn) {
            this.globalAddBtn.addEventListener('click', () => this.openCreateModal());
        }
        
        if (this.closeModalBtn) this.closeModalBtn.addEventListener('click', () => this.closeModal());
        if (this.cancelModalBtn) this.cancelModalBtn.addEventListener('click', () => this.closeModal());
        
        this.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        this.tagField.addEventListener('keydown', (e) => this.handleTagKeydown(e));

        document.querySelector('.kanban-board').addEventListener('click', (e) => this.handleBoardClicks(e));

        document.getElementById('search-bar').addEventListener('input', () => BoardRenderer.render());
        document.getElementById('priority-filter').addEventListener('change', () => BoardRenderer.render());
        document.getElementById('sort-by').addEventListener('change', () => BoardRenderer.render());
        document.getElementById('clear-filters-btn').addEventListener('click', () => this.clearFilters());

        document.getElementById('column-tabs').addEventListener('click', (e) => this.handleMobileTabs(e));

        this.confirmDeleteBtn.addEventListener('click', () => this.executeDelete());
        this.confirmCancelBtn.addEventListener('click', () => this.closeConfirmModal());

        this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
    },

    openCreateModal: function() {
        this.form.reset();
        this.taskIdInput.value = '';
        this.modalTitle.textContent = 'Create Task';
        this.currentTags = [];
        this.renderFormTags();
        this.clearErrors();
        this.modal.classList.remove('hidden');
    },

    openEditModal: function(task) {
        this.clearErrors();
        this.modalTitle.textContent = 'Edit Task';
        this.taskIdInput.value = task.id;
        this.titleInput.value = task.title;
        this.descInput.value = task.description;
        this.priorityInput.value = task.priority;
        this.dateInput.value = task.dueDate;
        this.columnInput.value = task.column;
        this.currentTags = [...task.tags];
        this.renderFormTags();
        this.modal.classList.remove('hidden');
    },

    closeModal: function() {
        this.modal.classList.add('hidden');
        this.clearErrors();
    },

    clearErrors: function() {
        this.errTitle.textContent = '';
        this.errDate.textContent = '';
        this.titleInput.style.borderColor = '';
        this.dateInput.style.borderColor = '';
    },

    handleTagKeydown: function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const val = this.tagField.value.trim().toLowerCase();
            if (val && !this.currentTags.includes(val)) {
                this.currentTags.push(val);
                this.renderFormTags();
            }
            this.tagField.value = '';
        }
    },

    renderFormTags: function() {
        this.tagsWrapper.innerHTML = this.currentTags.map((tag, idx) =>`
            <span class="form-tag-pill">
                ${tag} <span onclick="UIManager.removeFormTag(${idx})">&times;</span>
            </span>
        `).join('');
    },

    removeFormTag: function(idx) {
        this.currentTags.splice(idx, 1);
        this.renderFormTags();
    },

    handleFormSubmit: function(e) {
        e.preventDefault();
        this.clearErrors();

        let isValid = true;
        const title = this.titleInput.value.trim();
        const dueDate = this.dateInput.value;

        // Perform validation tracking matching your assignment criteria
        if (title.length < 3) {
            this.errTitle.textContent = 'Title must be at least 3 characters';
            this.titleInput.style.borderColor = 'var(--danger-color)';
            isValid = false;
        }

        if (!dueDate) {
            this.errDate.textContent = 'Please select a due date';
            this.dateInput.style.borderColor = 'var(--danger-color)';
            isValid = false;
        }

        if (!isValid) return;

        const id = this.taskIdInput.value;
        const desc = this.descInput.value;
        const priority = this.priorityInput.value;
        const column = this.columnInput.value;

        if (id) {
            TaskManager.updateTask(id, { title, description: desc, priority, dueDate, column, tags: this.currentTags });
        } else {
            TaskManager.createTask(title, desc, priority, dueDate, column, this.currentTags);
        }

        this.closeModal();
        BoardRenderer.render();
    },

    handleBoardClicks: function(e) {
        const target = e.target.closest('button');
        if (!target) return;

        const card = target.closest('.task-card');
        if (!card) return;

        const id = card.dataset.id;

        if (target.classList.contains('delete-btn')) {
            this.deletingTaskId = id;
            this.confirmModal.classList.remove('hidden');
        } else if (target.classList.contains('edit-btn')) {
            const task = TaskManager.getTaskById(id);
            if (task) this.openEditModal(task);
        } else if (target.classList.contains('move-right-btn')) {
            const task = TaskManager.getTaskById(id);
            if (task) {
                const columnsOrder = ['todo', 'inprogress', 'done'];
                const nextIdx = columnsOrder.indexOf(task.column) + 1;
                if (nextIdx < columnsOrder.length) {
                    TaskManager.moveTaskColumn(id, columnsOrder[nextIdx]);
                    BoardRenderer.render();
                }
            }
        } else if (target.classList.contains('move-left-btn')) {
            const task = TaskManager.getTaskById(id);
            if (task) {
                const columnsOrder = ['todo', 'inprogress', 'done'];
                const prevIdx = columnsOrder.indexOf(task.column) - 1;
                if (prevIdx >= 0) {
                    TaskManager.moveTaskColumn(id, columnsOrder[prevIdx]);
                    BoardRenderer.render();
                }
            }
        }
    },

    executeDelete: function() {
        if (this.deletingTaskId) {
            TaskManager.deleteTask(this.deletingTaskId);
            this.closeConfirmModal();
            BoardRenderer.render();
        }
    },

    closeConfirmModal: function() {
        this.confirmModal.classList.add('hidden');
        this.deletingTaskId = null;
    },

    clearFilters: function() {
        document.getElementById('search-bar').value = '';
        document.getElementById('priority-filter').value = 'all';
        document.getElementById('sort-by').value = 'created-newest';
        BoardRenderer.render();
    },

    closeConfirmModal: function() {
        this.confirmModal.classList.add('hidden');
        this.deletingTaskId = null;
    },

    clearFilters: function() {
        document.getElementById('search-bar').value = '';
        document.getElementById('priority-filter').value = 'all';
        document.getElementById('sort-by').value = 'created-newest';
        BoardRenderer.render();
    },

    handleMobileTabs: function(e) {
        if (!e.target.classList.contains('tab-link')) return;

        document.querySelectorAll('.tab-link').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        const targetColumnId = e.target.dataset.target;
        document.querySelectorAll('.board-column').forEach(col => {
            col.classList.remove('active-tab-content');
            if (col.id === targetColumnId) {
                col.classList.add('active-tab-content');
            }
        });
    },

    toggleTheme: function() {
        const root = document.documentElement;
        const currentTheme = root.classList.contains('dark-theme') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        if (newTheme === 'dark') {
            root.classList.add('dark-theme');
            this.themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i> Theme';
        } else {
            root.classList.remove('dark-theme');
            this.themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i> Theme';
        }
        StorageManager.setTheme(newTheme);
    }
};
   