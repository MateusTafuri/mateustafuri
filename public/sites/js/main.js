/**
 * Mateus Web Sites - Main Interactive Scripts
 * Pure Vanilla JavaScript (No Frameworks, Hosting Ready)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Controle do Cabeçalho Fixo ao Rolar
  const header = document.querySelector('.site-header');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Menu Mobile (Hambúrguer)
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Fechar menu ao clicar em qualquer link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Fechar ao clicar fora do menu
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 3. FAQ Accordion Interativo
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item, index) => {
    const trigger = item.querySelector('.faq-trigger');
    const icon = item.querySelector('.faq-icon');

    if (trigger) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Opcional: fechar outros itens para comportamento sanfona limpo
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherIcon = otherItem.querySelector('.faq-icon');
            if (otherIcon) otherIcon.textContent = '+';
            const otherTrigger = otherItem.querySelector('.faq-trigger');
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
          }
        });

        // Alternar item clicado
        if (isActive) {
          item.classList.remove('active');
          if (icon) icon.textContent = '+';
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          if (icon) icon.textContent = '−';
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // 4. ScrollSpy: Destacar link ativo conforme a rolagem da página
  const sections = document.querySelectorAll('section[id], header[id]');
  const observeScrollSpy = () => {
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', observeScrollSpy, { passive: true });

  // 5. Suavização de Rolagem para Âncoras
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Preferências do usuário
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  // 6. Revelação no scroll (só esconde o que está abaixo da dobra → sem flash)
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const revealSel = '.section-header-center, .about-info, .about-showcase, .about-cta, ' +
      '.bento-cell, .journey-step, .guarantee-ribbon, .portfolio-card, ' +
      '.portfolio-footer-callout, .service-card, .faq-item, .process-cta-banner';
    const els = Array.from(document.querySelectorAll(revealSel));
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    const foldLine = window.innerHeight * 0.85;
    els.forEach(el => {
      if (el.getBoundingClientRect().top > foldLine) {
        const sibs = Array.from(el.parentNode.children).filter(c => els.includes(c));
        const idx = sibs.indexOf(el);
        if (idx > 0) el.style.setProperty('--rd', Math.min(idx, 6) * 65 + 'ms');
        el.classList.add('reveal-hidden');
        io.observe(el);
      }
    });
  }

  // 7. Hero reativo ao cursor (brilho que segue + parallax da aurora)
  const heroWrap = document.querySelector('.hero-wrapper');
  const aurora = document.querySelector('.hero-aurora');
  if (heroWrap && finePointer && !reduceMotion) {
    heroWrap.addEventListener('pointermove', (ev) => {
      const r = heroWrap.getBoundingClientRect();
      const x = ev.clientX - r.left;
      const y = ev.clientY - r.top;
      const nx = x / r.width - 0.5;
      const ny = y / r.height - 0.5;
      heroWrap.style.setProperty('--gx', x + 'px');
      heroWrap.style.setProperty('--gy', y + 'px');
      if (aurora) {
        aurora.style.setProperty('--ax', (nx * 18).toFixed(1) + 'px');
        aurora.style.setProperty('--ay', (ny * 12).toFixed(1) + 'px');
      }
    });
    heroWrap.addEventListener('pointerenter', () => heroWrap.classList.add('cursor-active'));
    heroWrap.addEventListener('pointerleave', () => {
      heroWrap.classList.remove('cursor-active');
      if (aurora) {
        aurora.style.setProperty('--ax', '0px');
        aurora.style.setProperty('--ay', '0px');
      }
    });
  }

  // 8. Botões magnéticos (CTAs em pílula)
  if (finePointer && !reduceMotion) {
    document.querySelectorAll('.btn-pill').forEach(btn => {
      btn.addEventListener('pointermove', (ev) => {
        const r = btn.getBoundingClientRect();
        const x = ev.clientX - (r.left + r.width / 2);
        const y = ev.clientY - (r.top + r.height / 2);
        btn.style.transform = 'translate(' + (x * 0.3).toFixed(1) + 'px,' + (y * 0.3).toFixed(1) + 'px)';
      });
      btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
    });
  }

  // 9. Jornada do processo: a linha se desenha e os marcos acendem conforme o scroll
  const journey = document.querySelector('[data-journey]');
  if (journey) {
    const steps = Array.from(journey.querySelectorAll('.journey-step'));
    const n = steps.length;
    const updateJourney = () => {
      const r = journey.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.82;
      const span = r.height * 0.72 + vh * 0.15;
      let p = (start - r.top) / span;
      p = Math.max(0, Math.min(1, p));
      journey.style.setProperty('--progress', p.toFixed(3));
      steps.forEach((s, i) => {
        const th = n > 1 ? (i / (n - 1)) * 0.92 : 0;
        s.classList.toggle('is-active', p >= th);
      });
    };
    if (reduceMotion) {
      journey.style.setProperty('--progress', '1');
      steps.forEach(s => s.classList.add('is-active'));
    } else {
      let ticking = false;
      const onJourneyScroll = () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(() => { updateJourney(); ticking = false; });
        }
      };
      window.addEventListener('scroll', onJourneyScroll, { passive: true });
      window.addEventListener('resize', onJourneyScroll, { passive: true });
      updateJourney();
    }
  }

  // 10. Portfólio: torna a imagem clicável (mesmo destino do "Ver Detalhes")
  document.querySelectorAll('.portfolio-card').forEach(card => {
    const link = card.querySelector('.portfolio-link');
    const imgCard = card.querySelector('.portfolio-image-card');
    if (link && imgCard && imgCard.tagName !== 'A' && !imgCard.closest('a')) {
      const a = document.createElement('a');
      a.href = link.href;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.className = 'portfolio-image-link';
      const type = card.querySelector('.portfolio-type');
      a.setAttribute('aria-label', 'Abrir o site: ' + (type ? type.textContent.trim() : 'projeto'));
      imgCard.parentNode.insertBefore(a, imgCard);
      a.appendChild(imgCard);
    }
  });
});
