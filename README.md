# SongRandomizer

Hello there, welcome to the start of my journey in creating a small app that will pick a random Python song! This project is the beginning of developing personal projects. As of right now, I am looking to just discover new pieces of music that I may have never otherwise heard, but hopefully I will be able to customize this project even more as I move further along.

For this project, I am developing a flask app that will make calls to the Spotify Developer API. I will log any prerequesites that someone downloading this repository may need, as well as my progress here.

# Requirements to Run:
- Python3
'''
- pip install Flask requests python-dotenv
'''
- A spotify account so that you can login to the Spotify Developer portal and create your own dashboard. After creating your own dashboard, create a .env file within your cloned version of this repository and populate it with the CLIENT_ID and CLIENT_SECRET from your own dashboard.

# DAY 1:
Today I started off by following a tutorial on how to implement OAUTH 2.0 in relation to the Spotify API. Here is the link to that video: https://www.youtube.com/watch?v=olY_2MW4Eik&ab_channel=ImdadCodes

I now feel that I have a basic understanding of OAUTH, and I think that using flask is a great way to start creating a basic user interface without being overwhelmed by all the various facets that come with learning web or app development normally, especially whilst I try learning about how to interact with the API.

While OAUTH may currently not be necessary, I think the tutorial overall provided a great foundation for where I should start with this application. It also gives me the flexiblity to expand capabilities, by implementing more personalized features, in the future should I feel the desire to do so. The tutorial also taught me how to do a basic request for my own playlists, but I am currently only seeing one playlist show up. I wonder if this is because the rest of mine are private, but after making another one public, I have not seen it show up for over 30 minutes now.

Update: From just following the tutorial I realized that my scopes were only 'user-read-private user-read-email', but I also needed to add 'playlist-read-private'. By default, anyone already has access to my public playlists so I do not need to define that in the scope of permissions I am requesting a user grant for the application has access to, but the same cannot be said for private playlists. After adding this scope I can now see ALL of my playlists. As for why changing a private playlist to public did not change anything, I am left to assume that the developer API needs additional time to update.
