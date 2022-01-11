
# Stronger - [__try it out__](https://strongerapp.netlify.app/)

Full stack web application that allows anyone to track their weightlifting workouts in the gym.

## Features

- User registration and login (including authentication and authorization using [JWT](https://jwt.io/))
- [CRUD](https://developer.mozilla.org/en-US/docs/Glossary/CRUD) operations with both exercises and workouts
- View workout history (name and date of workout, sets, exercises and their [1RM's](https://exercise.trekeducation.org/assessment/muscle-strength-assessment/1rm-testing/))
- Add notes to a workout
- Workout statistics (*next release*)
- Workout timer (*next release*)


## Tech Stack

**Client:** React, TailwindCSS, Figma

**Server:** Node, Express

**Database:** MongoDB

**Deployment:** Heroku, Netlify

## Packages

| Name                                                          | Usuage                                                 | Client or Server  |
| ------------------------------------------------------------- | ------------------------------------------------------ | ----------------- |
| [axios](https://www.npmjs.com/package/axios)                  | Making HTTP requests from node.js                      |  Client           |
| [react-dom](https://www.npmjs.com/package/react-dom)          | Interacting with the DOM with React                    |  Client           |
| [react-router-dom](https://reactrouter.com/)                  | Routing for React                                      |  Client           |
| [nodemon](https://www.npmjs.com/package/nodemon)              | Restarting the server on save                          |  Server           |
| [bcrypt](https://www.npmjs.com/package/bcrypt)                | Hashing the user's password for storage in MongoDB     |  Server           |
| [cors](https://www.npmjs.com/package/cors)                    | Enable requesting resources from server via client     |  Server           |
| [dotenv](https://www.npmjs.com/package/dotenv)                | Environment variables                                  |  Server           |
| [express](https://www.npmjs.com/package/express)              | Web framework for node                                 |  Server           |
| [joi](https://www.npmjs.com/package/joi)                      | Server side validation                                 |  Server           |
| [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)    | JWT authentication and authorization                   |  Server           |
| [mongoose](https://www.npmjs.com/package/mongoose)            | Handle modelling application data and querying MongoDB |  Server           |

