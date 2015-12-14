MVP Project: Creepster

1. Allow users to submit a file by URL.
  - TODO: Allow upload.
  - TODO: Validation would be nice.
2. Display the image on page.
  - MVP: just display all.
  - TODO: Users can hide "disliked" users.
  - TODO: Users can choose which gender to show.
3. Use an API to determine the image's facial characteristics.
  - MVP: Gender || reject.
  - TODO: Allow user to override the API's attributes.
4. Display those characteristics on the page.
5. Store those characteristics in a DB.
  - MVP: SQLite
6. Keep track of users.
  - TODO: Auth, user switching.
7. Users can see all images, track "likes/dislikes" in a separate table.
  - MVP: display likes value.
8. Users get one image.
  - MVP: Programmatically generate usernames; don't filter.
9. Users can message other users.
  - TODO: display messages.
10. Users with negative "likes" can't message other users.
  - TODO: implement

DB SCHEMA

USERS
|ID|NAME|IMG-URL|LIKES|GENDER|

LIKES
|ID|TO-USER|FROM-USER|value|

MESSAGES
|ID|TO-USER|FROM-USER|

