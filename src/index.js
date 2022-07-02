const { app, BrowserWindow, ipcMain } = require('electron');
const electron = require('electron');
const path = require('path');
// app.whenReady().then(main);
// const { currentLoad, cpu } = require("systeminformation")

// Enable live reload for all the files inside your project directory
require('electron-reload')(__dirname);

let window;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {

  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  window = new BrowserWindow({
    width: 1200,
    height: 800,
    // icon: path.join(__dirname, 'icons/icon_top_bar.ico'),
    frame: false,
    show: false,
    useContentSize: true,
    webPreferences: {
      // devTools: false,
      preload: path.join(__dirname + "/backend/preload.js"),
    }
  });

  window.on("ready-to-show", window.show);
  window.webContents.openDevTools()

  // remove the menu completely
  window.setMenu(null);

  // and load the index.html of the app.
  window.loadFile(path.join(__dirname, '/app/index.html'));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
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
