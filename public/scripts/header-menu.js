const toggleButton = document.querySelector(".menu-toggle");
const closeButton = document.querySelector(".close-menu");
const menuOverlay = document.getElementById("site-menu");
const navLinks = document.querySelectorAll(".overlay-nav-list a");

if (toggleButton && closeButton && menuOverlay) {
  toggleButton.addEventListener("click", () => {
    const isActive = menuOverlay.classList.toggle("active");
    menuOverlay.setAttribute("aria-hidden", String(!isActive));
    toggleButton.setAttribute("aria-expanded", String(isActive));
    document.body.style.overflow = isActive ? "hidden" : "";
    if (isActive) navLinks[0]?.focus();
  });

  const close = () => {
    menuOverlay.classList.remove("active");
    menuOverlay.setAttribute("aria-hidden", "true");
    toggleButton.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    toggleButton.focus();
  };

  closeButton.addEventListener("click", close);
  navLinks.forEach(link => link.addEventListener("click", close));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && menuOverlay.classList.contains("active")) close();
  });
}
