const burger = document.querySelector('.burger')
const navLinks = document.querySelector('.navbar');

burger.onclick = function() {
  document.querySelector('.nav-menu').classList.toggle('active');
  navLinks.classList.toggle('padding');
};






const testimonialsData = [
  {
    name: "Sarah M.",
    stars: 5,
    text: "I'm blown away by the quality and style of the clothes I received from Shopco. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
  },
  {
    name: "Alex K.",
    stars: 5,
    text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shopco. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."
  },
  {
    name: "James L.",
    stars: 5,
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shopco. The selection of clothes is not only diverse but also on-point with the latest trends."
  },
  {
    name: "Moon G.",
    stars: 4,
    text: "Great experience shopping here! Fast delivery and the clothes fit perfectly. Will definitely order again."
  }
  
];

let start = 0;
const cardsToShow = 3;

function renderTestimonials() {
  const container = document.getElementById('testimonials-cards');
  container.innerHTML = '';
  for (let i = 0; i < cardsToShow; i++) {
    const idx = (start + i) % testimonialsData.length;
    const t = testimonialsData[idx];
    container.innerHTML += `
      <div class="testimonial-card">
        <div class="testimonial-stars">${'★'.repeat(t.stars)}${'☆'.repeat(5-t.stars)}</div>
        <div class="testimonial-name">${t.name}</div>
        <div class="testimonial-text">"${t.text}"</div>
      </div>
    `;
  }
}

document.querySelector('.next-btn').onclick = function() {
  start = (start + 1) % testimonialsData.length;
  renderTestimonials();
};
document.querySelector('.prev-btn').onclick = function() {
  start = (start - 1 + testimonialsData.length) % testimonialsData.length;
  renderTestimonials();
};

renderTestimonials();