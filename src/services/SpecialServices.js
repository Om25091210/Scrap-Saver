import { SERVER_URL } from "../global/ServerUrl"
export const generateOTP = async(email , createdAt) => {
    const dataToSend = {
        email : email,
        createdAt : createdAt
    }

    const url = `${SERVER_URL}generate-otp`;
    const result = await fetch(url , {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'LqA[3br%H{Am1r2aFmXx_=Z1r1'
        },
        body : JSON.stringify(dataToSend)
    });

    const res = await result.json();
    return res;
}

export const verifyOTP = async(email , createdAt, code) => {
    const dataToSend = {
        email : email,
        createdAt : createdAt,
        code : code
    }

    const url = `${SERVER_URL}verify-otp`;
    const result = await fetch(url , {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'LqA[3br%H{Am1r2aFmXx_=Z1r1'
        },
        body : JSON.stringify(dataToSend)
    });

    const res = await result.json();
    return res;
}

export const setResponded = async(email , createdAt) => {
    const dataToSend = {
        email : email,
        createdAt : createdAt
    }

    const url = `${SERVER_URL}confirm-pickup`;
    const result = await fetch(url , {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'LqA[3br%H{Am1r2aFmXx_=Z1r1'
        },
        body : JSON.stringify(dataToSend)
    });

    const res = await result.json();
    return res;
}


export const add_amount = async(email , createdAt, amount) => {
    const dataToSend = {
        email : email,
        createdAt : createdAt,
        amount : amount
    }
    const url = `${SERVER_URL}add-amount`;
    const result = await fetch(url , {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'LqA[3br%H{Am1r2aFmXx_=Z1r1'
        },
        body : JSON.stringify(dataToSend)
    });

    const res = await result.json();
    return res;
}

export const VerifyTransaction = async(email , createdAt) => {
    const dataToSend = {
        email : email,
        createdAt : createdAt,
       
    }
    const url = `${SERVER_URL}verify-amount`;
    const result = await fetch(url , {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'LqA[3br%H{Am1r2aFmXx_=Z1r1'
        },
        body : JSON.stringify(dataToSend)
    });

    const res = await result.json();
    return res;
}




