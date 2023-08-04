import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { generalStyle } from "./styles";
import Box from "./components/Box.jsx";

const fileTypes = ["MP4", "AVI", "MOV", "OGV", "MPEG"];

const convertTime = (timeInSeconds) => {
  const timeInMilliseconds = timeInSeconds * 1000;

  const date = new Date(timeInMilliseconds);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return formattedTime;
};

export default function App() {
  const [file, setFile] = useState(null);
  const [history, setHistory] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});

  const handleChange = (doc) => {
    setFile(doc)
    const path = doc.path
    app.addVideo(path, addMetaToHistory)
  }

  const addMetaToHistory = (param) => {
    setHistory([...history, { meta: param, id: history.length }]);
  };

  const handleSelectChange = (fileIndex, value) => {
    setSelectedValues((prevSelectedValues) => ({ ...prevSelectedValues, [fileIndex]: value }));
  };
  console.log(selectedValues)

  const handleCancel = () => {
    setFile(null);
    setHistory([]);
  };

  const handleDelete = (param) => {
    const numericId = parseInt(param, 10);
    if (!isNaN(numericId)) {
      const arrayHistory = history.filter((item) => item.id !== numericId);
      setHistory(arrayHistory);
    }
  };

  const handleConvert = () => app.convertVideo(history);

  return (
    <div className={generalStyle.container}>
      <h1 className={generalStyle.title}>Convert Files</h1>
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
      {history.map((item) => <Box key={item.id} nameFile={item.id} conv={item.meta} fileTypes={fileTypes} onSelectChange={handleSelectChange} handleDelete={handleDelete} duree={convertTime(item.meta.duration)} />)}
      {history.length !== 0 && (
        <div className={generalStyle.button.container}>
          <button className={generalStyle.button.red} onClick={handleCancel}>Cancel</button>
          <button className={generalStyle.button.blue} onClick={handleConvert}>Convert</button>
        </div>
      )}
    </div>
  );
}
