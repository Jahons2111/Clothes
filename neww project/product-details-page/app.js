
  const thumbs = document.querySelectorAll('.gallery-thumbs img');
  const mainImg = document.querySelector('.gallery-main img');

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', function() {
      mainImg.src = this.src;
   
      thumbs.forEach(t => t.classList.remove('active-thumb'));
      this.classList.add('active-thumb');
    });
  });


const qtyValue = document.querySelector('.qty-value');
const minusBtn = document.querySelectorAll('.qty-btn')[0];
const plusBtn = document.querySelectorAll('.qty-btn')[1];
const addToCartBtn = document.querySelector('.add-to-cart-btn');

minusBtn.addEventListener('click', () => {
  let val = parseInt(qtyValue.textContent, 10);
  if (val > 1) qtyValue.textContent = val - 1;
});

plusBtn.addEventListener('click', () => {
  let val = parseInt(qtyValue.textContent, 10);
  qtyValue.textContent = val + 1;
});

addToCartBtn.addEventListener('click', () => {
  const count = parseInt(qtyValue.textContent, 10);

  const product = {
    id: 'one-life-graphic-tshirt',
    name: 'ONE LIFE GRAPHIC T-SHIRT',
    price: 260,
    quantity: count,
    image: document.querySelector('.gallery-main img').src
  };


  let cart = JSON.parse(localStorage.getItem('cart')) || [];


  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += count;
  } else {
    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));

  
  alert(`${count} ta mahsulot savatga qo'shildi!`);
});





function renderStars(starCount) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (starCount >= i) {
      html += `<img src="img/star 1.svg" alt="star" />`;
    } else if (starCount > i - 1) {
      html += `<img src="img/star 5.svg" alt="half star" />`;
    } else {
      html += `<img src="img/star 2.svg" alt="empty star" />`;
    }
  }
  return html;
}


function renderReviews(sort = "latest") {
  let sorted = [...reviews];
  if (sort === "latest") {
    sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (sort === "oldest") {
    sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
  }
  return `
    <div class="reviews-list">
      ${sorted.map(r => `
        <div class="review-card">
          <div class="review-header">
            <span class="review-author">${r.author} <span class="verified">✔</span></span>
            <span class="review-stars">${renderStars(r.stars)}</span>
          </div>
          <p class="review-text">"${r.text}"</p>
          <div class="review-date">Posted on ${r.date}</div>
        </div>
      `).join('')}
    </div>
    <button class="load-more-reviews-btn">Load More Reviews</button>
  `;
}


function renderTabs(sort = "latest") {
  return `
    <div class="tabs-header">
      <button class="tab-btn">Product Details</button>
      <button class="tab-btn active">Rating & Reviews</button>
      <button class="tab-btn">FAQs</button>
    </div>
    <div class="reviews-section">
      <div class="reviews-header">
        <h3>All Reviews <span class="reviews-count">(${reviews.length})</span></h3>
        <div class="reviews-actions">
          <select class="reviews-sort">
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
          <button class="write-review-btn">Write a Review</button>
        </div>
      </div>
      <div id="reviews-content">
        ${renderReviews(sort)}
      </div>
    </div>
  `;
}


document.addEventListener('DOMContentLoaded', function() {
  const tabsContainer = document.getElementById('product-tabs');
  if (tabsContainer) {
    tabsContainer.innerHTML = renderTabs();

    const sortSelect = tabsContainer.querySelector('.reviews-sort');
    sortSelect.addEventListener('change', function() {
      const sort = this.value;
      const reviewsContent = tabsContainer.querySelector('#reviews-content');
      reviewsContent.innerHTML = renderReviews(sort);
    });
  }
});