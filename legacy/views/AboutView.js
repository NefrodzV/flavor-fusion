import FusionFlavorLogo from "../components/FlavorFusionLogo.js";
import { createElement } from "../utils.js";

export default function AboutView() {
    const section = createElement('section', 'about')
    const title = createElement('h1')
    title.textContent = 'About Flavor Fusion'

    const aboutUsArticle = createElement('article', 'details')
    const logo = FusionFlavorLogo()
    const aboutUsDiv = createElement('div')
    const aboutUsTitle = createElement('h2', 'title')
    aboutUsTitle.textContent = 'About Us'
    const aboutUsParagraph = "At Flavor Fusion, we’re more than just a restaurant – we’re a culinary destination that brings together the best of global cuisines with a creative twist. Our philosophy is simple: great food tells a story, and we want every dish to transport you to a new place and time. Our team of chefs is dedicated to pushing the boundaries of traditional cooking, blending flavors, textures, and techniques from different cultures to craft an experience that’s as exciting as it is delicious. Whether it’s an unexpected pairing or a fresh take on a classic favorite, Flavor Fusion is all about reimagining the way we experience food. We believe that every meal should be an adventure. From the bold spices of Southeast Asia to the comforting flavors of Mediterranean cuisine, our menu is a vibrant fusion of the world’s most beloved culinary traditions. We’re committed to using only the freshest, locally-sourced ingredients to bring these global flavors to life."
    aboutUsDiv.append(aboutUsTitle, aboutUsParagraph)
    aboutUsArticle.append(aboutUsDiv, logo)

    // Working hours article
    const workingHoursAndLocationArticle = createElement('article', 'working-location')
    const workingHours = createWorkingHours()
    const workingHoursWrapper = createElement('div', 'working-hours-wrapper')
    workingHoursWrapper.appendChild(workingHours)
    const location = createLocation()
    workingHoursAndLocationArticle.append(location, workingHoursWrapper)
   
    section.append(title, aboutUsArticle, workingHoursAndLocationArticle)
    return section
}

function createWorkingHours() {
    const workingHours = [
        { day: "Monday", hours: "10:00 AM - 9:00 PM" },
        { day: "Tuesday", hours: "10:00 AM - 9:00 PM" },
        { day: "Wednesday", hours: "10:00 AM - 9:00 PM" },
        { day: "Thursday", hours: "10:00 AM - 9:00 PM" },
        { day: "Friday", hours: "10:00 AM - 10:00 PM" },
        { day: "Saturday", hours: "11:00 AM - 10:00 PM" },
        { day: "Sunday", hours: "Closed" }
    ];
    const workingHoursDiv = createElement('div', 'working-hours')
    const workingHoursH2 = createElement('h2')
    workingHoursH2.textContent = "Our Working Hours"
    const hoursList = createElement('ul', 'working-hours-list')
    workingHours.forEach(({hours, day}) => {
        const li = createElement('li')
        li.innerHTML = `<span class="semi-bold">${day}</span>: ${hours}`
        hoursList.appendChild(li)
    })
    workingHoursDiv.append(workingHoursH2, hoursList)
    return workingHoursDiv
}

function createLocation() {
    const locationInfo = {
        address: "123 Flavor Street, Foodie City, FC 56789",
        phone: "(123) 456-7890",
        email: "info@flavorfusion.com",
        description: "We are located in the heart of Foodie City, near the central park. Come enjoy a unique dining experience!"
    };
    const locationDiv = createElement('div','visit-us')
    const locationH2 = createElement('h2')
    locationH2.textContent = 'Visit Us'
    const address = createElement('p')
    address.innerHTML = `<span class="semi-bold">Address:</span> ${locationInfo.address}`
    const phone = createElement('p')
    phone.innerHTML = `<span class="semi-bold">Phone:</span> ${locationInfo.phone}`
    const email = createElement('p')
    email.innerHTML = `<span class="semi-bold">Email:</span> ${locationInfo.email}`
    const description = createElement('p')
    description.textContent = locationInfo.description

    locationDiv.append(locationH2, description, address, phone, email, )
    return locationDiv
    
}