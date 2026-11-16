
let content = { packages: [], gallery: [] };

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[c]));

const packageGrid = document.getElementById('packageGrid');
const galleryGrid = document.getElementById('galleryGrid');

function drawPackages() {
  if (!packageGrid) return;

  packageGrid.innerHTML = (content.packages || []).map(p => `
    <article class="package-card">
      <img loading="lazy" src="${esc(p.image)}" alt="${esc(p.title)}">
      <div class="package-body">
        <div class="tag">${esc(p.tag)}</div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.description)}</p>
        <div class="package-foot">
          <strong>${esc(p.price)}</strong>
          <a href="#contact">Inquire →</a>
        </div>
      </div>
    </article>
  `).join('') || '<p>No travel packages available yet.</p>';
}

function drawGallery(filter = 'all') {
  if (!galleryGrid) return;

  galleryGrid.innerHTML = (content.gallery || [])
    .filter(g => filter === 'all' || g.type === filter)
    .map(g => g.type === 'video'
      ? `<article class="gallery-item">
          <iframe loading="lazy" src="${esc(g.src)}"
            title="${esc(g.title)}" allowfullscreen></iframe>
          <div>${esc(g.title)}</div>
        </article>`
      : `<article class="gallery-item">
          <img loading="lazy" src="${esc(g.src)}"
            alt="${esc(g.title)}">
          <div>${esc(g.title)}</div>
        </article>`
    ).join('') || '<p>No photos or videos yet.</p>';
}

document.querySelectorAll('.filter').forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(x =>
      x.classList.remove('active')
    );
    b.classList.add('active');
    drawGallery(b.dataset.filter);
  });
});

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const menu = document.getElementById('menu');
const navlinks = document.getElementById('navlinks');

if (menu && navlinks) {
  menu.addEventListener('click', () =>
    navlinks.classList.toggle('open')
  );

  document.querySelectorAll('#navlinks a').forEach(a =>
    a.addEventListener('click', () =>
      navlinks.classList.remove('open')
    )
  );
}

const inquiryForm = document.getElementById('inquiryForm');

if (inquiryForm) {
  inquiryForm.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const subject = 'CLARV Travel Inquiry — ' + d.get('destination');
    const body = `Name: ${d.get('name')}
Email: ${d.get('email')}
Destination: ${d.get('destination')}
Travel date: ${d.get('date')}

Message:
${d.get('message')}`;

    window.location.href =
      'mailto:clarvtravel@gmail.com?subject=' +
      encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
  });
}

fetch('content.json', { cache: 'no-store' })
  .then(r => {
    if (!r.ok) throw Error('Content unavailable');
    return r.json();
  })
  .then(data => {
    content = data;
    drawPackages();
    drawGallery();
  })
  .catch(err => {
    console.error('CLARV content error:', err);
    if (packageGrid) packageGrid.innerHTML =
      '<p>Unable to load travel packages.</p>';
    if (galleryGrid) galleryGrid.innerHTML =
      '<p>Unable to load gallery.</p>';
  });

