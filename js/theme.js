const root = document.documentElement;
const btn = document.getElementById('themeToggle');
const saved = localStorage.getItem('theme'); // 'light' | 'dark' | null

if (saved === 'light') {
    root.setAttribute('data-theme', saved);
    btn.setAttribute('aria-pressed', 'true');
    btn.textContent = `light`;
} else {
    root.setAttribute('data-theme', 'dark');
    btn.textContent = 'Dark';
    localStorage.setItem('theme', 'dark');
}

btn?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    let next;
    if (current === 'dark') next = 'light'
    else next = 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    btn.setAttribute('aria-pressed', 'true');
    btn.textContent = `${next === 'dark' ? 'Dark' : 'Light'}`;
});