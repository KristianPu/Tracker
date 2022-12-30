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
    getOneUser: (email) => ipcRenderer.invoke("app/getOneUser", email),
    
    // getAllLogs: () => ipcRenderer.invoke("app/getAllLogs"),
    // postOneLog: (data) => ipcRenderer.send("app/postOneLog", data),
    // editOneLog: (oldName, newName) => ipcRenderer.send("app/editOneLog", oldName, newName),
    // deleteOneLog: (data) => ipcRenderer.send("app/deleteOneLog", data),

    // getAllOrganizations: () => ipcRenderer.invoke("app/getAllOrganizations"),
    // postOneOrganization: (data) => ipcRenderer.send("app/postOneOrganization", data),
    // editOneOrganization: (oldName, newName) => ipcRenderer.send("app/editOneOrganization", oldName, newName),
    // deleteOneOrganization: (data) => ipcRenderer.send("app/deleteOneOrganization", data),

    // getAllUsers: () => ipcRenderer.invoke("app/getAllUsers"),
    // postOneUser: (data) => ipcRenderer.send("app/postOneUser", data),
    // editOneUser: (oldName, newName) => ipcRenderer.send("app/editOneUser", oldName, newName),
    // deleteOneUser: (data) => ipcRenderer.send("app/deleteOneUser", data),
}

contextBridge.exposeInMainWorld("app", API);