import axios from 'axios';

export const galaxPay = axios.create({
  baseURL: 'https://api.galaxpay.com.br/v2/',
});
