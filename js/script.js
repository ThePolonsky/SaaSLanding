// Dropdown -----------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const ACCORDION = false;                 // true — открыта только одна секция
    const D_OPEN = 0.5, D_CLOSE = 0.30;     // длительности
    const E_OPEN = 'power2.out', E_CLOSE = 'power2.in';
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const items = document.querySelectorAll('.faq-right .faq-dropdown');

    items.forEach((dd) => {
        const summary = dd.querySelector('summary');
        const p = dd.querySelector('p');

        if (!summary || !p) return;

        p.style.overflow = 'hidden';
        p.style.willChange = 'height, opacity, transform';

        if (dd.hasAttribute('open')) {
            gsap.set(p, { height: 'auto', opacity: 1, y: 0 });
        } else {
            gsap.set(p, { height: 0, opacity: 0, y: -4 });
        }

        const expand = (target) => {
            const content = target.querySelector('p');

            if (ACCORDION) {
                items.forEach((other) => {
                    if (other !== target && other.hasAttribute('open')) collapse(other);
                });
            }

            target.setAttribute('open', '');

            if (reduce) {
                content.style.height = 'auto';
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
                return;
            }

            gsap.killTweensOf(content);
            gsap.fromTo(content,
                { height: 0, opacity: 0, y: -4 },
                {
                    height: content.scrollHeight,
                    opacity: 1,
                    y: 0,
                    duration: D_OPEN,
                    ease: E_OPEN,
                    onComplete: () => gsap.set(content, { height: 'auto' })
                }
            );
        }

        const collapse = (target) => {
            const content = target.querySelector('p');

            if (reduce) {
                content.style.height = '0px';
                content.style.opacity = '0';
                content.style.transform = 'translateY(-4px)';
                target.removeAttribute('open');
                return;
            }

            gsap.killTweensOf(content);
            gsap.fromTo(content,
                { height: content.scrollHeight, opacity: 1, y: 0 },
                {
                    height: 0,
                    opacity: 0,
                    y: -4,
                    duration: D_CLOSE,
                    ease: E_CLOSE,
                    onComplete: () => target.removeAttribute('open')
                }
            );
        }

        summary.addEventListener('click', (e) => {
            e.preventDefault();
            dd.hasAttribute('open') ? collapse(dd) : expand(dd);
        });

        summary.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                dd.hasAttribute('open') ? collapse(dd) : expand(dd);
            }
        });
    });
});

// Solution unwrapping ---------------------------------------------------------------------

const solutionGrid = document.querySelector('.solution-grid');
const solutionUnwrapCover = document.querySelector('.solution-bottom');
const solutionUnwrapBtn = solutionUnwrapCover?.querySelector('.solution-bottom button');

solutionUnwrapBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const closedHeight = solutionGrid.offsetHeight;

    solutionGrid.classList.add('solution-grid--expanded');

    const fullH = solutionGrid.scrollHeight;

    gsap.set(solutionGrid, { height: closedHeight, overflow: 'hidden'});

    gsap.to(solutionUnwrapBtn,
        { opacity: 0, scale: 0.8, duration: 0.25, ease: 'power2.in' }
    );

    gsap.to(solutionUnwrapCover,
        {
            opacity: 0,
            height: 0,
            duration: 1,
            ease: 'power2.inOut',
            onComplete: () => { solutionUnwrapCover.style.display = 'none'; }
        }
    );

    gsap.to(solutionGrid, {
        height: fullH,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => gsap.set(grid, { height: 'auto', overflow: '' })
    });

    const allCards = Array.from(solutionGrid.children);
    const newCards = allCards.slice(9); // 0..8 — первые 9 штук
    gsap.fromTo(newCards,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', stagger: 0.05, delay: 0.15 }
    );
});

// Swiper --------------------------------------------------------------------------------

const swiper = new Swiper('.swiper', {
    loop: true,
    spaceBetween: 30,
    slidesPerView: 3,
    centeredSlides: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        0:   { slidesPerView: 1 },
        810: { slidesPerView: 2 },
        1200:{ slidesPerView: 3 },
    }
});