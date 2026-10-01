/* Seed dataset for Prabhupada Seva application */
const INITIAL_DATA = {
  sources: [
    {
      id: "gbc-biography",
      name: "Official Biography of Srila Prabhupada",
      publisher: "ISKCON Governing Body Commission",
      url: "https://gbc.iskcon.org/srila-prabhupada/",
      type: "Official institutional biography",
      verified: true
    },
    {
      id: "iskcon-history",
      name: "History & Evolution of ISKCON",
      publisher: "ISKCON Communications",
      url: "https://iskcon.org/history/",
      type: "Official institutional history",
      verified: true
    },
    {
      id: "prabhupada-lilamrita",
      name: "Srila Prabhupada-lilamrta",
      publisher: "Bhaktivedanta Book Trust (BBT)",
      author: "Satsvarupa dasa Goswami",
      url: "https://vedabase.io/en/library/spl/",
      type: "Authorized biography",
      verified: true
    },
    {
      id: "vedabase-archives",
      name: "Bhaktivedanta Vedabase Digital Archives",
      publisher: "BBT Archives",
      url: "https://vedabase.io/",
      type: "Primary source archives (Letters, Lectures, Conversations)",
      verified: true
    }
  ],

  timeline: [
    {
      id: "t1",
      year: "1896",
      title: "Appearance in Calcutta",
      era: "early",
      summary: "Born as Abhay Charan De on September 1, 1896, in Calcutta on the day of Nandotsava.",
      details: "His parents, Gour Mohan De and Rajani De, were devout Vaishnavas who nurtured his spiritual inclination from early childhood. He was raised with deep devotion to Lord Krishna and Sri Sri Radha-Govinda.",
      sourceId: "gbc-biography",
      verified: true
    },
    {
      id: "t2",
      year: "1922",
      title: "First Meeting with Srila Bhaktisiddhanta Sarasvati",
      era: "preparation",
      summary: "Met his spiritual master, Srila Bhaktisiddhanta Sarasvati Goswami Maharaja, in Calcutta.",
      details: "During their very first meeting, Srila Bhaktisiddhanta requested Abhay to preach the message of Chaitanya Mahaprabhu in the English-speaking world. This instruction became Abhay's life mission.",
      sourceId: "prabhupada-lilamrita",
      verified: true
    },
    {
      id: "t3",
      year: "1944",
      title: "Publication of 'Back to Godhead' Magazine",
      era: "preparation",
      summary: "Single-handedly launched and edited the English magazine 'Back to Godhead'.",
      details: "During World War II, despite paper shortages and financial challenges, Abhay wrote, typed, proofread, printed, and distributed the magazine himself across Delhi and Calcutta.",
      sourceId: "prabhupada-lilamrita",
      verified: true
    },
    {
      id: "t4",
      year: "1959",
      title: "Acceptance of Sannyasa",
      era: "preparation",
      summary: "Received the sacred order of Sannyasa at the Radha-Damodara temple in Vrindavan.",
      details: "He was awarded the title A.C. Bhaktivedanta Swami by his godbrother Srila Bhakti Prajnana Keshava Maharaja. He focused intently on translating the first volumes of Srimad-Bhagavatam into English.",
      sourceId: "gbc-biography",
      verified: true
    },
    {
      id: "t5",
      year: "1965",
      title: "Historic Voyage on the Jaladuta",
      era: "jaladuta",
      summary: "Boarded the cargo ship Jaladuta bound for New York City at age 69.",
      details: "During the 38-day arduous journey across ocean storms, he suffered two severe heart attacks. Sustained by his unwavering faith in Lord Krishna, he safely landed at Commonwealth Pier in Boston on September 17, 1965.",
      sourceId: "iskcon-history",
      verified: true
    },
    {
      id: "t6",
      year: "1966",
      title: "Incorporation of ISKCON in New York",
      era: "west",
      summary: "Officially registered the International Society for Krishna Consciousness on July 11, 1966.",
      details: "From a storefront at 26 Second Avenue in Manhattan's Lower East Side, Srila Prabhupada held kirtans in Tompkins Square Park and began distributing the eternal culture of Bhakti in the West.",
      sourceId: "gbc-biography",
      verified: true
    },
    {
      id: "t7",
      year: "1967-1977",
      title: "Global Preaching Tour & Legacy",
      era: "expansion",
      summary: "Circled the globe 14 times, established over 100 temples, and published over 80 books.",
      details: "Srila Prabhupada translated foundational Vedic literature including Bhagavad-gita As It Is, Srimad-Bhagavatam, and Sri Caitanya-caritamrta. He initiated over 5,000 disciples worldwide.",
      sourceId: "vedabase-archives",
      verified: true
    }
  ],

  lilas: [
    {
      id: "l1",
      title: "Kirtan at Tompkins Square Park",
      period: "1966 - New York",
      category: "west",
      status: "verified",
      contentType: "devotee-account",
      summary: "Srila Prabhupada sat under an elm tree in Manhattan's Tompkins Square Park and led the first recorded public Hare Krishna kirtan in the Western world.",
      fullStory: "On October 9, 1966, Srila Prabhupada walked to Tompkins Square Park carrying a pair of small brass hand cymbals (karatalas). He sat beneath a massive elm tree, closed his eyes, and began chanting the Hare Krishna maha-mantra. Young passersby and local musicians joined in with guitars and drums. The chant continued for hours, creating a spiritual atmosphere that transformed Lower Manhattan.",
      sourceTitle: "Srila Prabhupada-lilamrta Vol. 2",
      sourceAuthor: "Satsvarupa dasa Goswami",
      reflection: "Demonstrates how pure spiritual chanting transcends all cultural and geographic boundaries."
    },
    {
      id: "l2",
      title: "The Prayers Aboard Jaladuta",
      period: "1965 - Atlantic Ocean",
      category: "jaladuta",
      status: "verified",
      contentType: "historical-fact",
      summary: "Written in Bengali aboard the cargo ship Jaladuta upon arriving in Boston Harbor, expressing complete surrender to Krishna's divine plan.",
      fullStory: "In his poem 'Markine Bhagavata-dharma', Srila Prabhupada wrote: 'O Lord, I am just like a puppet in Your hands. So if You have brought me here to dance, then make me dance, make me dance, O Lord, make me dance as You like.' Despite having only 40 rupees and a crate of books, his vision was rooted in absolute faith in his Guru's order.",
      sourceTitle: "Jaladuta Diary & Back to Godhead",
      sourceAuthor: "Srila Prabhupada",
      reflection: "A timeless example of humility, surrender, and unwavering dedication."
    },
    {
      id: "l3",
      title: "Vrindavan Radha-Damodara Bhajan",
      period: "1959-1965 - Vrindavan",
      category: "preparation",
      status: "verified",
      contentType: "devotee-account",
      summary: "Years of solitude and deep scholarship in his rooms overlooking the samadhi of Srila Rupa Goswami.",
      fullStory: "Before departing for America, Srila Prabhupada lived in small rooms at the historic Sri Sri Radha-Damodara Mandir in Vrindavan. He prayed for guidance, wrote commentary on Srimad-Bhagavatam, and prepared himself mentally and spiritually for his mission abroad.",
      sourceTitle: "Radha-Damodara Temple Historical Record & Lilamrta",
      sourceAuthor: "BBT Archives",
      reflection: "Preparation and patience are essential foundations for great spiritual endeavors."
    }
  ],

  teachings: [
    {
      id: "teach-1",
      title: "What is Bhakti Yoga?",
      level: "Beginner",
      subtitle: "The Science of Devotional Service",
      description: "Bhakti is not emotional sentimentalism; it is the natural, eternal loving relationship between the living entity and the Supreme Soul.",
      keyTakeaways: [
        "Jiva jivera nitya-dasa: The living entity is eternally a servant of Krishna.",
        "Bhakti engages the senses in the service of the master of the senses (Hrishikesha).",
        "It can be practiced by anyone regardless of nationality, background, or age."
      ],
      citation: "Bhagavad-gita As It Is, Chapter 9 & Nectar of Devotion"
    },
    {
      id: "teach-2",
      title: "The Holy Name (Nama-sankirtana)",
      level: "Beginner / Intermediate",
      subtitle: "The Yuga-Dharma for the Modern Age",
      description: "In Kali-yuga, self-realization is easily achieved through chanting the Hare Krishna Maha-Mantra: Hare Krishna, Hare Krishna, Krishna Krishna, Hare Hare / Hare Rama, Hare Rama, Rama Rama, Hare Hare.",
      keyTakeaways: [
        "The Holy Name is non-different from Krishna Himself.",
        "Chanting cleanses the dust from the mirror of the heart (ceto-darpana-marjanam).",
        "Regular japa brings peace, spiritual clarity, and divine joy."
      ],
      citation: "Srimad-Bhagavatam 12.3.51 & Sri Siksastaka"
    },
    {
      id: "teach-3",
      title: "The Immortality of the Soul",
      level: "Foundational",
      subtitle: "Understanding Bhagavad-gita Chapter 2",
      description: "The body changes from childhood to youth to old age, but the conscious soul within remains constant.",
      keyTakeaways: [
        "Na jayate mriyate va kadacin: The soul is never born nor does it die.",
        "As a person puts on new garments, giving up old ones, the soul similarly accepts new bodies.",
        "Real knowledge begins when one realizes 'I am not this material body'."
      ],
      citation: "Bhagavad-gita As It Is 2.13, 2.20"
    }
  ],

  books: [
    {
      id: "book-gita-yatharoop",
      title: "Bhagavad Gita As It Is (Geeta Ji)",
      titleHindi: "श्रीमद्भगवद्गीता यथारूप (गीता जी)",
      titleGujarati: "શ્રીમદ્ ભગવદ્ ગીતા જેવી છે તેવી (ગીતાજી)",
      author: "A.C. Bhaktivedanta Swami Prabhupada",
      authorHindi: "कृष्णकृपामूर्ति श्री श्रीमद् ए. सी. भक्तिवेदान्त स्वामी प्रभुपाद",
      authorGujarati: "કૃષ્ણકૃપામૂર્તિ શ્રી શ્રીમદ્ એ. સી. ભક્તિવેદાંત સ્વામી પ્રભુપાદ",
      category: "Foundational Scripture",
      categoryHindi: "मूल शास्त्र",
      categoryGujarati: "મૂળ શાસ્ત્ર",
      edition: "1972 Original Edition",
      summary: "The divine conversation between Lord Sri Krishna and Arjuna on the battlefield of Kurukshetra — complete science of Karma, Jnana, Bhakti, and Moksha.",
      summaryHindi: "भगवान श्रीकृष्ण और अर्जुन के बीच कुरुक्षेत्र के युद्धक्षेत्र में हुआ दिव्य संवाद — कर्म, ज्ञान, भक्ति और मोक्ष का सम्पूर्ण विज्ञान।",
      summaryGujarati: "ભગવાન શ્રીકૃષ્ણ અને અર્જુન વચ્ચે કુરુક્ષેત્રના યુદ્ધભૂમિ પર થયેલો દિવ્ય સંવાદ — કર્મ, જ્ઞાન, ભક્તિ અને મોક્ષનું સંપૂર્ણ વિજ્ઞાન।",
      chapters: 18,
      verses: 700,
      pdfUrl: "Library/bhagavad-gita/Bhagavad-gita.pdf",
      coverUrl: "images/Geeta image.jpeg",
      altText: "Bhagavad Gita As It Is book cover",
      sourceUrl: "https://www.bbt.org/book/en-bg"
    },
    {
      id: "book-srimad-bhagavatam",
      title: "Śrīmad-Bhāgavatam",
      titleHindi: "श्रीमद्भागवतम्",
      titleGujarati: "શ્રીમદ્ ભાગવતમ્",
      author: "A.C. Bhaktivedanta Swami Prabhupada",
      authorHindi: "कृष्णकृपामूर्ति श्री श्रीमद् ए. सी. भक्तिवेदान्त स्वामी प्रभुपाद",
      authorGujarati: "કૃષ્ણકૃપામૂર્તિ શ્રી શ્રીમદ્ એ. સી. ભક્તિવેદાંત સ્વામી પ્રભુપાદ",
      category: "Amala Purana",
      categoryHindi: "अमल पुराण",
      categoryGujarati: "અમલ પુરાણ",
      edition: "Original Translation & Commentary",
      summary: "The spotless Purana presenting the supreme spiritual reality and divine pastimes of Supreme Lord Sri Krishna, rendered into English with elaborate purports.",
      summaryHindi: "भगवान श्रीकृष्ण के दिव्य अवतारों एवं लीलाओं का वर्णन करने वाला अमल पुराण, श्रील प्रभुपाद के प्रामाणिक अनुवाद एवं तात्पर्यों सहित।",
      summaryGujarati: "ભગવાન શ્રીકૃષ્ણના દિવ્ય અવતારો અને લીલાઓનું વર્ણન કરતો અમલ પુરાણ, શ્રીલ પ્રભુપાદના પ્રામાણિક અનુવાદ તથા ભાવાર્થ સાથે।",
      pdfUrl: "Library/bhagavatam/Bhagwatam.pdf",
      coverUrl: "images/Bhagwatam-image.jpeg",
      altText: "Śrīmad-Bhāgavatam book cover",
      sourceUrl: "https://www.bbt.org/book/en-sb"
    },
    {
      id: "book-sri-isopanisad",
      title: "श्रीईशोपनिषद्",
      titleHindi: "श्रीईशोपनिषद्",
      titleGujarati: "શ્રીઈશોપનિષદ્",
      author: "A.C. Bhaktivedanta Swami Prabhupada",
      authorHindi: "कृष्णकृपामूर्ति श्री श्रीमद् ए. सी. भक्तिवेदान्त स्वामी प्रभुपाद",
      authorGujarati: "કૃષ્ણકૃપામૂર્તિ શ્રી શ્રીમદ્ એ. સી. ભક્તિવેદાંત સ્વામી પ્રભુપાદ",
      category: "Vedic Upanishad",
      categoryHindi: "वैदिक उपनिषद",
      categoryGujarati: "વૈદિક ઉપનિષદ",
      edition: "Authorized Translation & Commentary",
      summary: "The divine knowledge that brings one closer to the Supreme Personality of Godhead — 18 principal mantras with Sanskrit transliteration, English translation, and elaborate purports by Srila Prabhupada.",
      summaryHindi: "भगवान श्रीकृष्ण के समीप ले जाने वाला दिव्य उपनिषद ज्ञान — श्रील प्रभुपाद द्वारा १८ मुख्य मंत्रों का संस्कृत लिप्यंतरण, अनुवाद एवं विस्तृत तात्पर्य।",
      summaryGujarati: "ભગવાન શ્રીકૃષ્ણની સમીપ લઈ જતું દિવ્ય ઉપનિષદ જ્ઞાન — શ્રીલ પ્રભુપાદ દ્વારા ૧૮ મુખ્ય મંત્રોનું સંસ્કૃત લિપ્યંતરણ, અનુવાદ તથા વિસ્તૃત ભાવાર્થ।",
      mantras: 18,
      pdfUrl: "Library/iso-isopanisad/ISO_श्रीईशोपनिषद्.pdf",
      coverUrl: "images/sri-isopanisad.jpeg",
      altText: "श्रीईशोपनिषद् book cover",
      sourceUrl: "https://vedabase.io/en/library/iso/"
    },
    {
      id: "book-purna-prashna-purna-uttar",
      title: "पूर्ण प्रश्न पूर्ण उत्तर",
      titleHindi: "पूर्ण प्रश्न पूर्ण उत्तर",
      titleGujarati: "પૂર્ણ પ્રશ્ન પૂર્ણ ઉત્તર",
      author: "A.C. Bhaktivedanta Swami Prabhupada",
      authorHindi: "कृष्णकृपामूर्ति श्री श्रीमद् ए. सी. भक्तिवेदान्त स्वामी प्रभुपाद",
      authorGujarati: "કૃષ્ણકૃપામૂર્તિ શ્રી શ્રીમદ્ એ. સી. ભક્તિવેદાંત સ્વામી પ્રભુપાદ",
      category: "Conversations & Teachings",
      categoryHindi: "संवाद एवं उपदेश",
      categoryGujarati: "સંવાદ અને ઉપદેશ",
      edition: "Original Dialogue",
      summary: "A historic and profound series of conversations exploring the core questions of life, soul, God, and spiritual science.",
      summaryHindi: "मायापुर में श्रील प्रभुपाद और बॉब कोहेन के बीच हुआ ऐतिहासिक एवं गहन संवाद — जीवन, आत्मा, ईश्वर और आध्यात्मिक विज्ञान के मूल प्रश्नों के पूर्ण उत्तर।",
      summaryGujarati: "માયાપુરમાં શ્રીલ પ્રભુપાદ અને બોબ કોહેન વચ્ચે થયેલો ઐતિહાસિક અને ગહન સંવાદ — જીવન, આત્મા, ઈશ્વર અને આધ્યાત્મિક વિજ્ઞાનના મૂળ પ્રશ્નોના પૂર્ણ ઉત્તર।",
      pdfUrl: "Library/purna-prashna/purna-prashna-purna-uttar.pdf",
      coverUrl: "images/purna-prashna-image.jpeg",
      altText: "पूर्ण प्रश्न पूर्ण उत्तर book cover",
      sourceUrl: "https://vedabase.io/en/library/pqpa/"
    },
    {
      id: "book-punaragaman",
      title: "पुनरागमन",
      titleHindi: "पुनरागमन",
      titleGujarati: "પુનરાગમન",
      author: "A.C. Bhaktivedanta Swami Prabhupada",
      authorHindi: "कृष्णकृपामूर्ति श्री श्रीमद् ए. सी. भक्तिवेदान्त स्वामी प्रभुपाद",
      authorGujarati: "કૃષ્ણકૃપામૂર્તિ શ્રી શ્રીમદ્ એ. સી. ભક્તિવેદાંત સ્વામી પ્રભુપાદ",
      category: "Spiritual Science",
      categoryHindi: "आध्यात्मिक विज्ञान",
      categoryGujarati: "આધ્યાત્મિક વિજ્ઞાન",
      edition: "Original Translation & Commentary",
      summary: "The scientific and Vedic explanation of reincarnation, the soul's journey after death, karma, and how to attain liberation.",
      summaryHindi: "पुनर्जन्म का वैज्ञानिक एवं वैदिक विश्लेषण — मृत्यु के पश्चात् आत्मा की यात्रा, कर्म सिद्धांत और जन्म-मृत्यु के चक्र से मुक्ति का मार्ग।",
      summaryGujarati: "પુનર્જન્મનું વૈજ્ઞાનિક તથા વૈદિક વિશ્લેષણ — મૃત્યુ પછી આત્માની યાત્રા, કર્મ સિદ્ધાંત અને જન્મ-મૃત્યુના ચક્રમાંથી મુક્તિનો માર્ગ।",
      pdfUrl: "Library/punaragaman/CB_punaragaman.pdf",
      coverUrl: "images/punaragaman-image.jpeg",
      altText: "पुनरागमन book cover",
      sourceUrl: "https://vedabase.io/en/library/cb/"
    },
    {
      id: "book-lila-purushottam-sri-krishna",
      title: "लीला पुरुषोत्तम भगवान् श्रीकृष्ण",
      titleHindi: "लीला पुरुषोत्तम भगवान् श्रीकृष्ण",
      titleGujarati: "લીલા પુરુષોત્તમ ભગવાન શ્રીકૃષ્ણ",
      author: "A.C. Bhaktivedanta Swami Prabhupada",
      authorHindi: "कृष्णकृपामूर्ति श्री श्रीमद् ए. सी. भक्तिवेदान्त स्वामी प्रभुपाद",
      authorGujarati: "કૃષ્ણકૃપામૂર્તિ શ્રી શ્રીમદ્ એ. સી. ભક્તિવેદાંત સ્વામી પ્રભુપાદ",
      category: "Divine Pastimes",
      categoryHindi: "दिव्य लीलाएं",
      categoryGujarati: "દિવ્ય લીલાઓ",
      edition: "Original Translation & Commentary",
      summary: "The complete summary study of the Tenth Canto of Śrīmad-Bhāgavatam, presenting the sublime pastimes, teachings, and opulences of Supreme Lord Sri Krishna.",
      summaryHindi: "श्रीमद्भागवतम् के दशम स्कन्ध का सम्पूर्ण सारांश — उच्चतम पुरुषोत्तम भगवान श्रीकृष्ण की अलौकिक लीलाओं, उपदेशों एवं ऐश्वर्यों का परम पावन वर्णन।",
      summaryGujarati: "શ્રીમદ્ ભાગવતમના દસમ સ્કંધનો સંપૂર્ણ સારાંશ — પરમ પુરુષોત્તમ ભગવાન શ્રીકૃષ્ણની અદ્ભુત લીલાઓ, ઉપદેશો અને ઐશ્વર્યોનું પરમ પવિત્ર વર્ણન।",
      pdfUrl: "Library/sri-krishna/sri-krishna.pdf",
      coverUrl: "images/sri-krishna-image.jpeg",
      altText: "लीला पुरुषोत्तम भगवान् श्रीकृष्ण book cover",
      sourceUrl: "https://vedabase.io/en/library/kc/"
    },
    {
      id: "book-chaitanya-shikshamrita",
      title: "भगवान् श्री चैतन्य महाप्रभु का शिक्षामृत",
      titleHindi: "भगवान् श्री चैतन्य महाप्रभु का शिक्षामृत",
      titleGujarati: "ભગવાન શ્રી ચૈતન્ય મહાપ્રભુનું શિક્ષામૃત",
      author: "A.C. Bhaktivedanta Swami Prabhupada",
      authorHindi: "कृष्णकृपामूर्ति श्री श्रीमद् ए. सी. भक्तिवेदान्त स्वामी प्रभुपाद",
      authorGujarati: "કૃષ્ણકૃપામૂર્તિ શ્રી શ્રીમદ્ એ. સી. ભક્તિવેદાંત સ્વામી પ્રભુપાદ",
      category: "Vedic Philosophy",
      categoryHindi: "वैदिक दर्शन",
      categoryGujarati: "વૈદિક દર્શન",
      edition: "Original Translation & Commentary",
      summary: "The profound summary of Sri Caitanya-caritamrta presenting Lord Chaitanya's conversations on the science of Bhakti.",
      summaryHindi: "श्री चैतन्य चरितामृत का पावन सारांश — श्री रूप गोस्वामी, सनातन गोस्वामी एवं रामायण राय के साथ महाप्रभु के संवादों में समाहित परम भक्ति दर्शन।",
      summaryGujarati: "શ્રી ચૈતન્ય ચરિતામૃતનો પવિત્ર સારાંશ — શ્રી રૂપ ગોસ્વામી, સનાતન ગોસ્વામી અને રામાનંદ રાય સાથે મહાપ્રભુના સંવાદોમાં સમાયેલું પરમ ભક્તિ દર્શન।",
      pdfUrl: "Library/chaitanya-shikshamrita/chaitanya-shikshamrita.pdf",
      coverUrl: "images/chaitanya-shikshamrita-image.jpeg",
      altText: "भगवान् श्री चैतन्य महाप्रभु का शिक्षामृत book cover",
      sourceUrl: "https://vedabase.io/en/library/tlc/"
    },
    {
      id: "book-easy-journey-to-other-planets",
      title: "अन्य ग्रहों की सुगम यात्रा",
      titleHindi: "अन्य ग्रहों की सुगम यात्रा",
      titleGujarati: "અન્ય ગ્રહોની સુગમ યાત્રા",
      author: "A.C. Bhaktivedanta Swami Prabhupada",
      authorHindi: "कृष्णकृपामूर्ति श्री श्रीमद् ए. सी. भक्तिवेदान्त स्वामी प्रभुपाद",
      authorGujarati: "કૃષ્ણકૃપામૂર્તિ શ્રી શ્રીમદ્ એ. સી. ભક્તિવેદાંત સ્વામી પ્રભુપાદ",
      category: "Vedic Science & Cosmology",
      categoryHindi: "वैदिक विज्ञान एवं ब्रह्मांड विज्ञान",
      categoryGujarati: "વૈદિક વિજ્ઞાન અને બ્રહ્માંડ વિજ્ઞાન",
      edition: "Original Translation & Commentary",
      summary: "The revolutionary treatise on anti-material worlds, space travel by Bhakti yoga, and transferring consciousness to the eternal spiritual planets.",
      summaryHindi: "अन्तिम पदार्थ-रहित लोकों, वैकुण्ठ अध्यात्मिक जगत, भक्ति-योग द्वारा अंतरिक्ष यात्रा तथा शाश्वत कृष्णलोक में चेतना स्थानांतरण का दिव्य वैज्ञानिक ग्रन्थ।",
      summaryGujarati: "અંતિમ પદાર્થ-રહિત લોકો, વૈકુંઠ આધ્યાત્મિક જગત, ભક્તિ-યોગ દ્વારા અંતરિક્ષ યાત્રા તથા શાશ્વત કૃષ્ણલોકમાં ચેતના સ્થાનાંતરણનો દિવ્ય વૈજ્ઞાનિક ગ્રંથ।",
      pdfUrl: "Library/easy-journey/easy-journey-to-other-planets.pdf",
      coverUrl: "images/easy-journey-image.jpeg",
      altText: "अन्य ग्रहों की सुगम यात्रा book cover",
      sourceUrl: "https://vedabase.io/en/library/ej/"
    },
    {
      id: "book-attaining-krishna-consciousness",
      title: "कृष्णभावनामृत की प्राप्ति",
      titleHindi: "कृष्णभावनामृत की प्राप्ति",
      titleGujarati: "કૃષ્ણભાવનામૃતની પ્રાપ્તિ",
      author: "A.C. Bhaktivedanta Swami Prabhupada",
      authorHindi: "कृष्णकृपामूर्ति श्री श्रीमद् ए. सी. भक्तिवेदान्त स्वामी प्रभुपाद",
      authorGujarati: "કૃષ્ણકૃપામૂર્તિ શ્રી શ્રીમદ્ એ. સી. ભક્તિવેદાંત સ્વામી પ્રભુપાદ",
      category: "Practical Bhakti",
      categoryHindi: "व्यावहारिक भक्ति",
      categoryGujarati: "વ્યવહારિક ભક્તિ",
      edition: "Original Translation & Commentary",
      summary: "The priceless guide revealing how to awaken pure love of Godhead and achieve ultimate peace through the matchless gift of Krishna Consciousness.",
      summaryHindi: "ईश्वर-प्रेम की अनुभूति, आध्यात्मिक पूर्णता तथा कृष्णभावनामृत के अमूल्य उपहार द्वारा परम शांति प्राप्त करने का प्रामाणिक एवं व्यावहारिक मार्गदर्शन।",
      summaryGujarati: "ઈશ્વર-પ્રેમની અનુભૂતિ, આધ્યાત્મિક પૂર્ણતા તથા કૃષ્ણભાવનામૃતના અમૂલ્ય ઉપહાર દ્વારા પરમ શાંતિ પ્રાપ્ત કરવાનું પ્રામાણિક તથા વ્યવહારિક માર્ગદર્શન।",
      pdfUrl: "Library/attaining-krishna-consciousness/attaining-krishna-consciousness.pdf",
      coverUrl: "images/attaining-krishna-consciousness-image.jpeg",
      altText: "कृष्णभावनामृत की प्राप्ति book cover",
      sourceUrl: "https://vedabase.io/en/library/mg/"
    },
    {
      id: "book-hare-krishna-challenge",
      title: "हरे कृष्ण चुनौती",
      titleHindi: "हरे कृष्ण चुनौती",
      titleGujarati: "હરે કૃષ્ણ પડકાર",
      author: "A.C. Bhaktivedanta Swami Prabhupada",
      authorHindi: "कृष्णकृपामूर्ति श्री श्रीमद् ए. सी. भक्तिवेदान्त स्वामी प्रभुपाद",
      authorGujarati: "કૃષ્ણકૃપામૂર્તિ શ્રી શ્રીમદ્ એ. સી. ભક્તિવેદાંત સ્વામી પ્રભુપાદ",
      category: "Vedic Preaching",
      categoryHindi: "वैदिक प्रचार एवं संवाद",
      categoryGujarati: "વૈદિક પ્રચાર અને સંવાદ",
      edition: "Original Translation & Commentary",
      summary: "The provocative and enlightening collection of Srila Prabhupada's talks and essays challenging modern materialism, atheism, and false philosophies.",
      summaryHindi: "आधुनिक भौतिकवाद, नास्तिकता एवं भ्रामक दर्शनों को चुनौती देने वाला श्रील प्रभुपाद का तेजस्वी तथा ज्ञानवर्धक संवाद संग्रह।",
      summaryGujarati: "આધુનિક ભૌતિકવાદ, નાસ્તિકતા અને ભ્રામક દર્શનોને પડકારતું શ્રીલ પ્રભુપાદનું તેજસ્વી તથા જ્ઞાનવર્ધક સંવાદ સંગ્રહ।",
      pdfUrl: "Library/hare-krishna-challenge/hare-krishna-challenge.pdf",
      coverUrl: "images/hare-krishna-challenge-image.jpeg",
      altText: "हरे कृष्ण चुनौती book cover",
      sourceUrl: "https://vedabase.io/en/library/hkc/"
    }
  ],

  quotes: [
    {
      text: "Books are the basis, Preaching is the mission, Utility is the principle, Purity is the force.",
      context: "Guidance to ISKCON disciples"
    },
    {
      text: "Chant Hare Krishna and be happy.",
      context: "Core message to the world"
    },
    {
      text: "Warmth of devotion can melt even the coldest heart.",
      context: "Reflections on Bhakti"
    }
  ],

  audioTracks: [
    {
      title: "Maha Mantra",
      subtitle: "Srila Prabhupada",
      url: "assets/audio/maha-mantra.mp3"
    }
  ],

  quizQuestions: [
    {
      id: "q1",
      question: "In which year was Srila Prabhupada born in Calcutta?",
      options: ["1886", "1896", "1905", "1922"],
      answer: 1,
      explanation: "Srila Prabhupada was born on September 1, 1896, in Calcutta on the day of Nandotsava."
    },
    {
      id: "q2",
      question: "What was the name of the cargo shipSrila Prabhupada boarded to travel to New York in 1965?",
      options: ["Jaladuta", "Titanic", "Savitri", "Samudra"],
      answer: 0,
      explanation: "He travelled aboard the Scindia Steam Navigation cargo ship Jaladuta."
    },
    {
      id: "q3",
      question: "Where was ISKCON officially incorporated in July 1966?",
      options: ["London", "Calcutta", "New York City", "Los Angeles"],
      answer: 2,
      explanation: "Srila Prabhupada officially registered ISKCON in New York City on July 11, 1966."
    }
  ],

  vanis: [
    {
      id: "v1",
      verse: "Bhagavad-gita 9.22",
      text: "ananyas cintayanto mam ye janah paryupasate / tesam nityabhiyuktanam yoga-ksemam vahamy aham",
      translation: "But those who always worship Me with exclusive devotion, meditating on My transcendental form—to them I carry what they lack, and I preserve what they have.",
      purportSnippet: "Krishna personally takes care of the devotee who is fully absorbed in devotional service, providing both spiritual and material necessities."
    },
    {
      id: "v2",
      verse: "Srimad-Bhagavatam 1.2.6",
      text: "sa vai pumsam paro dharmo yato bhaktir adhoksaje / ahaituky apratihata yayatma suprasidati",
      translation: "The supreme occupation for all humanity is that by which men can attain to loving devotional service unto the transcendent Lord.",
      purportSnippet: "Such devotional service must be unmotivated and uninterrupted to completely satisfy the self."
    },
    {
      id: "v3",
      verse: "Sri Siksastaka Verse 3",
      text: "trnad api sunicena taror api sahisnuna / amanina manadena kirtaniyah sada harih",
      translation: "One should chant the Holy Name of the Lord in a humble state of mind, thinking oneself lower than the straw in the street; one should be more tolerant than a tree, devoid of all sense of false prestige, and should be ready to offer all respect to others.",
      purportSnippet: "In such a state of mind one can chant the Holy Name of the Lord constantly."
    }
  ],

  lectures: [
    {
      id: "lec-1",
      title: "Seattle Bhagavad-gita Lecture (1968)",
      date: "October 20, 1968 - Seattle, Washington",
      topic: "The Nature of Eternal Consciousness",
      audioUrl: "assets/audio/maha-mantra.mp3",
      transcript: "We are all eternal servants of Krishna. By nature, every living entity is serving someone—family, country, or senses. When that service inclination is turned toward the Supreme Master, Krishna, one attains eternal bliss."
    },
    {
      id: "lec-2",
      title: "London Room Conversation (1973)",
      date: "July 14, 1973 - Bhaktivedanta Manor, UK",
      topic: "Simplicity and Pure Devotion",
      audioUrl: "assets/audio/maha-mantra.mp3",
      transcript: "Krishna does not see how rich or educated you are. He sees how sincere your heart is. Offer Him a simple leaf, a flower, fruit, or water with love, and He accepts it gladly."
    }
  ],

  iskconCenters: [
    {
      id: "c1",
      name: "26 Second Avenue Storefront",
      city: "New York City, USA",
      year: "1966",
      region: "Americas",
      significance: "The birthplace of ISKCON. Here Srila Prabhupada incorporated the society, gave his first lectures in the West, and held historic kirtans in Tompkins Square Park.",
      url: "https://www.26secondave.org/"
    },
    {
      id: "c2",
      name: "Sri Sri Radha-Rasabihari Temple (Juhu)",
      city: "Mumbai, India",
      year: "1978",
      region: "India",
      significance: "Built after years of heroic perseverance by Srila Prabhupada. It stands today as one of India's most prominent spiritual hubs.",
      url: "https://www.iskconmumbai.com/"
    },
    {
      id: "c3",
      name: "Sri Sri Krishna-Balaram Mandir",
      city: "Vrindavan, India",
      year: "1975",
      region: "India",
      significance: "Located in Raman Reti, Vrindavan. Srila Prabhupada personal sanctuary and final resting place (Samadhi Mandir).",
      url: "https://www.vrindavan.com/"
    },
    {
      id: "c4",
      name: "Sri Mayapur Chandrodaya Mandir",
      city: "Mayapur, West Bengal, India",
      year: "1972",
      region: "India",
      significance: "World headquarters of ISKCON at the birthplace of Sri Chaitanya Mahaprabhu. Home to the monumental Temple of the Vedic Planetarium (TOVP).",
      url: "https://www.mayapur.com/"
    },
    {
      id: "c5",
      name: "Bhaktivedanta Manor",
      city: "Hertfordshire, UK",
      year: "1973",
      region: "Europe",
      significance: "Donated to Srila Prabhupada by George Harrison of The Beatles. A major spiritual haven and pilgrimage center in Europe.",
      url: "https://www.bhaktivedantamanor.co.uk/"
    },
    {
      id: "c6",
      name: "New Dwaraka Temple",
      city: "Los Angeles, California, USA",
      year: "1970",
      region: "Americas",
      significance: "Western headquarters of ISKCON and historical home of the Bhaktivedanta Book Trust (BBT) publishing operations.",
      url: "https://www.newdwaraka.com/"
    }
  ],

  gitaChapters: [
    { num: 1, name: "Observing the Armies", verses: 47, summary: "Arjuna beholds his friends and relatives on the battlefield and is overwhelmed with grief and compassion." },
    { num: 2, name: "Contents of the Gita Summarized", verses: 72, summary: "Lord Krishna presents foundational wisdom on the eternal soul (atma) versus the temporary material body." },
    { num: 3, name: "Karma Yoga", verses: 43, summary: "Explanation of duty without attachment to the fruits of work." },
    { num: 4, name: "Transcendental Knowledge", verses: 42, summary: "The divine origin of spiritual knowledge and how it is received through disciplic succession." },
    { num: 5, name: "Karma Yoga - Action in Krishna Consciousness", verses: 29, summary: "How performing work in devotion purifies the mind and leads to peace." },
    { num: 6, name: "Dhyana Yoga", verses: 47, summary: "The practice of Ashtanga yoga, mind control, and the supreme status of the Bhakti yogi." },
    { num: 7, name: "Knowledge of the Absolute", verses: 30, summary: "Krishna reveals His material and spiritual energies and the four types of pious souls who surrender unto Him." },
    { num: 8, name: "Attaining the Supreme", verses: 28, summary: "How the state of mind at the moment of death determines one's next destination." },
    { num: 9, name: "The Most Confidential Knowledge", verses: 34, summary: "Krishna reveals pure devotional service as the king of education and secret of all secrets." },
    { num: 10, name: "The Opulence of the Absolute", verses: 42, summary: "Krishna describes how all grandeur, power, and beauty in creation emanate from a mere spark of His energy." },
    { num: 11, name: "The Universal Form", verses: 55, summary: "Krishna grants Arjuna divine vision to see His awesome Vishvarupa (Universal Form)." },
    { num: 12, name: "Devotional Service", verses: 20, summary: "The direct, sublime path of Bhakti is established as superior to impersonal meditation." },
    { num: 13, name: "Nature, the Enjoyer and Consciousness", verses: 35, summary: "Distinction between the field of activity (kshetra), the knower of the field (kshetrajna), and the Supersoul." },
    { num: 14, name: "The Three Modes of Material Nature", verses: 27, summary: "Detailed analysis of Sattva (goodness), Rajas (passion), and Tamas (ignorance)." },
    { num: 15, name: "The Yoga of the Supreme Person", verses: 20, summary: "The metaphor of the inverted banyan tree and the nature of Purushottama." },
    { num: 16, name: "The Divine and Demoniac Natures", verses: 24, summary: "Qualities that lead to liberation versus those that cause bondage." },
    { num: 17, name: "The Divisions of Faith", verses: 28, summary: "How faith, worship, food, sacrifice, austerity, and charity are influenced by the three modes." },
    { num: 18, name: "Conclusion - The Perfection of Renunciation", verses: 78, summary: "The ultimate instruction: complete surrender to Lord Krishna (Sarva-dharman parityajya)." }
  ]
};
