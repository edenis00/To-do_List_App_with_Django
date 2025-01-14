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
        taskElement =
            `
        <div class="shadow-md rounded px-4 py-2 bg-white mb-2">
            <div class="py-2 ">
                <h3 class="text-gray-800 text-xl">${task.title}</h3>
                <p class="text-md text-gray-600 w-full py-2">${task.description}</p>
                <p class="text-xs text-gray-600 mt-1">${task.created_at}</p>
                <div class="flex gap-2 mt-2">
                    <a href="/tasks/${task.id}/edit"
                        class="px-2 py-1 rounded text-white text-xs bg-yellow-500 hover:bg-yellow-600">Edit</a>
                    <button onclick="openModal(${task.id})" type="button"
                        class="px-2 py-1 text-white rounded bg-red-500 hover:bg-red-600 text-xs">Delete</button>
                </div>
                <hr class="mt-2">
            </div>
        </div>
        `
        taskContainer.innerHTML += taskElement;
    })
}


document.addEventListener('DOMContentLoaded', () => {
    fetchTask('incomplete');
});