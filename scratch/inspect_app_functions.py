import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    app_code = f.read()

def get_function(name):
    pattern = r'function\s+' + name + r'\s*\(\)[^{]*\{'
    m = re.search(pattern, app_code)
    if not m:
        return f"Function {name} NOT FOUND"
    start = m.start()
    # find closing brace or next function
    return app_code[start:start+1200]

print("=== initTeachings() ===")
print(get_function('initTeachings'))

print("\n=== initBooks() ===")
print(get_function('initBooks'))

print("\n=== initCenters() ===")
print(get_function('initCenters'))

print("\n=== initSources() ===")
print(get_function('initSources'))
