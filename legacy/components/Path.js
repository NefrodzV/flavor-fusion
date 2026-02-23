export default function Path(attributes) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", 'path')
    for(const [key, value] of Object.entries(attributes)) {
        path.setAttribute(key, value)
    }

    return path
}