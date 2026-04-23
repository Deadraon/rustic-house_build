/* ── Menu Data ── */
const items = {
  starters: [
    { name: "Smoky Tandoori Paneer Tikka", desc: "Charred cottage cheese, bell peppers, onion petals and mint chutney.", price: "₹279", pop: true },
    { name: "Rustic Loaded Nachos", desc: "Crisp tortilla chips, cheese sauce, salsa, jalapenos and creamy dip.", price: "₹249" },
    { name: "Crispy Chilli Mushroom", desc: "Golden fried mushrooms tossed with garlic, chilli and spring onions.", price: "₹259" },
    { name: "Peri Peri Chicken Wings", desc: "Juicy wings glazed with house peri peri spice and served with ranch.", price: "₹349", pop: true },
    { name: "Cheese Corn Cigar Rolls", desc: "Crisp rolls filled with sweet corn, cheese and herbs.", price: "₹239" },
    { name: "Classic Fries Basket", desc: "Crispy fries with smoky seasoning and two cafe dips.", price: "₹179" },
  ],
  main: [
    { name: "Woodfire Margherita Pizza", desc: "Fresh basil, mozzarella, tomato sauce and a blistered thin crust.", price: "₹329", pop: true },
    { name: "Butter Chicken Bowl", desc: "Creamy butter chicken with herbed rice, salad and laccha onions.", price: "₹399", pop: true },
    { name: "Creamy Alfredo Pasta", desc: "Penne in parmesan cream sauce with vegetables and garlic toast.", price: "₹319" },
    { name: "Paneer Lababdar Combo", desc: "Rich paneer curry served with butter naan, rice and pickle.", price: "₹349" },
    { name: "Rustic House Club Sandwich", desc: "Triple layered sandwich with grilled filling, fries and slaw.", price: "₹289" },
    { name: "Veg Thai Curry Meal", desc: "Fragrant curry, seasonal vegetables and steamed jasmine rice.", price: "₹369" },
  ],
  beverages: [
    { name: "Caramel Cold Coffee", desc: "Cafe-style cold coffee finished with caramel drizzle and cream.", price: "₹189", pop: true },
    { name: "Blueberry Basil Cooler", desc: "A refreshing berry cooler with basil, lime and crushed ice.", price: "₹199" },
    { name: "Classic Mojito", desc: "Mint, lime, soda and a crisp lounge-style finish.", price: "₹169" },
    { name: "Hazelnut Cappuccino", desc: "Espresso, steamed milk and roasted hazelnut aroma.", price: "₹159", pop: true },
    { name: "Virgin Sangria Pitcher", desc: "Fruit-forward sangria mocktail built for sharing.", price: "₹349" },
    { name: "Masala Lemonade", desc: "Tangy lemonade with Indian masala, mint and black salt.", price: "₹139" },
  ],
};

/* ── DOM Elements ── */
const nav = document.querySelector("#nav");
const ham = document.querySelector("#ham");
const mob = document.querySelector("#mob-menu");
const mobOverlay = document.querySelector("#mob-overlay");
const mobClose = document.querySelector("#mob-close");
const waFloat = document.querySelector("#wa-float");
const mgrid = document.querySelector("#mgrid");
const prog = document.querySelector("#prog");
const btt = document.querySelector("#btt");
const pl = document.querySelector("#pl");
const heroEl = document.querySelector("#hero");

/* ── Preloader ── */
window.addEventListener("load", () => {
  setTimeout(() => { 
    pl.classList.add("out"); 
    heroEl.classList.add("ready"); 
  }, 800);
});

/* ── Floating WA: show only when hero is NOT visible ── */
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (waFloat) waFloat.classList.toggle("visible", !e.isIntersecting);
  });
}, { threshold: 0.2 });
heroObserver.observe(heroEl);

/* ── Scroll Interactions ── */
window.addEventListener("scroll", () => {
  const sy = window.scrollY;
  const dh = document.documentElement.scrollHeight - window.innerHeight;
  
  // Navbar glassmorphism effect
  nav.classList.toggle("scrolled", sy > 50);
  
  // Progress bar
  if (dh > 0) {
    prog.style.width = ((sy / dh) * 100) + "%";
  }
  
  // Back to top button
  btt.classList.toggle("on", sy > 600);
}, { passive: true });

/* ── Mobile Nav ── */
const toggleMenu = (forceClose = false) => {
  if (forceClose) {
    ham.classList.remove("open");
    mob.classList.remove("open");
    if (mobOverlay) mobOverlay.classList.remove("open");
    document.body.classList.remove("menu-open");
    return;
  }
  const open = ham.classList.toggle("open");
  mob.classList.toggle("open", open);
  if (mobOverlay) mobOverlay.classList.toggle("open", open);
  document.body.classList.toggle("menu-open", open);
};

ham.addEventListener("click", () => toggleMenu());
if (mobClose) mobClose.addEventListener("click", () => toggleMenu(true));
if (mobOverlay) mobOverlay.addEventListener("click", () => toggleMenu(true));

mob.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => toggleMenu(true));
});

/* ── Back to Top ── */
btt.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ── Intersection Observer (Reveal Animations) ── */
const ro = new IntersectionObserver((entries) => {
  entries.forEach(e => { 
    if (e.isIntersecting) { 
      e.target.classList.add("on"); 
      ro.unobserve(e.target); 
    } 
  });
}, { rootMargin: "0px 0px -100px 0px", threshold: 0.1 });

const observe = () => {
  document.querySelectorAll("[data-r]:not(.watched)").forEach(el => {
    el.classList.add("watched");
    ro.observe(el);
  });
};

/* ── Menu Rendering ── */
const render = (cat) => {
  mgrid.classList.add("fade");
  
  setTimeout(() => {
    const categoryItems = items[cat] || items.starters;
    mgrid.innerHTML = categoryItems.map((it, i) => `
      <article class="mcard" style="transition-delay:${i * 50}ms">
        <div class="mcard-top">
          <h3>
            ${it.name}
            ${it.pop ? '<span class="pop-badge">Popular</span>' : ''}
          </h3>
          <span class="mprice">${it.price}</span>
        </div>
        <div class="mdivider"></div>
        <p>${it.desc}</p>
      </article>
    `).join("");
    
    mgrid.classList.remove("fade");
    observe();
  }, 400); // Wait for fade out
};

document.querySelectorAll(".ftab").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("on")) return;
    
    document.querySelectorAll(".ftab").forEach(b => b.classList.remove("on"));
    btn.classList.add("on");
    render(btn.dataset.cat);
  });
});

/* ── Initialization ── */
document.querySelector("#yr").textContent = new Date().getFullYear();
render("starters");
observe();
