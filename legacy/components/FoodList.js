import { createElement } from "../utils.js";

export default function FoodList(items) {
    const foodItems = []
    const section = createElement('div', 'foodList')
    const sectionTitle = createElement('h1', 'title')
    sectionTitle.textContent = 'Flavor Fusion Foods'
    const foodContainer = createElement('div', 'food-container')
    section.append(sectionTitle, foodContainer)

    if(items && Array.isArray(items)) {
        items.forEach((item) => {
            const food = FoodItem(item.name, item.description, item.url)
            foodItems.push(food)
            foodContainer.appendChild(food)
        })
    }

    return section
}

function FoodItem(name, description, url) {
    const card  = createElement('article', 'food')
    const image = new Image()
    image.src = url.small
    image.setAttribute('alt', `Image of ${name}`)
    const title = createElement('h2', 'title')
    title.textContent = name;
    const paragraph = createElement('p')
    paragraph.textContent = description
    card.append(image, title, paragraph)

    return card
}