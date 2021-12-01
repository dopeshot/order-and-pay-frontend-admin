import axios from "axios";
import { Config } from "../config.global";

export const request = axios.create({
    baseURL: Config.api.baseApiUrl
})