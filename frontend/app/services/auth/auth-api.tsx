import { env } from "~/env";
import type { IUser } from "~/providers/auth-provider";
interface IApiServiceResponse {
  message: string;
  user?: IUser | null;
}

export class AuthApiService {
  constructor() {}

  async login(email: string, password: string): Promise<IApiServiceResponse> {
    const res = await fetch(`${env.apiUrl}/api/auth/login`, {
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
    const res = await fetch(`${env.apiUrl}/api/auth/register`, {
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
}
