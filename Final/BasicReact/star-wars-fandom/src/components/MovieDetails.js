import React from 'react';
import CommentsSection from './CommentsSection';

const MovieDetails = ({ props }) => {
  return (
    <div id={`movie-details-${props.episode}`} className="movie-details" hidden>
      <img src={`/images/${props.character.image}`} alt={props.character.image} />
      <h2>{props.character.name}</h2 >
      <h5>{props.character.bio}</h5>
      <CommentsSection episode={props.episode}></CommentsSection>
    </div>
  );
};

export default MovieDetails;
