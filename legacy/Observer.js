export default function Observer() {
    let events = []
     return {
        subscribe: (fn)  => {
            events.push(fn)
        },
        unsubscribe: (fn) => {
            events = events.filter(val => val !== fn)
        },

        notify: (data) => {
            events.forEach((fn) => fn(data))
        }
    }
}