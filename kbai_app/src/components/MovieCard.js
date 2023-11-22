import { useState } from 'react';

import { styled } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { Fade } from '@mui/material';

const MuiImg = styled("img")({});

function MovieCard({url, height, loaded, setLoaded}) {
  
  var width = (2/3) * height;

  return (
    <div>
      <Fade 
        in={loaded}
        timeout={{ enter: 1500 }}
      >
        <MuiImg 
          src = {url}
          onLoad = {() => setLoaded(true)}
          sx = {{
            height: height,
            display: loaded ? 'block' : 'none',
        }}/>
      </Fade>

      <Skeleton 
        variant="rectangular"
        width={width} 
        height={height} 
        sx={{
          bgcolor: 'grey.300',
          display: loaded ? 'none' : 'block'
      }}/>
    </div>
  );
}

export default MovieCard;
