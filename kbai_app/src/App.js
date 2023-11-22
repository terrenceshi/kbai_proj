import { useState, useEffect } from 'react';

import { text } from 'd3-request';
import { csvParseRows } from 'd3';
import JSON5 from 'json5'

import { Box } from '@mui/material';

import url from "./data/movie_data6.csv";

import Tinder from './components/Tinder.js'
import SearchApp from './components/SearchApp.js'
import Igs from './components/Igs.js'

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function App() {
  const [appLoaded, setAppLoaded] = useState(false);
  const [tinderMode, setTinderMode] = useState(true);

  const [movieData, setMovieData] = useState([]);
  const [movieLst, setMovieLst] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [hatedMovies, setHatedMovies] = useState([]);
  const [idxLstState, setIdxLstState] = useState([]);
  const [freshLstState, setFreshLstState] = useState([]);

  var movieBatch = 12;

  const getMovies = (max, idxLst, sampleLst) => {
    var firstMovieLst = []

    for(let i = 0; i < max; i++){
      var idx1 = getRandomInt(idxLst.length);
      idx1 = idxLst[idx1]
      idxLst.splice(idx1, 1);

      firstMovieLst.push(sampleLst[idx1]);
    }

    return firstMovieLst
  }

  const refreshMovies = () => {
    if(likedMovies.length >= 10){
      setTinderMode(false);
      Igs(likedMovies, hatedMovies);
    } else {
      // create new freshLst and idxLst depending on genre stuff. Feel free to not lock by year or rating if results r overwhelming
      setMovieLst(getMovies(movieBatch, idxLstState, freshLstState));
    }
  }

  useEffect(() => {
    text(url, function(data) {
      var parseData = csvParseRows(data).slice(1).map((entry) => {
        entry[9] = JSON5.parse(entry[9]);
        entry[11] = JSON5.parse(entry[11]);
        entry[12] = JSON5.parse(entry[12]);
        return entry;
      });
      setMovieData(parseData);

      var freshLst = parseData.filter(function(d){return d[7] >= 80})

      // Get 8 Random Movies
      var idxLst = Array.from(Array(freshLst.length).keys());

      setMovieLst(getMovies(movieBatch, idxLst, freshLst))

      setIdxLstState(idxLst);
      setFreshLstState(freshLst);
      setAppLoaded(true);

      // COLUMN VALUES: 0: title, 1: runtime, 2: runtime label, 3: rating, 
      //                4: rating label, 5: year, 6: year label, 7: popularity
      //                8: genre, 9: genres, 10: plot, 11: tags, 12: nouns, 13: id, 14: poster
    })
  }, []);

  return (
    <Box sx = {{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '94vh'
    }}>
      {
        appLoaded ?
          tinderMode ?
            <Tinder
              movieLst = {movieLst} 
              likedMovies = {likedMovies}
              setLikedMovies = {setLikedMovies}
              hatedMovies = {hatedMovies}
              setHatedMovies = {setHatedMovies}
              refreshMovies = {refreshMovies}
            />
            :
            <SearchApp movieData = {movieData}/>
          :
          <div/>
      }
    </Box>
  );
}

export default App;
