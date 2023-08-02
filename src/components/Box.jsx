import React from 'react';
import { generalStyle } from '../styles';

export default function Box(props) {
	return (
		<div className={generalStyle.box.container}>
			<div className={generalStyle.box.top}>
				<div className={generalStyle.box.text}>
					<p>{props.conv.name}</p>
					<p>{(props.conv.size / (1024 * 1024)).toFixed(2)} MB</p>
				</div>
				<div>
					<select className={generalStyle.box.select} name={props.nameFile} id={`select-${props.nameFile}`} onChange={(e) => props.onSelectChange(props.nameFile, e.target.value)} required>
						<option value="none" disabled selected>--Choose--</option>
						{props.fileTypes.map((value, index) => (<option key={index} value={index}>{value}</option>))}
					</select>
					<button className={generalStyle.button.red}>Delete</button>
				</div>
			</div>
			<progress className={generalStyle.box.progress}></progress>
		</div>
	);
}
