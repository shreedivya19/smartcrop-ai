from flask import Flask, request, jsonify
from flask_cors import CORS
import random
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

# --------------------------------------------------------
#  ML — 7 Day (or 14 day) Forecast
# --------------------------------------------------------
@app.route("/predict_forecast", methods=["POST"])
def predict_forecast():
    data = request.get_json()

    district = data.get("district")
    crop = data.get("crop", "Ragi")
    horizon = int(data.get("horizon", 14))

    # Fake values — replace with real ML later
    base = random.randint(1000, 4000)

    values = [base + random.randint(-200, 200) for _ in range(horizon)]
    labels = [(datetime.now() + timedelta(days=i)).strftime("%Y-%m-%d") for i in range(horizon)]

    return jsonify({
        "success": True,
        "district": district,
        "crop": crop,
        "labels": labels,
        "values": values
    })


# --------------------------------------------------------
#  ML — Weather Intelligence + Crop Suggestion
# --------------------------------------------------------
@app.route("/weather_insights", methods=["GET"])
def weather_insights():
    district = request.args.get("district", "Unknown")

    # Simulated weather info
    current = {
        "temperature": 28,
        "humidity": 65,
        "wind": 10,
        "condition": "Sunny",
    }

    forecast = [
        {"day": "Fri", "temp": 26, "condition": "Rain"},
        {"day": "Sat", "temp": 28, "condition": "Sunny"},
        {"day": "Sun", "temp": 29, "condition": "Cloudy"},
        {"day": "Mon", "temp": 24, "condition": "Rain"},
        {"day": "Tue", "temp": 27, "condition": "Sunny"},
        {"day": "Wed", "temp": 25, "condition": "Cloudy"},
        {"day": "Thu", "temp": 26, "condition": "Sunny"},
    ]

    # SIMPLE ML RULES  
    temperature = current["temperature"]
    humidity = current["humidity"]
    condition = current["condition"]

    if temperature >= 26 and humidity < 70:
        suggestion = "Good conditions for Ragi, Maize, Groundnut"
    elif humidity >= 80:
        suggestion = "Prefer Paddy, Sugarcane"
    elif condition == "Rain":
        suggestion = "Suitable for Paddy and Jowar"
    else:
        suggestion = "Weather stable — any dry crop will perform well."

    return jsonify(
        success=True,
        district=district,
        current=current,
        forecast=forecast,
        suggestion=suggestion,
    )


# --------------------------------------------------------
#  CROP ASSISTANT WIZARD — Backend ML Logic  
# --------------------------------------------------------
@app.route("/wizard_recommend", methods=["POST"])
def wizard_recommend():
    data = request.get_json()

    district = data.get("district")
    land = float(data.get("land", 1))
    soil = data.get("soil")
    irrigation = data.get("irrigation")
    experience = data.get("experience")

    print("🟢 Wizard request received:", data)

    # TEMP — RULE-BASED (will replace later with ML)
    if irrigation == "Regular water":
        base_crop = "Paddy"
    elif irrigation == "Limited water":
        base_crop = "Ragi"
    else:
        base_crop = "Jowar"

    if soil == "Black Soil":
        base_crop = "Cotton"
    if soil == "Loamy" and irrigation != "Rain-fed only":
        base_crop = "Maize"

    confidence = 0.7 + random.random() * 0.2

    reason = (
        f"For {district} with {land} acres of {soil.lower()} and "
        f"{irrigation.lower()}, {base_crop} performs well in similar conditions. "
        f"Your experience level ({experience}) also matches typical management needs."
    )

    return jsonify(
        success=True,
        recommendedCrop=base_crop,
        confidence=round(confidence, 2),
        reason=reason,
    )


# --------------------------------------------------------
#  RUN SERVER  
# --------------------------------------------------------
if __name__ == "__main__":
    print("=================================")
    print("🚀 CropAI backend running OK 🎯")
    print("📡 Listening on: http://localhost:5001")
    print("=================================")
    app.run(host="127.0.0.1", port=5001, debug=True)