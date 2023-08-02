import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { generalStyle } from "./styles";
import Box from "./components/Box.jsx";

const fileTypes = ["MP4", "AVI", "MOV", "OGV", "MPEG"];

export default function App() {
  const [file, setFile] = useState(null);
  const [history, setHistory] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});

  const handleSelectChange = (fileIndex, value) => {
    setSelectedValues((prevSelectedValues) => ({ ...prevSelectedValues, [fileIndex]: value }));
  };

  const handleConvert = () => {
    console.log(selectedValues);
  };

  const addHistory = (param) => {
    setHistory([...history, { value: param, id: history.length }]);
  };

  const handleChange = (file) => {
    setFile(file);
    addHistory(file);
  };

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

  return (
    <div className={generalStyle.container}>
      <h1 className={generalStyle.title}>Convert Files</h1>
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
      {history.map((item) => <Box key={item.id} nameFile={item.id} conv={item.value} fileTypes={fileTypes} onSelectChange={handleSelectChange} handleDelete={handleDelete} />)}
      {history.length !== 0 && (
        <div className={generalStyle.button.container}>
          <button className={generalStyle.button.red} onClick={handleCancel}>Cancel</button>
          <button className={generalStyle.button.blue} onClick={handleConvert}>Convert</button>
        </div>
      )}
    </div>
  );
}
