# Test Agily

## Run the project

1. Clone the project
2. Run the backend: `node index.js`. Runs on localhost port 4000
3. Move to client: `cd client`
4. Run client: `npm run start`. Runs on localhost port 3000

## Coding technics

To build this project, I used React, Typescript and axios in the front-end and Nodejs and express for the backend.

### Front-end

For the front-end, I decided to use functional components paradigm for a faster development.
Using typescript was also a choice to make the code more solid in terms of type checking.
I tried to factorize as much as possible my code with components for cards.

I used custom hooks for data fetching as it makes our pages components way cleaner to read and debug in the future.

For the styling, I used scss to define color variables easily across the app.

Responsiveness was made possible with flexbox for a faster and easier development.

Finally, I decided to implement translations from the beginning to avoid hardcoding content and reduce future technical debt.

Recommendations:

I would add endpoints in a constants file to avoid hardcoding. Also, right now, we are calling localhost url but in the future, we should define the base url in the .env file.

### Back-end

For the backend, I decided to stay simple with one file, index.js with two endpoints to fetch city data and weather data.

I decided to use js and not ts for boilerplate time that I did not have. I needed to build something functional and I think it is better to ship something rather than nothing.

For the cache verification, I built two small functions to verify if the cache key existed. If it existed, the fetch request to the API was not ran and cache value was returned. This enabled a better performance of the requests to the server.

Recommendations:

I would definitely use a more structured file organization. I would create a folder for routes, another for handlers, other for cache verification etc...

I would also use typesscript for a more solid server with defined models that match the client.

I would then add better error handlers in each endpoints to avoid the user to have unknown errors.
