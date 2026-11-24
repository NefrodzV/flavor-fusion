import { env } from "~/env";
import type { IUser } from "~/providers/auth-provider";
interface IApiServiceResponse {
  message: string;
  user?: IUser | null;
}

export class AuthApiService {
  constructor() {}

  private API_URL = `${env.apiUrl}/api/auth`;

  async login(email: string, password: string): Promise<IApiServiceResponse> {
    const res = await fetch(`${this.API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  }

  async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<IApiServiceResponse> {
    const res = await fetch(`${this.API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: firstName,
        lastName,
        email,
        password,
        confirmPassword
      })
    });
    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  }

  async getCurrentUser(): Promise<IApiServiceResponse> {
    const res = await fetch(`${this.API_URL}/me`, {
      credentials: "include"
    });
    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  }
}
