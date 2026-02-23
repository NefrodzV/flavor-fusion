import { createElement } from "../utils.js";

export default function HamburgerButton( attributes , onClick) {
    const button = createElement('button', 'hamburger', null, {
        'data-open': 'false',
        'aria-expanded': 'false',
        'aria-label': 'Open navigation'
    })

    if(attributes) {
        for(const [key, val] of Object.entries(attributes)) {
            button.setAttribute(key, val)
        }
    }

    // Setting lines for hamburger
    for(let i = 0; i < 3; i++) {
        const line = createElement('div')
        button.appendChild(line)
    }

    button.addEventListener('click', () => {
        console.log('click button')
        const isOpen = button.getAttribute('data-open') === 'true'
        console.log(isOpen)

        if(isOpen) {
            onClick(false)
            button.setAttribute('data-open', 'false');
            button.setAttribute('aria-expanded', 'false')
            button.setAttribute('aria-label', 'Open navigation')
        } else {
            onClick(true)
            button.setAttribute('data-open', 'true');
            button.setAttribute('aria-expanded', 'true')
            button.setAttribute('aria-label', 'Close navigation')
        }
    })

    return button
}