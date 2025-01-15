function openModal(taskId) {
    document.body.style.overflow = "hidden";
    const modal = document.getElementById("deleteModal");
    const formDelete = modal.querySelector("form");

    delete_url = "tasks/delete/0".replace("0", taskId)
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
}


document.addEventListener('DOMContentLoaded', () => {
    fetchTask('incomplete');
});