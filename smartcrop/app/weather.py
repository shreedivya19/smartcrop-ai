import os
from typing import Optional, Dict, Any
import requests


OPENWEATHER_BASE = "https://api.openweathermap.org/data/2.5/weather"


def _get_api_key() -> Optional[str]:
    return os.getenv("OPENWEATHER_API_KEY")


def _kelvin_to_celsius(k: float) -> float:
    return float(k) - 273.15


def fetch_weather(q: str) -> Optional[Dict[str, Any]]:
    """
    Fetch temperature (C), humidity (%), and proxy rainfall (mm) for a city/pincode name.
    For rainfall, use last 1h precipitation if present; otherwise 0.
    """
    api_key = _get_api_key()
    if not api_key:
        return None
    try:
        resp = requests.get(
            OPENWEATHER_BASE,
            params={"q": q, "appid": api_key},
            timeout=10,
        )
        if resp.status_code != 200:
            return None
        data = resp.json()
        main = data.get("main", {})
        rain = data.get("rain", {}) or {}
        temp_k = main.get("temp")
        humidity = main.get("humidity")
        temp_c = _kelvin_to_celsius(temp_k) if temp_k is not None else None
        rainfall = rain.get("1h") or rain.get("3h") or 0.0
        return {"temperature": temp_c, "humidity": humidity, "rainfall": rainfall}
    except Exception:
        return None


