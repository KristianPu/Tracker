async function getAll () {
    return await app.getAllProjects();
}

async function getOne (id) {
	return await app.getProjectById(id);
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

let popup = document.getElementById('popup');

function openPopup() {
	popup.classList.add('open-popup');
}

function closePopup() {
	popup.classList.remove('open-popup');
}

// Parse Form Inputs
const parseInputs = (filteredData, taskObject) => {
	if (filteredData['name'] === taskObject[0].name) {
		delete filteredData['name']
	}
	if (typeof taskObject[0].startDate === "string") {
		if (filteredData['startDate'] === taskObject[0].startDate.substr(0,10)) {
			delete filteredData['startDate']
		}
	}
	if (typeof taskObject[0].endDate === "string") {
		if (filteredData['endDate'] === taskObject[0].endDate.substr(0,10)) {
			delete filteredData['endDate']
		}
	}
	if (filteredData['timeSpent'] === taskObject[0].timeSpent) {
		delete filteredData['timeSpent']
	}
	return filteredData
}
const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;
const timeFormat = value => /^(?:\d+[hms]?|\d+h(?:[ ]*[0-5]?\dm)?(?:[ ]*[0-5]?\ds)?|\d+m[ ]*[0-5]?\ds)$/.test(value);
const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    input.classList.remove('success');
    input.classList.add('error');
	console.log(input)

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};
const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    input.classList.remove('error');
    input.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}

const checkName = () => {

    let valid = false;
    const min = 3,
        max = 25;
	const nameEl = document.querySelector('#name');
    const name = nameEl.value.trim();

    if (!isRequired(name)) {
        showError(nameEl, 'Name cannot be blank.');
    } else if (!isBetween(name.length, min, max)) {
        showError(nameEl, `Name must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(nameEl);
        valid = true;
    }
    return valid;
}

const checkStartDate = () => {

	let valid = false;
	const startDateEl = document.querySelector('#startDate');
	const startDate = startDateEl.value.trim();
	if (!isRequired(startDate)) {
		showError(startDateEl, 'Start Date cannot be empty')
	} else {
		showSuccess(startDateEl);
		valid = true;
	}
	return valid;
}

const checkTimeSpent = () => {
	let valid = false;
	const timeSpentEl = document.querySelector('#timeSpent');
	const timeSpent = timeSpentEl.value.trim();
	if (!timeFormat(timeSpent)) {
		showError(timeSpentEl, 'Time Spent should be like 1h 30m')
	} else {
		showSuccess(timeSpentEl)
		valid = true;
	}
	return valid
}

window.addEventListener('load', async () => {

	const buttonAddTask = document.querySelector('#add-task')
	const list_el = document.querySelector("#tasks");
	const search = document.querySelector("#button-search");
	const task_search = document.querySelector("#task-search");
	const list_tasks_obj = JSON.parse(await getAll());
	showTasks(list_tasks_obj);

	let search_input = document.getElementById("task-search")
	search_input.addEventListener('keyup', () => {
		liveSearch()
	})

	const tasks = document.querySelectorAll('.task')

	function liveSearch() {
		let task_search_input = document.querySelector("#task-search").value
		for (const task of tasks) {
			if (task.querySelector('.content').querySelector('.text').value.toLowerCase().includes(task_search_input.toLowerCase())) {
				task.classList.replace('hide', 'task')
			} else {
				task.classList.replace('task', 'hide')
			}
		}
	}

	buttonAddTask.addEventListener('click', async (e) => {
		e.preventDefault()
		openPopup()
		console.log('buttonAddTask button')
		const buttonCancel = document.querySelector('#cancel-button')
		const buttonSubmit = document.querySelector('#submit-button')
		buttonCancel.addEventListener('click', (e) => {
			e.preventDefault()
			closePopup()
		}, {once: true})

		buttonSubmit.addEventListener('click', async (e) => {
			e.preventDefault()
			const formInputs = document.querySelectorAll('#pop-form input')
			const filteredData = Array.from(formInputs).reduce((acc, input) => ({
				...acc, [input.id]: input.value
			}), {})
			let isValid = checkName() && checkStartDate() && checkTimeSpent()
			let isFormValid = isValid
			if (isFormValid) {
				await postOne(filteredData)
				closePopup()
				document.getElementById('pop-form').reset()
			}
		})
	})

	search.addEventListener('click', async () => {
		const inputValue = task_search.value
		const task = await getAllLike(inputValue);
		showTasks(task)
	})

	 

	async function showTasks (list) {

		list_el.replaceChildren()

		for (let task of list) {
			
			const taskObject = list_tasks_obj.filter((taskObj) => taskObj._id === task._id)

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
					let form = document.querySelectorAll('#pop-form')
					openPopup()
					form[0].elements.name.value = taskObject[0]['name']
					form[0].elements.startDate.value = taskObject[0]['startDate'].substr(0,10)
					form[0].elements.endDate.value = taskObject[0]['endDate'] === null ? 'mm-dd-yyyy' : taskObject[0]['endDate'].substr(0,10)
					form[0].elements.timeSpent.value = taskObject[0]['timeSpent']			

					const buttonCancel = document.querySelector('#cancel-button')
					const buttonSubmit = document.querySelector('#submit-button')

					buttonCancel.addEventListener('click', async () => {
						closePopup()
						document.getElementById('pop-form').reset()
					}, {once: true})

					buttonSubmit.addEventListener('click', async (e) => {
						e.preventDefault();
						const formInputs = document.querySelectorAll('#pop-form input')
						const filteredData = Array.from(formInputs).reduce((acc, input) => ({
							...acc, [input.id]: input.value
						}), {})
						// const parsedInputsObject = parseInputs(filteredData, taskObject)
						let isValid = checkName() && checkStartDate() && checkTimeSpent()
						let isFormValid = isValid
						if (isFormValid) {
								await editOne(task._id, filteredData).then(async () => {
									closePopup()
									const list_tasks_obj = JSON.parse(await getAll());
									showTasks(list_tasks_obj);
									document.getElementById('pop-form').reset()
								})
						}
					})
				}
			});
	
			task_delete_el.addEventListener('click', async (e) => {
				e.preventDefault()
				await deleteOne(task._id);
				list_el.removeChild(task_el);
			});
		}
	}
});