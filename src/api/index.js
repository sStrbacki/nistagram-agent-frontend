const baseUrl = 'https://localhost:4000/'

const api = {
    users: {
        root: baseUrl + 'api/user/',
        requestPasswordReset: baseUrl + 'api/user/' + 'request-password-reset/',
        passwordReset: baseUrl + 'api/user/' + 'password-reset/'
    },
    auth: {
        root: baseUrl + 'api/auth/',
        login: baseUrl + 'api/auth/login'
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
    },
    invoices: {
        root: baseUrl + 'api/invoice/'
    }
}

export default api