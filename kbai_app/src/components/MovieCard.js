import { useState } from 'react';

import { styled } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { Fade } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

const MuiImg = styled("img")({});

function MovieCard({info, height}) {
  const [loaded, setLoaded] = useState(false);
  var width = (2/3) * height;

  return (
    <div>
      <Fade 
        in={loaded}
        timeout={{ enter: 1500 }}
      >
        <Tooltip title={info[0]} placement="top">
          <MuiImg 
            src = {info[14]}
            onLoad = {() => setLoaded(true)}
            sx = {{
              height: height,
              display: loaded ? 'block' : 'none',
          }}/>
        </Tooltip>
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
