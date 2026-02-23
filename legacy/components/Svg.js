export default function Svg(attributes, paths) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg')
    for(const [key, value] of Object.entries(attributes)) {
        svg.setAttribute(key, value)
    }

    paths.forEach((path) => svg.appendChild(path))

    return svg
}

