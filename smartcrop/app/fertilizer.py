# Comprehensive fertilizer and soil health advisory system
from typing import Dict, List, Tuple

def fertilizer_advice(features: Dict[str, float]) -> List[str]:
    """Provide detailed fertilizer and soil health recommendations based on soil parameters"""
    tips: List[str] = []
    
    # Extract soil parameters
    n = float(features.get("N", 0))
    p = float(features.get("P", 0))
    k = float(features.get("K", 0))
    ph = float(features.get("ph", 7))
    rainfall = float(features.get("rainfall", 0))
    humidity = float(features.get("humidity", 0))
    temperature = float(features.get("temperature", 25))
    
    # Nitrogen recommendations
    if n < 20:
        tips.append("🌱 **Nitrogen Deficiency**: Apply 50-60 kg/ha of Urea or 100-120 kg/ha of well-decomposed farmyard manure. Consider leguminous green manure crops.")
    elif 20 <= n < 40:
        tips.append("🌱 **Low Nitrogen**: Apply 30-40 kg/ha of Urea or 80-100 kg/ha of organic compost. Supplement with neem cake for slow release.")
    elif 40 <= n < 60:
        tips.append("🌱 **Moderate Nitrogen**: Apply 20-30 kg/ha of Urea or maintain with regular organic matter addition. Consider crop rotation with legumes.")
    elif 60 <= n < 80:
        tips.append("🌱 **Adequate Nitrogen**: Current levels are sufficient. Monitor crop growth and apply side dressing if needed during active growth stages.")
    else:
        tips.append("🌱 **High Nitrogen**: Reduce nitrogen application. Consider crops that utilize more nitrogen. Watch for pest and disease susceptibility.")
    
    # Phosphorus recommendations
    if p < 20:
        tips.append("⚡ **Phosphorus Deficiency**: Apply 60-80 kg/ha of Single Super Phosphate (SSP) or 30-40 kg/ha of Di-Ammonium Phosphate (DAP). Use rock phosphate for organic farming.")
    elif 20 <= p < 40:
        tips.append("⚡ **Low Phosphorus**: Apply 40-60 kg/ha of SSP or 20-30 kg/ha of DAP. Incorporate bone meal or phosphate-solubilizing bacteria.")
    elif 40 <= p < 60:
        tips.append("⚡ **Moderate Phosphorus**: Apply 20-30 kg/ha of SSP or maintain with compost. Ensure proper soil pH for phosphorus availability.")
    elif 60 <= p < 80:
        tips.append("⚡ **Adequate Phosphorus**: Current levels are good. Focus on maintaining soil biological activity for phosphorus cycling.")
    else:
        tips.append("⚡ **High Phosphorus**: Reduce phosphorus application. Consider crops with high phosphorus requirements. Monitor for micronutrient imbalances.")
    
    # Potassium recommendations
    if k < 20:
        tips.append("🔥 **Potassium Deficiency**: Apply 40-50 kg/ha of Muriate of Potash (MOP) or 50-60 kg/ha of wood ash. Use potassium-rich organic materials like banana peels.")
    elif 20 <= k < 40:
        tips.append("🔥 **Low Potassium**: Apply 30-40 kg/ha of MOP or 40-50 kg/ha of wood ash. Incorporate green manure and compost.")
    elif 40 <= k < 60:
        tips.append("🔥 **Moderate Potassium**: Apply 20-30 kg/ha of MOP or maintain with regular organic matter addition. Consider crop-specific needs.")
    elif 60 <= k < 80:
        tips.append("🔥 **Adequate Potassium**: Current levels are sufficient. Monitor during fruit development stages for additional requirements.")
    else:
        tips.append("🔥 **High Potassium**: Reduce potassium application. Ensure adequate magnesium and calcium to maintain balance.")
    
    # pH management recommendations
    if ph < 5.5:
        tips.append("🧪 **Strongly Acidic Soil**: Apply 2-3 tonnes/ha of agricultural lime. Consider dolomite lime if magnesium is also deficient. Use acid-tolerant crops temporarily.")
    elif 5.5 <= ph < 6.0:
        tips.append("🧪 **Acidic Soil**: Apply 1-2 tonnes/ha of agricultural lime. Incorporate organic matter to improve buffering capacity. Monitor aluminum toxicity.")
    elif 6.0 <= ph < 6.5:
        tips.append("🧪 **Slightly Acidic**: Apply 0.5-1 tonne/ha of lime if growing sensitive crops. Most nutrients are available in this range. Maintain with organic amendments.")
    elif 6.5 <= ph <= 7.5:
        tips.append("🧪 **Optimal pH**: Excellent nutrient availability. Maintain with regular organic matter addition and balanced fertilization.")
    elif 7.5 < ph <= 8.0:
        tips.append("🧪 **Slightly Alkaline**: Apply elemental sulfur or gypsum (20-30 kg/ha). Use acid-forming fertilizers like ammonium sulfate. Incorporate organic matter.")
    elif 8.0 < ph <= 8.5:
        tips.append("🧪 **Moderately Alkaline**: Apply elemental sulfur (40-50 kg/ha) and organic matter. Use sulfur-coated urea. Consider micronutrient supplementation.")
    else:
        tips.append("🧪 **Strongly Alkaline**: Apply significant elemental sulfur (60-80 kg/ha) and large amounts of organic matter. Use acid-tolerant crops and foliar feeding.")
    
    # Climate-based recommendations
    if rainfall > 200 and humidity > 70:
        tips.append("🌧️ **High Rainfall & Humidity**: Use well-drained fields and raised beds. Apply fungicides preventively. Consider mulching to reduce soil erosion and nutrient leaching.")
    elif rainfall < 50 and humidity < 40:
        tips.append("☀️ **Low Rainfall & Humidity**: Focus on drought-resistant crops. Use drip irrigation and water-retaining organic matter. Apply anti-transpirants if needed.")
    
    # Temperature-based recommendations
    if temperature > 35:
        tips.append("🌡️ **High Temperature**: Use heat-tolerant varieties. Provide shade and ensure adequate irrigation. Apply organic mulch to reduce soil temperature.")
    elif temperature < 15:
        tips.append("❄️ **Low Temperature**: Use cold-tolerant varieties. Consider row covers or plastic mulching. Delay planting until soil warms up.")
    
    # Integrated soil health management
    if len(tips) <= 2:  # If soil is generally balanced
        tips.append("🌿 **Balanced Soil**: Maintain soil health with regular organic matter addition (5-10 tonnes/ha compost), crop rotation, and minimal tillage. Monitor soil health annually.")
    
    # General recommendations
    tips.append("📊 **Soil Testing**: Conduct comprehensive soil testing every 2-3 years to track nutrient levels and adjust fertilization strategies.")
    tips.append("🔄 **Crop Rotation**: Implement diverse crop rotation to break pest cycles and improve soil structure. Include legumes for nitrogen fixation.")
    tips.append("💧 **Water Management**: Maintain optimal soil moisture through efficient irrigation. Avoid waterlogging to prevent nutrient leaching.")
    
    return tips

def get_npk_status(n: float, p: float, k: float) -> Dict[str, str]:
    """Get NPK status categories for quick assessment"""
    def categorize(value: float, low: float, medium: float) -> str:
        if value < low:
            return "Low"
        elif value < medium:
            return "Medium"
        else:
            return "High"
    
    return {
        "nitrogen": categorize(n, 40, 60),
        "phosphorus": categorize(p, 40, 60),
        "potassium": categorize(k, 40, 60)
    }

def get_ph_status(ph: float) -> str:
    """Get pH status category"""
    if ph < 5.5:
        return "Strongly Acidic"
    elif ph < 6.0:
        return "Acidic"
    elif ph < 6.5:
        return "Slightly Acidic"
    elif ph <= 7.5:
        return "Optimal"
    elif ph <= 8.0:
        return "Slightly Alkaline"
    elif ph <= 8.5:
        return "Moderately Alkaline"
    else:
        return "Strongly Alkaline"
