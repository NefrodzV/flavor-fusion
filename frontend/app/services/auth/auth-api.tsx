import { env } from "~/env";
import type { IUser } from "~/providers/AuthProvider";
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
    password: string
  ): Promise<IApiServiceResponse> {
    const res = await fetch(`${env.apiUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ firstName, lastName, email, password })
    });
    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  }
}
