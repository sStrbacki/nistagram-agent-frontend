const baseUrl = 'https://localhost:4000/'

const api = {
    users: {
        root: baseUrl + 'api/user/'
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