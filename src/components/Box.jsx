import React from 'react'
import { generalStyle } from '../styles'

export default function Box(props) {
	const deleteBox = () => props.handleDelete(props.nameFile)

	return (
		<div className={generalStyle.box.container}>
			<div className={generalStyle.box.top}>
				<div className={generalStyle.box.text}>
					<p>{props.conv.filename.substr(props.conv.filename.lastIndexOf('\\') + 1, props.conv.filename.lastIndexOf('.') + 1)}</p>
					<p>{props.duree}</p>
				</div>
				<div>
					<select className={generalStyle.box.select} name={props.nameFile} id={`select-${props.nameFile}`} onChange={(e) => props.onSelectChange(props.nameFile, e.target.value)} required >
						{props.fileTypes.map((value, index) => <option key={index} value={index}>{value}</option>)}
					</select>
					<button className={generalStyle.button.red} onClick={deleteBox}>Delete</button>
				</div>
			</div>
			{props.progress ? <progress className={generalStyle.box.progress} value={props.progress} max="100"></progress> : undefined}
		</div >
	)
}
