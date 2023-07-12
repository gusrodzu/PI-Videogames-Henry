import React from "react";
import { useHistory } from "react-router-dom";
import "./VideoGameButton.module.css"; 

const VideoGameButton = () => {
  const history = useHistory();

  const handleButtonClick = () => {
    history.push("/videogame");
  };

  return (
    <button className="videogame-button" onClick={handleButtonClick}>
      Ir a /videogame
    </button>
  );
};

export default VideoGameButton;
