async function getAll () {
    return await app.getAllProjects();
}

async function postOne (args) {
    await app.postOneProject(args);
}

async function editOne (param1, param2) {
    await app.editOneProject(param1, param2);
}

async function deleteOne (args) {
    await app.deleteOneProject(args);
}

window.addEventListener('load', async () => {

	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const list_el = document.querySelector("#tasks");
	const list_tasks_obj = JSON.parse(await getAll());
	showTasks(list_tasks_obj);

	async function showTasks (list) {

		list_el.replaceChildren()

		list.forEach(task => {

			const task_el = document.createElement('div');
			task_el.classList.add('task');

			const task_content_el = document.createElement('div');
			task_content_el.classList.add('content');
			task_el.appendChild(task_content_el);

			const task_input_el = document.createElement('input');
			task_input_el.classList.add('text');
			task_input_el.type = 'text';
			task_input_el.value = task.name;
			task_input_el.setAttribute('readonly', 'readonly');
			task_content_el.appendChild(task_input_el);

			const task_actions_el = document.createElement('div');
			task_actions_el.classList.add('actions');
			
			const task_edit_el = document.createElement('button');
			task_edit_el.classList.add('edit');
			task_edit_el.innerText = 'Edit';

			const task_delete_el = document.createElement('button');
			task_delete_el.classList.add('delete');
			task_delete_el.innerText = 'Delete';

			task_actions_el.appendChild(task_edit_el);
			task_actions_el.appendChild(task_delete_el);

			task_el.appendChild(task_actions_el);

			list_el.appendChild(task_el);

			task_edit_el.addEventListener('click', async (e) => {
				if (task_edit_el.innerText.toLowerCase() == "edit") {
					task_edit_el.innerText = "Save";
					task_input_el.removeAttribute("readonly");
					task_input_el.focus();
				} else {
					await editOne(task._id, task_input_el.value)
					task_edit_el.innerText = "Edit";
					task_input_el.setAttribute("readonly", "readonly");
				}
			});
	
			task_delete_el.addEventListener('click', async (e) => {
				list_el.removeChild(task_el);
				await deleteOne(task._id);
			});
		})
	}

	// slusa Add task button
	form.addEventListener('submit', async (e) => {
		e.preventDefault();

		//naziv task-a
		const task = input.value;
		await postOne(task);
		input.value = '';

		const list_tasks_obj = JSON.parse(await getAll());
		showTasks(list_tasks_obj);
	});
});