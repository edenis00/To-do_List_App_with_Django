function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

function openModal(taskId) {
    document.body.style.overflow = "hidden";
    const modal = document.getElementById("deleteModal");
    const formDelete = modal.querySelector("form");

    delete_url = "delete/0".replace("0", taskId)
    formDelete.action = delete_url

    modal.classList.remove("hidden");
    modal.querySelector('button[type="button"]').focus();
};

function closeModal() {
    document.body.style.overflow = "auto";
    const modal = document.getElementById("deleteModal");

    modal.classList.add("hidden");
};

function activateTab(tab, taskType) {
    console.log("Hello!");
    const tabs = document.querySelectorAll(".tab");
    tabs.forEach(t => {
        t.classList.remove('bg-green-500', 'text-white', 'hover:bg-green-600');
    });

    tab.classList.add('bg-green-500', 'text-white', 'hover:bg-green-600');
    fetchTask(taskType);
};

const spinner = document.getElementById("spinner");
const taskContainer = document.getElementById("taskContainer");

function fetchTask(taskType) {
    spinner.classList.remove('hidden');
    console.log("Spinner is visible");

    fetch(`/tasks?type=${taskType}`, {
        headers: {
            'x-requested-with': 'XMLHttpRequest',
        },
    }).then((response) => {
        if (!response.ok) throw new Error('Failed to fetch task');
        return response.json();
    })
        .then((data) => {
            if (data.tasks.length > 0) {
                renderTask(data.tasks);
            } else {
                taskContainer.innerHTML = '<p class="text-sm text-gray-800">No task found</p>';
            }
        })
        .catch((error) => {
            console.log("An error occurred: ", error);
            taskContainer.innerHTML = '<p class="text-sm text-red-500">Error loading tasks</p>';
        })
        .finally(() => {
            spinner.classList.add('hidden');
            console.log("Spinner is hidden");
        })
}

function renderTask(tasks) {
    if (tasks.length == 0) {
        taskContainer.innerHTML = '<p class="text-sm text-gray-800">No task found</p>';
        return;
    }
    taskContainer.innerHTML = "";
    tasks.forEach(task => {
        var taskElement =
            `
        <div class="shadow-md rounded px-4 py-2 bg-white mb-2">
            <div class="py-1 flex items-center justify-between">
                <div class="flex gap-2">
                    <form>
                        <input
                            type="checkbox"
                            class="form-checkbox h-3 w-3 text-green-500 toggle-complete"
                            data-id=${task.id}
                            ${task.completed ? "checked" : ""}
                        >
                    </form>
                    <h3 class="text-gray-800 w-[200px]">${task.title}</h3>
                </div>
                <div class="flex gap-2">
                    <p class="text-xs mr-2 text-gray-600">Due: ${task.due_date}</p>
                    <a href="/tasks/${task.id}/edit"
                        class="text-xs text-green-500 hover:text-green-600">
                        <i class="fas fa-edit"></i>
                    </a>
                    <button onclick="openModal(${task.id})" type="button"
                        class="text-red-500 hover:text-red-600 text-xs">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        </div>
        `
        taskContainer.innerHTML += taskElement;
    })
    taskCheckbox();
}

function taskCheckbox() {
    const checkboxs = document.querySelectorAll('.toggle-complete');
    checkboxs.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const taskId = this.dataset.id;
            const isChecked = this.checked;

            fetch(`complete/${taskId}`, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrftoken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'completed': isChecked,
                })
            })
                .then((response) => {
                if (!response.ok) throw new Error('Failed to complete task');
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    const taskElement = this.closest('div.shadow-md');
                    const taskTitle = taskElement.querySelector('h3');
                    const taskContainer = document.querySelector('.task-container');
            
                    if (data.completed) {
                        // Mark as completed and move it to the "Complete" tab
                        taskTitle.classList.add('line-through', 'text-gray-500');
                        taskElement.classList.add('completed'); // Add a class for complete tasks
                        taskElement.classList.remove('incomplete'); // Remove from incomplete class
                        fetchTask('complete'); // Refresh completed tasks list
            
                    } else {
                        // Mark as incomplete and move it to the "Incomplete" tab
                        taskTitle.classList.remove('line-through', 'text-gray-500');
                        taskElement.classList.add('incomplete'); // Add a class for incomplete tasks
                        taskElement.classList.remove('completed'); // Remove from completed class
                        fetchTask('incomplete'); // Refresh incomplete tasks list
                    }
                } else {
                    taskContainer.innerHTML = `<p class="text-sm text-gray-800">${data.message}</p>`;
                    this.checked = !isChecked;
                }
            })
            
                .catch((error) => {
                console.log("An error occured: ", error);
                taskContainer.innerHTML = '<p class="text-sm text-gray-800">An error occurred. Please try again</p>';
                this.checked = !isChecked;
                })
        })
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchTask('incomplete');
});