// LNB(좌측 사이드바) — 다중 페이지 챕터 구조 지원
// 동작:
//   1) window.REPORT_CHAPTERS (chapters.js)에 정의된 전체 챕터 목록으로 LNB의 챕터 항목을 만들고,
//   2) 현재 페이지의 main 안에 있는 h3들을 자동으로 자식 메뉴로 펼친다.
//   3) 현재 파일과 일치하는 챕터 항목을 자동 active 처리.
(function () {
  const main = document.querySelector('main.main');
  if (!main) return;

  const chapters = window.REPORT_CHAPTERS || [];
  const currentFile = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  // ============ LNB ============
  const lnb = document.createElement('nav');
  lnb.className = 'lnb';
  const docTitle = '한국 EMR 시장 분석 및 자체 개발 추진 검토';
  let html = '<div class="lnb-title"><a href="index.html">' + docTitle + '</a></div>';
  html += '<div class="lnb-section"><div class="lnb-section-label">Sections</div>';

  // 현재 페이지 h3들을 자식 후보로 수집
  const localH3s = Array.from(main.querySelectorAll('h3'));

  chapters.forEach((ch) => {
    if (ch.kind === 'part') {
      html += '<div class="lnb-part">' + ch.label + '</div>';
      return;
    }
    const isCurrent = (ch.file || '').toLowerCase() === currentFile;
    const hasChildren = isCurrent && localH3s.length > 0;
    const groupClass = 'lnb-group' + (hasChildren ? ' has-children expanded' : '') + (isCurrent ? ' current' : '');
    html += '<div class="' + groupClass + '">';
    html += '<div class="lnb-row">';
    const activeCls = isCurrent ? ' active' : '';
    html += '<a class="lnb-item lnb-h2' + activeCls + '" href="' + ch.file + '">';
    html += '<span class="lnb-num">' + ch.num + '</span>';
    html += '<span class="lnb-text">' + ch.title + '</span>';
    html += '</a>';
    if (hasChildren) {
      html += '<button class="lnb-chevron" type="button" aria-label="toggle">›</button>';
    }
    html += '</div>';

    if (hasChildren) {
      html += '<div class="lnb-children">';
      localH3s.forEach((h3, j) => {
        if (!h3.id) h3.id = 'sec-h3-' + (j + 1);
        let subText = h3.textContent.trim();
        // h3 텍스트 앞의 "5.1 " / "5-1." 패턴 제거 (LNB가 자체 번호 표시)
        const stripped = subText.replace(/^[A-Z0-9]+[.\-][0-9]+\s*/, '');
        const subNum = ch.num + '.' + (j + 1);
        html += '<a class="lnb-item lnb-sub" href="#' + h3.id + '" data-target="' + h3.id + '">';
        html += '<span class="lnb-sub-num">' + subNum + '</span>';
        html += '<span class="lnb-text">' + stripped + '</span>';
        html += '</a>';
      });
      html += '</div>';
    }
    html += '</div>';
  });
  html += '</div>';
  lnb.innerHTML = html;
  document.body.insertBefore(lnb, document.body.firstChild);

  // Chevron 토글
  lnb.querySelectorAll('.lnb-chevron').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const group = btn.closest('.lnb-group');
      group.classList.toggle('expanded');
    });
  });

  // Scrollspy — 현재 파일 내 h3 활성 추적
  if (localH3s.length) {
    const lnbItems = lnb.querySelectorAll('.lnb-item.lnb-sub');
    const itemMap = new Map();
    lnbItems.forEach(a => {
      const tgt = a.getAttribute('data-target');
      if (tgt) itemMap.set(tgt, a);
    });

    const lnbObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        const link = itemMap.get(e.target.id);
        if (!link) return;
        if (e.isIntersecting) {
          lnbItems.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    }, { rootMargin: '-80px 0px -70% 0px' });
    localH3s.forEach(h => lnbObserver.observe(h));
  }

  // 챕터 간 이전/다음 네비게이션 자동 삽입
  const h2Chapters = chapters.filter(c => c.kind === 'h2' || c.kind === 'index');
  const idx = h2Chapters.findIndex(c => (c.file || '').toLowerCase() === currentFile);
  if (idx >= 0) {
    const prev = idx > 0 ? h2Chapters[idx - 1] : null;
    const next = idx < h2Chapters.length - 1 ? h2Chapters[idx + 1] : null;
    if (prev || next) {
      const nav = document.createElement('div');
      nav.className = 'chapter-nav';
      let nh = '';
      if (prev) {
        nh += '<a class="chapter-nav-prev" href="' + prev.file + '">';
        nh += '<span class="cn-dir">← 이전</span>';
        nh += '<span class="cn-title">' + prev.num + '. ' + prev.title + '</span>';
        nh += '</a>';
      } else {
        nh += '<span class="chapter-nav-spacer"></span>';
      }
      if (next) {
        nh += '<a class="chapter-nav-next" href="' + next.file + '">';
        nh += '<span class="cn-dir">다음 →</span>';
        nh += '<span class="cn-title">' + next.num + '. ' + next.title + '</span>';
        nh += '</a>';
      } else {
        nh += '<span class="chapter-nav-spacer"></span>';
      }
      nav.innerHTML = nh;
      main.appendChild(nav);
    }
  }

  // ============ Theme toggle ============
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.body.setAttribute('data-theme', savedTheme);

  const toggle = document.createElement('div');
  toggle.className = 'theme-toggle';
  toggle.innerHTML =
    '<button data-theme-btn="dark">🌙 Dark</button>' +
    '<button data-theme-btn="light">☀ Light</button>';
  document.body.appendChild(toggle);

  function applyTheme(t) {
    document.body.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
    toggle.querySelectorAll('button').forEach(b => {
      b.classList.toggle('active', b.dataset.themeBtn === t);
    });
  }
  toggle.querySelectorAll('button').forEach(b => {
    b.addEventListener('click', () => applyTheme(b.dataset.themeBtn));
  });
  applyTheme(savedTheme);
})();
