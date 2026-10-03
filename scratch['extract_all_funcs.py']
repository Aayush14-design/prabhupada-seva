import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    app_code = f.read()

def extract_func(name):
    start = app_code.find('function ' + name + '(')
    if start == -1: return f"NOT FOUND: {name}"
    end = app_code.find('\nfunction ', start + 10)
    if end == -1: end = len(app_code)
    return app_code[start:end]

with open('scratch/all_functions.txt', 'w', encoding='utf-8') as out:
    out.write("=== initTeachings ===\n" + extract_func('initTeachings') + "\n\n")
    out.write("=== initBooks ===\n" + extract_func('initBooks') + "\n\n")
    out.write("=== initCenters ===\n" + extract_func('initCenters') + "\n\n")
    out.write("=== initSources ===\n" + extract_func('initSources') + "\n\n")

print("Saved scratch/all_functions.txt")
