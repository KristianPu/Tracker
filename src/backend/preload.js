const  { ipcRenderer, contextBridge } = require("electron");

const ping = () => ipcRenderer.invoke('ping')

const API = {
    window: {
        close: () => ipcRenderer.send("app/close"),
        resize: () => ipcRenderer.send("app/resize"),
        minimize: () => ipcRenderer.send("app/minimize")
    },
    electron: () => process.versions.electron,
    ping,
}

// pozvati funckiju iz vana unutra npr ping bi bio ping: ping()

contextBridge.exposeInMainWorld("app", API);