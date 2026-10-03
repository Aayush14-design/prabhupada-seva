import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    code = f.read()

def count_items(key):
    pos = code.find(key + ': [')
    if pos == -1: return 0
    # count number of id: inside this array block
    next_array_pos = code.find(':\n  [', pos + 10)
    if next_array_pos == -1: next_array_pos = code.find('\n  [', pos + 10)
    if next_array_pos == -1: next_array_pos = len(code)
    block = code[pos:next_array_pos]
    ids = re.findall(r'id:\s*"([^"]+)"', block)
    return len(ids)

print("Items count in INITIAL_DATA:")
print(" - sources:", count_items('sources'))
print(" - iskconCenters:", count_items('iskconCenters'))
print(" - books:", count_items('books'))
print(" - timeline:", count_items('timeline'))
print(" - quotes:", count_items('quotes'))
print(" - audioTracks:", count_items('audioTracks'))
print(" - vanis:", count_items('vanis'))
print(" - gitaChapters:", count_items('gitaChapters'))
