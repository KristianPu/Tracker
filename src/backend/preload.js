const  { ipcRenderer, contextBridge } = require("electron");

const API = {
    window: {
        close: () => ipcRenderer.send("app/close"),
        resize: () => ipcRenderer.send("app/resize"),
        minimize: () => ipcRenderer.send("app/minimize"),
    },
    getAllProjects: () => ipcRenderer.invoke("app/getAll"),
    postOneProject: (data) => ipcRenderer.send("app/postOne", data),
    editOneProject: (oldName, newName) => ipcRenderer.send("app/editOne", oldName, newName),
    deleteOneProject: (data) => ipcRenderer.send("app/deleteOne", data),
    electron: () => process.versions.electron,
}

contextBridge.exposeInMainWorld("app", API);