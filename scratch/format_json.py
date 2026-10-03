import json, re

with open('scratch/balaykal_parsed.json', 'r', encoding='utf-8') as f:
    b_secs = json.load(f)

with open('scratch/yuva_parsed.json', 'r', encoding='utf-8') as f:
    y_secs = json.load(f)

def text_to_paragraphs(text):
    raw_blocks = [b.strip() for b in text.split('\n') if b.strip()]
    paragraphs = []
    for block in raw_blocks:
        paragraphs.append(block)
    return paragraphs

def extract_highlights(text):
    highlights = []
    lines = text.splitlines()
    for line in lines:
        line_s = line.strip()
        if line_s.startswith('**') and line_s.endswith('**'):
            cleaned = line_s.strip('*').strip('“').strip('”').strip('"')
            if len(cleaned) < 100:
                highlights.append(cleaned)
    return highlights[:3]

b_chapters = []
for i, s in enumerate(b_secs):
    t_val = s['title']
    paras = text_to_paragraphs(s['content'])
    hl = extract_highlights(s['content'])
    b_chapters.append({
        'id': 'balaykal-ch' + str(i+1),
        'chapterNumber': i+1,
        'title': t_val,
        'date': '1896–1916',
        'content': s['content'],
        'paragraphs': paras,
        'highlights': hl,
        'sourceNote': 'श्रील प्रभुपाद बाल्यकाल प्रामाणिक पांडुलिपि (BBT Archives)',
        'sourceUrl': 'https://vedabase.io/en/library/spl/'
    })

y_chapters = []
for i, s in enumerate(y_secs):
    t_val = s['title']
    paras = text_to_paragraphs(s['content'])
    hl = extract_highlights(s['content'])
    y_chapters.append({
        'id': 'yuva-ch' + str(i+1),
        'chapterNumber': i+1,
        'title': t_val,
        'date': '1916–1921',
        'content': s['content'],
        'paragraphs': paras,
        'highlights': hl,
        'sourceNote': 'श्रील प्रभुपाद युवा अवस्था प्रामाणिक पांडुलिपि (BBT Archives)',
        'sourceUrl': 'https://vedabase.io/en/library/spl/'
    })

balaykal_leela = {
    'id': 'balyakal',
    'title': 'बाल्यकाल (BALYAKAL)',
    'titleEn': 'Childhood and Early Life (BALYAKAL)',
    'duration': '1896–1916',
    'status': 'active',
    'subtitle': 'जन्म, वैष्णव संस्कार, राधा-कृष्ण विग्रह सेवा, एवं प्रारंभिक शिक्षा (1896–1916)',
    'summary': 'श्रील प्रभुपाद (अभय चरण दे) का जन्म 1 सितंबर 1896 को कलकत्ता में हुआ। पिता गौर मोहन दे एवं माता रजनी देवी के संरक्षण में उनका बाल्यकाल परम वैष्णव संस्कारों में बीता। उन्होंने बचपन में ही राधा-गोविंद विग्रह सेवा तथा भव्य रथयात्रा का आयोजन किया और ओरिएंटल सेमिनरी में प्रारंभिक शिक्षा प्राप्त की।',
    'heroImage': 'assets/images/prabhupada-young.jpg',
    'sourceTitle': 'श्रील प्रभुपाद बाल्यकाल प्रामाणिक पांडुलिपि एवं श्रील प्रभुपाद लीलामृत खंड १',
    'sourceUrl': 'https://vedabase.io/en/library/spl/',
    'chapters': b_chapters
}

yuva_leela = {
    'id': 'yuva-avastha',
    'title': 'युवा अवस्था (YUVA AVASTHA)',
    'titleEn': 'Youth and Higher Education (YUVA AVASTHA)',
    'duration': '1916–1921',
    'status': 'active',
    'subtitle': 'स्कॉटिश चर्चेज कॉलेज, राष्ट्रीय आंदोलन, विवाह, एवं डॉ. बोस प्रयोगशाला (1916–1921)',
    'summary': '1916 से 1921 के मध्य अभय चरण दे ने स्कॉटिश चर्चेज कॉलेज में दर्शनशास्त्र, अंग्रेजी एवं अर्थशास्त्र का अध्ययन किया। सुभाष चंद्र बोस संग अध्ययन, महात्मा गांधी के असहयोग आंदोलन के आह्वान पर बी.ए. डिग्री का त्याग, राधारानी दत्ता से विवाह, और डॉ. कार्तिक चंद्र बोस की रसायन प्रयोगशाला में प्रबंधक का पद ग्रहण करना इस काल की प्रमुख घटनाएँ हैं।',
    'heroImage': 'assets/images/prabhupada-youth.jpg',
    'sourceTitle': 'श्रील प्रभुपाद युवा अवस्था प्रामाणिक पांडुलिपि एवं श्रील प्रभुपाद लीलामृत खंड १',
    'sourceUrl': 'https://vedabase.io/en/library/spl/',
    'chapters': y_chapters
}

leelas_data = [balaykal_leela, yuva_leela]

with open('scratch/leelas_generated.json', 'w', encoding='utf-8') as f:
    json.dump(leelas_data, f, ensure_ascii=False, indent=2)

print('Generated leelas_generated.json successfully!')

# Update js/data.js
with open('js/data.js', 'r', encoding='utf-8') as f:
    code = f.read()

leelas_json_str = json.dumps(leelas_data, ensure_ascii=False, indent=2)
leelas_start_idx = code.find('  leelas: [')
books_start_idx = code.find('  books: [')

before = code[:leelas_start_idx]
after = code[books_start_idx:]

new_code = before + '  leelas: ' + leelas_json_str + ',\n\n\n' + after

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(new_code)

print('Updated js/data.js successfully!')
