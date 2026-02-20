from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def optimize_text(text: str, max_chars: int) -> str:
    prompt = f"""
Ты — корпоративный редактор презентаций.

Задача:
— сократить текст до {max_chars} символов
— сохранить смысл
— деловой стиль
— формат: один буллет

Текст:
{text}
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3,
    )

    return response.choices[0].message.content.strip()