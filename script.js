// AMK-one website - alles werkt zonder internet of extra installatie
const products = [
  {
    title: 'Streetwear kleding',
    category: 'streetwear kleding outfits fashion hoodie broek t-shirt',
    description: 'Trendy outfits voor jongeren en jongvolwassenen.',
    price: 'Vanaf €24,99'
  },
  {
    title: 'Sneakers',
    category: 'sneakers schoenen sport casual nike adidas modellen',
    description: 'Populaire modellen met focus op prijs-kwaliteit.',
    price: 'Vanaf €39,99'
  },
  {
    title: 'Accessoires',
    category: 'accessoires tas horloge zonnebril rugzak pet ketting',
    description: 'Praktische items voor dagelijks gebruik.',
    price: 'Vanaf €9,99'
  }
];

function scrollToSection(selector){
  const section = document.querySelector(selector);
  if(section){ section.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
}

function showMessage(text){
  const box = document.querySelector('#messageBox');
  if(!box){ alert(text); return; }
  box.textContent = text;
  box.classList.add('show');
  setTimeout(()=> box.classList.remove('show'), 3500);
}

function openDeal(index){
  const product = products[index];
  const detail = document.querySelector('#dealDetails');
  const title = document.querySelector('#dealTitle');
  const text = document.querySelector('#dealText');
  if(product && detail && title && text){
    title.textContent = product.title;
    text.textContent = `${product.description} ${product.price}. Klik op contact om een bestelling of vraag te sturen.`;
    detail.style.display = 'block';
    scrollToSection('#dealDetails');
    showMessage(`${product.title} geopend ✅`);
  }
}

function runSearch(){
  const input = document.querySelector('#searchInput');
  const q = (input?.value || '').trim().toLowerCase();
  const cards = document.querySelectorAll('.item');
  const noResult = document.querySelector('#noResult');
  let visible = 0;

  cards.forEach((card, i)=>{
    const product = products[i];
    const text = `${product.title} ${product.category} ${product.description}`.toLowerCase();
    const match = q === '' || text.includes(q);
    card.style.display = match ? 'block' : 'none';
    if(match) visible++;
  });

  if(noResult) noResult.style.display = visible ? 'none' : 'block';
  scrollToSection('#deals');
}

// Start wanneer de pagina geladen is
window.addEventListener('DOMContentLoaded', ()=>{
  // navigatieknoppen
  document.querySelectorAll('a[href^="#"]').forEach(link=>{
    link.addEventListener('click', e=>{
      const target = link.getAttribute('href');
      if(target && target.length > 1){
        e.preventDefault();
        scrollToSection(target);
      }
    });
  });

  // deal-knoppen
  document.querySelectorAll('.deal-btn').forEach(button=>{
    button.addEventListener('click', ()=>{
      openDeal(Number(button.dataset.product));
    });
  });

  // zoekbalk + zoekknop
  const input = document.querySelector('#searchInput');
  const searchBtn = document.querySelector('#searchBtn');
  if(input){
    input.addEventListener('input', runSearch);
    input.addEventListener('keydown', e=>{
      if(e.key === 'Enter'){
        e.preventDefault();
        runSearch();
      }
    });
  }
  if(searchBtn){ searchBtn.addEventListener('click', runSearch); }

  // categorieknoppen
  document.querySelectorAll('.category-menu a').forEach(link=>{
    link.addEventListener('click', e=>{
      e.preventDefault();
      const text = link.textContent.toLowerCase();
      if(input){
        if(text.includes('streetwear')) input.value = 'streetwear';
        else if(text.includes('sneakers')) input.value = 'sneakers';
        else if(text.includes('accessoires')) input.value = 'accessoires';
        else if(text.includes('kortingen')) input.value = '';
        else input.value = '';
      }
      runSearch();
    });
  });

  // nieuwsbrief
  const news = document.querySelector('.newsletter form');
  if(news){
    news.addEventListener('submit', e=>{
      e.preventDefault();
      showMessage('Bedankt! Je bent ingeschreven voor AMK-one Club ✅');
      news.reset();
    });
  }

  // contactformulier
  const contact = document.querySelector('.contact-form');
  if(contact){
    contact.addEventListener('submit', e=>{
      e.preventDefault();
      showMessage('Bericht verzonden ✅ AMK-one neemt zo snel mogelijk contact op.');
      contact.reset();
    });
  }


// fallback voor oude browsers / directe HTML onclick
window.openDeal = openDeal;
window.runSearch = runSearch;


// Cookie banner
window.addEventListener('DOMContentLoaded', ()=>{
  const banner=document.getElementById('cookieBanner');
  const btn=document.getElementById('acceptCookies');
  if(!localStorage.getItem('cookiesAccepted') && banner){
    setTimeout(()=>banner.classList.add('show'),300);
  }
  if(btn){
    btn.addEventListener('click', ()=>{
      localStorage.setItem('cookiesAccepted','true');
      banner.classList.remove('show');
    });
  }
});
