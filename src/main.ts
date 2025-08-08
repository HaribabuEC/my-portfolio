import './style.css'
import emailjs from 'emailjs-com';
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

// src/main.ts
const navLinks = Array.from(document.querySelectorAll('.nav-link')) as HTMLElement[];
const sections = Array.from(document.querySelectorAll('section')) as HTMLElement[];

function scrollToSection(targetId: string) {
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

// Download resume (example: resume.pdf in /public/assets)
const downloadBtn = document.getElementById('downloadResume');
if (downloadBtn) {
  downloadBtn.addEventListener('click', () => {
    const url = 'Haribabu_resume.pdf'; // put your PDF in public/assets/resume.pdf
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Haribabu_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
  });
}

// Contact form basic validation (demo only)
const contactForm = document.getElementById('contactForm') as HTMLFormElement | null;

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = (document.getElementById('name') as HTMLInputElement).value.trim();
    const phone = (document.getElementById('phone') as HTMLInputElement).value.trim();
    const email = (document.getElementById('email') as HTMLInputElement).value.trim();
    const message = (document.getElementById('message') as HTMLTextAreaElement).value.trim();

    if (!name || !phone || !email || !message) {
      alert('Please fill all required fields');
      return;
    }
    emailjs.init('iu-XBKWwR145eFgMo');
    emailjs.send("service_wyvsikq", "template_1k8pc58", {
      name: name,
      phone: phone,
      email: email,
      message: message
    })
      .then(() => {
        alert('Thanks! Your message has been sent.');
        contactForm.reset();
      })
      .catch((err: any) => {
        console.error(err);
        alert('Something went wrong. Please try again.');
      });
  });
}




