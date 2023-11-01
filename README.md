# kbai_proj

## to do:

clean data:
 - FIX runtime BS.

 - Look into getting plot synopsis

 - Decide if you want to cull any amount of entries

Sentence Reading:
 - Design Sentence Reading Algorithm
     - Data to extract: 
         - keywords for themes
             - in terms of processing, just need to be able to identify nouns
             - highkey will be carried by provided plot keywords

             - once keywords are extracted, can look to create groups (time travel, demons, etc)
                 - assign movie to group(s)

         - if can get plot synopsis, look for possibility of twists or good / bad ending

         - can also use adjectives to determine atmosphere of film. 
             - if getting reviews, can look into stuff like:
                 - funny
             - atmosphere options: tense, relaxed, 

    - final csv will be same but with new columns that include tags / keywords we want

Incremental Concept Learning:
 - Need to study algorithm.

 - In addition to tags assigned by sentence understanding, use metadata such as cast, runtime, rating

Software Dev:
 - React app

 - User is first prompted on how much they like certain movies
     - movies with high user ratings will make the algorithm ask the user for more movies of that genre

     - after X amount of movies rated, the app will give back movies with highest scores
         - goes through all movies and sees if movie fits concept.