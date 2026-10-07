import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('js/data.js', 'r', encoding='utf-8') as f:
    text = f.read()

start = text.find('books: [')
end = text.find('quotes: [', start)
books_str = text[start:end]

# Extract object blocks
book_blocks = books_str.split('{\n      id:')
print(f"Total book blocks found: {len(book_blocks)-1}")

for idx, block in enumerate(book_blocks[1:], 1):
    print(f"--- Book {idx} ---")
    lines = block.strip().split('\n')
    for l in lines[:15]:
        print("  ", l.strip())
