// main.js
// Small helpers: theme toggle, smooth scroll, contact form (EmailJS)

// --- Theme toggle (dark / light) ---
const themeToggle = document.getElementById('theme-toggle');
const stored = localStorage.getItem('theme');
if (stored === 'light') document.body.classList.add('light');

themeToggle?.addEventListener('click', ()=> {
  document.body.classList.toggle('light');
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
});

// --- Year ---
document.getElementById('year').textContent = new Date().getFullYear();

// --- Mobile menu (simple) ---
const hamb = document.querySelector('.hamburger');
hamb?.addEventListener('click', ()=> {
  document.body.classList.toggle('menu-open');
  // In this simple static version we don't implement a full nav drawer
});

// --- Smooth scroll for internal links ---
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e){
    const href = this.getAttribute('href');
    if (href.length > 1){
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

// --- Contact form using EmailJS ---
// Instructions: sign up at emailjs.com, create an email service + template.
// Replace the placeholders below: YOUR_EMAILJS_USER_ID, YOUR_SERVICE_ID, YOUR_TEMPLATE_ID

(function(){
  // load EmailJS SDK dynamically
  const script = document.createElement('script');
  script.src = "https://cdn.emailjs.com/sdk/3.2.0/email.min.js";
  script.onload = ()=>{
    if(window.emailjs){
      // init: replace with your user ID
      emailjs.init('YOUR_EMAILJS_USER_ID');
    }
  };
  document.head.appendChild(script);
})();

const form = document.getElementById('contact-form');
const statusElm = document.getElementById('form-status');

form?.addEventListener('submit', function(e){
  e.preventDefault();
  statusElm.textContent = 'Sending...';

  // collect form data
  const templateParams = {
    from_name: form.from_name.value,
    reply_to: form.reply_to.value,
    message: form.message.value,
  };

  // Replace serviceID and templateID with your EmailJS values
  const serviceID = 'YOUR_SERVICE_ID';
  const templateID = 'YOUR_TEMPLATE_ID';

  if(!window.emailjs){
    statusElm.textContent = 'Email service not loaded. Check your internet connection.';
    return;
  }

  emailjs.send(serviceID, templateID, templateParams)
    .then(() => {
      statusElm.textContent = 'Message sent — thank you!';
      form.reset();
    }, (err) => {
      console.error(err);
      statusElm.textContent = 'Failed to send message. Try again later.';
    });
});
