import { SERVER_URL } from "../global/ServerUrl";

export const fetch_pickups = async (email, status) => {
    const dataOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'LqA[3br%H{Am1r2aFmXx_=Z1r1'
        },
    };
    const url = `${SERVER_URL}donations/${email}/${status}`;
    const response = await fetch(url, dataOptions);
    const jsonData = await response.json();
    return jsonData;
}

export const upload_image = async (uri) => {
    const data = new FormData();
    data.append('filename', {
        uri: uri,
        type: 'image/jpeg',
        name: `donationImage-${Date.now()}.jpg`,
    });

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'authorization': 'LqA[3br%H{Am1r2aFmXx_=Z1r1',
    };

    const options = {
        method: 'POST',
        headers: headers,
        body: data,
    };

    const url = `${SERVER_URL}image-upload`;
    const uploadResponse = await fetch(url, options);
    const result = await uploadResponse.json();
    return result;
}


export const create_pickups = async (data) => {
    const donationOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'LqA[3br%H{Am1r2aFmXx_=Z1r1'
        },
        body: JSON.stringify(data),
    };
    // console.log('Donation Request:', donationOptions);
    const url = `${SERVER_URL}create-donation`;
    const response = await fetch(url, donationOptions);
    const jsonData = await response.json();
    return jsonData;
}

export const delete_donation = async (email, createdAt) => {
    const donationRequest = {
        email: email,
        createdAt: createdAt
    };
    const dataOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'LqA[3br%H{Am1r2aFmXx_=Z1r1'
        },
        body: JSON.stringify(donationRequest),
    };
    const url = `${SERVER_URL}delete-donation`;
    const response = await fetch(url, dataOptions);
    const result = await response.json();
    return result;
}

