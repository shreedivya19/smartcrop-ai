// frontend/src/utils/districtNames.js

const districtKn = {
  Bagalkot: "ಬಾಗಲಕೋಟೆ",
  Ballari: "ಬಳ್ಳಾರಿ",
  Belagavi: "ಬೆಳಗಾವಿ",
  "Bengaluru Rural": "ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ",
  "Bengaluru Urban": "ಬೆಂಗಳೂರು ನಗರ",
  Bidar: "ಬೀದರ್",
  Chamarajanagar: "ಚಾಮರಾಜನಗರ",
  Chikkaballapur: "ಚಿಕ್ಕಬಳ್ಳಾಪುರ",
  Chikkamagaluru: "ಚಿಕ್ಕಮಗಳೂರು",
  Chitradurga: "ಚಿತ್ರದುರ್ಗ",
  "Dakshina Kannada": "ದಕ್ಷಿಣ ಕನ್ನಡ",
  Davangere: "ದಾವಣಗೆರೆ",
  Dharwad: "ಧಾರವಾಡ",
  Gadag: "ಗದಗ",
  Hassan: "ಹಾಸನ",
  Haveri: "ಹಾವೇರಿ",
  Kalaburagi: "ಕಲಬುರಗಿ",
  Kodagu: "ಕೊಡಗು",
  Kolar: "ಕೋಲಾರ",
  Koppal: "ಕೊಪ್ಪಳ",
  Mandya: "ಮಂಡ್ಯ",
  Mysuru: "ಮೈಸೂರು",
  Raichur: "ರಾಯಚೂರು",
  Ramanagara: "ರಾಮನಗರ",
  Shivamogga: "ಶಿವಮೊಗ್ಗ",
  Tumakuru: "ತುಮಕೂರು",
  Udupi: "ಉಡುಪಿ",
  "Uttara Kannada" : "ಉತ್ತರ ಕನ್ನಡ",
  Vijayanagara: "ವಿಜಯನಗರ",
  Vijayapura: "ವಿಜಯಪುರ",
  Yadgir: "ಯಾದಗಿರಿ",
};

// ✔ Works for both "Mysuru" and ["Mysuru", "Mandya"]
export function getLocalizedDistrictList(input, lang) {
  const translateOne = (d) =>
    lang === "kn" ? districtKn[d] || d : d;

  if (Array.isArray(input)) {
    return input.map(translateOne).join(", ");
  }

  // single string
  return translateOne(input);
}