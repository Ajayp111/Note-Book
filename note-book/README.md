
# iNoteBook

A MERN stack note-taking website that combines a user-friendly interface with powerful functionality, making it effortless to capture and organize your thoughts.
## Features

- User Login/SignUp
- Add Tag to notes
- Edit/Delete a note


## Demo

[See the Live Project here]( https://inotebook-sage.vercel.app/)

## Preview
#### Images
![iNoteBook Screenshot](https://raw.githubusercontent.com/ritwikRkk/images-db/main/iNoteBook/signup.png)

![iNoteBook Screenshot](https://raw.githubusercontent.com/ritwikRkk/images-db/main/iNoteBook/login.png)

![iNoteBook Screenshot](https://raw.githubusercontent.com/ritwikRkk/images-db/main/iNoteBook/notes.png)

#### Video
![iNoteBook Gif](https://raw.githubusercontent.com/ritwikRkk/images-db/main/iNoteBook/iNotebook.gif)
## Environment Variables

To run this project, create a .env file in the root directory of the project, and copy/paste the code below:

#### Backend/server

`MONGODB_URI=mongodb://127.0.0.1:27017/inotebook`

`JWT_SECRET=ANY STRING`

#### Frontend/client

`REACT_APP_API_URI=YOUR BACKEND DOMAIN`

## Installation
To Run this project locally on your computer
Follow the steps below:

First Install Monogodb by following the links below:

[Monogodb download](https://www.mongodb.com/try/download/community)

[Mongodb Shell](https://www.mongodb.com/try/download/shell)

[Installation video Link]( https://www.youtube.com/watch?v=oC6sKlhz0OE&list=WL)


Clone the entire project

```bash
  git clone https://github.com/ritwikRkk/iNoteBook.git
```

#### Backend/server

Go to the project directory

```bash
  cd iNoteBook/backend/
```
```bash
  rm middleware/validateApi.js
```

Install dependencies

```bash
  npm install
```
Add all the environment variables, comment out line no. 7 & 16 in ./index.js
  
Start the server

```bash
  nodemon .\index.js
```

#### Frontend/Client

Go to the project directory

```bash
  cd iNoteBook/client/
```

Install dependencies

```bash
  npm install
```
Add all the environment variables

Start the server

```bash
  npm run start
```


## Resources
The Resources used to create this app is listed below:
#### Backend/Server
[express](https://www.npmjs.com/package/express)

[mongoose](https://www.npmjs.com/package/mongoose)

[bcryptjs](https://www.npmjs.com/package/bcryptjs)

[cors](https://www.npmjs.com/package/cors)

[dotenv](https://www.npmjs.com/package/dotenv)

[express-validator](https://www.npmjs.com/package/express-validator)

[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

#### Frontend/Client
[Create React App](https://create-react-app.dev/docs/getting-started)

[react-router-dom](https://www.npmjs.com/package/react-router-dom)

[concurrently](https://www.npmjs.com/package/concurrently)
## Roadmap

- Add lists in each note
- Add creation date in notes
- Add some sorting options


## Deployment

To deploy this project

STEP 1: Go to the project directory

STEP 2: Create a git repository, commit the changes, and push the entire backend folder and client folder to the same remote git repository.

STEP 3: Deploy using Vercel

[Deployment video tutorial](https://www.youtube.com/watch?v=YYmzj5DK_5s)



## Report Issues
[Report Issues](https://github.com/ritwikRkk/iNoteBook/issues/new)
## 🔗 Connect with me
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://portfolio-ritwik.vercel.app/)



## License

[MIT](https://choosealicense.com/licenses/mit/)

