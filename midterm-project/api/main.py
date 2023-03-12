from fastapi import FastAPI
import requests

app = FastAPI()

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
async def get_plant(plant_id: int):

    # Make request to API and return plant data based on plant_id
    url = "http://trefle.io/api/v1/species/" + plant_id + "?token=TI9-m33c5nRHwoDguCODeSS_dsOacOs_J81N9MHdQzg"

    response = requests.get(url)
    return response.json()