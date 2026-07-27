import os
from fastapi import FastAPI
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Admissions Knowledge Graph AI Service",
    description="AI Service handling Graph RAG, LLM queries, and Cypher generation",
    version="0.1.0"
)

@app.get("/")
def read_root():
    return {"message": "AI Service is running"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
