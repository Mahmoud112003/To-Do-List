////// SELECTORS /////////

let inputBox = document.querySelector("#input-box");      
let listContainer = document.querySelector("#list-container");
let taskCount = document.querySelector("#task-count");    
let clearBtn = document.querySelector("#clear-all");       

////// CORE FUNCTIONS /////////

// Function to create and add a new task to the list
function addTask() {
    if (inputBox.value === "") {
        alert("You Must Write Something!"); // Validation: stop if input is empty
    } else {
        // Create the task (li) element
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li); // Add task to the container

        // Create the delete button (x) inside the task
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";     // Multiplication sign (x)
        li.appendChild(span);

        saveData();       // Sync changes with LocalStorage
        updateCounter();  // Update the task count display
    } 
    inputBox.value = ""; // Clear input after adding
}

// Function to count all current tasks and update the display ui
function updateCounter() {
    let tasks = document.querySelectorAll("#list-container li");
    taskCount.innerText = tasks.length + " Tasks";
}

// Function to save the current list HTML to browser memory
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Function to load and display saved tasks on page load
function showTask(){
    if (localStorage.getItem("data")) {
        listContainer.innerHTML = localStorage.getItem("data");
    }
}

////// EVENT LISTENERS /////////

// Add task when user presses 'Enter' key
inputBox.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// Handle clicks inside the list (Check task or Delete task)
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        // Toggle 'checked' class to strike through the task
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        // Remove the task when 'x' is clicked
        e.target.parentElement.remove();
        saveData();
        updateCounter();
    }
});

// Clear all tasks with a confirmation message
clearBtn.addEventListener("click", function () {
    if (confirm("Are you sure you want to delete all tasks?")) {
        listContainer.innerHTML = ""; // Empty the list
        saveData();
        updateCounter();
    }
});

////// INITIALIZATION /////////

showTask();      // Load existing tasks from storage
updateCounter(); // Refresh counter on startup