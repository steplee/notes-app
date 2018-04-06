# notes-app
Contains code for a spaced memory app, inspired by Anki, I am developing.

Anki is great, but there are many downsides:
  - It is slow on Android with over a dozen decks
  - It is not as easy as it could be to create cards
  - The search is awful and scheduling system rigid
  - SQL database per deck? Not ideal.
  
## General Notes
  - Since starting this, I've learned of IndexedDB, implemented in all browsers, which would greatly simplify design.
    - PouchDB takes this further to seamlessly sync to a CouchDB server, but I'm leaning towards my own on top of SQL/mongo.
  - The schedule system will be as simple as possbile -- a `priority queue` in data structure parlance.
  - Focus on a Progressive Web App before native mobile apps.
