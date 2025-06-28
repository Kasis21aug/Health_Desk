from fastapi import FastAPI
from routes.chat_routes import router
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI(
    title="Health Assistant GenAI Chatbot API"
)

# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
