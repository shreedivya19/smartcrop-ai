# Train and persist a baseline model
import os
import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "crop_recommendation.csv")
MODELS_DIR = os.path.join(os.path.dirname(__file__), "..", "models")
MODEL_PATH = os.path.join(MODELS_DIR, "crop_model.pkl")
ENC_PATH = os.path.join(MODELS_DIR, "label_encoder.pkl")

os.makedirs(MODELS_DIR, exist_ok=True)

if not os.path.exists(DATA_PATH):
    raise FileNotFoundError(f"Dataset not found at {DATA_PATH}. Place Kaggle dataset there.")

print("Loading dataset...")
df = pd.read_csv(DATA_PATH)
features = df[["N","P","K","temperature","humidity","ph","rainfall"]]
labels = df["label"]

enc = LabelEncoder()
y = enc.fit_transform(labels)

X_train, X_test, y_train, y_test = train_test_split(features, y, test_size=0.2, random_state=42, stratify=y)

print("Training RandomForest...")
clf = RandomForestClassifier(n_estimators=300, random_state=42, n_jobs=-1)
clf.fit(X_train, y_train)

acc = clf.score(X_test, y_test)
print(f"Validation accuracy: {acc:.3f}")

print("Saving model and encoder...")
joblib.dump(clf, MODEL_PATH)
joblib.dump(enc, ENC_PATH)
print(f"Saved: {MODEL_PATH}, {ENC_PATH}")
