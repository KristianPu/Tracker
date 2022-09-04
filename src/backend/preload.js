const  { ipcRenderer, contextBridge } = require("electron");

const API = {
    window: {
        close: () => ipcRenderer.send("app/close"),
        resize: () => ipcRenderer.send("app/resize"),
        minimize: () => ipcRenderer.send("app/minimize"),
    },
    getAllProjects: () => ipcRenderer.invoke("app/getAllProjects"),
    postOneProject: (data) => ipcRenderer.send("app/postOneProject", data),
    editOneProject: (oldName, newName) => ipcRenderer.send("app/editOneProject", oldName, newName),
    deleteOneProject: (data) => ipcRenderer.send("app/deleteOneProject", data),
}

contextBridge.exposeInMainWorld("app", API);