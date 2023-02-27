const BASE_URL = 'https://localhost:5001/api/'

export const header = () => {
    const token = localStorage.getItem('token');
    if(token) {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    return {
        'Content-Type': 'application/json',
    }
}

export const api = async (url, method = 'GET', body = null) => {
    if(body)
        body = JSON.stringify(body);

    const response = await fetch(BASE_URL + url, {
        method,
        body,
        headers: header(),
    });

    if(!response.ok) {
        const { error } = await response.json();
        throw new Error(error);
    }

    const data = await response.json();
    return data;
};