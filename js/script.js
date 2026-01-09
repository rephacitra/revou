
document.addEventListener('DOMContentLoaded', () => {
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn'); 
const taskDate = document.getElementById('task-date');
const taskList = document.getElementById('task-list');
const emptyImage = document.querySelector('.empty-image');
const todoContainer = document.querySelector('.todo-container')


const toggleEmptyState = () => {
    emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
    todoContainer.style.width = taskList.children.length > 0 ? '100%' : "50%"
};
const formatDate = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};

const addTask = (text, completed = false) => {
    const taskText = text || taskInput.value.trim();
    const taskDateValue = formatDate (taskDate.value);
     if (taskText && !taskDateValue) {
        alert("Tanggal tugas wajib diisi");
        return;
    }
    if(!taskText) {
        return;
    }

    const li = document.createElement('li');
   li.innerHTML = `
    <input type="checkbox" class="checkbox" ${completed ? 'checked' : ''} />

    <div class="task-content">
        <div class="task-main">
            <span class="task-text">${taskText}</span>
            <small class="task-date">${taskDateValue}</small>
        </div>
    </div>

    <div class="task-buttons">
        <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
        <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
    </div>
`;

    const checkbox = li.querySelector ('.checkbox');
    const editBtn = li.querySelector('.edit-btn');

    if (completed) {
        li.classList.add('completed');
        editBtn.disabled = true;
        editBtn.style.opacity = '0.6';
        editBtn.style.pointerEvents = 'none'; }

    checkbox.addEventListener('change', () => {
        const isChecked = checkbox.checked;
        li.classList.toggle('completed', isChecked);
        editBtn.disabled = isChecked;
        editBtn.style.opacity = isChecked ? '0.6': '1';
        editBtn.style.pointerEvents = isChecked ? 'none' : 'auto';});

    editBtn.addEventListener('click', () => {
        if(!checkbox.checked) {
            taskInput.value = li.querySelector('.task-text').textContent;
            taskDate.value = li.querySelector('.task-date').textContent;
            li.remove();
            toggleEmptyState();
        } })

    li.querySelector('.delete-btn').addEventListener ('click', () => {
        li.remove();
        toggleEmptyState();  });

    taskList.appendChild(li);
    taskInput.value = '';
    taskDate.value = '';
    toggleEmptyState();};

    addTaskBtn.addEventListener('click', () => addTask());
    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
        e.preventDefault();   
            addTask (); 
     }});

    const filterTasks = (filter) => {
    const tasks = taskList.querySelectorAll('li');

    tasks.forEach(task => {
        const isCompleted = task.classList.contains('completed');

        if (filter === 'all') {
            task.style.display = 'flex';
        } else if (filter === 'active') {
            task.style.display = isCompleted ? 'none' : 'flex';
        } else if (filter === 'completed') {
            task.style.display = isCompleted ? 'flex' : 'none';
        }
    });
};

    const filterButtons = document.querySelectorAll('.filter-buttons button');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        filterTasks(filter);
    });
});

});