// Shared navbar and footer, injected into every page.
//
// The sibling app (Kids Bible Quiz) uses a sticky top bar with a logo on the
// left and icon+label links on the right, the active one filled with the
// primary colour, plus a footer. These pages are plain HTML rather than React,
// so the markup is built here once instead of being pasted into seven files.
//
// Add a page: one line in NAV_ITEMS. Pages that should not appear in the menu
// (the printable packet, the teacher dashboard) are simply left out.
(function () {
  const NAV_ITEMS = [
    { href: 'index.html',       label: 'Home',        icon: '\u{1F3E0}' },
    { href: 'practice.html',    label: 'Practice',    icon: '\u{1F3AE}' },
    { href: 'team-play.html',   label: 'Live Quiz',   icon: '\u{1F3C6}' },
    { href: 'leaderboard.html', label: 'Leaderboard', icon: '\u2B50' }
  ];

  // The coach link sits apart from the children's menu, as the sibling app
  // keeps its Moderator link separate from the main nav items.
  const COACH_ITEM = { href: 'teacher.html', label: 'Coach', icon: '\u{1F511}' };

  const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  const link = (item) => {
    const active = page === item.href.toLowerCase();
    return `<a class="nav-link${active ? ' active' : ''}" href="${item.href}"${active ? ' aria-current="page"' : ''}>
      <span class="nav-ico" aria-hidden="true">${item.icon}</span><span>${item.label}</span>
    </a>`;
  };

  const coachLink = () => {
    const active = page === COACH_ITEM.href.toLowerCase();
    return `<a class="nav-link nav-link-coach${active ? ' active' : ''}" href="${COACH_ITEM.href}"${active ? ' aria-current="page"' : ''}>
      <span class="nav-ico" aria-hidden="true">${COACH_ITEM.icon}</span><span>${COACH_ITEM.label}</span>
    </a>`;
  };

  const navHtml = `
  <nav class="site-nav">
    <div class="site-nav-inner">
      <a class="site-brand" href="index.html">
        <span class="site-brand-ico" aria-hidden="true">📖</span>
        <span class="site-brand-text">Acts <span>Bible Quiz</span></span>
      </a>
      <button class="nav-toggle" type="button" aria-label="Menu" aria-expanded="false">☰</button>
      <div class="nav-links">${NAV_ITEMS.map(link).join('')}</div>
    </div>
  </nav>`;

  const footHtml = `
  <footer class="site-footer">
    <div class="site-footer-inner">
      <div class="site-footer-brand"><span aria-hidden="true">📖</span> Acts <span>Bible Quiz</span></div>
      <p>Adventurer Bible Game &middot; 2026&ndash;2027 season &middot; Acts 1&ndash;16 (NKJV)</p>
      <p class="site-footer-small">District exam: Friday 16 April 2027</p>
    </div>
  </footer>`;

  function mount() {
    if (document.querySelector('.site-nav')) return;
    document.body.insertAdjacentHTML('afterbegin', navHtml);
    document.body.insertAdjacentHTML('beforeend', footHtml);

    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    // The old per-page "back to home" links are redundant once there is a nav.
    document.querySelectorAll('.back-link').forEach(el => el.remove());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
