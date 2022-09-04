const { app, BrowserWindow, ipcMain } = require('electron');
const { projectController } = require('./backend/controllers')
const path = require('path');
require('electron-reload')(__dirname);
require("./backend/models");
require('dotenv').config();

let window;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {

  window = new BrowserWindow({
    width: 1200,
    height: 800,
    // frame: false, // temp solution to see devTools
    show: false,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname + "/backend/preload.js"),
    }
  });
  window.on("ready-to-show", window.show);
  
  // remove the menu completely
  // window.setMenu(null);

  window.loadFile(path.join(__dirname, '/app/index.html'));
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on("app/close", () => {
  app.quit();
})

ipcMain.on("app/resize", async () => {
  if (window.isMaximized()) {
    window.unmaximize();
  } else {
    window.maximize();
  }
})

ipcMain.on("app/minimize", () => {
  window.minimize();
})

// Project CRUD
ipcMain.handle("app/getAllProjects", () => projectController.getAllProjects());

ipcMain.on("app/postOneProject", (event, data) => projectController.getOneProject(event, data));

ipcMain.on("app/editOneProject", (event, oldName, newName) => projectController.editOneProject(oldName, newName));

ipcMain.on("app/deleteOneProject", (event, id) => projectController.deleteOneProject(id));