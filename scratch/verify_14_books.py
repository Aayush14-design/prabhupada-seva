import os, json, re

with open('js/data.js', 'r', encoding='utf-8') as f:
    code = f.read()

start_idx = code.find('books: [')
end_idx = code.find('  quotes: [') - 3

books_str = code[start_idx + len('books: '):end_idx + 1]

ids = re.findall(r'id:\s*"([^"]+)"', books_str)
titles = re.findall(r'title:\s*"([^"]+)"', books_str)
pdfs = re.findall(r'pdfUrl:\s*"([^"]+)"', books_str)
covers = re.findall(r'coverUrl:\s*"([^"]+)"', books_str)

print(f"Verified 14 Books in js/data.js: {len(ids)} books total")
assert len(ids) == 14, f"Expected 14 books, found {len(ids)}"

for i in range(14):
    pdf_path = pdfs[i]
    cover_path = covers[i]
    assert os.path.exists(pdf_path), f"PDF path missing: {pdf_path}"
    assert os.path.exists(cover_path), f"Cover path missing: {cover_path}"

print("All 14 books verified with valid PDFs and Cover images!")
