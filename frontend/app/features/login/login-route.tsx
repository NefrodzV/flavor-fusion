import React, { useState, type SubmitEvent } from "react";
import { LogoSVG } from "~/components/layout/logo-svg";
import { MainContainer } from "~/components/layout/main-container";
import { Container, Card, Button, Heading, InputField } from "~/components/ui";
import { useAuth } from "~/providers/AuthProvider";

export default function LoginRoute() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [globalError, setGlobalError] = useState("");
  const submitIsDisabled = !email || !password;
  const { user, login } = useAuth();

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

    try {
      const result = await login(email, password);
      // TODO: navigate here
    } catch (error: any) {
      setErrors((prev) => ({ ...prev, ...error.fields }));
      const globalError = error.message;
      setGlobalError(globalError);
    }
  };

  return (
    <MainContainer className="min-h-screen flex items-center justify-center md:bg-purple-100">
      <Container className="md:shadow-sm md:rounded-sm md:border-purple-100 md:border-1 md:bg-white md:min-w-1/2 md:min-h-[400px] flex flex-col">
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
          <Container className="flex flex-col gap-4">
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
          <Button css="min-w-1/3 " disabled={submitIsDisabled}>
            Login
          </Button>
        </form>
      </Container>
    </MainContainer>
  );
}
