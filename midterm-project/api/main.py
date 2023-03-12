from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/search/{query}")
async def search(query: str):
    return {"query": query}

@app.get("/plant/{plant_id}")
async def get_plant(plant_id: int):
    return {"plant_id": plant_id}