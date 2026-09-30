const initApp = () => {
    // -- nav menu
    const hamburgerBtn = document.getElementById('hamburger-button')
    const mobileMenu = document.getElementById('mobile-menu')
    const toggleMenu = () => {
        mobileMenu.classList.toggle('hidden')
        mobileMenu.classList.toggle('flex')
    }

    hamburgerBtn.addEventListener('click', toggleMenu)
    mobileMenu.addEventListener('click', toggleMenu)

    // -- dark/light mode
    // set to the system default
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
        localStorage.theme = 'dark'
    } else {
        document.documentElement.classList.remove('dark')
        localStorage.theme = 'light'
    }
    // toggle the mode from the dark/light mode button
    const themeButtons = document.querySelectorAll('#theme-button')
    // add event listeners for each button
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
    // -- year in the footer
    document.getElementById('year').innerHTML = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', initApp)
