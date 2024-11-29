import React from 'react';
import MovieDetails from './MovieDetails';
import MovieLikes from './MovieLikes';

const MovieList = ({ movies }) => {
  const hoverEvent = (episode, affiliation) => {
    let color = (["Jedi", "Rebellion"].includes(affiliation))? "blue" : "red";

    document.getElementById(`image-${episode}`).src = `images/${affiliation}.png`;
    document.getElementById(`image-${episode}`).style.backgroundColor = color;
  }

  const leaveHover = (episode, image) => {
    document.getElementById(`image-${episode}`).src = `images/${image}`;
    document.getElementById(`image-${episode}`).style.backgroundColor = null;
  }

  const details = (episode) => {
    document.getElementById(`movie-details-${episode}`).hidden = !document.getElementById(`movie-details-${episode}`).hidden;
  }

  return (
    <div className="row">
      {movies.map((movie) => (
        <div className="col-6 col-md-4" onMouseOver={() => hoverEvent(movie.episode, movie.best_character.affiliation)} onMouseLeave={() => leaveHover(movie.episode, movie.poster)}>
          <div className="card">
            <img
              src={`/images/${movie.poster}`}
              className="card-img-top"
              alt={movie.title}
              id={`image-${movie.episode}`}
            />
            <div className="card-body">
              <h5 className="card-title">{movie.title}</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                {movie.year}
              </h6>
              
              <a onClick={() => details(movie.episode)} className='card-link'>More...</a>
              <MovieLikes episode={movie.episode}></MovieLikes>
              <MovieDetails props={{episode:movie.episode, character:movie.best_character}}></MovieDetails>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
