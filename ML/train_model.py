#trains your ML fraud detection model
import pandas as pd #read csv file
from sklearn.model_selection import train_test_split  
#Used to split dataset into:
#training data
#testing data
from sklearn.ensemble import RandomForestClassifier #This is your ML algorithm.
from sklearn.metrics import accuracy_score #How accurate model predictions are
import joblib 

# LOAD DATASET
data = pd.read_csv("dataset.csv")

# INPUT FEATURES
X = data[
    [
        "amount",
        "targetAmount",
        "raisedAmount",
        "donationCount",
        "userDonationCount",
    ]
]

# OUTPUT LABEL
y = data["label"]

# SPLIT DATA
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2, #20% data used for testing , 80% used for training
    random_state=42
)

# CREATE MODEL
model = RandomForestClassifier()

# TRAIN MODEL
model.fit(X_train, y_train) # ML learns patterns from dataset.

# TEST MODEL
predictions = model.predict(X_test) 

# CHECK ACCURACY
accuracy = accuracy_score(y_test, predictions)

print("Model Accuracy:", accuracy)

# SAVE MODEL
joblib.dump(model, "model.pkl")

print("Model saved as model.pkl")