import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
// import { generalStyle } from "./styles";
// import Box from "./components/Box.jsx";

const fileTypes = ["MP4", "AVI", "MOV", "OGV", "MPEG"];

const convertTimeToFormat = (timeInSeconds) => {
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
  const [video, setVideo] = useState(null);

  const videoHandler = (metadata) => {
    setVideo(metadata);
  };

  const handleChange = (file) => {
    const path = file.path;
    app.addVideo(path, videoHandler);
  };
  const convertVideoHandler = () => app.convertVideo(video);
  return (
    <div className="container mx-auto p-5">
      <FileUploader
        label="Upload video"
        classes="h-[30vh!important]"
        types={fileTypes}
        handleChange={handleChange}
      />
      <section className="mt-10">
        {video ? (
          <div>
            <h3>{video.filename.split("\\").at(-1)}</h3>
            <p>{convertTimeToFormat(video.duration)}</p>
            <button onClick={convertVideoHandler}>convert</button>
          </div>
        ) : (
          "Any Video added"
        )}
      </section>
    </div>
  );
}
