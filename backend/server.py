from flask import Flask, request, jsonify
import subprocess
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

@app.route("/getData", methods=['GET'])
def get_data():
    try:
        with open('data.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
        return jsonify(data), 200
    except Exception as error:
        print("Error reading data:", error)
        return jsonify({"error": "Internal server error"}), 500

@app.route("/changeData", methods=["POST"])
def change_data():
    new_data = request.get_json()
    
    try:
        json.dump(new_data, open("data.json", "w"))
        return jsonify(new_data), 200
    except Exception as e:
        return jsonify({"error": e}), 500
        
def deep_merge(target, source):
    for key, value in source.items():
        if isinstance(value, dict) and key in target and isinstance(target[key], dict):
            deep_merge(target[key], value)
        else:
            target[key] = value
    return target

@app.route('/updateData', methods=['PUT'])
def update_data():
    new_data = request.get_json()  # Assuming JSON data is sent in the request body
    try:
        # Read the existing data from the JSON file
        if os.path.exists('data.json'):
            with open('data.json', 'r', encoding='utf-8') as file:
                existing_data = json.load(file)
        else:
            existing_data = {}

        # Deep merge the new data with the existing data
        updated_data = deep_merge(existing_data, new_data)

        # Write the updated data back to the JSON file
        with open('data.json', 'w', encoding='utf-8') as file:
            json.dump(updated_data, file, indent=2, ensure_ascii=False)

        return jsonify({"message": "Data updated successfully"}), 200
    except Exception as error:
        print("Error updating data:", error)
        return jsonify({"error": "Internal server error"}), 500


@app.route("/run_code", methods=["POST"])
def run_code():
    code = request.json.get("code")
    try:
        code += """
\n\n\n
# Tests!
failed = False
# test 1
test1 = fibonacci(1)
if test1 != 0:
    print("Error on test 1!")
    failed = True

# test 2
test2 = fibonacci(3)
if test2 != 1:
    print("Error on test 2!")
    failed = True

# test 3
test3 = fibonacci(10)
if test3 != 34:
    print("Error on test 3!")
    failed = True
# test 4
test4 = fibonacci(15)
if test4 != 377:
    print("Error on test 4!")
    failed = True
# test 5
test5 = fibonacci(25)
if test5 != 46368:
    print("Error on test 5!")
    failed = True

if not failed:
    print("All tests passed!")

        """
        result = subprocess.run(['python', '-c', code], capture_output=True, text=True, check=True)
        output = result.stdout
    except subprocess.CalledProcessError as e:
        output = e.stderr
    if "All tests passed!" in output:
        return jsonify({"output": output, "passed": True})
    return jsonify({"output": output, "passed": False})

if __name__ == "__main__":
    app.run(debug=True, port=5000)