const  { ipcRenderer, contextBridge } = require("electron");

const API = {
    getAllLikeProjects: (filter) => ipcRenderer.send("app/getAllLikeProjects", filter),
    getProjectById: (id) => ipcRenderer.invoke("app/getProjectById", id),
    getAllProjects: () => ipcRenderer.invoke("app/getAllProjects"),
    postOneProject: (data) => ipcRenderer.send("app/postOneProject", data),
    editOneProject: (oldName, newName) => ipcRenderer.send("app/editOneProject", oldName, newName),
    deleteOneProject: (data) => ipcRenderer.send("app/deleteOneProject", data),

    login: (email, password) => ipcRenderer.invoke("app/login", email, password),
    register: (firstName, lastName, email, password) => ipcRenderer.send("app/register", firstName, lastName, email, password),
    getOneUser: (email) => ipcRenderer.invoke("app/getOneUser", email)
}

contextBridge.exposeInMainWorld("app", API);