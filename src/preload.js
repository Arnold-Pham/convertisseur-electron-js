const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('app', {
	addVideo: (path, addMetaToHistory) => {
		ipcRenderer.send('video:add', path)
		ipcRenderer.on('video:done', (event, metadata) => {
			addMetaToHistory(metadata)
		})
	},

	convertVideo: (history) => {
		ipcRenderer.send('video:conv', history)
	}
});
