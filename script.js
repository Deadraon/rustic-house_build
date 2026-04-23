const menuItems = {
  starters: [
    {
      name: "Smoky Tandoori Paneer Tikka",
      description: "Charred cottage cheese, bell peppers, onion petals and mint chutney.",
      price: "₹279",
    },
    {
      name: "Rustic Loaded Nachos",
      description: "Crisp tortilla chips, cheese sauce, salsa, jalapenos and creamy dip.",
      price: "₹249",
    },
    {
      name: "Crispy Chilli Mushroom",
      description: "Golden fried mushrooms tossed with garlic, chilli and spring onions.",
      price: "₹259",
    },
    {
      name: "Peri Peri Chicken Wings",
      description: "Juicy wings glazed with house peri peri spice and served with ranch.",
      price: "₹349",
    },
    {
      name: "Cheese Corn Cigar Rolls",
      description: "Crisp rolls filled with sweet corn, cheese and herbs.",
      price: "₹239",
    },
    {
      name: "Classic Fries Basket",
      description: "Crispy fries with smoky seasoning and two cafe dips.",
      price: "₹179",
    },
  ],
  main: [
    {
      name: "Woodfire Style Margherita Pizza",
      description: "Fresh basil, mozzarella, tomato sauce and a blistered thin crust.",
      price: "₹329",
    },
    {
      name: "Butter Chicken Bowl",
      description: "Creamy butter chicken with herbed rice, salad and laccha onions.",
      price: "₹399",
    },
    {
      name: "Creamy Alfredo Pasta",
      description: "Penne in parmesan cream sauce with vegetables and garlic toast.",
      price: "₹319",
    },
    {
      name: "Paneer Lababdar Combo",
      description: "Rich paneer curry served with butter naan, rice and pickle.",
      price: "₹349",
    },
    {
      name: "Rustic House Club Sandwich",
      description: "Triple layered sandwich with grilled filling, fries and slaw.",
      price: "₹289",
    },
    {
      name: "Veg Thai Curry Meal",
      description: "Fragrant curry, seasonal vegetables and steamed jasmine rice.",
      price: "₹369",
    },
  ],
  beverages: [
    {
      name: "Caramel Cold Coffee",
      description: "Cafe-style cold coffee finished with caramel drizzle and cream.",
      price: "₹189",
    },
    {
      name: "Blueberry Basil Cooler",
      description: "A refreshing berry cooler with basil, lime and crushed ice.",
      price: "₹199",
    },
    {
      name: "Classic Mojito",
      description: "Mint, lime, soda and a crisp lounge-style finish.",
      price: "₹169",
    },
    {
      name: "Hazelnut Cappuccino",
      description: "Espresso, steamed milk and roasted hazelnut aroma.",
      price: "₹159",
    },
    {
      name: "Virgin Sangria Pitcher",
      description: "Fruit-forward sangria mocktail built for sharing.",
      price: "₹349",
    },
    {
      name: "Masala Lemonade",
      description: "Tangy lemonade with Indian masala, mint and black salt.",
      price: "₹139",
    },
  ],
};

/* ── DOM references ────────────────────────────────────── */
const navbar = document.querySelector("#navbar");
const menuToggle = document.querySelector("#menu-toggle");
const mobileMenu = document.querySelector("#mobile-menu");
const menuGrid = document.querySelector("#menu-grid");
const filterButtons = document.querySelectorAll(".filter-btn");
const scrollProgress = document.querySelector("#scroll-progress");
const backToTop = document.querySelector("#back-to-top");
const preloader = document.querySelector("#preloader");

/* ── Preloader ─────────────────────────────────────────── */
window.addEventListener("load", () => {
  setTimeout(() => {
    preloader.classList.add("loaded");
  }, 800);
});

/* ── Scroll handlers ───────────────────────────────────── */
const handleScroll = () => {
  // Navbar state
  navbar.classList.toggle("scrolled", window.scrollY > 24);

  // Scroll progress
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = scrollPercent + "%";

  // Back to top visibility
  backToTop.classList.toggle("visible", window.scrollY > 500);
};

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

/* ── Back to top ───────────────────────────────────────── */
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ── Mobile menu ───────────────────────────────────────── */
const closeMobileMenu = () => {
  mobileMenu.classList.add("hidden");
  menuToggle.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
};

menuToggle.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("hidden") === false;
  menuToggle.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

/* ── Menu rendering with smooth transition ─────────────── */
const renderMenu = (category) => {
  const items = menuItems[category] ?? menuItems.starters;

  // Fade out existing cards
  menuGrid.style.opacity = "0";
  menuGrid.style.transform = "translateY(12px)";

  setTimeout(() => {
    menuGrid.innerHTML = items
      .map(
        (item, index) => `
        <article class="menu-card" data-reveal style="transition-delay: ${index * 55}ms">
          <div class="relative z-10 flex items-start justify-between gap-4">
            <h3>${item.name}</h3>
            <span class="menu-price">${item.price}</span>
          </div>
          <p class="relative z-10">${item.description}</p>
        </article>
      `
      )
      .join("");

    observeRevealItems();

    // Fade in
    requestAnimationFrame(() => {
      menuGrid.style.transition = "opacity 400ms ease, transform 400ms ease";
      menuGrid.style.opacity = "1";
      menuGrid.style.transform = "translateY(0)";
    });
  }, 200);
};

/* ── Intersection Observer for reveal animations ───────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    rootMargin: "0px 0px -80px 0px",
    threshold: 0.1,
  }
);

const observeRevealItems = () => {
  const revealItems = document.querySelectorAll("[data-reveal]:not(.is-observed)");
  revealItems.forEach((item) => {
    item.classList.add("is-observed");
    revealObserver.observe(item);
  });
};

/* ── Filter buttons ────────────────────────────────────── */
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderMenu(button.dataset.category);
  });
});

/* ── Init ──────────────────────────────────────────────── */
document.querySelector("#year").textContent = new Date().getFullYear();
renderMenu("starters");
observeRevealItems();
