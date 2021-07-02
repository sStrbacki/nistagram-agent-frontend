import axios from "axios";
import api from "@/api";

/**
 * [ADMIN-ONLY] Returns all the products in the database.
 * @return {Promise<AxiosResponse<any>>}
 */
export async function getAllProducts() {
    return axios.get(api.products.root);
}

export async function deleteProductById(id) {
    return axios.delete(api.products.root + '/' + id);
}
