const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("app", {
  // Your code here
  addVideo: (path, videoHandler) => {
    ipcRenderer.send("video:add", path);

    ipcRenderer.on("metadata:completed", (event, metadata) => {
      videoHandler(metadata);
    });
  },
  convertVideo: (video) => ipcRenderer.send("convert:start", video),
});
