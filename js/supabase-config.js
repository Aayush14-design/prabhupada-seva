/* Supabase Live API Integration & Fallback Data Manager */
class DataManager {
  constructor() {
    this.supabaseUrl = localStorage.getItem('ps_supabase_url') || '';
    this.supabaseKey = localStorage.getItem('ps_supabase_key') || '';
    this.isSupabaseConnected = false;
    this.localData = this.loadLocalData();

    if (this.supabaseUrl && this.supabaseKey) {
      this.testConnection();
    }
  }

  sanitizeBooks(localBooks) {
    if (typeof INITIAL_DATA === 'undefined' || !Array.isArray(INITIAL_DATA.books)) {
      return Array.isArray(localBooks) ? localBooks : [];
    }

    const seedBooks = INITIAL_DATA.books;
    const seedIds = new Set(seedBooks.map(b => b.id));

    const normalize = (str) => (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');

    const seedPdfs = new Set(seedBooks.map(b => normalize(b.pdfUrl || b.authorizedUrl)));
    const seedTitles = new Set();
    seedBooks.forEach(b => {
      if (b.title) seedTitles.add(normalize(b.title));
      if (b.titleHindi) seedTitles.add(normalize(b.titleHindi));
      if (b.titleGujarati) seedTitles.add(normalize(b.titleGujarati));
    });

    // Add common legacy aliases to trap old records
    const legacyAliases = [
      'bhagavadgitaasitis', 'srimadbhagavatam', 'sriisopanisad', 'sriisopanishad',
      'perfectquestionsperfectanswers', 'teachingsoflordcaitanya', 'teachingsoflordchaitanya',
      'easyjourneytootherplanets', 'attainingkrishnaconsciousness', 'theharekrishnachallenge',
      'reincarnation', 'punaragaman', 'karmayoga', 'lifecomesfromlife', 'upadeshamrita', 'nectarofinstruction', 'krishnakior', 'yogpath', 'pathofperfection', 'yogkipurnata', 'perfectionofyoga', 'rajvidya', 'kingofknowledge', 'atmasakshatkarkavigyan', 'scienceofselfrealization', 'maharanikuntikishikshaen', 'teachingsofqueenkunti'
    ];
    legacyAliases.forEach(alias => seedTitles.add(alias));

    // Canonical seed books always come first
    const resultBooks = [...seedBooks];
    const resultIds = new Set(seedBooks.map(b => b.id));
    const resultPdfs = new Set(seedBooks.map(b => normalize(b.pdfUrl || b.authorizedUrl)));

    // Preserve non-duplicate user-added custom books
    if (Array.isArray(localBooks)) {
      localBooks.forEach(b => {
        if (!b || typeof b !== 'object') return;
        const bId = b.id;
        const bPdf = normalize(b.pdfUrl || b.authorizedUrl);
        const bTitle = normalize(b.title);

        const isDuplicate = resultIds.has(bId) || 
                            (bPdf && seedPdfs.has(bPdf)) || 
                            (bTitle && seedTitles.has(bTitle));

        if (!isDuplicate && bId) {
          resultBooks.push(b);
          resultIds.add(bId);
          if (bPdf) resultPdfs.add(bPdf);
        }
      });
    }

    return resultBooks;
  }

  loadLocalData() {
    const saved = localStorage.getItem('ps_local_dataset');
    let data = typeof INITIAL_DATA !== 'undefined' ? { ...INITIAL_DATA } : { books: [] };
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          data = parsed;
        }
      } catch (e) {
        console.warn('Could not parse saved local dataset, using seed data');
      }
    }

    data.books = this.sanitizeBooks(data.books);
    return data;
  }

  getBooks() {
    const sanitized = this.sanitizeBooks(this.localData ? this.localData.books : []);
    if (this.localData) {
      this.localData.books = sanitized;
      this.saveLocalData();
    }
    return sanitized;
  }

  getCenters() {
    if (this.localData && Array.isArray(this.localData.iskconCenters) && this.localData.iskconCenters.length > 0) {
      return this.localData.iskconCenters;
    }
    return (typeof INITIAL_DATA !== 'undefined' && Array.isArray(INITIAL_DATA.iskconCenters)) ? INITIAL_DATA.iskconCenters : [];
  }

  getSources() {
    if (this.localData && Array.isArray(this.localData.sources) && this.localData.sources.length > 0) {
      return this.localData.sources;
    }
    return (typeof INITIAL_DATA !== 'undefined' && Array.isArray(INITIAL_DATA.sources)) ? INITIAL_DATA.sources : [];
  }

  getTeachings() {
    if (this.localData && Array.isArray(this.localData.teachings) && this.localData.teachings.length > 0) {
      return this.localData.teachings;
    }
    return (typeof INITIAL_DATA !== 'undefined' && Array.isArray(INITIAL_DATA.teachings)) ? INITIAL_DATA.teachings : [];
  }

  saveLocalData() {
    localStorage.setItem('ps_local_dataset', JSON.stringify(this.localData));
  }

  // Save Credentials and Test Connection
  async configureSupabase(url, key) {
    this.supabaseUrl = url.trim().replace(/\/$/, '');
    this.supabaseKey = key.trim();

    localStorage.setItem('ps_supabase_url', this.supabaseUrl);
    localStorage.setItem('ps_supabase_key', this.supabaseKey);

    return await this.testConnection();
  }

  // Test REST API connection to Supabase table
  async testConnection() {
    if (!this.supabaseUrl || !this.supabaseKey) {
      this.isSupabaseConnected = false;
      return false;
    }

    try {
      const res = await fetch(`${this.supabaseUrl}/rest/v1/sources?select=count`, {
        headers: {
          'apikey': this.supabaseKey,
          'Authorization': `Bearer ${this.supabaseKey}`
        }
      });

      if (res.ok) {
        this.isSupabaseConnected = true;
        this.syncWithSupabase();
        return true;
      }
    } catch (err) {
      console.warn('Supabase connection test failed, using local storage fallback:', err);
    }

    this.isSupabaseConnected = false;
    return false;
  }

  // Fetch live records from Supabase
  async syncWithSupabase() {
    if (!this.isSupabaseConnected) return;

    try {
      // Fetch Lilas
      const lilasRes = await fetch(`${this.supabaseUrl}/rest/v1/lilas?select=*&order=created_at.desc`, {
        headers: {
          'apikey': this.supabaseKey,
          'Authorization': `Bearer ${this.supabaseKey}`
        }
      });
      if (lilasRes.ok) {
        const liveLilas = await lilasRes.json();
        if (liveLilas && liveLilas.length > 0) {
          this.localData.lilas = liveLilas.map(l => ({
            id: l.id,
            title: l.title,
            period: l.period,
            category: l.category,
            status: l.status,
            contentType: l.content_type,
            summary: l.summary,
            fullStory: l.full_story,
            sourceTitle: l.source_title,
            sourceAuthor: l.source_author,
            reflection: l.reflection
          }));
          this.saveLocalData();
        }
      }
    } catch (err) {
      console.error('Error syncing data with Supabase:', err);
    }
  }

  // Get Timeline items
  getTimeline(eraFilter = 'all') {
    let items = this.localData.timeline || [];
    if (eraFilter !== 'all') {
      items = items.filter(item => item.era === eraFilter);
    }
    return items;
  }

  // Get Leelas (Structured Life Eras)
  getLeelas() {
    return this.localData.leelas || (typeof INITIAL_DATA !== 'undefined' ? INITIAL_DATA.leelas : []);
  }

  getLeelaById(id) {
    const list = this.getLeelas();
    return list.find(l => l.id === id) || list[0] || null;
  }

  // Get Lilas
  getLilas(categoryFilter = 'all') {
    let items = this.localData.lilas || [];
    if (categoryFilter !== 'all') {
      items = items.filter(item => item.category === categoryFilter);
    }
    return items;
  }

  // Add a new Lila entry (local + Supabase live POST)
  async addLila(lilaData) {
    const newLila = {
      id: 'lila-' + Date.now(),
      title: lilaData.title,
      period: lilaData.period || 'Unspecified',
      category: lilaData.category || 'general',
      status: lilaData.status || 'draft',
      contentType: lilaData.contentType || 'devotee-account',
      summary: lilaData.summary,
      fullStory: lilaData.fullStory,
      sourceTitle: lilaData.sourceTitle,
      sourceAuthor: lilaData.sourceAuthor || 'Submitted Record',
      reflection: lilaData.reflection || ''
    };

    // Save locally
    this.localData.lilas.unshift(newLila);
    this.saveLocalData();

    // If Supabase connected, POST to live database
    if (this.isSupabaseConnected) {
      try {
        await fetch(`${this.supabaseUrl}/rest/v1/lilas`, {
          method: 'POST',
          headers: {
            'apikey': this.supabaseKey,
            'Authorization': `Bearer ${this.supabaseKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            title: newLila.title,
            period: newLila.period,
            category: newLila.category,
            status: newLila.status,
            content_type: newLila.contentType,
            summary: newLila.summary,
            full_story: newLila.fullStory,
            source_title: newLila.sourceTitle,
            source_author: newLila.sourceAuthor,
            reflection: newLila.reflection
          })
        });
      } catch (err) {
        console.warn('Failed to POST to Supabase live DB:', err);
      }
    }

    return newLila;
  }

  // Add a new Book entry with PDF & Cover
  addBook(bookData) {
    const newBook = {
      id: 'book-' + Date.now(),
      title: bookData.title,
      author: bookData.author || 'A.C. Bhaktivedanta Swami Prabhupada',
      category: bookData.category || 'Vedic Literature',
      summary: bookData.summary,
      coverUrl: bookData.coverUrl,
      authorizedUrl: bookData.pdfUrl || bookData.authorizedUrl
    };

    if (!this.localData.books) this.localData.books = [];
    this.localData.books.unshift(newBook);
    this.saveLocalData();
    return newBook;
  }

  // Search across all content types
  search(query) {
    if (!query || query.trim() === '') return { timeline: [], lilas: [], teachings: [], books: [] };
    const q = query.toLowerCase().trim();

    return {
      timeline: (this.localData.timeline || []).filter(t => 
        t.title.toLowerCase().includes(q) || t.summary.toLowerCase().includes(q) || t.details.toLowerCase().includes(q)
      ),
      lilas: (this.localData.lilas || []).filter(l => 
        l.title.toLowerCase().includes(q) || l.summary.toLowerCase().includes(q) || l.fullStory.toLowerCase().includes(q)
      ),
      teachings: (this.localData.teachings || []).filter(t => 
        t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.subtitle.toLowerCase().includes(q)
      ),
      books: (this.localData.books || []).filter(b => 
        (b.title || '').toLowerCase().includes(q) || (b.titleHindi || '').toLowerCase().includes(q) || (b.titleGujarati || '').toLowerCase().includes(q) || (b.summary || '').toLowerCase().includes(q) || (b.summaryHindi || '').toLowerCase().includes(q) || (b.summaryGujarati || '').toLowerCase().includes(q)
      )
    };
  }
}

const dataManager = new DataManager();
