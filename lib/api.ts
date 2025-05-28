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

export interface CreditRequestResponse {
  data: {
    amount: number;
    company_name: string;
    created_at: string;
    employee_id: number;
    employee_name: string;
    funded_amount: number;
    id: number;
    interest_rate: number;
    purpose: string;
    status: string;
    term_months: number;
    updated_at: string;
  }[];
  message: string;
  status: string;
  statusCode: number;
  total: number;
}

export interface ManagerCreditRequestResponse {
  data: {
    amount: number;
    company_name: string;
    created_at: string;
    employee_id: number;
    employee_name: string;
    funded_amount: number;
    id: number;
    interest_rate: number;
    purpose: string;
    status: string;
    term_months: number;
    updated_at: string;
  }[];
  message: string;
  status: string;
  statusCode: number;
  status_filter: string;
  total: number;
}

export interface UserProfileResponse {
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      role: string;
      company_id: number;
      // outros campos se necessário
    }
  }
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

export interface Invitation {
  id: number;
  email: string;
  status: "pending" | "accepted" | "rejected";
  created_at: string;
}

export interface InviteEmployeeRequest {
  email: string;
  company_id: number;
}

export interface InviteEmployeeResponse {
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

  getProfile: async (): Promise<UserProfileResponse> => {
    const token = localStorage.getItem('access_token');
    const response = await axios.get(`${API_BASE_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  }
};

export const creditApi = {
  requestCredit: async (data: CreditRequest): Promise<CreditResponse> => {
    const token = localStorage.getItem('access_token');
    const response = await axios.post(
      `${API_BASE_URL}/credits/employee/requests`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  },

  getCreditRequests: async (): Promise<CreditRequestResponse> => {
    const token = localStorage.getItem('access_token');
    const response = await axios.get(
      `${API_BASE_URL}/api/credits/employee/requests`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  }
};

export const managerApi = {
  getCreditRequests: async (status?: string): Promise<ManagerCreditRequestResponse> => {
    const token = localStorage.getItem('access_token');
    const response = await axios.get(
      `${API_BASE_URL}/api/manager/credit/requests${status ? `?status=${status}` : ''}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  },

  updateCreditRequestStatus: async (requestId: number, status: 'approved' | 'rejected'): Promise<{ message: string }> => {
    const token = localStorage.getItem('access_token');
    const response = await axios.patch(
      `${API_BASE_URL}/api/manager/credit/requests/${requestId}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  }
};

export const invitationApi = {
  inviteEmployee: async (data: InviteEmployeeRequest): Promise<InviteEmployeeResponse> => {
    const response = await axios.post(`${API_BASE_URL}/api/invitations/employee`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  },

  getProfile: async (): Promise<UserProfileResponse> => {
    const response = await axios.get(`${API_BASE_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  },

  getEmployees: async (): Promise<{ data: Employee[] }> => {
    const response = await axios.get(`${API_BASE_URL}/api/employees`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  },

  getInvitations: async (): Promise<{ data: Invitation[] }> => {
    const response = await axios.get(`${API_BASE_URL}/api/invitations`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  },
}; 