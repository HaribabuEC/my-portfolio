// import './style.css';
// import emailjs from 'emailjs-com';

const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const sections = Array.from(document.querySelectorAll('section'));

function scrollToSection(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const t = link.dataset.target;  
    if (t) {
      scrollToSection(t);
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

// highlight active nav item on scroll
window.addEventListener('scroll', () => {
  const fromTop = window.scrollY + 120;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    const id = sec.id;
    const link = navLinks.find(l => l.dataset.target === id);
    if (!link) return;
    if (fromTop >= top && fromTop < bottom) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

// Download resume
const downloadBtn = document.getElementById('downloadResume');
if (downloadBtn) {
  downloadBtn.addEventListener('click', () => {
    const url = 'Haribabu_resume.pdf';
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Haribabu_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
  });
}

// Contact form
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name')?.value.trim() || '';
    const phone = document.getElementById('phone')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const message = document.getElementById('message')?.value.trim() || '';

    if (!name || !phone || !email || !message) {
      alert('Please fill all required fields');
      return;
    }

    // emailjs.init('iu-XBKWwR145eFgMo');
  //   emailjs.send("service_wyvsikq", "template_1k8pc58", {
  //     name: name,
  //     phone: phone,
  //     email: email,
  //     message: message
  //   })
  //     .then(() => {
  //       alert('Thanks! Your message has been sent.');
  //       contactForm.reset();
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       alert('Something went wrong. Please try again.');
  //     });
  });
}
