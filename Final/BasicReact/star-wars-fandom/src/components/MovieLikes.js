import React from "react";

const MovieLikes = ({ episode }) => {
  let like = 0;
  let dislike = 0;

  let updateLike = () => {
    like++;
    document.getElementById(`like-${episode}`).innerText = `Like ${like}`
  }

  let updateDislike = () => {
    dislike++;
    document.getElementById(`dislike-${episode}`).innerText = `Dislike ${dislike}`
  }

  return (
    <div className="card" id="movie-likes">
      <button id={`like-${episode}`} onClick={updateLike}>Like {like}</button>
      <button id={`dislike-${episode}`} onClick={updateDislike}>Dislike {dislike}</button>
    </div>
  );
};
  
  export default MovieLikes;