
# Notes app


I am excited to announce a versatile Note application that allows users to create and manage various types of notes, including image, text, to-do, map, canvas, audio, and video notes.

The application leverages some powerful technologies. The front end is built with React and uses Redux for state management. It takes advantage of Axios to handle HTTP requests and React Router for efficient navigation. For audio note-taking, the app uses the MediaRecorder Web API to capture voice input. For map-based notes, the Geolocation API is employed to get the user's location.and create a map and center it in the user location

Social Login has been made possible with the use of Facebook and Google OAuth for a seamless sign-up process. On successful sign-up, the application sends a welcome email through EmailJS. For visually pleasing presentations of text notes, the app utilizes DeepAI's text-to-image API, converting plain text into engaging visuals.

Notably, the application makes use of the browser's Speech Synthesis API for an auditory welcome message, enhancing the user experience.

The application is designed to serve as a comprehensive solution for all note-taking needs, with a focus on user-friendly interface, seamless user experience, and functional diversity. Do check out my demo video to see the app in action!




<h1>Signup page</h1>
<img src="https://i.ibb.co/W0195Zc/image.png" />

<h1>Notes page</h1>
<img src="https://i.ibb.co/CMdwLhZ/image.png" />

<h1>To run this project locally, first ensure that you have Node.js and npm installed on your machine. Then, follow these steps</h1>

1-Clone the repository
git clone https://github.com/islamabm/

keep-app
.git

2-Install the required dependencies:
npm i
3-Start the development server:
npm start
