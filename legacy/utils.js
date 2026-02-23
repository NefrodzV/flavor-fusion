const addStyle = (element, style)  => {
    element.classList.add(style)
}
    
const addImage = (element, source) => {
    const image = new Image();
    image.src = source;
    element.appendChild(image);
}

export const createElement = (type, css, style, attributes) => {
    const element = document.createElement(type);
    if(css) element.classList.add(css)
    if(style) element.style = style
    if(attributes) {
        for(const [key, value] of Object.entries(attributes)) {
            element.setAttribute(key,value)
        }
    }
    return element;
}


