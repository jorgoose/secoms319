from fastapi import FastAPI
import requests

app = FastAPI()

# Allow all origins to access the API
@app.middleware("http")
async def add_cors_headers(request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/search/{query}")
async def search(query: str):

    #  Make request to API and return search result data based on query
    url = "http://trefle.io/api/v1/species/search?token=TI9-m33c5nRHwoDguCODeSS_dsOacOs_J81N9MHdQzg&q=" + query

    response = requests.get(url)
    return response.json()

@app.get("/plant/{plant_id}")
async def get_plant(plant_id: str):

    # Make request to API and return plant data based on plant_id
    url = "http://trefle.io/api/v1/species/" + str(plant_id) + "?token=TI9-m33c5nRHwoDguCODeSS_dsOacOs_J81N9MHdQzg"

    response = requests.get(url)
    return response.json()