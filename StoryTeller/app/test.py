from openai import OpenAI
client = OpenAI(
    api_key = "sk-proj-vRTvUjzr3aZXwZRhYBMvT3BlbkFJZW9yFMGhCbw5dNJKFNZQ"
)


response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a storyteller."},
        {"role": "user", "content": "Once upon a time in a land far, far away..."}
    ],
)

print(response.choices[0].message)

