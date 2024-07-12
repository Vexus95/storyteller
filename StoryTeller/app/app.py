from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI

app = Flask(__name__)
CORS(app)


@app.route('/generate', methods=['POST'])
def generate_text():
    try:
        data = request.json
        prompt = data.get('prompt')
        genre = data.get('genre', '')  # Le genre est optionnel
        characters = data.get('characters')  # Le nombre de personnages est optionnel

        # Construire le prompt de l'histoire
        story_prompt = f"You are a storyteller. Write a {genre} story." if genre else "You are a storyteller. Write a story."
        if characters:
            story_prompt += f" The story should include {characters} characters."
        story_prompt += f" Prompt: {prompt}"

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": story_prompt}
            ],
        )

        if response.choices:
            story = response.choices[0].message.content
            return jsonify({"story": story})
        else:
            return jsonify({"error": "No response from the API"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
