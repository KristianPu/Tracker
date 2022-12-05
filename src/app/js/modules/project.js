async function getAll () {
    return await app.getAllProjects();
}

async function getOne (data) {
	return await app.getProjectByName(data);
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

async function getAllLike (filter) {
	await app.getAllLikeProjects(filter)
}

window.addEventListener('load', async () => {

	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const list_el = document.querySelector("#tasks");
	const search = document.querySelector("#button-search");
	const task_search = document.querySelector("#task-search");
	const list_tasks_obj = JSON.parse(await getAll());
	showTasks(list_tasks_obj);

	search.addEventListener('click', async () => {
		const inputName = task_search.value
		const task = await getAllLike({name: new RegExp('^'+inputName+'$', "i")});
		showTasks([task])
		console.log(task)
	})

	function showTasks (list) {

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
	// form.addEventListener('submit', async (e) => {
	// 	e.preventDefault();

	// 	const task = input.value;
	// 	const newTask = await postOne(task);
	// 	console.log(`New task added ${newTask}`)
	// 	input.value = '';

	// 	const list_tasks_obj = JSON.parse(await getAll());
	// 	console.log(list_tasks_obj)
	// 	showTasks(list_tasks_obj);
	// });
});