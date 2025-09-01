const sunIcon = () => {
    const el = document.createElement("span");
    el.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
      <path fill="currentColor"
        d="M12 18a6 6 0 1 1 0-12a6 6 0 0 1 0 12M11 1h2v3h-2zm0 19h2v3h-2zM3.515 4.929l1.414-1.414L7.05 5.636L5.636 7.05zM16.95 18.364l1.414-1.414l2.121 2.121l-1.414 1.414zm2.121-14.85l1.414 1.415l-2.121 2.121l-1.414-1.414zM5.636 16.95l1.414 1.414l-2.121 2.121l-1.414-1.414zM23 11v2h-3v-2zM4 11v2H1v-2z"/>
    </svg>`;
    return el.firstElementChild;
};
const moonIcon = () => {
    const el = document.createElement("span");
    el.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
      <path fill="currentColor"
        d="M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22C6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981"/>
    </svg>`;
    return el.firstElementChild;
};

const root = document.documentElement;
const btn = document.getElementById('themeToggle');
const saved = localStorage.getItem('theme');

if (saved === 'light') {
    root.setAttribute('data-theme', saved);
    btn.setAttribute('aria-pressed', 'true');
    btn.appendChild(sunIcon());
} else {
    root.setAttribute('data-theme', 'dark');
    btn.appendChild(moonIcon());
    localStorage.setItem('theme', 'dark');
}

btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');

    gsap.to(btn,
        { rotate: 200, duration: 0.5 },
    );

    setTimeout(() => {
        btn.innerHTML = '';

        if (current === 'light') {
            root.setAttribute('data-theme', 'dark');
            btn.appendChild(moonIcon());
        } else {
            root.setAttribute('data-theme', 'light');
            btn.appendChild(sunIcon());
        }

        gsap.fromTo(btn,
            { rotate: -200 },
            { rotate: 0, duration: 0.3 },
        );
    }, 300);
});

const observer = new MutationObserver((mutations) => {
    mutations.forEach((m) => {
        if (m.attributeName === "data-theme") {
            const newTheme = root.getAttribute("data-theme");
            const logo1 = document.querySelector('#navLogo img');
            const logo2 = document.querySelector('.footer-top img');
            if (newTheme === 'dark') {
                logo1.setAttribute('src', './assets/Logo/LogoDark.svg');
                logo2.setAttribute('src', './assets/Logo/LogoDark.svg');
            } else {
                logo1.setAttribute('src', './assets/Logo/LogoLight.svg');
                logo2.setAttribute('src', './assets/Logo/LogoLight.svg');
            }
        }
    });
});

observer.observe(root, { attributes: true });