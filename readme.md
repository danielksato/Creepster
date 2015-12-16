MVP Project: Creepster

1. Allow users to submit a file by URL.
  - TODO: Allow upload. COMPLETE
  - TODO: Validation would be nice. COMPLETE
2. Display the image on page.
  - MVP: just display all. COMPLETE
  - TODO: Users can hide "disliked" users.
  - TODO: Users can choose which gender to show.
3. Use an API to determine the image's facial characteristics.
  - MVP: Gender || reject. COMPLETE
  - TODO: Allow user to override the API's attributes.
4. Display those characteristics on the page. COMPLETE
5. Store those characteristics in a DB.
  - MVP: SQLite COMPLETE
6. Keep track of users.
  - TODO: Auth, user switching. MOSTLY COMPLETE
7. Users can see all images, track "likes/dislikes" in a separate table.
  - MVP: display likes value. COMPLETE
8. Users get one image.
  - MVP: Uploading a new image to the same username overwrites. COMPLETE
9. Users can message other users.
  - TODO: display messages. COMPLETE
10. Users with negative "likes" can't message other users.
  - TODO: implement

DB SCHEMA

USERS
|ID|NAME|IMG-URL|LIKES|GENDER|

LIKES
|ID|TO-USER|FROM-USER|value|

MESSAGES
|ID|TO-USER|FROM-USER|

