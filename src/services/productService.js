import axios from "axios";
import api from "@/api";

export async function getAllProducts() {
    return axios.get(api.products.root);
}

export async function deleteProductById(id) {
    return axios.delete(api.products.root + '/' + id);
}

export async function updateProduct(id, product) {
    return axios.put(api.products.root + '/' + id, product);
}

export async function createNewProduct(product) {
    return axios.post(api.products.root, product);
}
