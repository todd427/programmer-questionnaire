from flask import Flask, request, render_template, jsonify
import json
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('quest.html')

@app.route('/submit', methods=['POST'])
def submit():
    try:
        # Get form data
        form_data = request.form.to_dict()
        
        # Add submission timestamp
        form_data['submission_time'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        # Save to a JSON file
        with open('submissions.json', 'a') as f:
            json.dump(form_data, f)
            f.write('\n')
        
        # Prepare response data
        response_data = {
            'status': 'success',
            'message': 'Thank you for your submission!',
            'details': {
                'name': f"{form_data.get('first-name', '')} {form_data.get('last-name', '')}",
                'experience': form_data.get('years', 'Not specified'),
                'primary_language': form_data.get('primary-language', 'Not specified'),
                'submission_time': form_data['submission_time']
            }
        }
        
        return render_template('response.html', data=response_data)
    
    except Exception as e:
        return render_template('error.html', error=str(e)), 500

if __name__ == '__main__':
    app.run(debug=True)
