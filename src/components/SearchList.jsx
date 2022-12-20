import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import OnClick from './onClick';
function showSearchedMovies({ searchTest, visitedMovies, setVisitedMovies }) {
  if (searchTest.length > 0) {
    const htmlResults = searchTest[0].map((movie) => {
      return (
        <div
          key={movie.id}
          className='CarouselReact searchedMovies'
          onClick={() => {
            OnClick((movie = { movie }), {
              visitedMovies,
              setVisitedMovies,
            });
          }}
        >
          <img
            className='carouselImg'
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.original_title}
          />
          <h4 className='searchedMoviesTitle'>{movie.original_title}</h4>
          <span className='voteSpan'>
            <FontAwesomeIcon icon={faStar} className='star' />
            {movie.vote_average}
          </span>
        </div>
      );
    });

    return (
      <>
        {htmlResults && (
          <div className='searchedMovieContainer'>{htmlResults}</div>
        )}
      </>
    );
  }
}

export default showSearchedMovies;
