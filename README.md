# kbai_proj

## to do:

https://www.kaggle.com/datasets/utsh0dey/25k-movie-dataset

MOST UP TO DATE TO DO:
 - Adapt IGS from hw to here in order to generate concept and apply concept to recommendations
 - Make flashy and shit

Sentence Reading:
 - figure out if you want to cull common words

Incremental Concept Learning + SD:
 - First, ask user if they like 1-2 movies from categories: Action, Comedy, Drama, Horror
    - Essentially doing some incremental concept learning with what genre they like
    - Might need some filter (ratings + time?) to make sure user has seen majority of films
    - Don't care about what movies they don't like / haven't seen, only draw conclucions from movies they like

    - If they like action, see if they like Adventure, Crime, Thriller, Fantasy, Mystery, Sci-Fi
    - If they like Drama, see if they like Biography, Romance, more Drama idk

    - Run it back if you didn't record 10 movies the user likes

    - once you get say 10 movies the user likes, create hypotheses and run hypotheses against database of similar genre movies

    - can get option where user says "ive seen this movie and i like / dislike it" which then updates hypothesis

- Get posters links for every movie and create sub csvs where movies are filtered by main genre

FULL LIST OF GENRES:
```
array(['Action', 'Animation', 'Adventure', 'Comedy', 'Crime', 'Drama',
       'Biography', 'Fantasy', 'Mystery', 'Horror', 'Sci-Fi', 'Thriller',
       'Family', 'Western', 'War', 'Romance', 'History', 'Musical',
       'Music', 'Sport', 'Film-Noir'], dtype=object)
```