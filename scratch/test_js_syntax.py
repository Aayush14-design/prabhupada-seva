import subprocess

cmd = ['node', '-e', 'global.window = {}; require("./js/data.js"); console.log("Loaded OK! Books count:", global.window.prabhupadaData.books.length);']
result = subprocess.run(cmd, capture_output=True, text=True)
print("STDOUT:", result.stdout)
print("STDERR:", result.stderr)
