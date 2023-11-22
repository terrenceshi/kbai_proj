# kbai_proj

## to do:

https://www.kaggle.com/datasets/utsh0dey/25k-movie-dataset

MOST UP TO DATE TO DO:
 - Make flashy and shit

Incremental Concept Learning + SD:
 - First, ask user if they like 1-2 movies from categories: Action, Comedy, Drama, Horror
    - Essentially doing some incremental concept learning with what genre they like

    - If they like action, see if they like Adventure, Crime, Thriller, Fantasy, Mystery, Sci-Fi
    - If they like Drama, see if they like Biography, Romance, more Drama idk

    - can get option where user says "ive seen this movie and i like / dislike it" which then updates hypothesis

FULL LIST OF GENRES:
```
array(['Action', 'Animation', 'Adventure', 'Comedy', 'Crime', 'Drama',
       'Biography', 'Fantasy', 'Mystery', 'Horror', 'Sci-Fi', 'Thriller',
       'Family', 'Western', 'War', 'Romance', 'History', 'Musical',
       'Music', 'Sport', 'Film-Noir'], dtype=object)
```