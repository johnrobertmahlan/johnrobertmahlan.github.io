# NextMusic!

The NextMusic! app is a simple app designed to help users find new music that they will love. Most of us know who our favorite bands are, so this is a great starting point for finding new music. What the NextMusic! app does is allow users to start by searching for their favorite bands and discovering more information about them, and then to find other bands that might appeal to them. Thus, whenever a user searches for a band, they will also be given the ability to find:

* Similar Artists
* Top Albums By Their Chosen Artist
* Top Songs By Their Chosen Artist

This has long been my preferred way to find new music: start with a band that I know that I love, then find out more about them and other bands that might be similar. The NextMusic! app brings that functionality to everyone.

### Link to NextMusic!

[NextMusic!](https://johnrobertmahlan.github.io/)

### Technologies Used

The NextMusic! app was built using the following technologies:

* HTML
* CSS
* JavaScript (including jQuery)

The database was built using the [Last.fm API](https://www.last.fm/api/intro).

### Construction Strategy

I wanted NextMusic! to allow users to search for musicians by name. Several APIs that I found - both concerning music and concerning other topics - required users to search by a hard-to-remember ID number that no ordinary user would have access to. This is why I decided to use Last.fm's API: it allowed users to search for musicians by name, and it was fairly forgiving about its search terms. For example, users can search for bands with multiple words in their name, such as 'Pink Floyd', and the API's method will not return any errors. It also is not case sensitive.

When building the app, my first goal was simply to write code that successfully accessed the API data and presented it on the screen. My thought was once I knew the app *worked*, then I could improve its appearance. 

I started by building out the function that allowed users to search for artists by name and find out some biographical information about them. This used Last.fm's `artist.getInfo` method.

At that point, I wanted the app to do more. Originally, I thought the app would simply generate a list of artists similar to the one entered by the user, but I decided that once I had that functionality, the app could do more. Using Last.fm's `artist.getSimilar`,  `artist.getTopAlbums`, and `artist.getTopTracks` methods, I constructed buttons that would display this content in a sidebar.