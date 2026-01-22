import os
from flask import Flask, render_template, request, jsonify
from recommender import rank_crops
from fertilizer import fertilizer_advice, get_npk_status, get_ph_status
from weather import fetch_weather

app = Flask(__name__)

@app.route("/")
def index():
    """Render the main page with the input form"""
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    """Handle crop prediction and fertilizer recommendations"""
    try:
        # Extract form data
        features = {
            "N": float(request.form["N"]),
            "P": float(request.form["P"]),
            "K": float(request.form["K"]),
            "ph": float(request.form["ph"]),
            "temperature": float(request.form["temperature"]),
            "humidity": float(request.form["humidity"]),
            "rainfall": float(request.form["rainfall"])
        }
        
        # Get crop recommendations
        recommendations = rank_crops(features)
        
        # Get fertilizer advice
        fertilizer_tips = fertilizer_advice(features)
        
        # Get NPK and pH status
        npk_status = get_npk_status(features["N"], features["P"], features["K"])
        ph_status = get_ph_status(features["ph"])
        
        return render_template(
            "result.html",
            recommendations=recommendations,
            fertilizer_tips=fertilizer_tips,
            npk_status=npk_status,
            ph_status=ph_status,
            input_features=features
        )
        
    except Exception as e:
        return render_template("error.html", error=str(e))

@app.route("/weather", methods=["GET"])
def weather():
    """Endpoint to fetch weather data for a given location"""
    location = request.args.get("location")
    if not location:
        return jsonify({"error": "Location parameter is required"}), 400
    
    weather_data = fetch_weather(location)
    if weather_data:
        return jsonify(weather_data)
    else:
        return jsonify({"error": "Could not fetch weather data for the specified location"}), 404

if __name__ == "__main__":
    app.run(debug=True, port=5000)
