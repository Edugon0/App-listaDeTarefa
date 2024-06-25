const tasklist = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const descInput = document.getElementById("descInput");

// Carrega tarefas salvas ao carregar a página
window.addEventListener('load', function() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => addTaskToDOM(task));
});

function addTask() {
    const taskText = taskInput.value.trim();
    const descText = descInput.value.trim();
    
    if (taskText !== "" && descText !== "") {
        const maxText = taskText.substring(0, 35);
        const task = { id: Date.now(), taskText: maxText, descText };

        addTaskToDOM(task); // Adiciona a tarefa na lista visual
        saveTask(task); // Salva a tarefa no armazenamento local

        taskInput.value = "";
        descInput.value = "";

        randomNotification(); // Adiciona notificação ao adicionar tarefa com sucesso
    }
}

function addTaskToDOM(task) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span><strong>${task.taskText}</strong> - ${task.descText}</span>
        <button class="editButton" onClick="editTask(this)">Editar</button>
        <button class="deleteButton" onClick="deleteTask(this)">Remover</button>
    `;
    tasklist.appendChild(li); // Adiciona o item à lista visual na tela
}

function saveTask(task) {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
}

function editTask(button) {
    const li = button.parentElement;
    const span = li.querySelector("span");
    const [taskPart, descPart] = span.innerHTML.split(" - ");
    
    const newTaskText = prompt("Editar tarefa:", taskPart.replace("<strong>", "").replace("</strong>", "").trim());
    const newDescText = prompt("Editar descrição:", descPart.trim());
    
    if (newTaskText !== null && newTaskText.trim() !== "" && newDescText !== null && newDescText.trim() !== "") {
        span.innerHTML = `<strong>${newTaskText.trim()}</strong> - ${newDescText.trim()}`;
        updateTaskInLocalStorage(li.id, newTaskText, newDescText);
    }
}

function updateTaskInLocalStorage(id, newTaskText, newDescText) {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = savedTasks.map(task => {
        if (task.id === parseInt(id)) {
            task.taskText = newTaskText;
            task.descText = newDescText;
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

function deleteTask(button) {
    const li = button.parentElement;
    const taskId = parseInt(li.id);
    li.remove();
    deleteTaskFromLocalStorage(taskId);
}

function deleteTaskFromLocalStorage(id) {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = savedTasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}



if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(function(registration) {
            console.log('Service Worker registrado com sucesso:', registration);
        })
        .catch(function(error) {
            console.log('Falha ao registrar o Service Worker:', error);
        });
}


/* Notificação */
document.getElementById('btn-notification').addEventListener('click', function() {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            console.log('Notificação permitida pelo usuário.');
            
			randomNotification();
		} else {
            console.log('O usuário não permitiu notificar.');
        }
    });
});


var games = [
    { name: 'Tarefa foi adicionada', author: 'Eduardo', slug: 'icon-192x192.png' }
];


function randomNotification() {
    const randomItem = Math.floor(Math.random() * games.length);
    const notifTitle = games[randomItem].name;
    const notifBody = `Created by ${games[randomItem].author}.`;
    const notifImg = `${games[randomItem].slug}`;
    const options = {
        body: notifBody,
        icon: notifImg
    };
    new Notification(notifTitle, options);
    console.log('Notificação exibida.');
}