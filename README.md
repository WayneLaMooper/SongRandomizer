# SongRandomizer

Hello there, welcome to the start of my journey in creating a small app that will pick a random Python song! This project is the beginning of developing personal projects. As of right now, I am looking to just discover new pieces of music that I may have never otherwise heard, but hopefully I will be able to customize this project even more as I move further along.

For this project, I am developing an application that will involve a React + Vite frontend with a Flask backend for frontend that will make calls to the Spotify Developer API. I will log any prerequesites that someone downloading this repository may need, as well as my progress here!

# DAY 1:
Today I started off by following a tutorial on how to implement OAUTH 2.0 in relation to the Spotify API and pull the Json of my personal playlists to test. Here is the link to that video: https://www.youtube.com/watch?v=olY_2MW4Eik&ab_channel=ImdadCodes

I now feel that I have a basic understanding of OAUTH, and I think that using flask is a great way to start creating a basic user interface without being overwhelmed by all the various facets that come with learning web or app development normally, especially whilst I try learning about how to interact with the API.

While OAUTH may currently not be necessary, I think the tutorial overall provided a great foundation for where I should start with this application. It also gives me the flexiblity to expand capabilities, by implementing more personalized features, in the future should I feel the desire to do so. The tutorial also taught me how to do a basic request for my own playlists, but I am currently only seeing one playlist show up. I wonder if this is because the rest of mine are private, but after making another one public, I have not seen it show up for over 30 minutes now.

Update: From just following the tutorial I realized that my scopes were only 'user-read-private user-read-email', but I also needed to add 'playlist-read-private'. By default, anyone already has access to my public playlists so I do not need to define that in the scope of permissions I am requesting a user grant for the application has access to, but the same cannot be said for private playlists. After adding this scope I can now see ALL of my playlists. As for why changing a private playlist to public did not change anything, I am left to assume that the developer API needs additional time to update.

# DAY 2:
It has been over a week since my last commit, but in that time I have considered what I wanted to do with this application and what skills I would like to learn and potentially get out of this. Since then, I wanted to move more towards creating a basic fullstack application, which would involve a React + Vite frontend and Flask backend. As for why I chose React + Vite specifically, this came down to trying to learn a more recent technology, as many developers I have talked to have used React (Meanwhile Vite was thrown in simply because it was used within a guide that suggested it).I would like to work on setting up the environment a little more also, hopefully by eventually learning how to use and then implement Docker for easier testing and deployment. Aside from that though, I am taking this one step at a time and so I have redone the OAUTH implementation such that while the logic remains on Flask, an API call has to be made from the frontend to initiate the login process for users.

# DAY 3:
I did not end up committing anything today, but I spent a lot of time researching about what OAUTH 2.0 actually is. In this process I learned about authorization codes, access and refresh tokens, and just the overall sequence of exchanges in this process between a front-end, backend for front-end (BFF), and the OAUTH tenant (Spotify). What prompted me to look into this a bit more simply had to do with the fact that if I wanted other users to eventually use this application - I wanted to make sure that their accounts and data would be relatively safe, even if this application will not be storing any data. I also just had a few doubts and questions in regards to this topic as well.

My two main doubts in regards to the implementation of this included where the access and refresh tokens needed to be stored and handled, as well as how the back-end would be able to handle multiple users accessing the application at the same time: 

- For the first doubt, I understood that the authorization token and client secret required to obtain tokens are both vital components that needed to be well kept, as attackers could misuse these to steal user information and run their own API calls freely. With that in mind, I ultimately came to the conclusion that in the case of my application, the front-end and user's browser did in no way need to access or handle these key pieces directly. Now, this to me was clear cut and obvious for the client secret, but for some reason, along my research path, I had also convinced myself that the access token may need to be stored on the front-end and perhaps this was simply due to confusion from trying to understand the more complex nature of how OAUTH 2.0 works. Of course, there may be use cases for this that I am unaware of, but as I have a BFF that will run all the API calls I need, I feel that this should not concern me for the time being.

- For the second doubt, it stumped me to understand how most applications were able to manage multiple access and refresh tokens coming in from different users, especially at the same time. It seemed that most sources I looked at that were implementing OAUTH 2.0 never seemed to address this, but I did have a lead in that the initial implementation within Flask that I had followed through with from a tutorial did make use of sessions. This prompted me to look into cookies, sessions, as well as session cookies such that I understood how applications could differentiate different users. Of course, there is a lot more to this in that now one may have to think about a system that can provision, manage, and identify session IDs, but thankfully Flask sessions supposedly should already handle all of this, but I hope to personally be able to verify this soon.

Some other things I wanted to address after today were that I acknowledge that there is still a lot of room for potential improvement. My application is still vulnerable to cross site request forgery (CSRF) attacks as I have seen within my research of cookies and sessions, but these attacks will still be limited to whatever API calls I implement, and how long users have their browsers open for. Also I am aware that implementation of proof key for code exchange (PKCE) within OAUTH 2.0 is highly encouraged nowadays, but for the time being I would like to prioritize the implementation of other functionality for the application now whilst also solidifying my understanding of OAUTH 2.0 without PKCE.

I will say that I ran a few circles within my own head trying to achieve some understanding of how this all works, and how I should be implementing this, but I felt that it was important and beneficial to learn. I also enjoyed expanding my knowledge of new concepts, so while it was a slow day in terms of making actual coding progress, I am still satisfied with the outcome.

# DAY 4:
I have begun looking into Docker files and containerization to automate the process of deploying and running my code for testing and development purposes. Not only will this make my life easier, but it is also good practice for ensuring that code can run on different environments and on different versions of images and dependencies. This will also be useful when it comes time to collaborating with other people on projects in the near future, which I am looking forward to.

On the note of good practice though, I have quickly looked into Virtual Environments (venv) within Python, as many online sources that I have read or referenced often utilize this tool within their own Python projects. As I understand it, venv is used for managing packages within specific Python projects, effectively allowing me to control which packages are installed for specific Python projects I may have locally, separate of whatever packages may already be installed on my system. It may be redundant to do so in this project, given that I will most likely only have one Python application and intend on using Docker as well, but I have decided to try it out tonight just for the sake of developing what I believe to be good organizational habits for software development.

# DAY 5:
Building off of using venv from last night, today I have realized that venv only works on a local device. Thus, committing the venv directory to git does not really make sense, as people cloning the repository will run into conflicts and unexpected behaviours trying to use it. I have since removed the venv subdirectory from the repository and added it to the gitignore as a result.

As I have learned, it is important to create the virtual environment before beginning to build a Python application if there is intent to use it, which can be done on Windows by entering the following commmand into the terminal when inside the intended directory:

```
python -m venv venv_directory_name  
```
Once the virtual environment is setup, it can be accessed via the next command within the terminal:
```
venv_directory_name\Scripts\activate
```
From here, I can now proceed to install the necessary dependencies for my Python application and generate a requirements.txt after, which will list all the dependencies installed specifically within the virtual environment by using the command:
```
pip freeze > requirements.txt
```
This requirements.txt file is crucial for ensuring that virtual environments for my other devices, or the devices of collaborators, contain the same dependencies. With this file, the same steps to creating a virtual environment can be followed, but instead of manually installing all the dependencies again, simply utilize the requirements.txt to install all of them with the command:
```
pip install -r requirements.txt
```
Worth noting here is that the requirements.txt file can be committed to the repository making it easier to distribute the same dependencies across multiple devices and their local virtual environments.

# DAY 6:
I have not spent too much time these last two days on this project but, when I had time, I looked into Docker. Docker and containerization seems to be a bit of a confusing topic to me at the moment, but it is one that I will eventually learn within a course I am currently taking this semester. I also have other resources available from the official documentation to other free online courses, which I am excited to learn from. 

Today I was able to build a basic docker image for the flask backend, and run a container for the image locally, which I was pretty happy with. I tried to do the same for the React + Vite front end but I found myself not being as confident in what I was doing. Aside from just needing to learn more about Docker and containerization, I also felt that I was skipping a few steps here and getting myself into a rabbit hole of learning other things. For example, some online sources that I have been trying to follow use Nginx for their web server, which is a tool that I am completely unfamiliar with. On top of this, when trying to create my dockerfile for the frontend, I had concerns about how Vite might complicate the configurations and this is something that ultimately comes down to me not being knowledgeable enough about the tools that I am using.

There's certainly nothing wrong with learning more, especially about things like Nginx and Vite, but I do feel like progress on this project has been a bit stagnant because I have overwhelmed myself with new things to try and learn. I acknowledge that learning to use these tools, including docker, are absolutely crucial skills to develop within the web development space and will get to learning them eventually, but I also believe that I need to focus on the basics of the application by going back to the functionality and implementation of the frontend and backend. Aside from this, I also realized that given the simplistic structure of my project and the fact that I am the only contributor, there is not really a need to be using docker at the moment, which is another reason why I am putting a hold on learning it for now.

Nontheless, this was all a valuable learning experience as I do have some direction for what I need to be doing, but also an idea of some subjects to study up on in the future.
