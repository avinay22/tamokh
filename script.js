// ==========================================================================
// TAMOKH — Contemporary Fashion for Everyone (Gogamukh, Assam)
// Interactive Script: Real-Time Store Status, Navigation & Lightbox
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Footer Year
  const yearEl = document.getElementById('currentYearVal');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Drawer Navigation & Touch Gestures
  const drawerTrigger = document.getElementById('drawerTrigger');
  const drawerDismissBtn = document.getElementById('drawerDismissBtn');
  const drawerBackdrop = document.getElementById('drawerDismissBackdrop');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerPanel = mobileDrawer ? mobileDrawer.querySelector('.drawer-panel') : null;
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }

  if (drawerTrigger) drawerTrigger.addEventListener('click', openDrawer);
  if (drawerDismissBtn) drawerDismissBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Touch Swipe-to-Close gesture for mobile drawer
  if (drawerPanel) {
    let startX = 0;
    let currentX = 0;

    drawerPanel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      currentX = startX;
    }, { passive: true });

    drawerPanel.addEventListener('touchmove', (e) => {
      currentX = e.touches[0].clientX;
    }, { passive: true });

    drawerPanel.addEventListener('touchend', () => {
      // Swiping to the right (towards screen edge) closes drawer
      if (currentX - startX > 60) {
        closeDrawer();
      }
    });
  }

  // 3. Real-Time IST Store Status Calculator (Gogamukh, Assam)
  updateISTStoreStatus();
  // Check every minute
  setInterval(updateISTStoreStatus, 60000);
});

// Enable interactive map after user taps map overlay
function enableMapInteraction() {
  const scrim = document.getElementById('mapTouchScrim');
  if (scrim) {
    scrim.classList.add('scrim-disabled');
  }
}

// Full Screen Lightbox Modal
function openPhotoModal(imgSrc, captionText) {
  const modal = document.getElementById('photoLightboxModal');
  const img = document.getElementById('lightboxModalImg');
  const caption = document.getElementById('lightboxModalCaption');

  if (!modal || !img || !caption) return;

  img.src = imgSrc;
  caption.textContent = captionText || 'TAMOKH Flagship Experience';
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
}

function closePhotoModal() {
  const modal = document.getElementById('photoLightboxModal');
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePhotoModal();
  }
});

// Copy Store Address with visual feedback
function copyStoreAddress(btn) {
  const address = "TAMOKH, Saikia Market, E & D Road, Gogamukh, Lakhimpur / Dhemaji, Assam - 787034";
  navigator.clipboard.writeText(address).then(() => {
    const originalHtml = btn.innerHTML;
    btn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ba482e" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span style="color:#ba482e; font-weight: 700;">Address Copied!</span>
    `;
    setTimeout(() => {
      btn.innerHTML = originalHtml;
    }, 2500);
  }).catch(() => {
    alert("Address: " + address);
  });
}

// Calculate live store status in Assam (IST)
function updateISTStoreStatus() {
  const headlineEl = document.getElementById('liveStatusHeadline');
  const subEl = document.getElementById('liveStatusSub');
  const container = document.getElementById('liveStoreStatus');

  if (!headlineEl || !subEl || !container) return;

  // Calculate current IST time (UTC + 5:30)
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(utc + istOffset);

  const day = istDate.getDay(); // 0 is Sunday, 6 is Saturday
  const hour = istDate.getHours();
  const minute = istDate.getMinutes();
  const timeDec = hour + (minute / 60);

  const dot = container.querySelector('.live-dot-pulse');

  // Hours: Mon-Fri & Sun: 8:30 AM to 9:00 PM (8.5 to 21.0)
  const isOpen = (timeDec >= 8.5 && timeDec < 21.0);

  if (day === 6) {
    // Saturday: check / call before visiting
    headlineEl.textContent = "Saturday Store Hours";
    headlineEl.style.color = "#ba482e";
    subEl.textContent = "Please WhatsApp or call +91 81955 35500 before visiting today";
    if (dot) {
      dot.style.background = "#ba482e";
    }
  } else if (isOpen) {
    headlineEl.textContent = "Store Open Now";
    headlineEl.style.color = "#ba482e";
    subEl.textContent = "Saikia Market, Gogamukh • Closing at 9:00 PM IST";
    if (dot) {
      dot.style.background = "#ba482e";
    }
  } else {
    headlineEl.textContent = "Store Closed for the Night";
    headlineEl.style.color = "#6e655c";
    subEl.textContent = "Opens tomorrow at 8:30 AM • WhatsApp enquiries always welcome";
    if (dot) {
      dot.style.background = "#998f84";
    }
  }
}
