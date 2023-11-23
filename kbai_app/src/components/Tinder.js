import { useState } from 'react';

import { Box, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import MovieCard from './MovieCard.js'

function Tinder({movieLst, likedMovies, setLikedMovies, hatedMovies, setHatedMovies, refreshMovies, likeThresh}) {
  const [loaded, setLoaded] = useState(false);

  const iconSize = 36;

  const [idx, setIdx] = useState(0);

  const increment = () => {
    setLoaded(false);
    if(idx < movieLst.length - 1){
      setIdx(idx + 1);
    } else {
      refreshMovies(false);
      setIdx(0);
    }
  }

  const like = () => {
    var newLst = likedMovies.concat([movieLst[idx]]);

    if(newLst.length >= likeThresh){
      refreshMovies(true)
    } else {
      setLikedMovies(newLst);
      increment();
    }
  }

  const hate = () => {
    setHatedMovies(hatedMovies.concat([movieLst[idx]]));
    increment();
  }

  return (
    <Box sx = {{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        m: 4,
        overflow: 'hidden',
        backgroundColor: 'white',
        borderRadius: 2
    }}>
        <MovieCard
          key={idx}
          url = {movieLst[idx][14]} 
          height = {500}
        />

        <Box sx = {{
        display: 'flex',
        flexDirection: 'row-reverse',
        gap: 3,
        padding: 2
        }}>
        <IconButton onClick = {like}>
            <FavoriteIcon sx = {{fontSize: iconSize}}/>
        </IconButton>

        <IconButton onClick = {hate}>
            <ThumbDownIcon sx = {{fontSize: iconSize}}/>
        </IconButton>

        <IconButton onClick = {increment}>
            <VisibilityOffIcon sx = {{fontSize: iconSize}}/>
        </IconButton>
        </Box>
    </Box>

  );
}

export default Tinder;
