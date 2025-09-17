(() => {
  async function injectPartials() {
    const headerTarget = document.getElementById('site-header');
    const footerTarget = document.getElementById('site-footer');
    try {
      if (headerTarget) {
        const res = await fetch('partials/header.html', { cache: 'no-cache' });
        headerTarget.innerHTML = await res.text();
      }
      if (footerTarget) {
        const res = await fetch('partials/footer.html', { cache: 'no-cache' });
        footerTarget.innerHTML = await res.text();
      }

      if (window.feather) feather.replace();

      // Active link highlighting
      const path = location.pathname.split('/').pop() || 'index.html';
      document.querySelectorAll('[data-nav]')?.forEach((el) => {
        const target = el.getAttribute('data-nav');
        if (target === path) {
          el.classList.add('text-blue-700');
          el.classList.add('border-b-2');
          el.classList.add('border-blue-700');
        } else {
          el.classList.remove('border-b-2', 'border-blue-700');
        }
      });

      // Mobile menu toggle
      const button = document.getElementById('mobile-menu-button');
      const mobileMenu = document.getElementById('mobile-menu');
      const menuIcon = document.getElementById('menu-icon');
      if (button && mobileMenu) {
        button.addEventListener('click', () => {
          if (mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.remove('hidden');
            menuIcon?.setAttribute('data-feather', 'x');
          } else {
            mobileMenu.classList.add('hidden');
            menuIcon?.setAttribute('data-feather', 'menu');
          }
          if (window.feather) feather.replace();
        });
      }
    } catch (e) {
      console.error('Partial injection failed', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectPartials);
  } else {
    injectPartials();
  }
})();

