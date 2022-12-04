import { ServerData, ServerError } from './quiz.types'
import axios, { AxiosError } from 'axios'
import { API_URL } from '../../Constants';

export async function RequestApi(genre: string | null): Promise<ServerData | ServerError> {
    try {
        const response = await axios.get<ServerData>(
            `${API_URL}/quiz/${genre}`
        );
        return response.data;
    }
    catch (err) {
        if (axios.isAxiosError(err)) {
            const serverError = err as AxiosError<ServerError>;
            if (serverError && serverError.response)
                return serverError.response.data
        }
        return {errorMessage : "Site not working"};
    }
}