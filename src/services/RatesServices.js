
import { SERVER_URL } from "../global/ServerUrl";

export const fetch_rates = async() => {
    const url = `${SERVER_URL}rates`;

    const requestOptions = {
        headers: {
            'Content-Type': 'application/json',
            'authorization':'LqA[3br%H{Am1r2aFmXx_=Z1r1'
        },
    };

    const response = await fetch(url, requestOptions);
    const result = await response.json();
    return result;
}   