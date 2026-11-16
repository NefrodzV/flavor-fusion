import React, { type SubmitEvent, useState } from "react";
import { LogoSVG } from "~/components/layout/logo-svg";
import { MainContainer } from "~/components/layout/main-container";
import { Container, Card, Button, Heading, InputField } from "~/components/ui";
import { useAuth } from "~/providers/AuthProvider";
import { Link } from "react-router";
import { Check, CheckIcon, LoaderIcon } from "lucide-react";
import { SuccessComponent } from "./success-component";

export default function RegisterRoute() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: ""
  });
  const [globalError, setGlobalError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const submitIsDisabled = !email || !password || !firstName || !lastName;
  const { register } = useAuth();
  const [isRegistered, setIsRegistered] = useState(false);

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

    if (!firstName) {
      hasFrontendErrors = true;
      setErrors((prev) => ({ ...prev, firstName: "Field is required" }));
    }
    if (!lastName) {
      hasFrontendErrors = true;
      setErrors((prev) => ({ ...prev, lastName: "Field is required" }));
    }
    if (!confirmPassword) {
      hasFrontendErrors = true;
      setErrors((prev) => ({ ...prev, lastName: "Field is required" }));
    } else if (confirmPassword !== password) {
      hasFrontendErrors = true;
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Must be equal to password"
      }));
    }
    if (hasFrontendErrors) {
      return;
    }

    setErrors({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      confirmPassword: ""
    });
    setGlobalError("");
    setIsLoading(true);
    try {
      await register(firstName, lastName, email, password, confirmPassword);
      setIsRegistered(true);
    } catch (error: any) {
      setErrors((prev) => ({ ...prev, ...error.fields }));
      setGlobalError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainContainer className="min-h-screen flex  md:bg-purple-100 justify-center items-center">
      {isRegistered ? (
        <SuccessComponent />
      ) : (
        <Container className="p-4 flex flex-col gap-2 justify-center  w-full md:w-auto items-center  md:shadow-sm md:rounded-sm md:border-purple-100 md:border-1 md:bg-white md:min-w-1/2 lg:min-w-1/4 md:min-h-[400px] flex flex-col">
          <form
            className=" w-full flex-1 h-full flex flex-col gap-2 p-2 border-box items-center justify-center"
            onSubmit={onSubmit}
          >
            <Container className="aspect-square w-15">
              <LogoSVG />
            </Container>
            <Heading as="h1" fontSize="medium">
              Register
            </Heading>
            <Container className="flex w-full flex-col gap-4">
              <InputField
                label="first Name"
                value={firstName}
                onChange={setFirstName}
                error={errors.firstName}
              />
              <InputField
                label="last Name"
                value={lastName}
                onChange={setLastName}
                error={errors.lastName}
              />
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
              <InputField
                label="confirm password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                error={errors.confirmPassword}
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
                "register"
              )}
            </Button>
          </form>
          <Link
            to={"/login"}
            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors capitalize"
          >
            log in
          </Link>
        </Container>
      )}
    </MainContainer>
  );
}
