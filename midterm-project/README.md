# Plant Pilot
Our project was made using React and Tailwind CSS.

## Home Page
The Home page displays a temperature and humidity gauge, and a list of plant examples. The plant data is extracted from JSON received from the Trefle API. At the top of the page, there is a search bar to search for plants.

## Search Functionality
Hitting "enter" in the search bar will query the Trefle API for plants based on the user input. The resulting plant data is displayed dynamically using React's "map" functionality. When a user clicks the button to view more information for a specific plant, another API request is made to the Trefle API to get more specific information about that plant based on its ID. This JSON response data is then displayed on the page accordingly.

## Credits Page
Lastly, the Credits page contains our student names and other information as requested in the rubric / requirements.

## Backend API
To bypass CORS restrictions on the Trefle API, we set up a basic FastAPI backend using Python. This backend has two endpoints: "/search/{query}" and "/plant/{plant_id}". This API is contained in the "api" folder underneath the "midterm-project" directory. To start the API, you must have the correct dependencies installed with Python ("uvicorn" and "fastapi") and invoke the command "uvicorn main:app --reload". This will start running the API on port 8000.

## Starting the App and API
To start the React app, navigate to the "plant_pilot" directory underneath the "midterm-project" folder, and run the command "npm run dev". For our application, we made requests to this local API, as due to CORS restrictions we could not simply make direct calls to the Trefle API through our React app.

## Component Structure
Each page of the React app has its own component, and we used react-router-dom for routing. The Home.jsx, Search.jsx, Plant.jsx and Credits.jsx files store the information for the home, search, plant and credits page respectively.

## Demo
In case you have issues getting the app or API running, we recorded a basic demo video of the first three pages, as well as a screenshot of the Credits page. If you have any questions or need to clarify anything feel free to reach out to either members of our group.

Thank you for checking out our project!
