# Zenith Kanban - Interactive Task Manager

Zenith Kanban is a modern, responsive project management board designed to help users streamline their daily workflows in real-time. Built using vanilla JavaScript and structured into modular files, it allows users to create, sort, filter, and track tasks dynamically across customized progress columns. The application automatically calculates performance metrics and safely syncs all task data locally so you never lose your progress.

## Live Demo
🔗 **[Click here to view the Live Project]https://safinafatima61-gif.github.io/-task-manager-Safina-Fatima/   git
## Live Link: [ safina-task-manager.netlify.app] 
 Netlify Note: 
---

## Core Features Implemented
* **Dynamic Board State Control:** Move cards seamlessly between 'To Do', 'In Progress', and 'Done' columns using quick-action directional arrows.
* **Live Analytics Dashboard:** Real-time counter cards track Total Tasks, In Progress items, Completed workflows, and Overdue states alongside an animated completion percentage tracker bar.
* **Smart Search Index & Filter Matrix:** Instantly search through task titles, full descriptions, or user-defined keyword tag items. Includes quick filtering options based on task priority levels (Low, Medium, High).
* **Multi-Rule Sorting Engine:** Re-arrange active dashboard boards by Date Created (Newest/Oldest), specific Due Dates, or Weighted Priority weights.
* **Dynamic Tag Chips Architecture:** Custom modal input listener that processes text inputs on comma or Enter keys to render visually stylized tag chips.
* **Strict Fields Validation & Success Toast Notification:** Client-side error checking safeguards input blocks against incomplete fields, featuring a custom confirmation modal window.
* **Seamless Dark Mode Swapping:** Toggle between themes seamlessly with localized visual values saved onto the user's hard drive storage.

---

## Application Screenshots
> **Note:** Replace the placeholder images below with your actual screenshot paths once you take them!

### 1. Desktop Board Layout View
![Desktop Board with Active Tasks] ![alt text](<Desktop board with task.png>)

### 2. Mobile Responsive Tab View
![Mobile Adaptive Grid Layout]![alt text](<Mobile responsive task show.png>)

### 3. Interactive Task Creator Modal Window
![Modal Editor Overlay with Validations]![alt text](<modal view project.png>)

---

## Technologies Used
* **Markup:** Semantic HTML5 Structure Frameworks
* **Styling:** Custom CSS3 (Modular Layouts, Flexbox/Grid Sheets, Fluid Animations Keyframes)
* **Logic Engine:** Vanilla JavaScript (ES6+ Native Object Modules)
* **Data Persistence Engine:** Browser Web Storage API (`localStorage`)
* **Visual Identity:** FontAwesome Content Delivery Icon Networks

---

## Data Structure Example
Here is the exact task object blueprint processed by the application logic inside our controllers:

```json
{
  "id": "task_1719574281000",
  "title": "Fix mobile tab overflow issues",
  "description": "Adjust stylesheet properties to prevent text clipping and scroll bugs.",
  "priority": "High",
  "dueDate": "2026-06-25",
  "tags": ["CSS", "Bug", "Mobile"],
  "column": "To Do",
  "dateCreated": "2026-06-28T10:11:21.000Z"
}




  ## Required Task Data Structure
Each task is stored as a JavaScript object in a flat array following the exact schema required:

```javascript
const tasks = 
  {
    id: 1703001234567,       // Date.now() at creation time
    title: 'Build the login page',
    description: 'Create a responsive login form with validation',
    priority: 'high',        // 'high' | 'medium' | 'low'
    column: 'inprogress',    // 'todo' | 'inprogress' | 'done'
    dueDate: '2025-12-25',   // ISO date string YYYY-MM-DD
    tags: ['HTML', 'CSS', 'JS'],
    createdAt: 1703001234567 // Date.now() at creation time
  }



3. Launch the Interface App
Since this application uses pure vanilla front-end technologies without any complex build tools, you do not need to install any heavy dependencies.

Simply double-click the index.html file to open it directly in your favorite web browser.

Recommended option: Right-click inside the project workspace folder using VS Code and select "Open with Live Server" to ensure all module paths resolve natively.

What I Learned (Challenges & Solutions)
Building this project was a huge learning curve for me. Managing a multi-file architecture using native JavaScript without relying on heavy external frameworks like React was much tougher than I initially thought. My biggest roadblock was figuring out how to pass data cleanly between my different script modules—like updating the global dashboard state counters inside stats.js the exact moment a task got deleted or edited inside board.js.

I ran into a lot of bugs where the DOM wouldn't re-render properly after actions, or data would sync to localStorage but disappear from the screen. Solving this taught me how important structured design patterns are; I had to build a central sync function (syncInterfaceData) that completely acts as a single source of truth. Figuring out how to build the dynamic tag-chip inputs using just raw keyboard event listeners was also an amazing confidence booster!

Video Walkthrough Demonstration
🎥 Watch the full 4-Minute Feature Walkthrough Video on YouTube

This video walks through the entire live application showing how to create a new task, trigger validation errors, search/filter items, toggle dark mode, and verify local data retention after refreshing.


### Iske baad terminal mein ye chala dein:
Jab aap text change kar lein, toh terminal mein ye 3 commands chala kar GitHub par update kar dein:
```bash
git add README.md
git commit -m "Fixed README markdown colors"
git push origin main --force

##How to Run This Project Locally
Follow these simple step-by-step instructions to get the project running on your computer:

Download or Clone the Files:
Clone this repository using git:  link 
git clone  https://github.com/safinafatima61-gif/-task-manager-Safina-Fatima.git



