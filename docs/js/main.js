const initApp = () => {
    // -- nav menu (supports pages with one or several menu buttons)
    const mobileMenu = document.getElementById('mobile-menu')
    const menuButtons = document.querySelectorAll('#hamburger-button, [data-menu-toggle]')
    const toggleMenu = () => {
        mobileMenu.classList.toggle('hidden')
        mobileMenu.classList.toggle('flex')
    }
    if (mobileMenu) {
        menuButtons.forEach((button) => button.addEventListener('click', toggleMenu))
        mobileMenu.addEventListener('click', toggleMenu)
    }

    // -- dark/light mode
    // set to the system default
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
        localStorage.theme = 'dark'
    } else {
        document.documentElement.classList.remove('dark')
        localStorage.theme = 'light'
    }
    // toggle the mode from any dark/light mode button
    const themeButtons = document.querySelectorAll('#theme-button, [data-theme-toggle]')
    themeButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if (localStorage.theme == 'light') {
                document.documentElement.classList.add('dark');
                localStorage.theme = 'dark'
            }
            else if (localStorage.theme == 'dark') {
                document.documentElement.classList.remove('dark');
                localStorage.theme = 'light'
            }
        })
    })

    // -- masthead: a sticky header with a negative top offset, so its upper part
    // scrolls away with the page and only a short bar stays pinned. The name block
    // fades out and the compact brand fades in, both tied to scroll position.
    const masthead = document.getElementById('masthead')
    const brand = masthead && masthead.querySelector('[data-masthead-brand]')
    const fading = masthead ? Array.from(masthead.querySelectorAll('[data-masthead-brand], [data-masthead-fade]')) : []
    const miniBrand = masthead && masthead.querySelector('[data-mini-brand]')
    if (masthead && brand && miniBrand) {
        const miniHeight = Number(masthead.dataset.miniHeight) || 60
        const clamp = (v) => Math.min(1, Math.max(0, v))
        let range = 1
        let miniShown = false

        const update = () => {
            const p = clamp(window.scrollY / range)
            const fade = String(clamp(1 - p / 0.7))
            fading.forEach((el) => { el.style.opacity = fade })
            const q = clamp((p - 0.6) / 0.4)
            miniBrand.style.opacity = String(q)
            miniBrand.style.transform = `translateY(${(1 - q) * 6}px)`
            const show = q > 0.5
            if (show !== miniShown) {
                miniShown = show
                miniBrand.classList.toggle('pointer-events-none', !show)
                miniBrand.setAttribute('aria-hidden', String(!show))
                miniBrand.tabIndex = show ? 0 : -1
            }
        }
        const measure = () => {
            range = Math.max(1, masthead.offsetHeight - miniHeight)
            masthead.style.top = `${-range}px`
            update()
        }

        let ticking = false
        window.addEventListener('scroll', () => {
            if (!ticking) {
                ticking = true
                requestAnimationFrame(() => { update(); ticking = false })
            }
        }, { passive: true })
        new ResizeObserver(measure).observe(masthead)
        measure()
    }

    // -- homepage hero carousel
    const carousel = document.querySelector('[data-carousel]')
    if (carousel) {
        const slides = Array.from(carousel.querySelectorAll('[data-carousel-slide]'))
        const indicators = Array.from(carousel.querySelectorAll('[data-carousel-indicator]'))
        let activeSlide = 0

        const showSlide = (index) => {
            activeSlide = (index + slides.length) % slides.length
            slides.forEach((slide, slideIndex) => {
                const isActive = slideIndex === activeSlide
                slide.classList.toggle('opacity-100', isActive)
                slide.classList.toggle('opacity-0', !isActive)
                slide.setAttribute('aria-hidden', String(!isActive))
            })
            indicators.forEach((indicator, indicatorIndex) => {
                const isActive = indicatorIndex === activeSlide
                indicator.classList.toggle('bg-white', isActive)
                indicator.classList.toggle('bg-white/50', !isActive)
                indicator.setAttribute('aria-current', String(isActive))
            })
        }

        carousel.querySelector('[data-carousel-previous]').addEventListener('click', () => showSlide(activeSlide - 1))
        carousel.querySelector('[data-carousel-next]').addEventListener('click', () => showSlide(activeSlide + 1))
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => showSlide(index))
        })
    }

    // -- year in the footer (the footer may still be loading)
    const year = document.getElementById('year')
    if (year) year.innerHTML = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', initApp)
