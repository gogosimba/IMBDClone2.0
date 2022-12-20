import React, { useState, useEffect, useCallback } from 'react';
import Carousel from 'better-react-carousel';
import ListMovies from './Movies';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import OnClick from './onClick';
const api_key = `543c678703dca231327be65e93f95770`;

const url =
`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`;

const ReactCarousel = ({ visitedMovies, setVisitedMovies, hideSearch }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMovies = async () => {
    const res = await fetch(url);
    const movies = await res.json();
    setMovies(movies.results);

    setLoading(false);
  };

  const loadVisitedMovies = useCallback(() => {
    let storageArray = [];
    for (let i = 0; i < localStorage.length; i++) {
      storageArray = [
        ...storageArray,
        JSON.parse(localStorage.getItem(localStorage.key(i))),
      ];
    }
    setVisitedMovies(storageArray);
  }, [setVisitedMovies]);

  useEffect(() => {
    getMovies();
    loadVisitedMovies();
  }, [loadVisitedMovies]);

  function output() {
    if (loading) {
      return <h3 className='loading'>Loading...</h3>;
    }
    if (ReactCarousel) {
      return (
        <>
          <Carousel cols={5} rows={1} gap={0} loop>
            {movies.map((movie) => {
              const { id, title, poster_path, vote_average } = movie;
              return (
                <Carousel.Item key={id}>
                  <div
                    className='ReactCarousel'
                    onClick={() => {
                      OnClick((movie = { movie }), {
                        visitedMovies,
                        setVisitedMovies,
                      });
                    }}
                  >
                    <img
                      className='carouselImg'
                      width='75%'
                      src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                      alt={title}
                    />
                    <h4 className='carouselTitle'>{title}</h4>
                    <span className='voteSpan'>
                      <FontAwesomeIcon icon={faStar} className='star' />
                      {vote_average}
                    </span>
                    <div className='btnDiv d-flex justify-content-center py-2'></div>
                  </div>
                </Carousel.Item>
              );
            })}
          </Carousel>

          <h1 className='recently-section'>Recently viewed</h1>
          <div className='recently-section'>
            {visitedMovies.map((movie) => {
              return <ListMovies movie={movie} key={movie.id} />;
            })}
          </div>
        </>
      );
    }
  }

  return output();
};

export default ReactCarousel;
