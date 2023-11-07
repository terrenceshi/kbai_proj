import { useState } from 'react';

import { Box, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import MovieCard from './MovieCard.js'

function Tinder({movieLst, likedMovies, setLikedMovies, refreshMovies}) {
  const iconSize = 36;

  const [idx, setIdx] = useState(0);

  const increment = () => {
    if(idx < movieLst.length - 1){
        setIdx(idx + 1);
    } else {
        refreshMovies();
        setIdx(0);
    }
  }

  const like = () => {
    setLikedMovies(likedMovies.concat([movieLst[idx]]));
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
        <MovieCard url = {movieLst[idx][13]} height = {500}/>

        <Box sx = {{
        display: 'flex',
        flexDirection: 'row-reverse',
        gap: 3,
        padding: 2
        }}>
        <IconButton onClick = {like}>
            <FavoriteIcon sx = {{fontSize: iconSize}}/>
        </IconButton>

        <IconButton onClick = {increment}>
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
