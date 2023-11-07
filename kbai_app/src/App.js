import { useState, useEffect } from 'react';

import { text } from 'd3-request';
import { csvParseRows } from 'd3';

import { Box } from '@mui/material';

import url from "./data/movie_data5.csv";

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
      Igs();
    } else {
      // create new freshLst and idxLst depending on genre stuff. Feel free to not lock by year or rating if results r overwhelming
      setMovieLst(getMovies(movieBatch, idxLstState, freshLstState));
    }
  }

  useEffect(() => {
    text(url, function(data) {
      var parseData = csvParseRows(data);
      setMovieData(parseData);

      var freshLst = parseData.filter(function(d){return d[6] == 'new'})
      var freshLst = freshLst.filter(function(d){return d[4] == 'high'})

      // Get 8 Random Movies
      var idxLst = Array.from(Array(freshLst.length).keys());

      setMovieLst(getMovies(movieBatch, idxLst, freshLst))

      setIdxLstState(idxLst);
      setFreshLstState(freshLst);
      setAppLoaded(true);

      // COLUMN VALUES: 0: title, 1: runtime, 2: runtime label, 3: rating, 
      //                4: rating label, 5: year, 6: year label, 7: genre, 
      //                8: genres, 9: plot, 10: tags, 11: nouns, 12: id, 13: poster
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
