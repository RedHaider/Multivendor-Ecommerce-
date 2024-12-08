import cv2

cap = cv2.VideoCapture(0)  # Replace 0 with 1 or 2 if needed

if not cap.isOpened():
    print("Error: Unable to access the webcam.")
else:
    print("Webcam is accessible.")
    cap.release()
