// Mobile nav toggle
const hamburger = document.querySelector('.navbar-hamburger');
const mobileNav = document.querySelector('.mobile-nav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (mobileNav.classList.contains('open')) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });
}

// Active nav link
const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
document.querySelectorAll('.navbar-nav a').forEach(link => {
  const linkPath = new URL(link.href).pathname.replace(/\/$/, '') || '/';
  if (linkPath === currentPath) link.classList.add('active');
});

// Scroll fade-up animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Contact form submission via Web3Forms
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-submit');
    const successMsg = document.getElementById('form-success');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const data = new FormData(contactForm);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      });
      const result = await response.json();
      if (result.success) {
        contactForm.reset();
        if (successMsg) {
          successMsg.style.display = 'block';
          successMsg.textContent = 'Thank you! Your message has been sent successfully.';
        }
      } else {
        btn.textContent = 'Submit';
        btn.disabled = false;
        alert('Something went wrong. Please try again.');
      }
    } catch {
      btn.textContent = 'Submit';
      btn.disabled = false;
      alert('Something went wrong. Please try again.');
    }
  });
}
