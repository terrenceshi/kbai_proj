# kbai_proj

## Random info:

https://www.kaggle.com/datasets/utsh0dey/25k-movie-dataset

FULL LIST OF GENRES:
```
array(['Action', 'Animation', 'Adventure', 'Comedy', 'Crime', 'Drama',
       'Biography', 'Fantasy', 'Mystery', 'Horror', 'Sci-Fi', 'Thriller',
       'Family', 'Western', 'War', 'Romance', 'History', 'Musical',
       'Music', 'Sport', 'Film-Noir'], dtype=object)
```

## Setting Up Locally

Download data from here:

https://drive.google.com/file/d/1NGOVlkSh3fvXBc79At_jjmlEXytm_boG/view?usp=sharing

Be sure to have nodejs installed. Assuming your command-line is in kbai_proj (the project's root directory), you can do:

```
cd kbai_app
cd src
mkdir data
```

Put movie_data7.csv into this new data folder you just created.

```
cd ../../
npm install
npm start
```

## Code Explanation

First, I downloaded the dataset from kaggle. Then, I went into the research folder and ran a bunch of random notebooks to clean the data.

Now, the entire app is in kbai_app. We'll go by file I guess.

### App.js
Well, this is where everything lives. When the app is opened, useEffect() runs. We first parse the data from the csv and initialize a list which is the csv but only with popular movies. We then call getMovies to get X random movies. 

The process of random sampling in javascript is kind of stupid. I ended up having a list of indices and removing indices of movies already sampled so that we could sample without replacement.

In terms of actual content, we have a flexbox which has either the tinder app or the movie recommendations. 

### Tinder.js
A flexbox with a movie card (basically just a movie poster image) and the necessary buttons to like, dislike, or "haven't seen" a movie. Whenever you press a button, you iterate through the list of movies that was generated in App.js. When you run out of movies, we use app.js's refreshMovies function to get more movies. Every time you like a movie, we check if we have the necessary amount of liked movies to start IGS. Disliked movies are also recorded for IGS's purposes.

### Moviecard.js
Just a movie poster image. It's a component so that we can handle loading with a loading skeleton and have a tooltip with the movie's title on top of it.

### Igs.js
Just some functions that given liked movies and disliked movies, will produce hypotheses. After getting the hypotheses, we run every movie against them to see which ones are recommended. We then record every recommended movie in a useState.

### SearchApp.js
Takes the recommended movies (is a dictionary where keys are genres and values are lists of recommended movies), maps out the genres into rows, then maps out the rows into the list of recommended movies. We also have a search bar where the user can check if a searched movie is recommended according to the hypotheses. 
