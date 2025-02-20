let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const alarmTime = document.getElementById('alarmTime');
    const taskText = taskInput.value.trim();
    const time = alarmTime.value;

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        alarm: time
    };

    tasks.push(task);
    renderTasks();
    taskInput.value = '';
    alarmTime.value = '';

    if (time) {
        setAlarm(task);
    }
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.id = task.id;

        if (task.completed) {
            li.classList.add('completed');
        }

        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button onclick="toggleComplete(${task.id})">Mark</button>
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function toggleComplete(id) {
    const task = tasks.find(task => task.id === id);
    task.completed = !task.completed;
    renderTasks();
}

function editTask(id) {
    const task = tasks.find(task => task.id === id);
    const newText = prompt('Edit your task:', task.text);
    if (newText !== null && newText.trim() !== '') {
        task.text = newText.trim();
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function setAlarm(task) {
    const now = new Date();
    const alarmTime = new Date();
    const [hours, minutes] = task.alarm.split(':');
    alarmTime.setHours(hours);
    alarmTime.setMinutes(minutes);
    alarmTime.setSeconds(0);

    if (alarmTime > now) {
        const timeDiff = alarmTime - now;
        setTimeout(() => {
            alert(`Reminder: ${task.text}`);
        }, timeDiff);
    } else {
        alert('The alarm time is in the past!');
    }
}