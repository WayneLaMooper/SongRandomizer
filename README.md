# SongRandomizer

Hello there, welcome to the start of my journey in creating a small app that will pick a random Python song! This project is the beginning of developing personal projects. As of right now, I am looking to just discover new pieces of music that I may have never otherwise heard, but hopefully I will be able to customize this project even more as I move further along.

For this project, I am developing a flask app that will make calls to the Spotify Developer API. I will log any prerequesites that someone downloading this repository may need, as well as my progress here.

# Requirements to Run:
- Python3
- The following packages, which can be installed within your cloned repositories commandline or terminal as follows:
```
pip install Flask requests python-dotenv
```
- A spotify account so that you can login to the Spotify Developer portal and create your own dashboard. After creating your own dashboard, create a .env file within your cloned version of this repository and populate it with the CLIENT_ID and CLIENT_SECRET from your own dashboard.
- Once all of the following requirements have been met, open the terminal within your cloned repository and enter the following command to run the application:
```
python main.py
```

# DAY 1:
Today I started off by following a tutorial on how to implement OAUTH 2.0 in relation to the Spotify API and pull the Json of my personal playlists to test. Here is the link to that video: https://www.youtube.com/watch?v=olY_2MW4Eik&ab_channel=ImdadCodes

I now feel that I have a basic understanding of OAUTH, and I think that using flask is a great way to start creating a basic user interface without being overwhelmed by all the various facets that come with learning web or app development normally, especially whilst I try learning about how to interact with the API.

While OAUTH may currently not be necessary, I think the tutorial overall provided a great foundation for where I should start with this application. It also gives me the flexiblity to expand capabilities, by implementing more personalized features, in the future should I feel the desire to do so. The tutorial also taught me how to do a basic request for my own playlists, but I am currently only seeing one playlist show up. I wonder if this is because the rest of mine are private, but after making another one public, I have not seen it show up for over 30 minutes now.

Update: From just following the tutorial I realized that my scopes were only 'user-read-private user-read-email', but I also needed to add 'playlist-read-private'. By default, anyone already has access to my public playlists so I do not need to define that in the scope of permissions I am requesting a user grant for the application has access to, but the same cannot be said for private playlists. After adding this scope I can now see ALL of my playlists. As for why changing a private playlist to public did not change anything, I am left to assume that the developer API needs additional time to update.

# DAY 2:
It has been over a week since my last commit, but in that time I have considered what I wanted to do with this application and what skills I would like to learn and potentially get out of this. Since then, I wanted to move more towards creating a basic fullstack application, which would involve a React + Vite frontend and Flask backend. I would like to work on setting up the environment a little more also, hopefully by eventually learning how to use and then implement Docker for easier testing and deployment. Aside from that though, I am taking this one step at a time and so I have redone the OAUTH implementation such that while the logic remains on Flask, an API call has to be made from the frontend to initiate the login process for users.
