import { styled } from '@mui/material';
import { Fade } from '@mui/material';

const MuiImg = styled("img")({});

function MovieCard({url, height}) {
  return (
    <MuiImg src = {url} sx = {{
        height: height,
        display: 'block'
    }}/>
  );
}

export default MovieCard;
