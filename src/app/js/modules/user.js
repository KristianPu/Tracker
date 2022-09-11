const taskForm = document.querySelector("#taskForm");
const userName = document.querySelector("#userName");
const oldName = document.querySelector("#oldName");
const newName = document.querySelector("#newName");
const editForm = document.getElementById('editForm');
const refreshButton = document.getElementById('refresh');
let el = document.getElementById('tasks');

async function getAll () {
    return await app.getAllUsers();
}

async function postOne (args) {
    await app.postOneUser(args);
}

async function editOne (param1, param2) {
    await app.editOneUser(param1, param2);
}

async function deleteOne (args) {
    await app.deleteOneUser(args);
}

let FetchAll = function(tasks) {

    let data = '';
    const parsedTasks = JSON.parse(tasks)

    if (parsedTasks.length > 0) {
    for (let i = 0; i < parsedTasks.length; i++) {
        console.log(parsedTasks[i])
        data += '<tr>';
        data += `<td class="class" id="${parsedTasks[i]._id}">${parsedTasks[i].firstName + "</td>"}`;
        data += `<td><button id="delButton-btn-${i.toString()}" class="btn btn-danger">Delete</button></td>`;
        data += '</tr>';
        el.innerHTML = data;
    }
    const table = document.querySelector("table");
    for (const currentRow of table.rows) {
        if (!currentRow.textContent.endsWith("Delete")) {
            continue;
        }
        const buttonDelete = currentRow.getElementsByTagName("button")[0]
        const tdText = currentRow.getElementsByTagName("td")[0].id

        buttonDelete.addEventListener("click", async () => {
            await deleteOne(tdText);
            let refresh = await getAll()
            FetchAll(refresh)
        })
    }
    }
    Count(parsedTasks.length);
};

function CloseInput() {
    document.getElementById('edit-box').style.display = 'none';
}

refreshButton.addEventListener("click", async () => {
    let refresh = await getAll()
    FetchAll(refresh)
})

taskForm.addEventListener("submit", async (e) => {

    e.preventDefault()
    await postOne(userName.value);
    taskForm.reset();
    let refresh = await getAll()
    FetchAll(refresh)
})


editForm.addEventListener("submit", async (e) => {

    e.preventDefault()
    await editOne(oldName.value, newName.value);
    editForm.reset();
    let refresh = await getAll()
    FetchAll(refresh)
})

let Count = function(data) {
    let el = document.getElementById('counter');
    let name = 'Tasks';

    if (data) {
        if(data ==1){
            name = 'Task'
        }
    el.innerHTML = data + ' ' + name ;
    } 
    else {
    el.innerHTML = 'No ' + name;
    }
};