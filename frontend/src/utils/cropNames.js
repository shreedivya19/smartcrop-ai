// frontend/src/utils/cropNames.js

export const cropKn = {
  Rice: "ಅಕ್ಕಿ",
  Jowar: "ಜೋಳ",
  Ragi: "ರಾಗಿ",
  Maize: "ಮೆಕ್ಕೆಜೋಳ",
  Bajra: "ಸಜ್ಜೆ",
  Wheat: "ಗೋಧಿ",

  Groundnut: "ಕಡಲೆಕಾಯಿ",
  Sunflower: "ಸೂರ್ಯಕಾಂತಿ",
  Sesame: "ಎಳ್ಳು",
  Safflower: "ಕುಸುಬೆ",
  Castor: "ಆಮುದ ಬೀಜ",
  Soybean: "ಸೋಯಾಬೀನ್",
  Niger: "ಉಚ್ಚಳು",

  "Tur (Pigeon Pea)": "ತೊಗರಿಕಾಳು",
  "Green Gram": "ಹೆಸರುಕಾಳು",
  "Black Gram": "ಉದ್ದಿನಕಾಳು",
  "Bengal Gram (Chickpea)": "ಕಡಲೆಕಾಳು",
  "Horse Gram": "ಹುರುಳಿಕಾಳು",
  "Cowpea (Lobia)": "ಅಲಸಂದೆ",
  "Field Pea": "ಬಟಾಣಿ",

  Arecanut: "ಅಡಿಕೆ",
  Coconut: "ತೆಂಗಿನಕಾಯಿ",
  Coffee: "ಕಾಫಿ",
  Pepper: "ಕರಿಮೆಣಸು",

  Cotton: "ಹತ್ತಿ",
  Sugarcane: "ಕಬ್ಬು",
  Tobacco: "ತಂಬಾಕು",
  Cardamom: "ಏಲಕ್ಕಿ",
  Chilli: "ಮೆಣಸಿನಕಾಯಿ",
  Cashew: "ಗೋಡಂಬಿ",

  Mango: "ಮಾವಿನಹಣ್ಣು",
  Banana: "ಬಾಳೆಹಣ್ಣು",
  Papaya: "ಪಪ್ಪಾಯಿ",
  "Sapota (Chikoo)": "ಸಪೋಟಾ",
  Pomegranate: "ದಾಳಿಂಬೆ",
  Grapes: "ದ್ರಾಕ್ಷಿ",
  Guava: "ಪೇರಲೆ",
  Orange: "ಕಿತ್ತಳೆ",
  Lemon: "ನಿಂಬೆ",
  Watermelon: "ಕಲ್ಲಂಗಡಿ",
  Jackfruit: "ಹಲಸು",
  "Dragon Fruit": "ಡ್ರಾಗನ್ ಹಣ್ಣು",
  Avocado: "ಅವಕಾಡೊ",
  "Custard Apple (Sitaphal)": "ಸೀತಾಫಲ",
  Litchi: "ಲೀಚಿ",

  Tomato: "ಟೊಮ್ಯಾಟೋ",
  Onion: "ಈರುಳ್ಳಿ",
  Brinjal: "ಬದನೇಕಾಯಿ",
  Cabbage: "ಎಲೆಕೋಸು",
  Cauliflower: "ಹೂಕೋಸು",
  Beans: "ಹುರಳಿ",
  Carrot: "ಗಜ್ಜರಿ",
  Beetroot: "ಬೀಟ್ರೂಟ್",
  "Leafy Greens (Soppu)": "ಹಸಿರು ಸೊಪ್ಪು",
};

export function getLocalizedCropName(crop, lang) {
  return lang === "kn" ? cropKn[crop] || crop : crop;
}