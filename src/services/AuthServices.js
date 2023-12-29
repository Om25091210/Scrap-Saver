
import { SERVER_URL } from "../global/ServerUrl";

export const create_user = async(data) => {
    const url = `${SERVER_URL}new_user`;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization':'LqA[3br%H{Am1r2aFmXx_=Z1r1'
        },
        body: JSON.stringify(data),
    };

    const response = await fetch(url, requestOptions);
    const result = await response.json();
    return result;
}   