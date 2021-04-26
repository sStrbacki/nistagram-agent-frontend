const baseUrl = 'https://localhost:4000/'

const api = {
    users: {
        root: baseUrl + 'api/users/',
        requestPasswordReset: baseUrl + 'api/users/' + 'request-password-reset/',
        resetPassword: baseUrl + 'api/users/' + 'password-reset/'
    },
    products: {
        root: baseUrl + 'api/products/'
    },
    images: {
        content: baseUrl + 'content/',
        root: baseUrl + 'api/images/'
    }
}

export default api