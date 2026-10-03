import json

data = json.load(open('parsed_sections.json', 'r', encoding='utf-8'))

with open('scratch_sections_1_to_29.txt', 'w', encoding='utf-8') as f:
    for idx in range(29):
        sec = data[idx]
        f.write(f"=== SECTION {idx+1}: {sec['title']} ===\n")
        for p in sec['paras']:
            f.write(p + "\n")
        f.write("\n")

print("Extracted sections 1 to 29 successfully!")
