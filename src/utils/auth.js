export function isAuthenticated() {
    // Implement your authentication logic
    const token = localStorage.getItem('token');
    if(!token || typeof token !== 'string'){
        return null;
    }

    try {
        const decoded = jwtDecode(token);
        if(decoded.exp && decoded.exp * 1000 < Date.now()) {
            logout(); // remove expired token
            return null;
        }

        return decoded;
    } catch (error) {
        console.error('Token decoding failed:', error);
        return null;
    }
}

export function getToken(token) {
    // implement your logic to get the token
    return localStorage.getItem('token', token );
}

export function logout() {
    // implement your logic to remove the token
    localStorage.removeItem('token');
}