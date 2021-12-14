import axios from "axios";
import { config } from "../overmind";

export const formatErrors = (data: string | string[]): string[] => {
    if (typeof data === 'string') {
        return [data];
    }
    return data
};

export const generateErrorMessage = (state: typeof config.state, error: any, position: "tableErrors" | "modalErrors") => {
    if (axios.isAxiosError(error) && error.response) {
        state.tables[position] = formatErrors(error.response.data.message)
    } else if (axios.isAxiosError(error)) {
        state.tables[position] = [`Cannot connect to ${error.config.baseURL}${error.config.url?.substring(1)}!`]
    } else {
        console.error(error)
    }
}