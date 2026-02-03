---
layout: post
title: "FitXAI Implementation - Building an Explainable AI (xAI) Workout Coach"
date: 2026-02-03 12:20:00 -0800
categories: [Machine Learning, AI Engineering, Streamlit]
tags: [Random Forest, SHAP, Streamlit, Explainable AI, Fitness Tech]
image: /assets/blog-images/19.png
description: "Deep dive into the implementation of FitXAI - an ensemble-based xAI inference engine that provides transparent workout recommendations using Random Forests and SHAP explanations."
---

In my previous post, we explored the theoretical foundations of using Random Forests for workout recommendation. Today, I'm excited to share the complete implementation of **FitXAI** - an explainable AI system that provides personalized workout plans with full transparency into how each decision is made.

## 🎯 The Vision: Transparent AI Coaching

Traditional fitness apps often operate as black boxes - you input your data, get recommendations, but have no idea *why* the system suggested particular exercises or splits. FitXAI changes this paradigm by combining:

- **Evidence-based machine learning** (Random Forest ensembles)
- **Explainable AI** (SHAP values for feature importance)
- **Natural language explanations** (LLM-powered coaching insights)

## 🏗️ System Architecture

### Core Components

The FitXAI system consists of several key components working in harmony:

```python
# Main prediction pipeline
def create_aggregated_explanation(shap_values, feature_names, input_transformed, target_idx=0):
    """Create aggregated SHAP explanation with human-readable features"""
    # Process multi-output SHAP values
    # Aggregate one-hot encoded features
    # Generate human-readable explanations
```

### Data Schema Design

The system processes 8 core input parameters:

```python
FEATURE_COLS = [
    'height_cm',      # User height
    'physique_idx',   # Body type (-0.5 to 0.5)
    'exp_idx',        # Experience level (0.1 to 0.8)
    'joint_health',   # Joint health (1-10 scale)
    'stress_idx',     # Stress level (1-10 scale)
    'avail_min',      # Available workout time
    'equip_lvl',      # Equipment access (0-2)
    'goal_id'         # Primary goal (0-2)
]
```

These inputs are transformed through a preprocessing pipeline that handles:
- **Numerical scaling** for continuous variables
- **One-hot encoding** for categorical features
- **Feature engineering** for optimal model performance

You'll notice with these 3 points as well as the above code snippets, I had quite a bit of data processing to do. That's always a challenge with machine learning, but it's a necessary step. My tabular data did not have just one "target" like you may have seen or experimented with in an online course or college. I had to create a multi-output Random Forest model that predicted 5 dimensions simultaneously, breaking them apart with the three methods listed, then aggregating the output to make it understandable to anyone reading. I'll probably go more into detail with this another time, perhaps by editing this post and uploading a video on my channel- but for now, let's move on to the Random Forest Ensemble.

## 🤖 The Random Forest Ensemble

### Multi-Output Architecture

Unlike single-output classifiers, FitXAI uses a **multi-output Random Forest** that predicts 5 dimensions simultaneously... take this example:

```python
{
    'workout_split': 2,        # PPL, Full Body, or Upper/Lower
    'training_modality': 1,    # Machines, Calisthenics, or Weights
    'cardio_approach': 0,      # None, LISS, or HIIT
    'intensity_level': 1,      # Low, Medium, or High
    'rest_days': 2            # Number of rest days per week
}
```

This approach ensures **coherent recommendations** - all outputs are optimized together rather than independently, and will then be aggregated to make it understandable to anyone reading. 

### Ensemble Benefits

The Random Forest provides several advantages over single decision trees:

- **Reduced overfitting** through bootstrap aggregation
- **Feature importance ranking** built into the model
- **Robustness to outliers** and noisy data
- **Parallelizable training** for scalability

## 🧠 Explainable AI Implementation

### SHAP Integration

The magic of FitXAI lies in its transparency. Using SHAP (SHapley Additive exPlanations), we can show exactly how each factor influences recommendations:

```python
# Create SHAP explanations for each prediction
explainer = shap.TreeExplainer(model.named_steps['classifier'])
shap_values = explainer.shap_values(input_transformed)

# Generate human-readable explanations
clean_exp, final_names, agg_vals, agg_data = create_aggregated_explanation(
    shap_values, transformed_names, current_transformed, target_idx
)
```
by the way, 'classifier' is the Random Forest model itself.

### Feature Aggregation Strategy

One challenge with SHAP is handling one-hot encoded features. I implemented an aggregation system that groups related features as mentioned throughout the post:

```python
# Define feature groups for aggregation
ohe_groups = {
    "Equipment": {
        "features": [f for f in feature_names if "equip_lvl" in f],
        "labels": EQUIPMENT_LABELS
    },
    "Goal": {
        "features": [f for f in feature_names if "goal_id" in f],
        "labels": GOAL_LABELS
    }
}
```

This provides **intuitive explanations** like "Equipment: Full Gym increases recommendation" rather than confusing one-hot encoded values. 

For full transparency, I was not able to aggregate the One-Hot Encoded features for the second bar graph below the waterfall chart, but I was able to aggregate for the first one. It ain't easy!

## 🎨 User Interface Design

### Streamlit Implementation

The entire application is built using Streamlit for rapid development and deployment:

```python
# Page configuration for optimal user experience
st.set_page_config(
    page_title="FitXAI Coach",
    layout="centered",
    initial_sidebar_state="expanded"
)
```

### Custom Visualization

As mentioned, I created custom waterfall charts to replace brittle SHAP visualizations which I personally did not have a taste for:

```python
def create_custom_waterfall_chart(feature_names, shap_values, data_values):
    """Create custom horizontal bar chart to replace brittle SHAP waterfall"""
    fig, ax = plt.subplots(figsize=(12, 8))
    
    # Sort features by absolute SHAP impact
    sorted_indices = np.argsort(np.abs(shap_values))[::-1]
    
    # Create horizontal bars with color coding
    colors = ['#2ecc71' if v > 0 else '#e74c3c' for v in sorted_shap]
    bars = ax.barh(y_pos, sorted_shap, align='center', color=colors, alpha=0.8)
```

### Real-time Explanations

The system provides multiple layers of explanation:

1. **Visual SHAP charts** showing feature impact
2. **AI coach summaries** using LLM integration
3. **Weekly workout schedules** with exercise recommendations
4. **Downloadable reports** for offline reference

## 🔧 Technical Challenges & Solutions

### Multi-Output SHAP Handling

One significant challenge was handling SHAP values for multi-output models, since the SHAP values are returned as a list of arrays and it got confusing with all my mappings, targets, and features:

```python
# Correct multi-output extraction
if isinstance(shap_values, list):
    vals = shap_values[target_idx][0]
else:
    vals = shap_values[0, :, target_idx]
```

### Data Validation

I implemented comprehensive input validation using Pydantic:

```python
class FitnessInput(BaseModel):
    height_cm: float
    physique_idx: float
    exp_idx: float
    
    @validator('height_cm')
    def validate_height(cls, v):
        if not 100 <= v <= 250:
            raise ValueError('Height must be between 100-250 cm')
        return v
```

### Performance Optimization

The system uses Streamlit's caching mechanisms, which I found to be a bit of a challenge to implement, but it works well since I could just use premade snippets I found online from other projects:

```python
@st.cache_resource
def load_model():
    """Cache model loading for performance"""
    return joblib.load('fitness_model.joblib')
```

## 🚀 Deployment & Accessibility

### Hugging Face Spaces Integration

The entire application is deployed on [Hugging Face Spaces](https://huggingface.co/spaces/william-ai-dev/fit-xai) for easy access:

- **Zero-config deployment** with Streamlit
- **Automatic scaling** for user traffic
- **Version control** integration
- **Community sharing** capabilities

### Data Collection & Improvement

The system includes anonymized data collection:

```python
def save_user_data(user_inputs, predictions):
    """Save user input data and predictions to CSV"""
    with open(csv_file, 'a', newline='') as f:
        writer = csv.writer(f)
        writer.writerow([datetime.now().isoformat(), ...])
```

This enables **continuous model improvement** while maintaining user privacy.

## 🎯 Key Learnings

### What Worked Well

1. **Multi-output Random Forests** provide coherent recommendations
2. **SHAP explanations** build user trust and understanding
3. **Streamlit** enables rapid prototyping and deployment
4. **Feature aggregation** makes complex models interpretable

### Challenges Overcome

1. **SHAP visualization brittleness** - solved with custom charts
2. **Multi-output explanation complexity** - solved with careful indexing, but the 2nd one is still not working!
3. **User interface stability** - solved with comprehensive CSS styling
4. **Data preprocessing** - solved with robust pipeline architecture

## 🔮 Future Enhancements

The current implementation opens several exciting possibilities:

- **Exercise progression tracking** over time
- **Adaptive learning** from user feedback
- **Integration with wearables** for real-time data
- **Social features** for workout sharing
- **Advanced visualizations** for deeper insights

## 🎉 Try It Yourself!

I invite you to experience FitXAI firsthand at [https://huggingface.co/spaces/william-ai-dev/fit-xai](https://huggingface.co/spaces/william-ai-dev/fit-xai). The system is completely free to use and provides:

- Personalized workout recommendations
- Detailed AI explanations
- Downloadable workout plans
- Real-time feature importance analysis

## 📚 Resources & Code

The complete source code is available in the Hugging Face Space repository. Key components include:

- **Model training pipeline** with data preprocessing
- **SHAP integration** for explainable AI
- **Custom visualization** components
- **Streamlit UI** with responsive design

---

**FitXAI represents my commitment to transparent, explainable AI systems that empower users rather than mystify them. By combining the statistical rigor of Random Forests with the explanatory power of SHAP, we can create AI systems that not only make accurate predictions but also help users understand the reasoning behind those predictions. I think any engineer who wants a job with AI should be ready to explain how it works under the hood and prove it**
