import React from 'react';
import MovieList from './components/MovieList';
import data from './data';

const App = () => {
  return (
    <div className="container">
      <MovieList movies={data} />
    </div>
  );
};

export default App;