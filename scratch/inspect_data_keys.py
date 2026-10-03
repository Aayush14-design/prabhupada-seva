import json, re

with open('js/data.js', 'r', encoding='utf-8') as f:
    code = f.read()

def inspect_key(key):
    pos = code.find(key + ': [')
    if pos == -1: return f"Key '{key}' NOT FOUND in data.js"
    end = code.find(']', pos)
    return code[pos:pos+400]

print("=== sources ===")
print(inspect_key('sources'))

print("\n=== iskconCenters ===")
print(inspect_key('iskconCenters'))

print("\n=== teachings ===")
print(inspect_key('teachings'))
