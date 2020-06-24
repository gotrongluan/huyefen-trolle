const getToken = () => {
    return localStorage.getItem('token');
}

const setToken = token => {
    if (token)
        return localStorage.setItem('token', token);
    const current = getToken();
    if (current)
        localStorage.removeItem('token');
}
export default {
    getToken, setToken
};