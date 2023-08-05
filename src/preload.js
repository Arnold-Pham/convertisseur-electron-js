const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('app', {
	addVideo: (path, addMetaToHistory) => {
		ipcRenderer.send('video:add', path)
		ipcRenderer.on('video:done', (event, metadata) => addMetaToHistory(metadata))
	},

	convertVideo: (history, extensions, fileTypes, updateProgress) => {
		ipcRenderer.send('video:conv', [history, extensions, fileTypes])
		ipcRenderer.on('video:progress', (event, newProgress) => updateProgress(newProgress))
	}
})
