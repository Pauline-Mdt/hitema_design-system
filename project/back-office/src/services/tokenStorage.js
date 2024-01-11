export const saveToken = (userToken) => {
    localStorage.setItem('les-gorgones-user-token', JSON.stringify(userToken));
}

export const getToken = () => {
    return JSON.parse(localStorage.getItem('les-gorgones-user-token'));
}

export const removeToken = () => {
    localStorage.removeItem('les-gorgones-user-token');
}