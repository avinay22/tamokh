// ==========================================================================
// TAMOKH — Contemporary Men's Fashion Brand (Gogamukh, Assam)
// Mobile-First App Script
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Footer Year
  const yearEl = document.getElementById('yearVal');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Drawer Navigation
  const drawerTrigger = document.getElementById('drawerTrigger');
  const drawerDismiss = document.getElementById('drawerDismiss');
  const drawerScrim = document.getElementById('drawerScrim');
  const sideDrawer = document.getElementById('sideDrawer');
  const sheetItems = document.querySelectorAll('.sheet-item');

  function openDrawer() {
    if (sideDrawer) {
      sideDrawer.classList.add('open');
      sideDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (sideDrawer) {
      sideDrawer.classList.remove('open');
      sideDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (drawerTrigger) drawerTrigger.addEventListener('click', openDrawer);
  if (drawerDismiss) drawerDismiss.addEventListener('click', closeDrawer);
  if (drawerScrim) drawerScrim.addEventListener('click', closeDrawer);

  sheetItems.forEach(item => {
    item.addEventListener('click', closeDrawer);
  });

  // 3. Category Style Filter Chips
  const styleChips = document.querySelectorAll('.style-chip');
  const outfitCards = document.querySelectorAll('.mobile-outfit-card');
  const carousel = document.getElementById('arrivalsCarousel');

  styleChips.forEach(chip => {
    chip.addEventListener('click', () => {
      styleChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filterVal = chip.getAttribute('data-filter');

      outfitCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });

      // Scroll carousel to start
      if (carousel) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
      }
    });
  });

  // 4. Real-Time IST Store Status Calculator (Gogamukh, Assam)
  calculateISTStoreStatus();
});

// Full Screen Lightbox for Lookbook
function openFullPhoto(imgSrc, captionText) {
  const modal = document.getElementById('photoLightbox');
  const img = document.getElementById('lightboxActivePhoto');
  const caption = document.getElementById('lightboxCaptionText');

  if (!modal || !img || !caption) return;

  img.src = imgSrc;
  caption.textContent = captionText || 'TAMOKH Official Streetwear Lookbook';
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeFullPhoto() {
  const modal = document.getElementById('photoLightbox');
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeFullPhoto();
  }
});

// Copy Store Address with visual feedback
function copyStoreAddress(btn) {
  const address = "TAMOKH, Saikia Market, E & D Road, Gogamukh, Lakhimpur / Dhemaji, Assam - 787034";
  navigator.clipboard.writeText(address).then(() => {
    const originalHtml = btn.innerHTML;
    btn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span style="color:#10b981;">Copied!</span>
    `;
    setTimeout(() => {
      btn.innerHTML = originalHtml;
    }, 2500);
  }).catch(() => {
    alert("Address: " + address);
  });
}

// Calculate live store status in Assam (IST)
function calculateISTStoreStatus() {
  const headEl = document.getElementById('clockStatusHead');
  const subEl = document.getElementById('clockStatusSub');
  const card = document.getElementById('liveClockCard');

  if (!headEl || !subEl || !card) return;

  // Calculate current IST time
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(utc + istOffset);

  const day = istDate.getDay(); // 0 is Sunday, 6 is Saturday
  const hour = istDate.getHours();
  const minute = istDate.getMinutes();
  const timeDec = hour + (minute / 60);

  const dot = card.querySelector('.clock-live-dot');

  // Mon-Fri & Sun: 8:30 AM to 9:00 PM (8.5 to 21.0)
  const isOpen = (timeDec >= 8.5 && timeDec < 21.0);

  if (day === 6) {
    headEl.textContent = "Store Open for Special Inquiries";
    subEl.textContent = "Saturday Hours &bull; Call before visiting";
    if (dot) dot.style.backgroundColor = "#f59e0b";
  } else if (isOpen) {
    headEl.textContent = "Store Open Now (Saikia Market)";
    subEl.textContent = "Closes at 9:00 PM tonight &bull; Apunaluke welcome";
    if (dot) dot.style.backgroundColor = "#10b981";
  } else {
    headEl.textContent = "Store Closed Now";
    subEl.textContent = "Opens at 8:30 AM &bull; Saikia Market, Gogamukh";
    if (dot) dot.style.backgroundColor = "#ef4444";
  }
}
