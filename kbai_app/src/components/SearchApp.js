import { useState } from 'react';

import { Box, Typography, Autocomplete, TextField } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import MovieCard from './MovieCard.js'

function SearchApp({movieData, movieRecs}) {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [disabledBtn, setDisabledBtn] = useState(true);

    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <Box sx = {{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            alignItems: 'center',
            p: 4,
            width: {sm: 680, xs: 340}
        }}>
            <Typography variant = "h4" sx = {{width: '100%'}}>
                Movie Recommendations
            </Typography>

            {movieRecs.map((genreInfo, genreIdx) => (
                <Box key = {genreIdx} sx = {{
                    display: 'flex', 
                    flexDirection: 'column',
                    gap: 1,
                    width: 1
                }}>
                    <Typography variant = "h5" sx = {{pb: 1}}>
                        {genreInfo[0]}
                    </Typography>
                    
                    <Box sx = {{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: {sm: 2, xs: 1},
                        width: 1,
                        overflowX: 'auto'
                    }}>
                        {genreInfo[1].map((movieInfo, movieIdx) => (
                            <MovieCard
                                key = {movieIdx}
                                url = {movieInfo[14]} 
                                height = {isSm ? 200 : 150}
                            />
                        ))}

                    </Box>
                </Box>
            ))}

            <Typography variant = "h5" sx = {{width: '100%'}}>
                Search for a movie and see if we think you'd like it!
            </Typography>

            <Autocomplete
                disableClearable
                open={open}
                onClose={() => setOpen(false)}
                onChange={(event, value) => {
                    setInputValue(value);
                    setDisabledBtn(false);
                }}
                onInputChange={(event, value) => {
                    if (value.length > 2) {
                        setOpen(true);
                    } else {
                        setOpen(false);
                    }
                }}
                options={movieData.map((row) => {return row[0]})}
                sx={{ width: {md: 700, sm: 500, xs: 300} }}
                renderInput={(params) => <TextField {...params} label="Enter a movie title" variant="outlined" />}
            />
        </Box>
    );
}

export default SearchApp;
