/* Prabhupada Seva - Main Application Logic */

document.addEventListener('DOMContentLoaded', () => {
  initI18n();
  initTheme();
  initNavigation();
  initTimeline();
  initLilas();
  initTeachings();
  initBooks();
  initCenters();
  initSources();
  initSearch();
  initSubmissionForm();
  initBookSubmissionForm();
  initSupabaseAdmin();
  initExportTools();
  initDailyVani();
  initGitaExplorer();
  initQuiz();
  initAudioPlayer();
  initQuotes();
  initGitaFullExplorer();
  initGitaVerseOfDay();
  initGitaQuiz();
});

/* i18n Language Switcher & Re-render Handler */
function initI18n() {
  const langSelect = document.getElementById('lang-select');
  const userModeBtn = document.getElementById('mode-user-btn');
  const adminModeBtn = document.getElementById('mode-admin-btn');

  if (langSelect) {
    langSelect.value = i18n.currentLang;
    i18n.applyTranslations();

    langSelect.addEventListener('change', (e) => {
      i18n.setLanguage(e.target.value);
    });
  }

  // Re-render views when language changes
  window.onLanguageChange = () => {
    i18n.applyTranslations();
    initLilas();
    initTimeline();
    initTeachings();
    initBooks();
    initCenters();
    initSources();
    initDailyVani();
    initGitaExplorer();
    initGitaFullExplorer();
    initGitaVerseOfDay();
    initQuiz();
    initGitaQuiz();
  };

  // User vs Editor Studio Mode Switcher
  if (userModeBtn && adminModeBtn) {
    userModeBtn.addEventListener('click', () => {
      userModeBtn.classList.add('active');
      adminModeBtn.classList.remove('active');
      showPage('home');
    });

    adminModeBtn.addEventListener('click', () => {
      adminModeBtn.classList.add('active');
      userModeBtn.classList.remove('active');
      showPage('research');
    });
  }

  // Text selection lookup listener
  document.addEventListener('mouseup', () => {
    const selected = window.getSelection().toString().trim();
    if (selected && selected.length > 2 && selected.length < 50) {
      // If user selected text, allow quick lookup
      console.log('Text selected for research:', selected);
    }
  });
}

/* Theme Management */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('ps_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  document.documentElement.setAttribute('data-theme', storedTheme);
  updateThemeIcon(storedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('ps_theme', next);
      updateThemeIcon(next);
    });
  }
}

function updateThemeIcon(theme) {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const icon = document.querySelector('#theme-toggle span');
  const labelText = (typeof i18n !== 'undefined' && i18n.t) ? i18n.t(theme === 'dark' ? 'theme_light' : 'theme_dark') : (theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
  
  if (icon) {
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
  if (themeToggleBtn) {
    themeToggleBtn.setAttribute('title', labelText);
    themeToggleBtn.setAttribute('aria-label', labelText);
  }
}

/* SPA Navigation */
function initNavigation() {
  const navLinks = document.querySelectorAll('[data-nav]');
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPage = link.getAttribute('data-nav');
      showPage(targetPage);
      if (mainNav && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
      }
    });
  });

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });
  }

  // Initial page load from URL hash
  const initialHash = window.location.hash.replace('#', '') || 'home';
  showPage(initialHash);
}

function showPage(pageId) {
  const pages = document.querySelectorAll('.page-section');
  const navLinks = document.querySelectorAll('.nav-link');
  const userModeBtn = document.getElementById('mode-user-btn');
  const adminModeBtn = document.getElementById('mode-admin-btn');
  let targetExists = false;

  pages.forEach(page => {
    if (page.id === `page-${pageId}`) {
      page.classList.add('active');
      targetExists = true;
    } else {
      page.classList.remove('active');
    }
  });

  if (!targetExists) {
    document.getElementById('page-home')?.classList.add('active');
    pageId = 'home';
  }

  // Update mode switcher pill state
  if (userModeBtn && adminModeBtn) {
    if (pageId === 'research') {
      adminModeBtn.classList.add('active');
      userModeBtn.classList.remove('active');
    } else {
      userModeBtn.classList.add('active');
      adminModeBtn.classList.remove('active');
    }
  }

  navLinks.forEach(link => {
    if (link.getAttribute('data-nav') === pageId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  window.location.hash = pageId;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* Render Modular Expandable Leela System */
let currentActiveLeelaId = null; // Default unselected so content only reveals on click
let currentLeelaSearch = '';

function initTimeline() {
  renderLeelaView();
}

function initLilas() {
  renderLeelaView();
}

function renderLeelaView() {
  const selectorContainer = document.getElementById('leela-selector-container');
  const bannerContainer = document.getElementById('active-leela-banner');
  const chapterPillsContainer = document.getElementById('chapter-nav-pills');
  const chaptersContainer = document.getElementById('leela-chapters-container');
  const searchInput = document.getElementById('leela-search-input');
  const controlsBar = document.querySelector('.leela-controls-bar');

  if (!selectorContainer || !chaptersContainer) return;

  const leelas = dataManager.getLeelas();
  // Show only active leelas (no coming-soon placeholders)
  const availableLeelas = leelas.filter(l => l.status === 'active');
  const isSelected = currentActiveLeelaId !== null;
  const currentLeela = isSelected ? dataManager.getLeelaById(currentActiveLeelaId) : null;

  // 1. Render Selector Grid (Active Cards: बाल्यकाल 1896-1916 & युवा अवस्था 1916-1921)
  selectorContainer.innerHTML = availableLeelas.map(l => {
    const isActive = l.id === currentActiveLeelaId;

    return `
      <div class="leela-era-card ${isActive ? 'active' : ''}" 
           onclick="toggleLeelaSelection('${l.id}')"
           style="cursor:pointer;width:100%;">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem">
            <span class="leela-era-duration">📅 ${l.duration}</span>
            <span class="badge badge-${isActive ? 'verified' : 'devotee'}">${isActive ? '✓ चयनित (Selected)' : 'क्लिक करके पढ़ें'}</span>
          </div>
          <h3 class="leela-era-title" style="font-size:1.35rem;margin-bottom:0.4rem">${l.title}</h3>
          <p class="leela-era-subtitle" style="font-size:0.92rem;color:var(--text-muted);margin-bottom:1rem">${l.subtitle || l.summary}</p>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding-top:0.75rem;border-top:1px dashed var(--line);font-size:0.84rem;">
          <span style="color:var(--text-muted)"><strong>अध्याय:</strong> ${l.chapters ? l.chapters.length : 0} अध्याय (पूर्ण प्रामाणिक पाठ)</span>
          <button class="btn btn-${isActive ? 'secondary' : 'primary'}" style="padding:0.4rem 0.9rem;font-size:0.8rem">
            ${isActive ? '▲ बंद करें (Collapse)' : '📖 पढ़ें (Read Full Leela) ↓'}
          </button>
        </div>
      </div>
    `;
  }).join('');

  // 2. Hide or Show Content Area depending on selection
  if (!isSelected || !currentLeela) {
    if (bannerContainer) bannerContainer.style.display = 'none';
    if (controlsBar) controlsBar.style.display = 'none';
    chaptersContainer.style.display = 'none';
    return;
  }

  // Show Content Area when selected
  if (bannerContainer) bannerContainer.style.display = 'block';
  if (controlsBar) controlsBar.style.display = 'block';
  chaptersContainer.style.display = 'block';

  // 3. Render Hero Banner for Active Leela with Collapse Option
  if (bannerContainer && currentLeela) {
    bannerContainer.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:1rem;margin-bottom:1rem;">
        <div>
          <span class="badge badge-verified" style="margin-bottom:0.5rem;">प्रमाणित जीवन-वृत्त (Verified Biography)</span>
          <h3 class="leela-hero-title">${currentLeela.title} <span style="font-size:1.1rem;color:var(--saffron-600);font-weight:600">(${currentLeela.duration})</span></h3>
        </div>
        <div style="display:flex;align-items:center;gap:0.6rem;flex-wrap:wrap;">
          <button class="btn btn-secondary" style="padding:0.45rem 0.9rem;font-size:0.82rem;font-weight:600;" onclick="collapseLeelaSelection()">
            ← वापस लीला चयन (Collapse)
          </button>
          <a href="${currentLeela.sourceUrl || 'https://vedabase.io/en/library/spl/'}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="padding:0.45rem 0.9rem;font-size:0.82rem">
            📖 मूल स्रोत संदर्शन ↗
          </a>
        </div>
      </div>
      <p style="font-size:1.05rem;line-height:1.7;color:var(--text-main);margin-bottom:1.25rem;">
        ${currentLeela.summary}
      </p>
      <div style="display:flex;gap:1.5rem;flex-wrap:wrap;padding-top:1rem;border-top:1px solid var(--line);font-size:0.85rem;color:var(--text-muted)">
        <span><strong>अध्याय संख्या:</strong> ${currentLeela.chapters ? currentLeela.chapters.length : 0} अध्याय (पूर्ण विस्तृत विवरण)</span>
        <span><strong>आधार ग्रंथ:</strong> ${currentLeela.sourceTitle}</span>
        <span><strong>स्थान:</strong> कलकत्ता (बेनियापुकुर, हैरिसन रोड व उत्तर कलकत्ता)</span>
      </div>
    `;
  }

  // 4. Render Chapter Quick Nav Pills
  if (chapterPillsContainer && currentLeela.chapters) {
    chapterPillsContainer.innerHTML = currentLeela.chapters.map((ch, idx) => `
      <button class="chapter-pill-btn" onclick="scrollToChapter('${ch.id}')">
        अध्याय ${idx + 1}
      </button>
    `).join('');
  }

  // 5. Render Chapters List
  if (currentLeela.chapters) {
    let filteredChapters = currentLeela.chapters;
    if (currentLeelaSearch.trim()) {
      const q = currentLeelaSearch.toLowerCase().trim();
      filteredChapters = currentLeela.chapters.filter(ch => 
        ch.title.toLowerCase().includes(q) ||
        ch.highlights.some(h => h.toLowerCase().includes(q)) ||
        ch.paragraphs.some(p => p.toLowerCase().includes(q))
      );
    }

    if (filteredChapters.length === 0) {
      chaptersContainer.innerHTML = `
        <div class="glass-card" style="text-align:center;padding:3rem">
          <p style="font-size:1.1rem;color:var(--text-muted)">"<strong>${currentLeelaSearch}</strong>" से संबंधित कोई विवरण नहीं मिला।</p>
          <button class="btn btn-secondary" style="margin-top:1rem" onclick="clearLeelaSearch()">खोज रीसेट करें</button>
        </div>
      `;
    } else {
      chaptersContainer.innerHTML = filteredChapters.map(ch => `
        <article id="${ch.id}" class="leela-chapter-card">
          <div class="chapter-card-header">
            <div>
              <span style="font-size:0.82rem;font-weight:700;color:var(--saffron-600);text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:0.2rem">
                ${currentLeela.title} (${currentLeela.duration}) — अध्याय ${ch.chapterNumber}
              </span>
              <h3 class="chapter-card-title">${ch.title}</h3>
            </div>
            <span class="chapter-date-badge">📅 ${ch.date}</span>
          </div>

          ${ch.highlights && ch.highlights.length ? `
            <div class="chapter-highlights-wrap">
              ${ch.highlights.map(h => `<span class="chapter-highlight-pill">✦ ${h}</span>`).join('')}
            </div>
          ` : ''}

          <div class="chapter-body">
            ${ch.paragraphs.map(p => `<p class="chapter-paragraph">${p}</p>`).join('')}
          </div>

          <div class="chapter-source-footer">
            <div>
              <strong>प्रामाणिक स्रोत संदर्शन:</strong> ${ch.sourceNote || currentLeela.sourceTitle}
            </div>
            <a href="${ch.sourceUrl || 'https://vedabase.io/en/library/spl/'}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="padding:0.35rem 0.8rem;font-size:0.78rem">
              🔗 स्रोत देखें ↗
            </a>
          </div>
        </article>
      `).join('');
    }
  }

  // 6. Search Listener
  if (searchInput && !searchInput.dataset.hasListener) {
    searchInput.dataset.hasListener = 'true';
    searchInput.addEventListener('input', (e) => {
      currentLeelaSearch = e.target.value;
      renderLeelaView();
    });
  }

  // Mirror content to page-lilas if active
  const lilasMirror = document.getElementById('page-lilas-content');
  if (lilasMirror && document.getElementById('page-lilas').classList.contains('active')) {
    lilasMirror.innerHTML = document.getElementById('page-timeline').innerHTML;
  }
}

function toggleLeelaSelection(leelaId) {
  if (currentActiveLeelaId === leelaId) {
    currentActiveLeelaId = null;
  } else {
    currentActiveLeelaId = leelaId;
  }
  currentLeelaSearch = '';
  const searchInput = document.getElementById('leela-search-input');
  if (searchInput) searchInput.value = '';
  renderLeelaView();

  if (currentActiveLeelaId) {
    setTimeout(() => {
      const banner = document.getElementById('active-leela-banner');
      if (banner) banner.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
}

function collapseLeelaSelection() {
  currentActiveLeelaId = null;
  currentLeelaSearch = '';
  const searchInput = document.getElementById('leela-search-input');
  if (searchInput) searchInput.value = '';
  renderLeelaView();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToChapter(chapterId) {
  const el = document.getElementById(chapterId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function clearLeelaSearch() {
  currentLeelaSearch = '';
  const searchInput = document.getElementById('leela-search-input');
  if (searchInput) searchInput.value = '';
  renderLeelaView();
}

/* Render Teachings */
function initTeachings() {
  const container = document.getElementById('teachings-container');
  if (!container) return;

  const items = i18n.getContentTeachings(INITIAL_DATA.teachings);

  container.innerHTML = items.map(t => `
    <div class="glass-card">
      <span class="badge badge-devotee" style="margin-bottom:0.75rem">${t.level}</span>
      <h3 style="font-size:1.4rem;margin-bottom:0.25rem">${t.title}</h3>
      <p class="sans-text" style="font-weight:600;color:var(--saffron-500);font-size:0.9rem;margin-bottom:0.75rem">${t.subtitle}</p>
      <p style="color:var(--text-muted);font-size:0.95rem;margin-bottom:1rem">${t.description}</p>
      <div style="background:var(--bg-main);padding:1rem;border-radius:var(--radius-sm);border:1px solid var(--line);margin-bottom:1rem">
        <strong class="sans-text" style="font-size:0.8rem;text-transform:uppercase;color:var(--maroon-700)">Key Principles:</strong>
        <ul style="margin:0.5rem 0 0;padding-left:1.2rem;font-size:0.9rem">
          ${t.keyTakeaways.map(k => `<li style="margin-bottom:0.35rem">${k}</li>`).join('')}
        </ul>
      </div>
      <span style="font-size:0.8rem;color:var(--text-light)"><strong>Citation:</strong> ${t.citation}</span>
    </div>
  `).join('');
}

/* Render Books & Library Search */
function initBooks() {
  const container = document.getElementById('books-container');
  const searchInput = document.getElementById('library-search-input');
  const searchClearBtn = document.getElementById('library-search-clear');
  const countBadge = document.getElementById('library-book-count');
  
  if (!container) return;

  const rawBooks = (dataManager && dataManager.localData && dataManager.localData.books) || (typeof INITIAL_DATA !== 'undefined' && INITIAL_DATA.books) || [];
  if (rawBooks.length === 0) return;

  // Update Dynamic Book Count Pill
  if (countBadge) {
    const totalCount = rawBooks.length;
    const lang = i18n.currentLang;
    const countLabel = lang === 'hi' ? `${totalCount} ग्रंथ` : (lang === 'gu' ? `${totalCount} ગ્રંથો` : `${totalCount} Books`);
    countBadge.textContent = `📚 ${countLabel}`;
  }

  function renderBooksList(query = '') {
    const lang = i18n.currentLang;
    const btnText = i18n.t('btn_read_pdf') || 'Read PDF';
    const byLabel = i18n.t('book_by_author') || 'By';
    const officialSourceText = i18n.t('book_official_source') || 'Official BBT Source';
    const q = query.trim().toLowerCase();

    // Search Filtering Logic
    const filteredBooks = rawBooks.filter(b => {
      if (!q) return true;

      const titleEn = (b.title || '').toLowerCase();
      const titleHi = (b.titleHindi || '').toLowerCase();
      const titleGu = (b.titleGujarati || '').toLowerCase();
      const authorEn = (b.author || '').toLowerCase();
      const authorHi = (b.authorHindi || '').toLowerCase();
      const authorGu = (b.authorGujarati || '').toLowerCase();
      const catEn = (b.category || '').toLowerCase();
      const catHi = (b.categoryHindi || '').toLowerCase();
      const catGu = (b.categoryGujarati || '').toLowerCase();
      const sumEn = (b.summary || '').toLowerCase();
      const sumHi = (b.summaryHindi || '').toLowerCase();
      const sumGu = (b.summaryGujarati || '').toLowerCase();

      // Common Search Aliases
      const isGeeta = q.includes('geeta') || q.includes('gita') || q.includes('गीता') || q.includes('ગીતા') || q.includes('bhagavad');
      const isBhagavatam = q.includes('bhagavatam') || q.includes('bhagwatam') || q.includes('भागवत') || q.includes('ભાગવત');
      const isIsopanisad = q.includes('iso') || q.includes('isopanisad') || q.includes('isopanishad') || q.includes('ईशोपनिषद्') || q.includes('ईशोपनिषद') || q.includes('ઈશોપનિષદ');
      const isPurnaPrashna = q.includes('purna') || q.includes('prashna') || q.includes('uttar') || q.includes('perfect questions') || q.includes('पूर्ण') || q.includes('प्रश्न') || q.includes('उत्तर') || q.includes('પણ') || q.includes('પ્રશ્ન');
      const isPunaragaman = q.includes('punar') || q.includes('reincarnation') || q.includes('coming back') || q.includes('पुनरागमन') || q.includes('पुनर्जन्म') || q.includes('પુનરાગમન');
      const isSriKrishna = q.includes('krishna') || q.includes('कृष्ण') || q.includes('कृष्णा') || q.includes('કૃષ્ણ') || q.includes('lila') || q.includes('लीला') || q.includes('पुरुषोत्तम');
      const isChaitanya = q.includes('chaitanya') || q.includes('caitanya') || q.includes('shikshamrita') || q.includes('चैतन्य') || q.includes('शिक्षामृत') || q.includes('ચૈતન્ય');
      const isEasyJourney = q.includes('easy journey') || q.includes('planets') || q.includes('space') || q.includes('अन्य') || q.includes('ग्रहों') || q.includes('यात्रा') || q.includes('અન્ય') || q.includes('ગ્રહો');
      const isAttainingKC = q.includes('attaining') || q.includes('consciousness') || q.includes('matchless') || q.includes('कृष्णभावनामृत') || q.includes('प्राप्ति') || q.includes('કૃષ્ણભાવનામૃત');
      const isChallenge = q.includes('challenge') || q.includes('chunauti') || q.includes('हरे') || q.includes('चुनौती') || q.includes('હરે') || q.includes('પડકાર');
      const isAtmaKaPravas = q.includes('atma') || q.includes('pravas') || q.includes('soul') || q.includes('आत्मा') || q.includes('प्रवास') || q.includes('આત્મા') || q.includes('પ્રવાસ');
      const isKrishnaBhavanamrita = q.includes('bhavanamrita') || q.includes('bhavanamrta') || q.includes('भावनामृत') || q.includes('कृष्णभावनामृत') || q.includes('કૃષ્ણભાવનામૃત');
      const isJeevanKaSrotaJeevan = q.includes('jeevan') || q.includes('srota') || q.includes('life comes') || q.includes('जीवन') || q.includes('स्रोत') || q.includes('સ્રોત');
      const isKarmaYoga = q.includes('karma') || q.includes('कर्म') || q.includes('कॉर्म') || q.includes('કર્મ') || q.includes('action');

      if (isGeeta && (b.id === 'book-gita-yatharoop' || titleEn.includes('gita'))) return true;
      if (isBhagavatam && (b.id === 'book-srimad-bhagavatam' || titleEn.includes('bhagavatam'))) return true;
      if (isIsopanisad && (b.id === 'book-sri-isopanisad' || titleEn.includes('iso') || titleHi.includes('ईशोपनिषद्'))) return true;
      if (isPurnaPrashna && (b.id === 'book-purna-prashna-purna-uttar' || titleHi.includes('पूर्ण'))) return true;
      if (isPunaragaman && (b.id === 'book-punaragaman' || titleHi.includes('पुनरागमन'))) return true;
      if (isSriKrishna && (b.id === 'book-lila-purushottam-sri-krishna' || titleHi.includes('कृष्ण') || titleHi.includes('लीला'))) return true;
      if (isChaitanya && (b.id === 'book-chaitanya-shikshamrita' || titleHi.includes('चैतन्य'))) return true;
      if (isEasyJourney && (b.id === 'book-easy-journey-to-other-planets' || titleHi.includes('अन्य'))) return true;
      if (isAttainingKC && (b.id === 'book-attaining-krishna-consciousness' || titleHi.includes('कृष्णभावनामृत'))) return true;
      if (isChallenge && (b.id === 'book-hare-krishna-challenge' || titleHi.includes('चुनौती'))) return true;
      if (isAtmaKaPravas && (b.id === 'book-atma-ka-pravas' || titleHi.includes('आत्मा') || titleEn.includes('atma'))) return true;
      if (isKrishnaBhavanamrita && (b.id === 'book-krishna-bhavanamrita' || b.id === 'book-attaining-krishna-consciousness' || titleHi.includes('कृष्णभावनामृत'))) return true;
      if (isJeevanKaSrotaJeevan && (b.id === 'book-jeevan-ka-srota-jeevan' || titleHi.includes('जीवन'))) return true;
      if (isKarmaYoga && (b.id === 'book-karma-yoga' || titleHi.includes('कर्म'))) return true;

      return titleEn.includes(q) || titleHi.includes(q) || titleGu.includes(q) ||
             authorEn.includes(q) || authorHi.includes(q) || authorGu.includes(q) ||
             catEn.includes(q) || catHi.includes(q) || catGu.includes(q) ||
             sumEn.includes(q) || sumHi.includes(q) || sumGu.includes(q);
    });

    if (filteredBooks.length === 0) {
      container.innerHTML = `
        <div class="library-no-results" style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1.5rem; background: var(--bg-paper); border: 1px dashed var(--line-strong); border-radius: var(--radius-lg);">
          <span style="font-size: 2.5rem; display: block; margin-bottom: 0.75rem;">📖</span>
          <h4 class="sans-text" style="font-size: 1.15rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.35rem;" data-i18n="library_no_results_title">${i18n.t('library_no_results_title') || 'No matching books found'}</h4>
          <p class="sans-text" style="font-size: 0.9rem; color: var(--text-muted); margin: 0;" data-i18n="library_no_results_hint">${i18n.t('library_no_results_hint') || 'Try searching for "Bhagavad Gita", "Bhagavatam", "Prabhupada", or "Scripture".'}</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filteredBooks.map(b => {
      const title = lang === 'hi' ? (b.titleHindi || b.title) : (lang === 'gu' ? (b.titleGujarati || b.title) : b.title);
      const author = lang === 'hi' ? (b.authorHindi || b.author) : (lang === 'gu' ? (b.authorGujarati || b.author) : b.author);
      const category = lang === 'hi' ? (b.categoryHindi || b.category) : (lang === 'gu' ? (b.categoryGujarati || b.category) : b.category);
      const summary = lang === 'hi' ? (b.summaryHindi || b.summary) : (lang === 'gu' ? (b.summaryGujarati || b.summary) : b.summary);
      const pdfUrl = b.pdfUrl;
      const coverUrl = b.coverUrl;
      const altText = b.altText || `${title} cover`;
      const sourceUrl = b.sourceUrl || 'https://www.bbt.org/books/';

      return `
        <div class="compact-book-card" onclick="if(!event.target.closest('a')) window.open('${pdfUrl}', '_blank')">
          <div>
            <a href="${pdfUrl}" target="_blank" rel="noopener noreferrer" class="book-cover-link">
              <div class="compact-cover-wrap">
                <img src="${coverUrl}" alt="${altText}" class="compact-cover-img" />
              </div>
            </a>
            <span class="compact-badge badge-verified">${category}</span>
            <h3 class="compact-book-title">${title}</h3>
            <p class="compact-book-author">${byLabel} ${author}</p>
            <p class="compact-book-summary">${summary}</p>
          </div>
          <div class="compact-card-actions">
            <a href="${pdfUrl}" target="_blank" rel="noopener noreferrer" class="compact-btn-primary" onclick="event.stopPropagation()">
              📖 ${btnText} ↗
            </a>
            <a href="${sourceUrl}" target="_blank" rel="noopener noreferrer" class="compact-btn-secondary" onclick="event.stopPropagation()">
              🏛️ ${officialSourceText} ↗
            </a>
          </div>
        </div>
      `;
    }).join('');
  }

  // Initial render
  renderBooksList(searchInput ? searchInput.value : '');

  // Event Listeners for Real-time Search
  if (searchInput) {
    searchInput.oninput = (e) => {
      const val = e.target.value;
      if (searchClearBtn) searchClearBtn.style.display = val ? 'flex' : 'none';
      renderBooksList(val);
    };
  }

  if (searchClearBtn) {
    searchClearBtn.onclick = () => {
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
      searchClearBtn.style.display = 'none';
      renderBooksList('');
    };
  }
}

/* Render ISKCON Centers */
function initCenters() {
  const container = document.getElementById('centers-container');
  const filterBtns = document.querySelectorAll('#centers-filters button');
  const centers = INITIAL_DATA.iskconCenters || [];

  if (!container) return;

  function render(region = 'all') {
    let items = centers;
    if (region !== 'all') {
      items = centers.filter(c => c.region === region);
    }

    if (items.length === 0) {
      container.innerHTML = '<p class="sans-text" style="color:var(--text-muted)">No centers found for this region.</p>';
      return;
    }

    const translatedCenters = items.map(c => i18n.getContentCenter(c));

    container.innerHTML = translatedCenters.map(c => `
      <div class="glass-card" style="display:flex;flex-direction:column;justify-content:space-between">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.5rem">
            <span class="badge badge-verified">${c.region}</span>
            <span class="sans-text" style="font-size:0.8rem;color:var(--saffron-500);font-weight:700">${i18n.t('est_label')} ${c.year}</span>
          </div>
          <h3 style="font-size:1.35rem;margin-bottom:0.25rem">${c.name}</h3>
          <p class="sans-text" style="font-weight:600;color:var(--maroon-700);font-size:0.88rem;margin-bottom:0.75rem">📍 ${c.city}</p>
          <p style="color:var(--text-muted);font-size:0.92rem;margin-bottom:1rem">${c.significance}</p>
        </div>
        <a href="${c.url}" target="_blank" rel="noreferrer" class="btn btn-secondary" style="font-size:0.8rem;justify-content:center">
          ${i18n.t('btn_visit_portal')}
        </a>
      </div>
    `).join('');
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      render(btn.getAttribute('data-region'));
    });
  });

  render('all');
}

/* Render Sources */
function initSources() {
  const container = document.getElementById('sources-container');
  if (!container) return;

  container.innerHTML = INITIAL_DATA.sources.map(s => `
    <div class="glass-card" style="display:flex;align-items:center;justify-content:space-between;gap:1.5rem;flex-wrap:wrap">
      <div>
        <h3 style="font-size:1.15rem;margin-bottom:0.25rem">${s.name}</h3>
        <p style="color:var(--text-muted);font-size:0.88rem;margin:0">${s.publisher} • ${s.type}</p>
      </div>
      <a href="${s.url}" target="_blank" rel="noreferrer" class="btn btn-secondary" style="font-size:0.8rem;padding:0.4rem 0.9rem">
        ${i18n.t('btn_view_source')}
      </a>
    </div>
  `).join('');
}

/* Library Search Handler Stub */
function initSearch() {
  initBooks();
}

/* Supabase Admin Handler */
function initSupabaseAdmin() {
  const configForm = document.getElementById('supabase-config-form');
  const urlInput = document.getElementById('sb-url');
  const keyInput = document.getElementById('sb-key');
  const statusBadge = document.getElementById('supabase-status-badge');

  if (!configForm) return;

  // Pre-fill existing credentials
  if (dataManager.supabaseUrl) urlInput.value = dataManager.supabaseUrl;
  if (dataManager.supabaseKey) keyInput.value = dataManager.supabaseKey;

  updateBadge();

  configForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = urlInput.value.trim();
    const key = keyInput.value.trim();

    statusBadge.textContent = 'Testing connection...';
    statusBadge.className = 'badge badge-devotee';

    const ok = await dataManager.configureSupabase(url, key);
    updateBadge();

    if (ok) {
      alert('✓ Connected to Supabase live database successfully!');
      initLilas(); // Re-render with live records
    } else {
      alert('⚠️ Could not connect to Supabase. Please check your Project URL and Anon Key.');
    }
  });

  function updateBadge() {
    if (dataManager.isSupabaseConnected) {
      statusBadge.textContent = '● Live Supabase DB Connected';
      statusBadge.className = 'badge badge-verified';
    } else {
      statusBadge.textContent = 'Offline (Using Local Dataset)';
      statusBadge.className = 'badge badge-reflection';
    }
  }
}

/* Daily Prabhupada Vani Reflection Generator */
function initDailyVani() {
  const verseEl = document.getElementById('vani-verse');
  const sanskritEl = document.getElementById('vani-sanskrit');
  const transEl = document.getElementById('vani-translation');
  const purportEl = document.getElementById('vani-purport');
  const nextBtn = document.getElementById('btn-next-vani');
  const vanis = INITIAL_DATA.vanis;

  if (!verseEl || !nextBtn || !vanis) return;

  let currentIdx = 0;

  function renderVani(idx) {
    const v = vanis[idx];
    if (!v) return;
    verseEl.textContent = v.verse;
    sanskritEl.textContent = `"${v.text}"`;
    transEl.textContent = `"${v.translation}"`;
    purportEl.innerHTML = `<strong>Purport Snippet:</strong> ${v.purportSnippet}`;
  }

  nextBtn.addEventListener('click', () => {
    currentIdx = (currentIdx + 1) % vanis.length;
    renderVani(currentIdx);
  });

  renderVani(0);
}

/* Research Export & Citation Tools */
function initExportTools() {
  const exportBtn = document.getElementById('btn-export-json');
  const printBtn = document.getElementById('btn-print-citations');

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataManager.localData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "prabhupada_seva_research_backup.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    });
  }

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* Book PDF Submission Form Handler */
function initBookSubmissionForm() {
  const form = document.getElementById('book-submission-form');
  const outputArea = document.getElementById('book-submission-output');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const newBook = {
      title: formData.get('title'),
      author: formData.get('author'),
      category: formData.get('category'),
      coverUrl: formData.get('coverUrl'),
      pdfUrl: formData.get('pdfUrl'),
      summary: formData.get('summary')
    };

    dataManager.addBook(newBook);
    initBooks(); // Re-render books view

    if (outputArea) {
      outputArea.style.display = 'block';
      outputArea.innerHTML = `
        <div style="background:var(--leaf-100);color:var(--leaf-600);padding:1rem;border-radius:var(--radius-sm)" class="sans-text">
          <strong>✓ Book "${newBook.title}" Successfully Added to Library!</strong>
        </div>
      `;
    }

    form.reset();
  });
}

/* Lila Submission Form */
function initSubmissionForm() {
  const form = document.getElementById('research-submission-form');
  const outputArea = document.getElementById('submission-output');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    
    const newEntry = {
      title: formData.get('title'),
      period: formData.get('period'),
      category: formData.get('category'),
      status: formData.get('status') || 'draft',
      contentType: formData.get('contentType'),
      summary: formData.get('summary'),
      fullStory: formData.get('fullStory'),
      sourceTitle: formData.get('sourceTitle'),
      sourceAuthor: formData.get('sourceAuthor'),
      reflection: formData.get('reflection')
    };

    dataManager.addLila(newEntry);
    initLilas(); // Re-render lilas view

    if (outputArea) {
      outputArea.style.display = 'block';
      outputArea.innerHTML = `
        <div style="background:var(--leaf-100);color:var(--leaf-600);padding:1rem;border-radius:var(--radius-sm);margin-top:1rem" class="sans-text">
          <strong>✓ Record Successfully Added & Cached Locally!</strong>
          <pre style="margin-top:0.5rem">${JSON.stringify(newEntry, null, 2)}</pre>
        </div>
      `;
    }

    form.reset();
  });
}

/* Quotes Carousel */
function initQuotes() {
  const quoteText = document.getElementById('quote-text');
  const quoteContext = document.getElementById('quote-context');

  if (!quoteText || !quoteContext) return;

  let idx = 0;
  const quotes = INITIAL_DATA.quotes;

  setInterval(() => {
    idx = (idx + 1) % quotes.length;
    quoteText.style.opacity = 0;
    setTimeout(() => {
      quoteText.textContent = `"${quotes[idx].text}"`;
      quoteContext.textContent = `— ${quotes[idx].context}`;
      quoteText.style.opacity = 1;
    }, 300);
  }, 6000);
}

/* Bhagavad-gita 18 Chapter Explorer */
function initGitaExplorer() {
  const buttonsContainer = document.getElementById('gita-chapter-buttons');
  const detailContainer = document.getElementById('gita-chapter-detail');
  const chapters = INITIAL_DATA.gitaChapters;

  if (!buttonsContainer || !detailContainer) return;

  buttonsContainer.innerHTML = chapters.map(ch => `
    <button class="chapter-btn ${ch.num === 1 ? 'active' : ''}" data-ch="${ch.num}">
      <span class="chapter-btn-num">Ch. ${ch.num}</span>
      <span class="chapter-btn-title">${ch.name}</span>
    </button>
  `).join('');

  function renderDetail(num) {
    const ch = chapters.find(c => c.num === num);
    if (!ch) return;

    detailContainer.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:0.5rem">
        <div>
          <h4 style="font-size:1.3rem;margin:0">Chapter ${ch.num}: ${ch.name}</h4>
          <span style="color:var(--saffron-500);font-size:0.85rem;font-weight:600">${ch.verses} Verses</span>
        </div>
        <a href="https://vedabase.io/en/library/bg/${ch.num}/" target="_blank" class="btn btn-secondary" style="font-size:0.75rem;padding:0.3rem 0.7rem">Read Chapter on Vedabase ↗</a>
      </div>
      <p style="margin-top:0.75rem;color:var(--text-muted);font-size:0.95rem">${ch.summary}</p>
    `;
  }

  const buttons = buttonsContainer.querySelectorAll('button');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderDetail(parseInt(btn.getAttribute('data-ch')));
    });
  });

  renderDetail(1);
}

/* Devotional Knowledge Quiz */
function initQuiz() {
  const container = document.getElementById('quiz-container');
  const questions = INITIAL_DATA.quizQuestions;
  if (!container) return;

  let currentIdx = 0;
  let score = 0;

  function renderQuestion() {
    if (currentIdx >= questions.length) {
      container.innerHTML = `
        <div style="text-align:center;padding:1.5rem 0">
          <h4 style="font-size:1.5rem;color:var(--saffron-500)">Quiz Completed! 🎉</h4>
          <p style="font-size:1.1rem">You scored <strong>${score} / ${questions.length}</strong></p>
          <button class="btn btn-saffron" style="margin-top:0.5rem" onclick="initQuiz()">Try Again ↺</button>
        </div>
      `;
      return;
    }

    const q = questions[currentIdx];
    container.innerHTML = `
      <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:0.25rem">Question ${currentIdx + 1} of ${questions.length}</p>
      <h4 style="font-size:1.15rem;margin-bottom:1rem">${q.question}</h4>
      <div>
        ${q.options.map((opt, i) => `
          <button class="quiz-option" data-idx="${i}">${opt}</button>
        `).join('')}
      </div>
      <div id="quiz-feedback" style="display:none;margin-top:1rem;padding:0.75rem;border-radius:var(--radius-sm)"></div>
    `;

    const optionBtns = container.querySelectorAll('.quiz-option');
    const feedback = container.querySelector('#quiz-feedback');

    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const selected = parseInt(btn.getAttribute('data-idx'));
        optionBtns.forEach(b => b.disabled = true);

        if (selected === q.answer) {
          score++;
          btn.classList.add('correct');
          feedback.style.display = 'block';
          feedback.style.background = 'var(--leaf-100)';
          feedback.style.color = 'var(--leaf-600)';
          feedback.innerHTML = `<strong>Correct!</strong> ${q.explanation}`;
        } else {
          btn.classList.add('incorrect');
          optionBtns[q.answer].classList.add('correct');
          feedback.style.display = 'block';
          feedback.style.background = 'var(--maroon-50)';
          feedback.style.color = 'var(--maroon-700)';
          feedback.innerHTML = `<strong>Incorrect.</strong> ${q.explanation}`;
        }

        setTimeout(() => {
          currentIdx++;
          renderQuestion();
        }, 3000);
      });
    });
  }

  renderQuestion();
}

/* Floating Audio Player */
function initAudioPlayer() {
  const playBtn = document.getElementById('audio-play-btn');
  const audioEl = document.getElementById('audio-element');
  let isPlaying = false;

  if (!playBtn || !audioEl) return;

  playBtn.addEventListener('click', () => {
    if (isPlaying) {
      audioEl.pause();
      playBtn.textContent = '▶';
      isPlaying = false;
    } else {
      audioEl.play().then(() => {
        playBtn.textContent = '⏸';
        isPlaying = true;
      }).catch(err => {
        console.warn('Audio play prevented:', err);
      });
    }
  });
}

// Global modal helper
window.openSourceModal = function(sourceId) {
  const source = INITIAL_DATA.sources.find(s => s.id === sourceId);
  if (!source) return;
  alert(`Verified Source Record:\n\nTitle: ${source.name}\nPublisher: ${source.publisher}\nType: ${source.type}\nURL: ${source.url}`);
};

/* ===== BHAGAVAD-GITA FULL EXPLORER ===== */
function initGitaFullExplorer() {
  const btnContainer = document.getElementById('gita-full-chapter-btns');
  const detailContainer = document.getElementById('gita-full-chapter-detail');

  if (!btnContainer || !detailContainer || typeof GITA_DATA === 'undefined') return;

  const chapters = GITA_DATA.chapters;

  // Theme color map
  const themeColors = {
    grief: '#7c2d12', soul: '#1e40af', action: '#b45309', knowledge: '#6b21a8',
    renunciation: '#065f46', meditation: '#0e7490', absolute: '#92400e',
    liberation: '#1a56db', devotion: '#b45309', opulence: '#d97706',
    'universal-form': '#7e22ce', bhakti: '#d97706', nature: '#15803d',
    modes: '#c2410c', purushottama: '#1d4ed8', 'divine-demoniac': '#7c3aed',
    faith: '#0f766e', surrender: '#b91c1c'
  };

  // Build chapter buttons
  btnContainer.innerHTML = chapters.map((ch, i) => `
    <button class="gita-ch-btn ${i === 0 ? 'active' : ''}" data-num="${ch.num}" id="gita-ch-${ch.num}"
      style="${i === 0 ? `background:${themeColors[ch.theme] || 'var(--saffron-500)'};color:#fff;border-color:${themeColors[ch.theme] || 'var(--saffron-500)'}` : ''}">
      <span class="gita-ch-num">Ch. ${ch.num}</span>
      <span class="gita-ch-name">${ch.nameSanskrit}</span>
    </button>
  `).join('');

  function renderChapterDetail(num) {
    const ch = chapters.find(c => c.num === num);
    if (!ch) return;
    const color = themeColors[ch.theme] || 'var(--saffron-500)';

    detailContainer.innerHTML = `
      <div class="gita-detail-header" style="border-color:${color}">
        <div class="gita-detail-meta">
          <span class="badge badge-devotee" style="background:${color}20;color:${color};border-color:${color}40">
            Chapter ${ch.num} of 18
          </span>
          <span class="badge badge-verified" style="margin-left:0.5rem">${ch.verses} Verses</span>
        </div>
        <h3 class="gita-detail-name">${ch.name}</h3>
        <p class="gita-detail-sanskrit">${ch.nameSanskrit} &nbsp;|&nbsp; <span style="font-family:'Lora',serif">${ch.nameHindi}</span></p>
        <p class="gita-detail-summary">${ch.summary}</p>
        <div class="gita-themes-row">
          ${ch.themes.map(t => `<span class="gita-theme-tag">${t}</span>`).join('')}
        </div>
      </div>

      <div class="gita-detail-body">
        <!-- Key Verse -->
        <div class="gita-verse-box" style="border-left-color:${color}">
          <div class="gita-verse-ref-row">
            <span class="gita-verse-ref-badge" style="background:${color};color:#fff">${ch.keyVerse.ref}</span>
            <span class="gita-verse-ref-label">Key Verse of Chapter ${ch.num}</span>
          </div>
          <p class="gita-shloka">${ch.keyVerse.sanskrit}</p>
          <p class="gita-transliteration"><em>${ch.keyVerse.transliteration}</em></p>
          <blockquote class="gita-translation-block">
            <p>"${ch.keyVerse.translation}"</p>
          </blockquote>
          <div class="gita-purport-box">
            <strong class="gita-purport-label">Purport (Prabhupada):</strong>
            <p>${ch.keyVerse.purport}</p>
          </div>
        </div>

        <!-- Key Lesson -->
        <div class="gita-lesson-box" style="background:${color}10;border-color:${color}25">
          <strong class="gita-lesson-label" style="color:${color}">✦ Key Lesson of Chapter ${ch.num}</strong>
          <p>${ch.keyLesson}</p>
        </div>

        <!-- Vedabase Link -->
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap;margin-top:1rem">
          <a href="https://vedabase.io/en/library/bg/${ch.num}/" target="_blank"
             class="btn btn-secondary" style="font-size:0.85rem">
            Read Full Chapter ${ch.num} on Vedabase ↗
          </a>
          <a href="https://vedabase.io/en/library/bg/${ch.num}/1/" target="_blank"
             class="btn btn-saffron" style="font-size:0.85rem">
            First Verse + Purport ↗
          </a>
        </div>
      </div>
    `;

    // Scroll detail into view
    detailContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Button click events
  btnContainer.querySelectorAll('.gita-ch-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const num = parseInt(btn.getAttribute('data-num'));
      const ch = chapters.find(c => c.num === num);
      const color = themeColors[ch?.theme] || 'var(--saffron-500)';

      btnContainer.querySelectorAll('.gita-ch-btn').forEach(b => {
        b.classList.remove('active');
        b.style.background = '';
        b.style.color = '';
        b.style.borderColor = '';
      });

      btn.classList.add('active');
      btn.style.background = color;
      btn.style.color = '#fff';
      btn.style.borderColor = color;

      renderChapterDetail(num);
    });
  });

  renderChapterDetail(1);
}

/* ===== GITA VERSE OF THE DAY ===== */
function initGitaVerseOfDay() {
  const refEl = document.getElementById('gita-verse-ref');
  const sanskritEl = document.getElementById('gita-verse-sanskrit');
  const translationEl = document.getElementById('gita-verse-translation');
  const purportEl = document.getElementById('gita-verse-purport');
  const nextBtn = document.getElementById('btn-next-gita-verse');

  if (!refEl || typeof GITA_DATA === 'undefined') return;

  // Collect all key verses from all chapters
  const allVerses = GITA_DATA.chapters.map(ch => ({
    ref: ch.keyVerse.ref,
    chapter: ch.num,
    chapterName: ch.name,
    sanskrit: ch.keyVerse.sanskrit,
    translation: ch.keyVerse.translation,
    purport: ch.keyVerse.purport
  }));

  let currentIdx = Math.floor(Math.random() * allVerses.length);

  function renderVerse(idx) {
    const v = allVerses[idx];
    if (!v) return;
    refEl.textContent = v.ref;
    sanskritEl.textContent = v.sanskrit;
    translationEl.textContent = `"${v.translation}"`;
    purportEl.innerHTML = `<strong>Purport Snippet:</strong> ${v.purport}`;
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIdx = (currentIdx + 1) % allVerses.length;
      renderVerse(currentIdx);
    });
  }

  renderVerse(currentIdx);
}

/* ===== GITA QUIZ (8 Questions) ===== */
function initGitaQuiz() {
  const container = document.getElementById('gita-quiz-container');
  if (!container || typeof GITA_DATA === 'undefined') return;

  const questions = GITA_DATA.gitaQuiz;
  let currentIdx = 0;
  let score = 0;

  function renderGitaQuestion() {
    if (currentIdx >= questions.length) {
      const pct = Math.round((score / questions.length) * 100);
      let grade = '';
      if (pct === 100) grade = '🌟 Perfect! Hare Krishna!';
      else if (pct >= 75) grade = '🙏 Excellent! Keep chanting!';
      else if (pct >= 50) grade = '📖 Good! Study more Gita!';
      else grade = '🌱 Keep learning!';

      container.innerHTML = `
        <div style="text-align:center;padding:1.5rem 0">
          <h4 style="font-size:1.8rem;color:var(--saffron-500)">${grade}</h4>
          <p style="font-size:1.15rem">You scored <strong>${score} / ${questions.length}</strong> (${pct}%)</p>
          <p style="color:var(--text-muted);font-size:0.9rem">Bhagavad-gita As It Is — by Srila Prabhupada</p>
          <button class="btn btn-saffron" style="margin-top:1rem" onclick="initGitaQuiz()">Try Again ↺</button>
        </div>
      `;
      return;
    }

    const q = questions[currentIdx];
    container.innerHTML = `
      <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:0.4rem">
        Question ${currentIdx + 1} of ${questions.length}
      </p>
      <div class="gita-quiz-progress">
        <div class="gita-quiz-progress-bar" style="width:${((currentIdx) / questions.length) * 100}%"></div>
      </div>
      <h4 style="font-size:1.1rem;margin:1rem 0">${q.question}</h4>
      <div>
        ${q.options.map((opt, i) => `
          <button class="quiz-option" data-idx="${i}">${opt}</button>
        `).join('')}
      </div>
      <div id="gita-q-feedback" style="display:none;margin-top:1rem;padding:0.75rem;border-radius:var(--radius-sm)"></div>
    `;

    const optBtns = container.querySelectorAll('.quiz-option');
    const feedback = container.querySelector('#gita-q-feedback');

    optBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const selected = parseInt(btn.getAttribute('data-idx'));
        optBtns.forEach(b => b.disabled = true);

        if (selected === q.answer) {
          score++;
          btn.classList.add('correct');
          feedback.style.display = 'block';
          feedback.style.background = 'var(--leaf-100)';
          feedback.style.color = 'var(--leaf-600)';
          feedback.innerHTML = `<strong>✓ Correct!</strong> ${q.explanation}`;
        } else {
          btn.classList.add('incorrect');
          optBtns[q.answer]?.classList.add('correct');
          feedback.style.display = 'block';
          feedback.style.background = 'var(--maroon-50)';
          feedback.style.color = 'var(--maroon-700)';
          feedback.innerHTML = `<strong>✗ Incorrect.</strong> ${q.explanation}`;
        }

        setTimeout(() => {
          currentIdx++;
          renderGitaQuestion();
        }, 3500);
      });
    });
  }

  renderGitaQuestion();
}

