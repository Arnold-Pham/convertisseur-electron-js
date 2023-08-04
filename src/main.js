const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
// ???? sur la ligne 4
const Ffmpeg = require("fluent-ffmpeg");

if (require("electron-squirrel-startup")) {
  app.quit();
}
let mainWindow;
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
// APP video
ipcMain.on("video:add", (event, path) => {
  Ffmpeg.ffprobe(path, (error, metadata) => {
    if (error) return console.error(error);
    const result = { ...metadata.format, duration: metadata.format.duration };
    mainWindow.webContents.send("metadata:completed", result);
  });
});

// exemple de conversion
ipcMain.on("convert:start", (event, video) => {
  const filename = video.filename;
  const outputName = filename.substring(
    filename.lastIndexOf("/") + 1,
    filename.lastIndexOf(".")
  );
  const outputDir = app.getPath("home");
  Ffmpeg(filename)
    .output(`${outputDir}/${outputName}.mp4`)
    .on("progress", () => console.log("convert in progress..."))
    .on("end", () => console.log("convert done"))
    .run();
});

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
