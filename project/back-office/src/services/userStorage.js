export const saveUser = (currentUser) => {
    localStorage.setItem('les-gorgones-user', JSON.stringify(currentUser));
}

export const getUser = () => {
    return JSON.parse(localStorage.getItem('les-gorgones-user'));
}

export const removeUser = () => {
    localStorage.removeItem('les-gorgones-user');
}