const btnMobile = document.getElementById("mobile-menu-btn");
const menuMobile = document.getElementById("mobile-menu");
const header = document.getElementById("header");

btnMobile.addEventListener("click", () => {
  menuMobile.classList.toggle("hidden");
});

document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () =>
    menuMobile.classList.add("hidden")
  );
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("glass", "shadow-lg", "py-2");
    header.classList.remove("py-4", "border-transparent");
  } else {
    header.classList.remove("glass", "shadow-lg", "py-2");
    header.classList.add("py-4", "border-transparent");
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => observer.observe(el));

const filterBtns = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => {
      b.classList.remove(
        "bg-barber-gold",
        "text-barber-black",
        "border-barber-gold"
      );
      b.classList.add("text-gray-400", "border-white/20");
    });
    btn.classList.remove("text-gray-400", "border-white/20");
    btn.classList.add(
      "bg-barber-gold",
      "text-barber-black",
      "border-barber-gold"
    );

    const filterValue = btn.getAttribute("data-filter");

    galleryItems.forEach((item) => {
      if (filterValue === "all" || item.classList.contains(filterValue)) {
        item.style.display = "block";
        setTimeout(() => (item.style.opacity = "1"), 100);
      } else {
        item.style.opacity = "0";
        setTimeout(() => (item.style.display = "none"), 300);
      }
    });
  });
});

// Carrossel Auto-play
const carousel = document.getElementById("gallery-carousel");
if (carousel) {
  let isAutoScrolling = true;
  let scrollPosition = 0;
  let lastScrollPosition = 0;
  let autoPlayTimeout;

  const autoScroll = () => {
    if (isAutoScrolling) {
      scrollPosition += 1;
      carousel.scrollLeft = scrollPosition;

      // Se chegou ao final, volta ao início
      if (scrollPosition >= carousel.scrollWidth - carousel.clientWidth) {
        scrollPosition = 0;
        carousel.scrollLeft = 0;
      }
    }
  };

  // Inicia o autoplay
  const autoPlayInterval = setInterval(autoScroll, 30);

  // Pausa quando o usuário interage com o carrossel
  carousel.addEventListener("mousedown", () => {
    isAutoScrolling = false;
    lastScrollPosition = carousel.scrollLeft;
    clearTimeout(autoPlayTimeout);
  });

  carousel.addEventListener("mousemove", () => {
    isAutoScrolling = false;
  });

  carousel.addEventListener("mouseup", () => {
    // Apenas retoma se o scroll mudou (significando que foi arrastado)
    if (carousel.scrollLeft !== lastScrollPosition) {
      autoPlayTimeout = setTimeout(() => {
        isAutoScrolling = true;
        scrollPosition = carousel.scrollLeft;
      }, 2000);
    } else {
      isAutoScrolling = true;
    }
  });

  carousel.addEventListener("touchstart", () => {
    isAutoScrolling = false;
    lastScrollPosition = carousel.scrollLeft;
    clearTimeout(autoPlayTimeout);
  });

  carousel.addEventListener("touchend", () => {
    autoPlayTimeout = setTimeout(() => {
      isAutoScrolling = true;
      scrollPosition = carousel.scrollLeft;
    }, 2000);
  });

  // Retoma o autoplay quando sai do carrossel
  carousel.addEventListener("mouseleave", () => {
    if (carousel.scrollLeft === lastScrollPosition) {
      isAutoScrolling = true;
    }
  });
}
