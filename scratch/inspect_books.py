import json, re, os

with open('js/data.js', 'r', encoding='utf-8') as f:
    code = f.read()

start_idx = code.find('books: [')
end_idx = code.find('  quotes: [') - 3

books_str = code[start_idx + len('books: '):end_idx + 1]

# extract all book dict blocks
blocks = re.split(r'\n\s*\{\s*\n', books_str)

out_lines = []
out_lines.append(f"Total book blocks: {len(blocks)}")

book_list = []
for block in blocks:
    if 'id:' not in block: continue
    bid = re.search(r'id:\s*"([^"]+)"', block)
    btitle = re.search(r'title:\s*"([^"]+)"', block)
    btitle_hi = re.search(r'titleHindi:\s*"([^"]+)"', block)
    bpdf = re.search(r'pdfUrl:\s*"([^"]+)"', block)
    bcover = re.search(r'coverUrl:\s*"([^"]+)"', block)
    bcat = re.search(r'category:\s*"([^"]+)"', block)

    item = {
        'id': bid.group(1) if bid else None,
        'title': btitle.group(1) if btitle else None,
        'titleHindi': btitle_hi.group(1) if btitle_hi else None,
        'pdfUrl': bpdf.group(1) if bpdf else None,
        'coverUrl': bcover.group(1) if bcover else None,
        'category': bcat.group(1) if bcat else None,
    }
    book_list.append(item)

out_lines.append(f"Total parsed books: {len(book_list)}\n")

for idx, b in enumerate(book_list):
    pdf_exists = os.path.exists(b['pdfUrl']) if b['pdfUrl'] else False
    cover_exists = os.path.exists(b['coverUrl']) if b['coverUrl'] else False
    out_lines.append(f"{idx+1}. [{b['id']}] {b['title']} / {b['titleHindi']}")
    out_lines.append(f"   PDF: {b['pdfUrl']} (Exists: {pdf_exists})")
    out_lines.append(f"   Cover: {b['coverUrl']} (Exists: {cover_exists})")
    out_lines.append(f"   Category: {b['category']}\n")

with open('scratch/books_list.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(out_lines))

print(f"Wrote scratch/books_list.txt with {len(book_list)} books!")
