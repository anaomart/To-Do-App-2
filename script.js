let inPut = document.querySelector(".add-task input");
let AddButton = document.querySelector(".add-task .plus");
let taskContainer = document.querySelector('.tasks-content');
let noTaskMsg = document.querySelector('.no-task-message');
let tasksCount = document.querySelector('.tasks-count span');
let taskCompleted = document.querySelector('.tasks-completed span');
let deleteAll = document.querySelector('.delete-all');
let allDone = document.querySelector('.done');
let count = 0;
let tasksArray = [];
//foucs one input Field 
window.onload = function() {
    inPut.focus();
}

// Adding the task 
AddButton.onclick = function Add() {
    //check if the input is empty 
    if (inPut.value === "") {
        Swal.fire("Can't be empty")
    } else if (tasksArray.includes(inPut.value)) {
        Swal.fire({
            title: `<strong> the task <u>${inPut.value}</u> is already in the tasks </strong>`,
            icon: 'info',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
        })
    } else {
        count += 1;
        //Add to localStorage
        localStorage.setItem(inPut.value, inPut.value);
        // remove the task massage 
        noTaskMsg.remove();
        // create span element 
        let mainSpan = document.createElement('span');
        // create delete btn 
        let deleteButton = document.createElement('span');
        //create  text of the span (new task);
        let text = document.createTextNode(localStorage.getItem(inPut.value));
        // create  text of delete btn 
        let deleteText = document.createTextNode("Delete");
        // add text to the main span (add task)  and give it class
        mainSpan.appendChild(text);
        //add task to array 
        tasksArray.push((inPut.value))
        mainSpan.className = 'task-box';
        // add text to delete btn  and give it class 
        deleteButton.appendChild(deleteText);
        deleteButton.className = 'delete'
            //add delete button to the main span 
        mainSpan.appendChild(deleteButton)
            // add the main span to page 
        taskContainer.appendChild(mainSpan)
            // clear the input 
        inPut.value = "";
        //get the foucs again 
        inPut.focus();
    }
}
document.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete')) {
            e.target.parentNode.remove();
            let taskName = e.target.parentNode.firstChild;
            let indexOfTask = tasksArray.indexOf(taskName.textContent);
            tasksArray[indexOfTask] = '';
            localStorage.removeItem(taskName.textContent)
            if (taskContainer.childElementCount == 0) {
                taskContainer.appendChild(noTaskMsg);

            }
        }
        if (e.target.classList.contains('task-box')) {
            e.target.classList.toggle('finished')
        }
        numberOfTasks();
    })
    // delete all btn ;
deleteAll.onclick = function() {
        count = 0;
        taskContainer.innerHTML = "";
        taskContainer.appendChild(noTaskMsg);
        tasksArray = [];
        localStorage.clear();
    }
    // all done btn ;
allDone.onclick = function() {
    let allTasks = document.querySelectorAll('.task-box');

    allTasks.forEach(function(e) {
        e.classList.toggle('finished');
    });
};
// Number of tasks and completed tasks
function numberOfTasks() {
    tasksCount.textContent = document.querySelectorAll('.task-box').length;
    taskCompleted.textContent = document.querySelectorAll('.finished').length;

}

window.onload = function() {
    let keys = Object.keys(localStorage);
    keys.forEach(function(key) {
        noTaskMsg.remove();
        let mainSpan = document.createElement('span');
        // create delete btn 
        let deleteButton = document.createElement('span');
        //create  text of the span (new task);
        let text = document.createTextNode(localStorage.getItem(key));
        // create  text of delete btn 
        let deleteText = document.createTextNode("Delete");
        // add text to the main span (add task)  and give it class
        mainSpan.appendChild(text);
        mainSpan.className = 'task-box';
        // add text to delete btn  and give it class 
        deleteButton.appendChild(deleteText);
        deleteButton.className = 'delete'
            //add delete button to the main span 
        mainSpan.appendChild(deleteButton)
            // add the main span to page 
        taskContainer.appendChild(mainSpan)
    })
}
