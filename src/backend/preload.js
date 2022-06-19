const  { ipcRenderer, contextBridge } = require("electron");

const API = {
    window: {
        close: () => ipcRenderer.send("app/close"),
        resize: () => ipcRenderer.send("app/resize"),
        minimize: () => ipcRenderer.send("app/minimize")
    }
}

contextBridge.exposeInMainWorld("app", API);