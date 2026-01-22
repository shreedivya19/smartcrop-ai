from typing import List, Dict, Any, Tuple
import os
import joblib
import numpy as np


_MODEL: Any = None
_ENCODER: Any = None


def _models_dir() -> str:
    return os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "models"))


def _model_paths() -> Tuple[str, str]:
    models_dir = _models_dir()
    return (
        os.path.join(models_dir, "crop_model.pkl"),
        os.path.join(models_dir, "label_encoder.pkl"),
    )


def _ensure_model_loaded() -> bool:
    global _MODEL, _ENCODER
    if _MODEL is not None and _ENCODER is not None:
        return True
    model_path, enc_path = _model_paths()
    if not (os.path.exists(model_path) and os.path.exists(enc_path)):
        return False
    _MODEL = joblib.load(model_path)
    _ENCODER = joblib.load(enc_path)
    return True


def _feature_vector(features: Dict[str, float]) -> np.ndarray:
    order = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]
    return np.array([[float(features.get(k, 0.0)) for k in order]])


def rank_crops(features: Dict[str, float], top_n: int = 3) -> List[Dict[str, Any]]:
    if _ensure_model_loaded():
        X = _feature_vector(features)
        proba = _MODEL.predict_proba(X)[0]
        classes = _ENCODER.inverse_transform(np.arange(len(proba)))
        pairs = sorted(zip(classes, proba), key=lambda x: x[1], reverse=True)
        return [{"crop": c, "score": float(s)} for c, s in pairs[:top_n]]
    # Fallback demo ranking if model not available
    return [
        {"crop": "Rice", "score": 0.82},
        {"crop": "Maize", "score": 0.73},
        {"crop": "Wheat", "score": 0.65},
    ]
