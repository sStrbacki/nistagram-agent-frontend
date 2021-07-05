import axios from "axios";
import api from "@/api";

export async function getCartItems() {
    return axios.get(api.shoppingCart.root);
}

export async function addToCart(productId, quantity) {
    return axios.post(
        api.shoppingCart.root,
        {
            productId: productId,
            quantity: quantity
        });
}

export async function removeFromCart(cartItemId) {
    return axios.delete(api.shoppingCart.root + '/' + cartItemId);
}

export async function placeOrder(address) {
    return axios.post(api.invoices.root, address)
}

export async function checkout(deliveryAddress) {
    return axios.post(api.shoppingCart.checkout, deliveryAddress);
}
