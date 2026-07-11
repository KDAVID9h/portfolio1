/* =========================================================
   Kossi David Hognon — Portfolio
   Shared script for index.html and all sub-pages:
   1) Off-canvas nav drawer (toggle + overlay + escape key)
   2) Media lightbox (image / video / document preview)
   ========================================================= */

(function () {
  var body = document.body;
  var toggle = document.getElementById('navToggle');
  var overlay = document.getElementById('navOverlay');

  function openNav() { body.classList.add('nav-open'); }
  function closeNav() { body.classList.remove('nav-open'); }
  function toggleNav() { body.classList.toggle('nav-open'); }

  if (toggle) toggle.addEventListener('click', toggleNav);
  if (overlay) overlay.addEventListener('click', closeNav);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  // Default: open on desktop-width first load, closed on mobile.
  if (window.innerWidth > 880) openNav();

  // Close the drawer automatically after following an in-page nav link
  // on small screens, so the destination is visible immediately.
  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 880) closeNav();
    });
  });
})();

/* ---------------------------------------------------------
   Lightbox — works with any .media-box that has:
   data-type  = "image" | "video" | "doc"
   data-src   = path to the real file (leave empty for a
                placeholder until you add the actual file)
   data-caption = text shown under the preview
   --------------------------------------------------------- */
(function () {
  var lightbox = document.getElementById('lightbox');
  if (!lightbox) return; // page has no media gallery

  var content = lightbox.querySelector('.lightbox-content');
  var caption = lightbox.querySelector('.lightbox-caption');
  var closeBtn = lightbox.querySelector('.lightbox-close');

  var placeholderIcons = {
    image: '<svg width="56" height="56" viewBox="0 0 24 24" fill="none" class="placeholder-icon"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.4"/><circle cx="8.5" cy="9.5" r="1.5" stroke="currentColor" stroke-width="1.4"/><path d="M21 16l-5.5-5.5L7 19" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    video: '<svg width="56" height="56" viewBox="0 0 24 24" fill="none" class="placeholder-icon"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M10 9l5 3-5 3V9z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
    doc: '<svg width="56" height="56" viewBox="0 0 24 24" fill="none" class="placeholder-icon"><path d="M7 3h7l4 4v14H7V3z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M14 3v4h4" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M9 13h6M9 16h6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>'
  };

  function openLightbox(box) {
    var type = box.dataset.type || 'image';
    var src = box.dataset.src || '';
    var cap = box.dataset.caption || '';

    content.innerHTML = '';
    if (!src) {
      content.innerHTML = placeholderIcons[type] || placeholderIcons.image;
    } else if (type === 'image') {
      content.innerHTML = '<img src="' + src + '" alt="' + cap.replace(/"/g, '&quot;') + '">';
    } else if (type === 'video') {
      content.innerHTML = '<video src="' + src + '" controls autoplay playsinline></video>';
    } else if (type === 'doc') {
      content.innerHTML = '<iframe src="' + src + '" title="' + cap.replace(/"/g, '&quot;') + '"></iframe>';
    }
    caption.textContent = cap;
    lightbox.classList.add('open');
    body.classList.add('lb-open');
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    body.classList.remove('lb-open');
    // stop any playing video when closing
    var video = content.querySelector('video');
    if (video) video.pause();
  }

  document.querySelectorAll('.media-box').forEach(function (box) {
    box.addEventListener('click', function () { openLightbox(box); });
  });
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });
})();
