import httpx
from config import GEMINI_API_KEY, GEMINI_API_URL

async def get_gemini_response(user_message: str) -> dict:
    headers = {
        "Content-Type": "application/json"
    }

    payload = {
        "contents": [{
            "parts": [{"text": f"You are a helpful health assistant. Answer user queries related to health clearly.Format the final output in correct markdown\n\n Now answer the user query: {user_message}"}]
        }]
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{GEMINI_API_URL}?key={GEMINI_API_KEY}",
            json=payload,
            headers=headers
        )

        data = response.json()
        print(data)
        
        
        # try:
        #     return data["candidates"][0]["content"]["parts"][0]["text"]
        # except (KeyError, IndexError):
        #     return "Sorry, I couldn't understand. Please try again."
        try:
            text = data["candidates"][0]["content"]["parts"][0]["text"]
            total_token = data["usageMetadata"]["totalTokenCount"]
            
            print("type of token count", type(total_token))
            
            return {
                "bot_response": text,
                "total_tokens": total_token
            }
        except (KeyError, IndexError):
            return {
                "bot_response": "Sorry, I couldn't understand. Please try again.",
                "total_tokens": 0
            }