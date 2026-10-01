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

  loadLocalData() {
    const saved = localStorage.getItem('ps_local_dataset');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn('Could not parse saved local dataset, using seed data');
      }
    }
    return INITIAL_DATA;
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
        b.title.toLowerCase().includes(q) || b.summary.toLowerCase().includes(q)
      )
    };
  }
}

const dataManager = new DataManager();
