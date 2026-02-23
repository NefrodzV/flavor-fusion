import Footer from "../components/Footer.js";
import Header from "../components/Header.js";
import { navigationObserver } from "../observers.js";
import { createElement } from "../utils.js";
import AboutView from "./AboutView.js";
import FoodMenuView from "./FoodMenuView.js";
import HomeView from './HomeView.js'

export  default function LayoutView() {
    const header = Header()
    const footer = Footer()

    const homeView = HomeView()
    const foodMenuView  = FoodMenuView()
    const aboutView = AboutView()

    let main = createElement('main')
    main.append(homeView)


    function render(id) {
        switch(id) {
            case 'home':
                main.removeChild(main.children[0])
                main.appendChild(homeView)
            break;
            case 'menu':
                main.removeChild(main.children[0])
                main.appendChild(foodMenuView)
            break;
            case 'about':
                main.removeChild(main.children[0])
                main.appendChild(aboutView)
            break;
            default:
                console.error('Nav Item click handler not defined')

        }
    }

    navigationObserver.subscribe(render)

    document.body.append(header, main, footer)
}