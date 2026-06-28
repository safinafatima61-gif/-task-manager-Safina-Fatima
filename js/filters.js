



















const FilterController = {
    filterAndSort(tasks, searchQuery, priorityFilter, sortBy) {
        let filtered = [...tasks];
        
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(task => 
                task.title.toLowerCase().includes(query) || 
                task.description.toLowerCase().includes(query) ||
                task.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }
        
        if (priorityFilter !== 'All') {
            filtered = filtered.filter(task => task.priority === priorityFilter);
        }
        
        filtered.sort((a, b) => {
            if (sortBy === 'newest') return new Date(b.dateCreated) - new Date(a.dateCreated);
            if (sortBy === 'oldest') return new Date(a.dateCreated) - new Date(b.dateCreated);
            if (sortBy === 'dueDate') {
                if (!a.dueDate) return 1;
                if (!b.dueDate) return -1;
                return new Date(a.dueDate) - new Date(b.dueDate);
            }
            if (sortBy === 'priority') {
                const weights = { 'High': 3, 'Medium': 2, 'Low': 1 };
                return weights[b.priority] - weights[a.priority];
            }
            return 0;
        });
        
        return filtered;
    }
};