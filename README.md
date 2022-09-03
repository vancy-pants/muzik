# iTunes Top Albums Challenge

I'm calling this site "Muzik!" on this first pass.

## Project Requirements

### Base

- Show top 100 albums based on the json feed here: https://itunes.apple.com/us/rss/topalbums/limit=100/json
- A clean modern look
- Clean, readable, maintainable codebase
- Source code on Github
- Cross browser support (or graceful degradation)
- Responsive design and implementation
- A good user experience
- Create and implement (using HTML, CSS and JS) a basic design

### Additional

- Use a CSS Framework
  - I'm using [Mantine](https://mantine.dev/) for the components. I like it for styling too, but the requirements say to use SASS instead
- Use a JavaScript framework (React, Angular, etc.)
  - I'm using a [React/Typescript app with Vite](https://vitejs.dev/guide/)
- Use SASS for custom CSS
  - Done!
- Make use of CSS animations
  - The `Loading` component spinner uses animation
- Allow the top 100 to be searchable
  - Done! Though I don't know if I quite understood this requirement...
  - I didn't see any API info about searching based on the top iTunes albums, so I just used some debounced searching of the already-fetched values using the normal JS array filter method.
  - Note: I'm adding some more expansive album searching on a separate search page though, so hopefully that will also be helpful to review!
- Allow the user to see more information about a selected Album
  - Done!
- Host the website on the service of your choice
  - [Done!](https://muzik-b58ad.web.app/)
  - I'm hosting on Firebase because I want to learn more about their tooling/platform
- Surprise us!
  - Added the ability to search any album on iTunes and see its details too

## TODO

- Improve scroll behavior
  - Currently the pages stay at the same scroll depth on navigation, which I think could be improved
  - using some `useRef` hooks and `forwardRef` to achieve this would be how I would go about it
- Unit tests!
  - I created a few files for this purpose, but I ran out of time...
- Update favicon
- Get the CI/CD debugged and functioning (currently deploying manually with firebase)
