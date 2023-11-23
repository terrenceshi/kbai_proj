import { useState } from 'react';

import { Box, Typography, Autocomplete, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import MovieCard from './MovieCard.js'
import { checkHypoLst } from './Igs.js'

function SearchApp({movieData, movieRecs, hypoState}) {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [likeResult, setLikeResult] = useState(-1);

    const [displayName, setDisplayName] = useState("");

    var defaultMsg = "Search for a movie and see if we think you'd like it!";
    var zeroMsg = "You might not like this one..."
    var oneMsg = "You probably like this one."
    var twoMsg = "You definitely like this one."

    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.up('sm'));

    const handleClick = () => {
        setDisplayName(inputValue[0]);
        var result = checkHypoLst(inputValue, hypoState, false);
        var resultStrict = checkHypoLst(inputValue, hypoState, true);

        if(resultStrict === 1){
            setLikeResult(2);
        } else if(result === 0){
            setLikeResult(0);
        } else if(result === 1){
            setLikeResult(1);
        }
    }

    return (
        <Box sx = {{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            alignItems: 'center',
            p: 4,
            pb: 10,
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
                {likeResult !== -1 ?
                    displayName + ": "
                    :
                    ""}
                {likeResult === -1 ? 
                    defaultMsg
                    :
                    likeResult === 0 ?
                        zeroMsg
                        :
                        likeResult === 1 ? 
                            oneMsg
                            :
                            twoMsg}
            </Typography>

            <Autocomplete
                disableClearable
                open={open}
                forcePopupIcon={false}
                onClose={() => setOpen(false)}
                onChange={(event, value) => {
                    setInputValue(value);
                    if(value.length > 0){
                        setDisabledBtn(false);
                    }
                }}
                onInputChange={(event, value) => {
                    if (value.length > 2) {
                        setOpen(true);
                    } else {
                        setOpen(false);
                    }
                }}
                options={movieData}
                getOptionLabel={option => option[0]}
                sx={{ width: {md: 700, sm: 500, xs: 300} }}
                renderInput={(params) => 
                    <TextField {...params} 
                        label="Enter a movie title" 
                        InputProps={{ ...params.InputProps, 
                        endAdornment: ( 
                            <IconButton 
                                position = "end"
                                onClick = {handleClick}
                                disabled = {disabledBtn}
                            > 
                                <SearchIcon /> 
                            </IconButton> 
                        ) }} 
                    />} 
            />
        </Box>
    );
}

export default SearchApp;
