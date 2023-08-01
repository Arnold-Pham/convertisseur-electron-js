import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { generalStyle } from "./styles";
import Box from "./components/Box.jsx";

const fileTypes = ["MP4", "AVI", "MOV", "OGV", "MPEG"];

export default function App() {
  const [file, setFile] = useState(null);
  const [history, setHistory] = useState([]);
  function addHistory(param) {
    setHistory([...history, param]);
  }
  const handleChange = (file) => {
    setFile(file);
    addHistory(file.name);
  };
  return (
    <div className={generalStyle.container}>
      <h1 className={generalStyle.header.title}>Hello To Drag & Drop Files</h1>
      <FileUploader
        className={generalStyle.upload}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
      <p>{file ? `File name: ${file.name}` : "no files uploaded yet"}</p>
      {history.length == 0
        ? undefined
        : history.map((item, index) => <Box nameFile={index} conv={item} />)}
      {file != null ? (
        <div>
          <button className={generalStyle.button}>Cancel</button>
          <button className={generalStyle.button}>Convert</button>
        </div>
      ) : undefined}
    </div>
  );
}
