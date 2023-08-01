import React, { useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import { generalStyle } from './styles'

const fileTypes = ['MP4', 'AVI', 'MOV', 'OGV', 'MPEG'];

export default function App() {
	const [file, setFile] = useState(null);
	const [history, setHistory] = useState([]);

	const handleChange = (file) => {
		setFile(file);
	};

	return (
		<div className='App'>
			<h1>Hello To Drag & Drop Files</h1>
			<FileUploader handleChange={handleChange} name='file' types={fileTypes} />
			<p>{file ? `File name: ${file.name}` : 'no files uploaded yet'}</p>
			<div className={generalStyle.container}>
				<button className={generalStyle.button}>Cancel</button>
				<button className={generalStyle.button}>Convert</button>
			</div>
		</div>
	);
}