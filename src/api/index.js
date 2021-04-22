const baseUrl = 'http://localhost:4000/'

const api = {
    users: {
        root: baseUrl + 'api/users/'
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