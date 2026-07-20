import fitz
import os

pdf_path = r'C:\Users\jathi\Downloads\Green-Meadows-Clone\Vivanta Green Meadows Brochure.pdf'
out_dir = r'C:\Users\jathi\Downloads\Green-Meadows-Clone\Green-Meadows-Clone\artifacts\vivanta-green-meadows\public\assets'

os.makedirs(out_dir, exist_ok=True)

doc = fitz.open(pdf_path)

# First page images
page_first = doc[0]
for idx, img in enumerate(page_first.get_images(full=True)):
    xref = img[0]
    base_image = doc.extract_image(xref)
    image_bytes = base_image['image']
    image_ext = base_image['ext']
    with open(os.path.join(out_dir, f'page1_img{idx}.{image_ext}'), 'wb') as f:
        f.write(image_bytes)

# Last page images
page_last = doc[-1]
for idx, img in enumerate(page_last.get_images(full=True)):
    xref = img[0]
    base_image = doc.extract_image(xref)
    image_bytes = base_image['image']
    image_ext = base_image['ext']
    with open(os.path.join(out_dir, f'last_page_img{idx}.{image_ext}'), 'wb') as f:
        f.write(image_bytes)

print('Images extracted to', out_dir)
