# kbai_proj

## Dataset Link and Complete List of Genres:

https://www.kaggle.com/datasets/utsh0dey/25k-movie-dataset

FULL LIST OF GENRES:
```
array(['Action', 'Animation', 'Adventure', 'Comedy', 'Crime', 'Drama',
       'Biography', 'Fantasy', 'Mystery', 'Horror', 'Sci-Fi', 'Thriller',
       'Family', 'Western', 'War', 'Romance', 'History', 'Musical',
       'Music', 'Sport', 'Film-Noir'], dtype=object)
```

## Setting Up Locally

### Playing with My Jupyter Notebooks?

It's not necessary to do anything with anything in the research folder, as the purpose of all those notebooks is to produce the final csv, which you can just download in "Setting up the React App". However, if you must, first, create a folder named "data" and insert the kaggle dataset into "data". You'll probably have to rename the csv file to "imdb_data.csv".

In chronological order, you'll probably want to run:
```
data cleaning.ipynb
get posters.ipynb
popularity.ipynb
duplicates.ipynb
```

The next thing you'll have to do is get a tmdb api key. It should be easy to get online, but worst case, you could ask me for mine. You'll have to paste the key into any cell that says 

```
key = ""
```

I believe every notebook aside from duplicates.ipynb has a cell like this. Note that some cells will take a long time.

By the end of all of this, you'll end up with movie_data7.csv in the data folder.

### Setting up the React App
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
