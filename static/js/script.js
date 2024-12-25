function openModal(taskId) {
    document.body.style.overflow = "hidden";
    const modal = document.getElementById("deleteModal");
    const formDelete = modal.querySelector("form");

    delete_url = "{% url 'task-delete', 0 %}".replace("0", taskId)
    formDelete.action = delete_url

    modal.classList.remove("hidden");
    modal.querySelector('button[type="button"]').focus();
}

function closeModal() {
    document.body.style.overflow = "auto";
    const modal = document.getElementById("deleteModal");

    modal.classList.add("hidden");
}