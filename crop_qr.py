import cv2
import os

img_path = r'C:\Users\jathi\Downloads\Green-Meadows-Clone\Green-Meadows-Clone\artifacts\vivanta-green-meadows\public\assets\last_page_img0.jpeg'
out_path = r'C:\Users\jathi\Downloads\Green-Meadows-Clone\Green-Meadows-Clone\artifacts\vivanta-green-meadows\public\assets\qr_code.jpeg'

image = cv2.imread(img_path)
if image is None:
    print('Failed to load image.')
    exit(1)

h, w = image.shape[:2]
# The QR code is on the top left. The page is a standard brochure page.
# Let's crop the top left section of the image.
# We will guess the coordinates: it's usually around x: 50-300, y: 150-400
# But I will just crop a square of 250x250 at offset (100, 100)
# To be safe, let's crop a slightly larger area: x=50:400, y=100:450
cropped = image[100:450, 50:400]
cv2.imwrite(out_path, cropped)
print('Fallback crop saved to', out_path)
