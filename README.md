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

# DAY 3:
I did not end up committing anything today, but I spent a lot of time researching about what OAUTH 2.0 actually is. In this process I learned about authorization codes, access and refresh tokens, and just the overall sequence of exchanges in this process between a front-end, backend for front-end (BFF), and the OAUTH tenant (Spotify). What prompted me to look into this a bit more simply had to do with the fact that if I wanted other users to eventually use this application - I wanted to make sure that their accounts and data would be relatively safe, even if this application will not be storing any data. I also just had a few doubts and questions in regards to this topic as well.

My two main doubts in regards to the implementation of this included where the access and refresh tokens needed to be stored and handled, as well as how the back-end would be able to handle multiple users accessing the application at the same time: 

- For the first doubt, I understood that the authorization token and client secret required to obtain tokens are both vital components that needed to be well kept, as attackers could misuse these to steal user information and run their own API calls freely. With that in mind, I ultimately came to the conclusion that in the case of my application, the front-end and user's browser did in no way need to access or handle these key pieces directly. Now, this to me was clear cut and obvious for the client secret, but for some reason, along my research path, I had also convinced myself that the access token may need to be stored on the front-end and perhaps this was simply due to confusion from trying to understand the more complex nature of how OAUTH 2.0 works. Of course, there may be use cases for this that I am unaware of, but as I have a BFF that will run all the API calls I need, I feel that this should not concern me for the time being.

- For the second doubt, it stumped me to understand how most applications were able to manage multiple access and refresh tokens coming in from different users, especially at the same time. It seemed that most sources I looked at that were implementing OAUTH 2.0 never seemed to address this, but I did have a lead in that the initial implementation within Flask that I had followed through with from a tutorial did make use of sessions. This prompted me to look into cookies, sessions, as well as session cookies such that I understood how applications could differentiate different users. Of course, there is a lot more to this in that now one may have to think about a system that can provision, manage, and identify session IDs, but thankfully Flask sessions supposedly should already handle all of this, but I hope to personally be able to verify this soon.

Some other things I wanted to address after today were that I acknowledge that there is still a lot of room for potential improvement. My application is still vulnerable to cross site request forgery (CSRF) attacks as I have seen within my research of cookies and sessions, but these attacks will still be limited to whatever API calls I implement, and how long users have their browsers open for. Also I am aware that implementation of proof key for code exchange (PKCE) within OAUTH 2.0 is highly encouraged nowadays, but for the time being I would like to prioritize the implementation of other functionality for the application now whilst also solidifying my understanding of OAUTH 2.0 without PKCE.

I will say that I ran a few circles within my own head trying to achieve some understanding of how this all works, and how I should be implementing this, but I felt that it was important and beneficial to learn. I also enjoyed expanding my knowledge of new concepts, so while it was a slow day in terms of making actual coding progress, I am still satisfied with the outcome.
