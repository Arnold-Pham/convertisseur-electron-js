const { app, BrowserWindow, ipcMain } = require('electron')
const Ffmpeg = require('fluent-ffmpeg')
const path = require('path')
const fs = require('fs')

let mainWindow

if (require('electron-squirrel-startup')) app.quit()

const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: 1280,
		height: 720,
		webPreferences: { preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY, },
	})
	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

	//* Open the DevTools.
	// mainWindow.webContents.openDevTools()
}

app.on('ready', createWindow)

ipcMain.on('video:add', (event, path) => {
	Ffmpeg.ffprobe(path, (error, metadata) => {
		if (error) return console.error(error)
		const result = { ...metadata.format }
		mainWindow.webContents.send('video:done', result)
	})
})

ipcMain.on('video:conv', (event, convert) => {
	convert[0].forEach((video, index) => {
		let filename = video.meta.filename,
			outName = filename.substr(filename.lastIndexOf('\\') + 1, filename.lastIndexOf('.')).split('.')[0],
			outDir = app.getPath('desktop'),
			extension = convert[2][convert[1][index]].toLowerCase(),
			way = path.join(outDir, `${outName}.${extension}`),
			compt = 0

		while (fs.existsSync(way)) {
			outName = `${filename.substr(filename.lastIndexOf('\\') + 1, filename.lastIndexOf('.')).split('.')[0]} (${compt})`
			compt += 1
			way = path.join(outDir, `${outName}.${extension}`)
		}

		Ffmpeg(filename)
			.output(`${outDir}\\${outName}.${extension}`)
			.on('progress', (progress) => mainWindow.webContents.send('video:progress', { index, percent: parseInt(progress.percent.toFixed(0)) }))
			.on('end', () => mainWindow.webContents.send('video:progress', { index, percent: 100 }))
			.run()
	})
})

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow() })