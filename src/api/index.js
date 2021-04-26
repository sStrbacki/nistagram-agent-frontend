const baseUrl = 'https://localhost:4000/'

const api = {
    users: {
        root: baseUrl + 'api/user/',
        requestPasswordReset: baseUrl + 'api/users/' + 'request-password-reset/',
        passwordReset: baseUrl + 'api/users/' + 'password-reset/'
    },
    products: {
        root: baseUrl + 'api/product/',
        available: baseUrl + 'api/product/available'
    },
    images: {
        content: baseUrl + 'content/',
        root: baseUrl + 'api/images/'
    },
    shoppingCart: {
        root: baseUrl + 'api/shopping-cart/'
    }
}

export default api