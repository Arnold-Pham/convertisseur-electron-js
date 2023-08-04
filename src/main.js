const { app, BrowserWindow, ipcMain } = require("electron");
const Ffmpeg = require("fluent-ffmpeg");
const path = require("path");

let mainWindow;

if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

app.on("ready", createWindow);

ipcMain.on("video:add", (event, path) => {
  Ffmpeg.ffprobe(path, (error, metadata) => {
    if (error) {
      return console.error(error)
    }
    const result = { ...metadata.format }
    mainWindow.webContents.send('video:done', result)
  })
})

ipcMain.on('video:conv', (event, convert) => {
  convert[0].forEach((video, index) => {
    console.log(video)
    let filename = video.meta.filename
    let outName = filename.substr(filename.lastIndexOf('\\') + 1, filename.lastIndexOf('.'))
    let outDir = app.getPath('desktop')

    let extension = convert[2][convert[1][index]].toLowerCase()

    Ffmpeg(filename)
      .output(`${outDir}\\${outName}.${extension}`)
      .on('progress', () => console.log('In progress'))
      .on('end', () => console.log('Done'))
      .run()
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
