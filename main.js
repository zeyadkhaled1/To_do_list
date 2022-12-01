let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

//Empty array to store the tasks
let arrayoftasks = [];

//Check if there is Tasks in Local Storage 
if (localStorage.getItem("tasks")) {
    arrayoftasks = JSON.parse(localStorage.getItem("tasks"));
}

GetDataFromLocalStorage();

//Add task
submit.onclick = function () {
    if (input.value !== "") {
        addtasktoarray(input.value); //Add task to array of tasks
        addDatatoLocalStorage(arrayoftasks) //add Tasks to Local Storage
        input.value = "";
        addelementstopagefrom(arrayoftasks);
        let audio = document.querySelector("#audio");
        audio.play();
    }
}

//Remove Task
tasksDiv.addEventListener("click", function (e) {
    //Delete Button
    if (e.target.classList.contains("del")) {
        //Remove Element From Page
        e.target.parentElement.remove();
        //Remove Task From Local Storage
        let newtaskarray = deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        addDatatoLocalStorage(newtaskarray);
    }
    //Task Element
    if (e.target.classList.contains("task")) {
        //Toggle Completed For the Task
        togglestatustaskwith(e.target.getAttribute("data-id"));
        addDatatoLocalStorage(arrayoftasks);
        //Toggle Done Class
        e.target.classList.toggle("done");
        if (e.target.classList.contains("done") && e.target.children[1] == null) {
            let icon = document.createElement("img");
            icon.src = "check.png";
            e.target.prepend(icon);
            let audio = document.querySelector("audio");
            audio.play();
        }
        else if (e.target.children[1] !== null) {
            e.target.children[0].classList.add("hide");
            setTimeout(function () {
                e.target.children[0].remove();
            }, 400)
        }

    }
});

function addtasktoarray(taskText) {
    //Task Data
    const task = { id: Date.now(), title: taskText, completed: false };
    //Push  Task To Array of Tasks 
    arrayoftasks.push(task);
}

function addelementstopagefrom(arrayoftasks) {
    //Empty Task Div
    tasksDiv.innerHTML = "";
    //Looping on Array of Tasks
    arrayoftasks.forEach(task => {
        //Create Main Div
        let div = document.createElement("div");
        div.className = "task";
        //Check if Task is Done
        if (task.completed) div.classList.add("done");
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        //Create Delete Button
        let span = document.createElement("span");
        span.className = "del";
        //Create img 
        if (task.completed) {
            let icon = document.createElement("img");
            icon.src = "check.png";
            div.prepend(icon);
        }
        span.appendChild(document.createTextNode("Delete"));
        //Append Button to Main Div
        div.appendChild(span);
        //Add task Div To Tasks container
        tasksDiv.appendChild(div);
    });
}

function addDatatoLocalStorage(array) {
    localStorage.setItem("tasks", JSON.stringify(array));
}

function GetDataFromLocalStorage() {
    let data = localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addelementstopagefrom(tasks);
    }
}

function deleteTaskWith(taskid) {
    arrayoftasks = arrayoftasks.filter(function (el) {
        return el.id != taskid;
    })
    return arrayoftasks;
}

function togglestatustaskwith(taskid) {
    for (let i = 0; i < arrayoftasks.length; i++) {
        if (arrayoftasks[i].id == taskid) {
            arrayoftasks[i].completed == false ? arrayoftasks[i].completed = true : arrayoftasks[i].completed = false;
        }
    }
}