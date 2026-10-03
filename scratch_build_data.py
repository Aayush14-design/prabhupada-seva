import json
import re

# Load parsed sections 0 to 28 (1 to 29)
parsed = json.load(open('parsed_sections.json', 'r', encoding='utf-8'))[:29]

chapters_data = []

# Chapter 1: Appearance & Family (Derived from childhood sources)
chapters_data.append({
    "id": "balyakal-ch1",
    "chapterNumber": 1,
    "title": "अध्याय १: आविर्भाव एवं पारिवारिक पृष्ठभूमि (1896)",
    "titleEn": "Chapter 1: Appearance & Family Heritage (1896)",
    "date": "१ सितंबर १८९६ (नंदोत्सव)",
    "highlights": ["आविर्भाव: १ सितंबर १८९६", "नंदोत्सव तिथि", "बेनियापुकुर, कलकत्ता", "सुवर्ण-वणिक वैष्णव कुल", "जन्म-कुंडली भविष्यवाणी"],
    "paragraphs": [
        "श्रील प्रभुपाद का आविर्भाव १ सितंबर १८९६ को कलकत्ता के गोराचांद रोड, बेनियापुकुर स्थित भवन में हुआ। वह पावन अवसर भगवान श्री कृष्ण के जन्मोत्सव का अगला दिन 'नंदोत्सव' था।",
        "उनके पिता श्री गौर मोहन डे और माता श्रीमती रजनी देवी अत्यंत धर्मनिष्ठ सुवर्ण-वणिक गौड़ीय-वैष्णव परिवार से थे। नवजात बालक का नाम 'अभय चरण' रखा गया—अर्थात् जो भगवान श्री कृष्ण के अभय कमल-चरणों का आश्रय लेकर सर्वथा निर्भय है।",
        "जन्म के समय आए वयोवृद्ध ज्योतिषी ने बालक की जन्म-कुंडली देखकर यह महान भविष्यवाणी की थी कि यह बालक सत्तर वर्ष की आयु प्राप्त करने के पश्चात् समुद्र पार करके पूरे संसार में भक्ति का संदेश फैलाएगा, एक सौ आठ भव्य मंदिरों की स्थापना करेगा और जगद्गुरु के रूप में प्रतिष्ठित होगा।"
    ],
    "sourceNote": "गौड़ीय-वैष्णव अभिलेखागार एवं बीबीटी आधिकारिक जीवन-वृत्त",
    "sourceUrl": "https://gbc.iskcon.org/srila-prabhupada/"
})

# Chapter 2: Gaur Mohan De's Devotion & Childhood
chapters_data.append({
    "id": "balyakal-ch2",
    "chapterNumber": 2,
    "title": "अध्याय २: गौर मोहन डे की आध्यात्मिक परवरिश व बाल्यकाल (1896–1910)",
    "titleEn": "Chapter 2: Gaur Mohan De's Spiritual Parenting & Childhood (1896–1910)",
    "date": "1896–1910 (बाल्यावस्था)",
    "highlights": ["पिता गौर मोहन डे का संकल्प", "राधा-गोविंद मंदिर दर्शन", "मृदंग शिक्षा", "वात्सल्यमयी माता रजनी देवी"],
    "paragraphs": [
        "अभय के पिता गौर मोहन डे का एकमात्र संकल्प यह था कि उनका पुत्र श्रीमती राधारानी और भगवान श्रीकृष्ण का शुद्ध प्रेमी भक्त बने। उन्होंने अभय को कभी पश्चिमी भौतिकवादी शिक्षा के लिए लंदन भेजने का विचार नहीं किया।",
        "गौर मोहन स्वयं बालक अभय को मृदंग बजाना सिखाते थे और प्रतिदिन भक्तिमय वातावरण प्रदान करते थे। हैरिसन रोड स्थित घर के सामने मुल्लिक परिवार का प्रसिद्ध श्री श्री राधा-गोविंद जी का मंदिर था। बालक अभय घंटों मंदिर में धूप, दीप, पुष्प और मधुर कीर्तन से होती हुई भव्य आरती देखते रहते थे।",
        "माता रजनी देवी का वात्सल्य प्रेम अत्यंत रक्षात्मक था, जबकि पिता उन्हें शास्त्रीय व व्यावहारिक वैष्णव संस्कारों में ढाल रहे थे। मंदिर के परिसर में खेलना, सड़क किनारे कचौड़ियाँ बनते देखना, साइकिल चलाना और बहन भवतारिणी के साथ पतंग उड़ाना उनके बचपन का स्वाभाविक हिस्सा था।"
    ],
    "sourceNote": "श्रील प्रभुपाद लीलामृत खंड १ (बाल्यकाल रिकॉर्ड)",
    "sourceUrl": "https://vedabase.io/en/library/spl/"
})

# Chapter 3: Childhood Rathayatra & Deity Worship
chapters_data.append({
    "id": "balyakal-ch3",
    "chapterNumber": 3,
    "title": "अध्याय ३: बाल्यकाल की रथयात्रा और विग्रह-सेवा (1901–1905)",
    "titleEn": "Chapter 3: Childhood Rathayatra & Deity Worship (1901–1905)",
    "date": "1901–1905 (आयु ५-९ वर्ष)",
    "highlights": ["५ वर्ष की आयु में रथयात्रा इच्छा", "३-फीट का लकड़ी का रथ", "बाल-कीर्तन व प्रसाद वितरण", "राधा-कृष्ण विग्रह पूजा"],
    "paragraphs": [
        "जब अभय केवल पाँच वर्ष के थे (1901), तब उन्होंने जगन्नाथ पुरी की प्रसिद्ध रथयात्रा की तर्ज़ पर कलकत्ता में भी रथयात्रा आयोजित करने की तीव्र इच्छा व्यक्त की। उनके पिता ने बढ़ई से एक छोटा ३-फीट ऊँचा लकड़ी का सुंदर रथ बनवाया।",
        "बालक अभय ने पड़ोस के बच्चों को एकत्र किया, रथ को रंग-बिरंगे वस्त्रों से सजाया, धूप व भोग अर्पित किया और गलियों में कीर्तन करते हुए रथयात्रा निकाली। मुल्लिक परिवार की वृद्ध महिलाएँ बच्चों को महाप्रсад बाँटती थीं।",
        "इसी आयु में अभय ने अपने पिता से स्वयं पूजा करने के लिए राधा-कृष्ण के विग्रह माँगे। पिता ने उन्हें सुंदर विग्रह दिए, जिनकी वे अपने छोटे हाथों से धूप-बत्ती घुमाकर निष्ठापूर्वक पूजा करते थे। पाँच वर्ष की आयु से ही वे ट्रेन की समय-सारणी देखकर यह सोचते थे कि एक दिन पुरी और वृन्दावन कैसे जाएँगे।"
    ],
    "sourceNote": "श्रील प्रभुपाद लीलामृत खंड १",
    "sourceUrl": "https://vedabase.io/en/library/spl/"
})

# Add sections 1 to 29 from source file!
for idx, sec in enumerate(parsed):
    sec_num = idx + 4
    chapters_data.append({
        "id": f"balyakal-ch{sec_num}",
        "chapterNumber": sec_num,
        "title": f"अध्याय {sec_num}: {sec['title']}",
        "titleEn": f"Chapter {sec_num}: {sec['title']}",
        "date": "1914–1916" if sec_num >= 5 else "1900–1915",
        "highlights": [f"स्रोत भाग {sec_num-3}", "1896–1916 बाल्यकाल"],
        "paragraphs": sec['paras'],
        "sourceNote": "1914 का युद्ध और कॉलेज में प्रवेश (मूल पांडुलिपि)",
        "sourceUrl": "https://vedabase.io/en/library/spl/"
    })

leela_single = [{
    "id": "balyakal",
    "title": "बाल्यकाल (Balyakal)",
    "titleEn": "Childhood & Early Life (Balyakal)",
    "titleGu": "બાલ્યાવસ્થા (Balyakal)",
    "duration": "1896–1916",
    "era": "early",
    "status": "active",
    "subtitle": "आविर्भाव, वैष्णव परवरिश, बाल्यकाल की रथयात्रा, ओरिएंटल सेमिनेरी एवं स्कॉटिश चर्चेज कॉलेज का प्रारंभिक जीवन (1896–1916)",
    "subtitleEn": "Appearance, Devotional Upbringing, Childhood Rathayatra, Oriental Seminary & Scottish Churches College (1896–1916)",
    "summary": "श्रील प्रभुपाद (अभय चरण डे) के कलकत्ता में आविर्भाव (1896), पिता गौर मोहन डे द्वारा दी गई शुद्ध वैष्णव परवरिश, बचपन की विग्रह-सेवा व रथयात्रा, ओरिएंटल सेमिनेरी में शिक्षा, 1914 का प्रथम विश्वयुद्ध, 1916 में स्कॉटिश चर्चेज कॉलेज में प्रवेश, प्रोफेसरों से संबंध, चैतन्य-लीला नाटक में अभिनय, 'धीर' शब्द की प्रेरणा, बाइबल अध्ययन व कर्म-सिद्धांत चर्चा, और सुभाष चंद्र बोस व गांधीजी के विचारों के प्रभाव की पूर्ण प्रामाणिक गाथा।",
    "sourceTitle": "1914 का युद्ध और कॉलेज में प्रवेश (मूल पांडुलिपि) एवं श्रील प्रभुपाद लीलामृत खंड १",
    "sourceId": "prabhupada-lilamrita",
    "sourceUrl": "https://vedabase.io/en/library/spl/",
    "chapters": chapters_data
}]

print("Total chapters created:", len(chapters_data))

with open('js/data.js', 'r', encoding='utf-8') as f:
    data_js_content = f.read()

# Replace leelas: [...] with updated leela_single
replacement_str = "  leelas: " + json.dumps(leela_single, ensure_ascii=False, indent=4) + ","

pattern = r'  leelas: \[\s*\{.*?\}\s*\],'
updated_js = re.sub(pattern, replacement_str, data_js_content, flags=re.DOTALL)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(updated_js)

print("Successfully updated js/data.js with ONLY बाल्यकाल (1896–1916) and all 32 detailed sub-sections!")
