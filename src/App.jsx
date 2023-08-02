import React, { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { generalStyle } from './styles';
import Box from './components/Box.jsx';

const fileTypes = ['MP4', 'AVI', 'MOV', 'OGV', 'MPEG'];

export default function App() {
	const [file, setFile] = useState(null);
	const [history, setHistory] = useState([]);

	const addHistory = (param) => {
		setHistory([...history, param]);
	}

	const handleChange = (file) => {
		setFile(file);
		addHistory(file);
	};

	return (
		<div className={generalStyle.container}>
			<h1 className={generalStyle.title}>Convert Files</h1>
			<FileUploader handleChange={handleChange} name='file' types={fileTypes} />
			{history.length != 0 ? history.map((value, index) => <Box nameFile={index} conv={value} fileTypes={fileTypes} />) : undefined}
			{file != null ? <div className={generalStyle.button.container}><button className={generalStyle.button.red}>Cancel</button><button className={generalStyle.button.blue}>Convert</button></div> : undefined}
		</div >
	);
}
