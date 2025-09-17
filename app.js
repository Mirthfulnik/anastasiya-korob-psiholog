+93
-220

// Фильтрация портфолио и модальное окно
document.addEventListener('DOMContentLoaded', () => {
  const categoryButtons = document.querySelectorAll('.category-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const modal = document.getElementById('videoModal');
  const modalClose = modal.querySelector('.modal-close');

  // Фильтрация работ
  function filterPortfolio(category) {
    portfolioItems.forEach((item) => {
      const itemCategories = item.getAttribute('data-categories');
      const shouldShow = category === 'all' || itemCategories.includes(category);

      item.style.pointerEvents = shouldShow ? 'auto' : 'none';
      item.style.opacity = shouldShow ? '1' : '0';
      item.style.transform = shouldShow ? 'translateY(0)' : 'translateY(20px)';
      item.style.transition = 'opacity 220ms ease, transform 320ms ease';

      if (shouldShow) {
        item.style.display = 'block';
      } else {
        setTimeout(() => {
          item.style.display = 'none';
        }, 220);
      }
    });
  }

  categoryButtons.forEach((button) => {
    button.addEventListener('click', () => {
      categoryButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      const category = button.getAttribute('data-category');
      filterPortfolio(category);
    });
  });

  // Работа модального окна
  const openVideoModal = (event) => {
    event.preventDefault();
    modal.classList.remove('hidden');
    modal.style.opacity = '0';

    requestAnimationFrame(() => {
      modal.style.transition = 'opacity 220ms ease';
      modal.style.opacity = '1';
    });
  };

  const closeVideoModal = () => {
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.classList.add('hidden');
      modal.style.transition = '';
    }, 220);
  };

  portfolioItems.forEach((item) => {
    item.addEventListener('click', openVideoModal);
  });

  modalClose.addEventListener('click', closeVideoModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeVideoModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeVideoModal();
    }
  });

  // Плавный скролл к портфолио
  const heroCta = document.querySelector('.hero-cta');
  if (heroCta) {
    heroCta.addEventListener('click', (event) => {
      event.preventDefault();
      const portfolioSection = document.getElementById('portfolio');
      portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // Небольшая анимация появления секций
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    { threshold: 0.2, rootMargin: '0px 0px -15%' }
  );

  document.querySelectorAll('.portfolio .container, .contact-card').forEach((section) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(35px)';
    section.style.transition = 'opacity 480ms ease, transform 600ms ease';
    observer.observe(section);
  });
});
