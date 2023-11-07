import { useState } from 'react';

import { Box, Typography, Autocomplete, TextField } from '@mui/material';

import MovieCard from './MovieCard.js'

function SearchApp({movieData}) {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [disabledBtn, setDisabledBtn] = useState(true);

    return (
        <Box sx = {{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            alignItems: 'center'
        }}>
            <Typography variant = "h4" sx = {{width: '100%'}}>
                You might like...
            </Typography>

            {/* depending on number of recs, may need to map out rows and shit*/}
            <Box sx = {{
                display: 'flex',
                flexDirection: 'row',
                gap: 2
            }}>
                <MovieCard url = {movieData[2][13]} height = {300}/>
                <MovieCard url = {movieData[3][13]} height = {300}/>
                <MovieCard url = {movieData[4][13]} height = {300}/>
            </Box>

            <Typography variant = "h4" sx = {{width: '100%'}}>
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
