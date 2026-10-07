import os
import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

# Read js/data.js
with open('js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Parse book blocks
start = text.find('books: [')
end = text.find('quotes: [', start)
books_str = text[start:end]

# Extract IDs
ids = re.findall(r'id:\s*"([^"]+)"', books_str)
pdf_urls = re.findall(r'pdfUrl:\s*"([^"]+)"', books_str)
cover_urls = re.findall(r'coverUrl:\s*"([^"]+)"', books_str)
titles = re.findall(r'title:\s*"([^"]+)"', books_str)

print(f"Total Books Found in js/data.js: {len(ids)}")
assert len(ids) == 18, f"Expected 18 books, found {len(ids)}"

print("\n--- Book List ---")
for i, (b_id, title, pdf, img) in enumerate(zip(ids, titles, pdf_urls, cover_urls), 1):
    pdf_full = os.path.join(os.getcwd(), pdf.replace('/', os.sep))
    img_full = os.path.join(os.getcwd(), img.replace('/', os.sep))
    pdf_exists = os.path.exists(pdf_full)
    img_exists = os.path.exists(img_full)
    print(f"{i:2d}. [{b_id}] {title}")
    print(f"    PDF: {pdf} (Exists: {pdf_exists})")
    print(f"    Cover: {img} (Exists: {img_exists})")
    assert pdf_exists, f"Missing PDF for {b_id}: {pdf_full}"
    assert img_exists, f"Missing Cover for {b_id}: {img_full}"

# Ensure uniqueness
assert len(set(ids)) == 18, "Duplicate IDs found!"
assert len(set(pdf_urls)) == 18, "Duplicate PDF URLs found!"

print("\nSUCCESS: All 18 unique books verified successfully with valid PDFs and Cover images!")
