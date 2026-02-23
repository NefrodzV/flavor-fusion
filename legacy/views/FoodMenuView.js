import { createElement } from "../utils.js"
import ricePorkSmall from '../assets/rice-pork-small.jpg'
import ricePorkMedium from '../assets/rice-pork-medium.jpg'
import sushiSmall from '../assets/sushi-small.jpg'
import sushiMedium from '../assets/sushi-medium.jpg'
import fivePlateSushiSmall from '../assets/five-sushi-plate.jpg'
import fivePlateSushiMedium from '../assets/five-sushi-plate-medium.jpg'
import lobsterTailSmall from '../assets/lobster-tail-small.jpg'
import lobsterTailMedium from '../assets/lobster-tail-medium.jpg'
import chickenRicePlateSmall from '../assets/chicken-rice-plate-small.jpg'
import chickenRicePlateMedium from '../assets/chicken-rice-plate-medium.jpg'
import riceShrimpSalmonSmall from '../assets/rice-shrimp-salmon-small.jpg'
import riceShrimpSalmonMedium from '../assets/rice-shrimp-salmon-medium.jpg'
import FoodList from "../components/FoodList.js"

export default function FoodMenuView() {
    const section = createElement('section','food-section')
    const foodList = FoodList(foods)
    section.append(foodList)
    return section
}

const foods = [
    {
        name: 'Pork & Rice Harmony',
        description: 'Experience a delightful culinary journey with our Pork & Rice Harmony bowl, where tender, marinated pork meets fluffy jasmine rice in a symphony of flavors. The pork is expertly seared to perfection, infused with a blend of savory spices and a hint of sweetness, creating a rich, mouthwatering profile.',
        url: {
            small: ricePorkSmall,
            medium: ricePorkMedium
        },  
        priceCents: 1000
    },
    {
        name: 'Sushi Serenade',
        description: "Indulge in a culinary masterpiece with our Sushi Serenade, a vibrant platter that showcases the artistry of traditional sushi-making. This exquisite selection features an array of freshly prepared rolls, each crafted with the finest sushi-grade fish, crisp vegetables, and perfectly seasoned rice. From classic California rolls to inventive specialty creations, every piece is a harmony of flavors and textures, complemented by a delicate touch of wasabi and pickled ginger. The platter is artfully arranged to celebrate the beauty of the ocean’s bounty, making it perfect for sharing or savoring solo. Dive into this delightful experience and let your taste buds be serenaded by the fresh, exquisite flavors of the sea!",
        url: {
            small:sushiSmall,
            medium: sushiMedium
        },
        priceCents: 1350
    },
   
    {
        name: 'Fusion Five: Sushi Symphony',
        description: 'A curated selection of five distinct sushi creations, each blending traditional flavors with unexpected twists. Experience a harmonious fusion of textures and tastes in every bite, where bold innovation meets classic craftsmanship. Perfect for adventurous palates seeking a new sushi experience.',
        url: {
            small: fivePlateSushiSmall,
            medium: fivePlateSushiMedium,
        },
        priceCents: 3500

    }, {
        name: 'Lobster Tail Fusion Delight',
        description: 'A tantalizing dish featuring succulent lobster tail, expertly prepared with a fusion of bold flavors and unique culinary twists. Each bite combines the sweetness of lobster with unexpected seasonings, offering a fresh and exciting take on a classic seafood favorite. Perfect for those seeking a luxurious yet adventurous dining experience.',
        url: {
            small: lobsterTailSmall,
            medium: lobsterTailMedium
        },
        priceCents: 5000
    }, 
    {
        name: 'Chicken & Rice Fusion Bowl',
        description: 'A vibrant and flavorful dish featuring tender, perfectly seasoned chicken paired with aromatic rice, infused with a fusion of spices and savory sauces. Each bite offers a delightful balance of comfort and bold, unexpected flavors—an exciting twist on a timeless classic. Perfect for those craving a hearty yet adventurous meal.',
        url: {
            small: chickenRicePlateSmall,
            medium: chickenRicePlateMedium
        },
        priceCents: 1500
    }, {
        name: 'Salmon & Shrimp Rice Fusion',
        description: 'A delectable combination of tender salmon and succulent shrimp, served atop a bed of fragrant, perfectly cooked rice. Infused with bold spices and unique flavors, this dish offers a seamless blend of freshness and richness, delivering an unforgettable seafood experience with every bite. Ideal for those craving a sophisticated yet adventurous twist on seafood.',
        url: {
            small: riceShrimpSalmonSmall,
            medium: riceShrimpSalmonMedium
        },
        priceCents: 2184
    }
]