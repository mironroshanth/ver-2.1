// Shared UI behaviors (nav/sidebar)
(function () {
  function getSidebar() {
    return document.getElementById("mySidebar");
  }

  function isOpen(sidebar) {
    return sidebar && sidebar.style.width && sidebar.style.width !== "0px";
  }

  window.openNav = function openNav() {
    const sidebar = getSidebar();
    if (!sidebar) return;
    sidebar.style.width = "280px";
    sidebar.setAttribute("aria-hidden", "false");
    document.documentElement.style.overflow = "hidden";
  };

  window.closeNav = function closeNav() {
    const sidebar = getSidebar();
    if (!sidebar) return;
    sidebar.style.width = "0";
    sidebar.setAttribute("aria-hidden", "true");
    document.documentElement.style.overflow = "";
  };

  // Close on Escape, and when clicking outside of sidebar.
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const sidebar = getSidebar();
    if (sidebar && isOpen(sidebar)) window.closeNav();
  });

  document.addEventListener("click", (e) => {
    const sidebar = getSidebar();
    if (!sidebar || !isOpen(sidebar)) return;
    const target = e.target;
    if (!(target instanceof Element)) return;
    const clickedMenuIcon = !!target.closest(".menu-icon");
    const clickedInsideSidebar = !!target.closest("#mySidebar");
    if (!clickedMenuIcon && !clickedInsideSidebar) window.closeNav();
  });
})();
(function() {
  if (document.getElementById('temperature-info-container')) return;
  const html = `
  <section id="temperature-info-container" class="temp-info-container" aria-labelledby="temp-info-title">
    <div class="temp-info-inner">
      <h2 id="temp-info-title">Temperature Chart</h2>
      <div class="temp-info-text">
        <p>This section provides information about the Temperature Chart topic. Replace this text with a short summary or link to the chart file if needed.</p>
      </div>
      <div class="temp-contact">
        <strong>Contact</strong>
        <p>Email: <a href="mailto:info@example.com">info@example.com</a></p>
        <p>Phone: <a href="tel:+94123456789">+94 12 345 6789</a></p>
        <p>Office: 123 Main Street, Hammillewa</p>
      </div>
    </div>
  </section>`;
  document.body.insertAdjacentHTML('beforeend', html);
})();

