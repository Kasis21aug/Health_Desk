from fastapi import APIRouter
from models.schemas import ChatRequest, ChatResponse
from services.chat_services import get_gemini_response

router = APIRouter()

@router.post("/chat", response_model=ChatResponse)
async def chat_with_bot(request: ChatRequest):
    print(request)
    reply = await get_gemini_response(request.user_message)
    return reply
