import React, { useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import { generalStyle } from './styles'
import Box from './components/Box.jsx'

const fileTypes = ['MP4', 'AVI', 'MOV', 'OGV', 'MPEG']

const convertTime = (timeInSeconds) => {
	const timeInMilliseconds = timeInSeconds * 1000
	const date = new Date(timeInMilliseconds)
	const hours = date.getUTCHours()
	const minutes = date.getUTCMinutes()
	const seconds = date.getUTCSeconds()
	const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

	return formattedTime
}

export default function App() {
	const [file, setFile] = useState(null),
		[history, setHistory] = useState([]),
		[selectedValues, setSelectedValues] = useState({}),
		[progress, setProgress] = useState([])

	history.map(element => { if (!selectedValues.hasOwnProperty(element.id)) setSelectedValues({ ...selectedValues, [element.id]: 0 }) })

	const handleCancel = () => {
		setFile(null)
		setHistory([])
		setSelectedValues({})
		setProgress([])
	}

	const handleDelete = (param) => {
		const numericId = parseInt(param, 10)

		if (!isNaN(numericId)) {
			const arrayHistory = history.filter((item) => item.id !== numericId)
			setHistory(arrayHistory)
			setSelectedValues({ ...selectedValues, [numericId]: 0 })

			const arrayProgress = progress.filter((value) => value['index'] !== numericId)
			setProgress(arrayProgress)
		}
	}

	const handleChange = (doc) => {
		const path = doc.path
		app.addVideo(path, addMetaToHistory)
		setFile(doc)
	}

	const handleSelectChange = (fileIndex, value) => {
		selectedValues.hasOwnProperty(fileIndex)
			? setSelectedValues({ ...selectedValues, [fileIndex]: value })
			: setSelectedValues({ [fileIndex]: value })
	}

	const addMetaToHistory = (param) => setHistory([...history, { meta: param, id: history.length }])

	const handleConvert = () => app.convertVideo(history, selectedValues, fileTypes, updateProgress)

	const updateProgress = (newProgress) => setProgress([...progress, newProgress])

	return (
		<div className={generalStyle.container}>
			<h1 className={generalStyle.title}>Convert Files</h1>
			<FileUploader handleChange={handleChange} name="file" types={fileTypes} />
			<div>
				{history.map((item) => <Box key={item.id} nameFile={item.id} conv={item.meta} fileTypes={fileTypes} onSelectChange={handleSelectChange} handleDelete={handleDelete} duree={convertTime(item.meta.duration)} progress={
					progress[item.id] !== undefined && (progress[item.id]['index'] == item.id
						? progress[item.id]['percent']
						: 0)} />)}
			</div>
			{history.length !== 0 &&
				<div className={generalStyle.button.container}>
					<button className={generalStyle.button.red} onClick={handleCancel}>Cancel</button>
					<button className={generalStyle.button.blue} onClick={handleConvert}>Convert</button>
				</div>}
		</div>
	)
}
