import axios from "axios";
import api from "@/api";

export async function sendLoginRequest(username, password) {
    return axios.post(
        api.auth.login,
        {
            username, password
        }
    )
}
