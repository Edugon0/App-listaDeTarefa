const tasklist = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const descInput = document.getElementById("descInput");

function addTask() {
    const taskText = taskInput.value.trim();
    const descText = descInput.value.trim();
    
    if (taskText !== "" && descText !== "") {
        const maxText = taskText.substring(0, 35);

        const li = document.createElement("li");
        li.innerHTML = `
            <span><strong>${maxText}</strong> - ${descText}</span>
            <button class="editButton" onClick="editTask(this)">Editar</button>
            <button class="deleteButton" onClick="deleteTask(this)">Remover</button>
        `;
        tasklist.appendChild(li);
        taskInput.value = "";
        descInput.value = "";
    }
}

function editTask(button) {
    const li = button.parentElement;
    const span = li.querySelector("span");
    const [taskPart, descPart] = span.innerHTML.split(" - ");
    
    const newTaskText = prompt("Editar tarefa:", taskPart.replace("<strong>", "").replace("</strong>", "").trim());
    const newDescText = prompt("Editar descrição:", descPart.trim());
    
    if (newTaskText !== null && newTaskText.trim() !== "" && newDescText !== null && newDescText.trim() !== "") {
        span.innerHTML = `<strong>${newTaskText.trim()}</strong> - ${newDescText.trim()}`;
    }
}

function deleteTask(button) {
    const li = button.parentElement;
    tasklist.removeChild(li);
}


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(function(registration) {
            console.log('Service Worker registrado com sucesso:', registration);
        })
        .catch(function(error) {
            console.log('Falha ao registrar o Service Worker:', error);
        });
}