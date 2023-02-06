import 'boxicons/css/boxicons.min.css';
import './styles.css';

import mixitup from "mixitup";
import ScrollReveal from "scrollreveal";

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () => {
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('scroll-header')
        : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== Popup Changes ===============*/

const FaceDemoButton = document.getElementById("face-demo");
const FaceDemoPopup = document.getElementById("face-demo-popup");

FaceDemoButton.addEventListener("click", () => {
    FaceDemoPopup.classList.remove("hidden");

    const total = window.innerWidth;
    const consumed = FaceDemoPopup.clientWidth;
    const center = (total - consumed) / 2;

    FaceDemoPopup.style.left = `${center}px`;

    const left = FaceDemoPopup.getElementsByClassName("leftarrow")[0];
    const right = FaceDemoPopup.getElementsByClassName("rightarrow")[0];
    const image = FaceDemoPopup.querySelectorAll("img:not(.hidden)")[0];

    const targets = [left, right, image, FaceDemoButton];

    function moveLeft() {
        moveCarousel(-1, FaceDemoPopup);
    }

    function moveRight() {
        moveCarousel(1, FaceDemoPopup);
    }

    left.addEventListener('click', moveLeft);
    right.addEventListener('click', moveRight);

    document.addEventListener('click', (event) => {
        if (!targets.some(target => target.contains(event.target))) {
            FaceDemoPopup.classList.add("hidden");
        }
    });
});

function moveCarousel(direction, target) {
    const images = target.getElementsByClassName("caroImage");
    const activeIndex = Array.from(images).findIndex(image => image.classList.contains("active"));
    const nextIndex = (activeIndex + direction + Array.from(images).length) % Array.from(images).length;

    images[activeIndex].classList.remove("active");
    images[activeIndex].classList.add("hidden");

    images[nextIndex].classList.add("active");
    images[nextIndex].classList.remove("hidden");
}

/*=============== MIXITUP FILTER PORTFOLIO ===============*/
let mixerPortfolio = mixitup('.work__container', {
    selectors: {
        target: '.work__card'
    },
    animation: {
        duration: 300
    }
});

/* Link active work */
const linkWork = document.querySelectorAll('.work__item')

function activeWork() {
    linkWork.forEach(l => l.classList.remove('active-work'))
    this.classList.add('active-work')
}

linkWork.forEach(l => l.addEventListener('click', activeWork))



/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)


/*=============== LIGHT DARK THEME ===============*/
const themeButton = document.getElementById('theme-button')
const lightTheme = 'light-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the light-theme class
const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the light
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](lightTheme)
    themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(lightTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})



/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true
})

sr.reveal('.home__data')
sr.reveal('.home__handle', { delay: 700 })
sr.reveal('.home__social, .home__scroll', { delay: 900, origin: 'bottom' })
