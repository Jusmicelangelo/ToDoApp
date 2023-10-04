document.addEventListener("DOMContentLoaded", function() {
const inputForm = document.querySelector("#addToDo");
const input = document.querySelector("#todoInput");
const toDoList = document.querySelector("#todoList");
const lineThrough = document.querySelector("li");

const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
console.log(savedTodos)
for (let i = 0; i < savedTodos.length; i++) {
        if (savedTodos[i].notDeleted === true) {
            let newTodo = document.createElement("li");
            newTodo.innerHTML = savedTodos[i].task;
            toDoList.appendChild(newTodo); 
        }
        else if (savedTodos[i].notDeleted === false) {
            let newTodo = document.createElement("li");
            newTodo.innerHTML = savedTodos[i].task;
            newTodo.style.textDecoration = "line-through"
            toDoList.appendChild(newTodo); 
        } 
        else if (savedTodos[i].notDeleted === "") {
        }   
}

inputForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const newToDO = document.createElement("li");
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    newToDO.innerText = input.value + "   ";
    newToDO.notDeleted = true;
    newToDO.appendChild(deleteBtn);
    input.value = "";
    toDoList.appendChild(newToDO);
    savedTodos.push({task: newToDO.innerHTML, notDeleted: true})
    localStorage.setItem("todos", JSON.stringify(savedTodos))
})

toDoList.addEventListener("click", function(event) {
    // Delete the ToDo if it is a no longer valid task
    if (event.target.tagName === "BUTTON"){
        event.target.parentElement.remove();
        event.target.notDeleted = "";
    }
    // Line-Through the ToDo if the task is done
    else if (event.target.tagName === "LI"){
        event.target.style.textDecoration = "line-through"
        event.target.notDeleted = false;
        console.dir(event.target)
    };
    for (let j = 0; j <savedTodos.length; j++) {
        if (savedTodos[j].task === event.target.innerHTML) {
            savedTodos[j].notDeleted = !savedTodos[j].notDeleted
            localStorage.setItem("todos", JSON.stringify(savedTodos))
        }
        if (savedTodos[j].task === event.target.parentElement.innerHTML) {
            savedTodos[j].notDeleted = ""
            localStorage.setItem("todos", JSON.stringify(savedTodos))
        }
    }
})});



console.dir(localStorage)