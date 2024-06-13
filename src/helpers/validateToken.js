function validateToken(token) {
    try {
        const tokenPayload = token.split('.')[1];
        const decodedToken = JSON.parse(atob(tokenPayload));
        return (decodedToken.exp * 1000) > Date.now();
    } catch (error) {
        return false;
    }
}

export default validateToken;
