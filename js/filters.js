// ==========================================================================
// FILTER & SEARCH LAYER (FilterManager)
// Processes search keywords, filters by priority, and handles sorting mechanics
// ==========================================================================

const FilterManager = {
    // Filters and sorts the master task array based on live UI controls
    getFilteredAndSortedTasks: function() {
        // Create a shallow copy of the master array to avoid mutation bugs during sorting
        let filteredTasks = [...TaskManager.getAllTasks()];

        // 1. Text Search Filtering (Checks against Title, Description, and Tags array)
        const searchQuery = document.getElementById('search-bar').value.toLowerCase().trim();
        if (searchQuery) {
            filteredTasks = filteredTasks.filter(task => 
                task.title.toLowerCase().includes(searchQuery) || 
                task.description.toLowerCase().includes(searchQuery) ||
                task.tags.some(tag => tag.toLowerCase().includes(searchQuery))
            );
        }

        // 2. Dropdown Priority Filtering
        const priorityFilter = document.getElementById('priority-filter').value;
        if (priorityFilter !== 'all') {
            filteredTasks = filteredTasks.filter(task => task.priority === priorityFilter);
        }

        // 3. Dropdown Sorting Engine
        const sortBy = document.getElementById('sort-by').value;
        filteredTasks.sort((a, b) => {
            if (sortBy === 'due-soonest') {
                // Ascending order: Dates closer to today appear first
                return new Date(a.dueDate) - new Date(b.dueDate);
            } else if (sortBy === 'priority-high') {
                // Priority custom map comparison weight matrix
                const priorityWeight = { high: 3, medium: 2, low: 1 };
                return priorityWeight[b.priority] - priorityWeight[a.priority];
            } else {
                // Default: created-newest (Descending order of timestamps)
                return b.createdAt - a.createdAt;
            }
        });

        return filteredTasks;
    }
};