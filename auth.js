// =============================
// 🔐 Web360 - Auth & User Menu
// =============================

// ✅ Validación de sesión
document.addEventListener("DOMContentLoaded", () => {
  const email = localStorage.getItem("currentUserEmail");

  if (!email) {
    // 🚨 No hay sesión → redirigir al login
    window.location.href = "login.html";
  } else {
    // ✅ Mostrar datos de usuario en el menú
    const emailEl = document.getElementById("user-email-display");
    const nameEl = document.getElementById("user-name");

    if (emailEl) emailEl.textContent = email;
    if (nameEl) nameEl.textContent = email.split("@")[0];
  }

  // ✅ Toggle del menú de usuario
  const userMenuBtn = document.getElementById("user-menu-btn");
  const userMenu = document.getElementById("user-menu");

  if (userMenuBtn && userMenu) {
    userMenuBtn.addEventListener("click", () => {
      userMenu.classList.toggle("hidden");
      userMenu.classList.toggle("show");
    });
  }

  // ✅ Logout
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.clear(); // 🔥 Borra la sesión
      window.location.href = "login.html";
    });
  }
});
