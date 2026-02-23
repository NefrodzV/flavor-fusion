import { createElement } from '../utils.js'
import smallImage from '../assets/restaurant-small.jpg'
import mediumImage from '../assets/restaurant-medium.jpg'
import { navigationObserver } from '../observers.js'
export default function HomeView() {
    const root =  createElement('div')
    root.classList.add('home')
    const container = createElement('div')
    container.classList.add('double-col-container')
    container.classList.add('hero')
    const contentContainer = createElement('div')
    contentContainer.classList.add('home-content')
    const h1 = createElement('h1')
    h1.textContent = "Welcome to Flavor Fusion"
    const h2 = createElement('p2')
    h2.textContent = 'Dive into a world where culinary creativity knows no bounds. Here, we celebrate the art of combining diverse flavors and ingredients from around the globe, crafting dishes that excite the palate and inspire the imagination. From tantalizing recipes to innovative cooking techniques, Flavor Fusion is your go-to destination for exploring the delicious intersection of tradition and innovation in the culinary landscape. Join us on this flavorful journey and discover how to transform everyday meals into extraordinary experiences!'
    const actionButton = createElement('a', 'primary', null, {
        'aria-label': 'View our food menu'
    })
    actionButton.textContent = 'View Menu'
    actionButton.addEventListener('click', (e) => {
        e.preventDefault()
        navigationObserver.notify('menu')
    })
    actionButton.href = '/menu'
    contentContainer.append(h1, h2, actionButton)
    const image = new Image()
    image.classList.add('home-image')
    image.setAttribute('alt', "Image of Flavor Fusion indoors")
    image.src = mediumImage


    window.addEventListener('resize', () => {
        console.log('marthcin')
        if(window.matchMedia('(max-width:600px)').matches) {
            image.src = smallImage

            console.log('qqurry matchin')
        }
    })

    container.append(image, contentContainer)
    root.append(container)
    return root
}

