export const setToken = (token, time) => {
    let expiresTime = 1
    if (time) {
        let millisecond = new Date().getTime()
        expiresTime = new Date(millisecond + time * 1000)
    }
    Cookies.set(TOKEN_KEY, token, { expires: expiresTime })
}

export const getToken = () => {
    const token = Cookies.get(TOKEN_KEY)
    if (token) return token
    else return false
}