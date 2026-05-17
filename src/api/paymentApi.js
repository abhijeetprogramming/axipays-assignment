import axios from "axios";

const BASE_URL = "https://payment-assignment.onrender.com";

export const initiatePayment = async (payload, hash) => {
  try {
    const response = await axios.post(`${BASE_URL}/initiate-payment`, payload, {
      headers: {
        "Content-Type": "application/json",
        Hash: hash,
      },
    });

    console.log("PAYMENT RESPONSE =>", response.data);

    return response.data;
  } catch (error) {
    console.log("API ERROR =>", error.response?.data || error);

    throw error;
  }
};

export const getTransactions = async (page = 1, limit = 100) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/transactions?page=${page}&limit=${limit}`,
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
