import './App.css';
import ReactCarousel from './components/ReactCarousel';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import ShowSearchedMovies from './components/SearchList';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTest, setSearchTest] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [visitedMovies, setVisitedMovies] = useState([]);
  const [inputFocus, setInputFocus] = useState(false);
  const saveToLocalStorage = (key, items) => {
    localStorage.setItem(key, JSON.stringify(items));
  };
  const hideSearch = () => {
    let searchbar = document.querySelector('.searchBarInput');
    searchbar.style.display = 'none';
    let resultDiv = document.querySelector('.resultDiv');
    resultDiv.style.display = 'none';
  };

  useEffect(() => {
    if (searchText) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=a84c81299cedd7c0344634dbbe38a768&language=en-US&query=${searchText}&page=1&include_adult=false`
      )
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data.results);
        });
    }
  }, [searchText]);

  return (
    <>
      <Router>
        <Navbar
          searchText={searchText}
          setSearchText={setSearchText}
          inputFocus={inputFocus}
          setInputFocus={setInputFocus}
          hideSearch={hideSearch}
          searchTest={searchTest}
          setSearchTest={setSearchTest}
          searchResults={searchResults}
        />
        <SearchBar
          keyword={searchText}
          searchResults={searchResults}
          visitedMovies={visitedMovies}
          setVisitedMovies={setVisitedMovies}
          saveToLocalStorage={saveToLocalStorage}
          searchTest={searchTest}
          setSearchTest={setSearchTest}
          hideSearch={hideSearch}
        />
        <Routes>
          <Route
            path='/'
            exact
            element={
              <ReactCarousel
                visitedMovies={visitedMovies}
                setVisitedMovies={setVisitedMovies}
                saveToLocalStorage={saveToLocalStorage}
                inputFocus={inputFocus}
                setInputFocus={setInputFocus}
                hideSearch={hideSearch}
              />
            }
          />

          <Route
            path='/search'
            element={
              <ShowSearchedMovies
                searchText={searchText}
                searchResults={searchResults}
                visitedMovies={visitedMovies}
                setVisitedMovies={setVisitedMovies}
                saveToLocalStorage={saveToLocalStorage}
                searchTest={searchTest}
                setSearchTest={setSearchTest}
                hideSearch={hideSearch}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
