import { useState, useEffect } from 'react';

import { text } from 'd3-request';
import { csvParseRows } from 'd3';
import JSON5 from 'json5'

import { Box } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

import url from "./data/movie_data7.csv";

import Tinder from './components/Tinder.js'
import SearchApp from './components/SearchApp.js'
import { Igs } from './components/Igs.js'

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
  const [movieRecs, setMovieRecs] = useState({});

  const movieBatch = 20;
  var likeThresh = 15;

  const getMovies = (idxLst, sampleLst) => {
    var firstMovieLst = [];

    for(let i = 0; i < movieBatch; i++){
      let idx1_og = getRandomInt(idxLst.length);
      let idx1 = idxLst[idx1_og]

      idxLst.splice(idx1_og, 1);

      firstMovieLst.push(sampleLst[idx1]);
    }

    setIdxLstState(idxLst)

    return firstMovieLst
  }

  const refreshMovies = (earlyEnd) => {
    if(likedMovies.length >= likeThresh || earlyEnd){
      setTinderMode(false);
      Igs(likedMovies, hatedMovies, movieData, setMovieRecs);
    } else {
      // create new freshLst and idxLst depending on genre stuff. Feel free to not lock by year or rating if results r overwhelming
      setMovieLst(getMovies([...idxLstState], freshLstState));
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

      setMovieLst(getMovies(idxLst, freshLst))

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
              likeThresh = {likeThresh}
            />
            :
            <SearchApp 
              movieData = {movieData}
              movieRecs = {movieRecs}
            />
          :
          <Skeleton 
            variant="rounded"
            width={500 * (2/3)} 
            height={500+84} 
            sx={{
              bgcolor: 'grey.300',
          }}/>
      }
    </Box>
  );
}

export default App;
