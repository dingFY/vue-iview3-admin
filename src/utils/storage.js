export default {
    setItem(key, value) {
        value = JSON.stringify(value);
        window.localStorage.setItem(key, value)
    },
    getItem(key, defaultValue) {
        let value = window.localStorage.getItem(key)
        try {
            value = JSON.parse(value)
        } catch (err) {
            throw new Error(err)
        }
        return value || defaultValue
    },
    removeItem(key) {
        window.localStorage.removeItem(key)
    },
    clear() {
        window.localStorage.clear()
    }
}