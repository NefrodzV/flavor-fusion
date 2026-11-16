import { LoaderCircle, LoaderIcon } from "lucide-react";
import React, { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router";
import { NavLink } from "react-router";
import { LogoSVG } from "~/components/layout/logo-svg";
import { MainContainer } from "~/components/layout/main-container";
import { Loader } from "~/components/loader";
import { Container, Card, Button, Heading, InputField } from "~/components/ui";
import { useAuth } from "~/providers/AuthProvider";

export default function LoginRoute() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [globalError, setGlobalError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const submitIsDisabled = !email || !password;
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    let hasFrontendErrors = false;
    if (!email) {
      hasFrontendErrors = true;
      setErrors((prev) => ({ ...prev, email: "Field is required" }));
    }
    if (!password) {
      hasFrontendErrors = true;
      setErrors((prev) => ({ ...prev, password: "Field is required" }));
    }
    if (hasFrontendErrors) {
      return;
    }
    setErrors({ email: "", password: "" });
    setGlobalError("");
    setIsLoading(true);
    try {
      const result = await login(email, password);
      if (result) navigate("/menu");
    } catch (error: any) {
      setErrors((prev) => ({ ...prev, ...error.fields }));
      const globalError = error.message;
      setGlobalError(globalError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainContainer className="min-h-screen flex items-center justify-center md:bg-purple-100">
      <Container className="p-4 flex flex-col gap-2 justify-center items-center md:shadow-sm md:rounded-sm md:border-purple-100 md:border-1 md:bg-white md:min-w-1/2 lg:min-w-1/3 md:min-h-[400px] flex flex-col">
        <form
          className=" w-full flex-1 h-full flex flex-col gap-2 p-2 border-box items-center justify-center"
          onSubmit={onSubmit}
        >
          <Container className="aspect-square w-15">
            <LogoSVG />
          </Container>
          <Heading as="h1" fontSize="medium">
            Log in
          </Heading>
          <Container className="flex w-full flex-col gap-4">
            <InputField
              label="email"
              value={email}
              onChange={setEmail}
              error={errors.email}
            />
            <InputField
              label="password"
              value={password}
              onChange={setPassword}
              error={errors.password}
            />
          </Container>
          {globalError && <p className="text-red-400">{globalError}</p>}
          <Button
            css="capitalize min-w-1/3 flex justify-center"
            disabled={submitIsDisabled}
          >
            {isLoading ? (
              <LoaderIcon className="animate-[spin_2s_linear_infinite]" />
            ) : (
              "login"
            )}
          </Button>
        </form>
        <Link
          to={"/register"}
          className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
        >
          Register
        </Link>
      </Container>
    </MainContainer>
  );
}
