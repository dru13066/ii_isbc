# AI PPTX Presentation Builder

Веб-сервис для автоматической сборки презентаций PowerPoint
по корпоративному шаблону с AI-оптимизацией текста.

## Возможности
- Загрузка корпоративного PPTX-шаблона
- Загрузка контента (JSON)
- AI сокращает текст под размеры слайдов
- Генерация готовой презентации

## Стек
- Python + FastAPI
- python-pptx
- OpenAI API
- HTML / CSS / JS

## Запуск локально

```bash
git clone https://github.com/yourname/pptx-ai-presentation-builder
cd pptx-ai-presentation-builder

python -m venv venv
source venv/bin/activate
pip install -r backend/requirements.txt

cp backend/.env.example backend/.env
# вставь OPENAI_API_KEY

uvicorn backend.main:app --reload
