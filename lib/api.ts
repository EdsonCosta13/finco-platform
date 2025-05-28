import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000';

export interface LoginResponse {
  data: {
    access_token: string;
    employee?: {
      company_id: number;
      cpf: string;
      created_at: string;
      email: string;
      id: number;
      name: string;
      phone: string;
      position: string;
      salary: number;
      updated_at: string;
    };
    user: {
      company_id: number;
      created_at: string;
      email: string;
      id: number;
      is_active: boolean;
      is_admin: boolean;
      name: string;
      role: string;
      updated_at: string;
    };
  };
  message: string;
  status: string;
  statusCode: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreditRequest {
  amount: number;
  term_months: number;
  purpose: string;
}

export interface CreditResponse {
  data: {
    id: number;
    amount: number;
    term_months: number;
    purpose: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
  message: string;
  status: string;
  statusCode: number;
}

export const authApi = {
  loginEmployee: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await axios.post(`${API_BASE_URL}/api/auth/employee/login`, credentials);
    return response.data;
  },

  loginManager: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await axios.post(`${API_BASE_URL}/api/auth/manager/login`, credentials);
    return response.data;
  },
};

export const creditApi = {
  requestCredit: async (data: CreditRequest): Promise<CreditResponse> => {
    const token = localStorage.getItem('access_token');
    const response = await axios.post(
      `${API_BASE_URL}/api/credits/employee/requests`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  }
}; 