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

export interface CompanyInvitation {
  id: number;
  company_id: number;
  created_at: string;
  created_by: number | null;
  email: string;
  expires_at: string;
  invitation_code: string;
  is_used: boolean;
  role: string;
  status: "pending" | "used" | "expired" | string;
  user_id: number | null;
}

export interface CompanyInvitationsResponse {
  data: CompanyInvitation[];
  message: string;
  status: string;
  statusCode: number;
  total: number;
}

export interface CompanyUser {
  id: number;
  company_id: number;
  created_at: string;
  updated_at: string;
  email: string;
  is_active: boolean;
  is_admin: boolean;
  name: string;
  role: string;
}

export interface CompanyUsersResponse {
  data: CompanyUser[];
  message: string;
  status: string;
  statusCode: number;
  total: number;
}

export interface AvailableInvestment {
  id: number;
  amount: number;
  company_name: string;
  created_at: string;
  employee_name: string;
  interest_rate: number;
  invested_amount: number;
  investment_percentage: number;
  purpose: string;
  remaining_amount: number;
  term_months: number;
}

export interface AvailableInvestmentsResponse {
  data: AvailableInvestment[];
  message: string;
  status: string;
  statusCode: number;
  total: number;
}

export interface CreateInvestmentRequest {
  credit_request_id: number;
  amount: number;
}

export interface CreateInvestmentResponse {
  message: string;
  status: string;
  statusCode: number;
}

export interface MyInvestment {
  id: number;
  amount: number;
  created_at: string;
  credit_request_id: number;
  employee_id: number;
  credit_request: {
    id: number;
    amount: number;
    company_name: string;
    created_at: string;
    employee_name: string;
    funded_amount: number;
    interest_rate: number;
    investment_percentage: number;
    purpose: string;
    status: string;
    term_months: number;
  };
  payments: any[];
  payments_summary: {
    next_payment: string | null;
    total_dividend: number;
    total_interest: number;
    total_paid: number;
    total_pending: number;
  };
}

export interface MyInvestmentsResponse {
  data: MyInvestment[];
  message: string;
  status: string;
  statusCode: number;
  total: number;
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

  getCompanyInvitations: async (): Promise<CompanyInvitationsResponse> => {
    const response = await axios.get(`${API_BASE_URL}/api/invitations/company/invitations`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  },

  getCompanyUsers: async (): Promise<CompanyUsersResponse> => {
    const response = await axios.get(`${API_BASE_URL}/api/users/company/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  },
};

export const investmentApi = {
  getAvailableInvestments: async (): Promise<AvailableInvestmentsResponse> => {
    const response = await axios.get(`${API_BASE_URL}/api/credits/employee/available`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  },
  createInvestment: async (data: CreateInvestmentRequest): Promise<CreateInvestmentResponse> => {
    const response = await axios.post(`${API_BASE_URL}/api/investment/create`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  },
  getMyInvestments: async (): Promise<MyInvestmentsResponse> => {
    const response = await axios.get(`${API_BASE_URL}/api/investment/my-investments`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.data;
  },
}; 