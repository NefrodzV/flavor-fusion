import React, { useState, type SubmitEvent } from "react";
import { LogoSVG } from "~/components/layout/logo-svg";
import { MainContainer } from "~/components/layout/main-container";
import { Container, Card, Button, Heading, InputField } from "~/components/ui";

export default function LoginRoute() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitIsDisabled = !email || !password;

  // TODO: Make the logic for error handling
  const onSubmit = (e: SubmitEvent) => {
    e.preventDefault();
  };

  return (
    <MainContainer className="min-h-screen flex items-center justify-center">
      <Card className="min-w-1/4 min-h-1/2 h-fit">
        <form
          className="w-full flex flex-col gap-2 p-2 border-box items-center justify-items-center"
          onSubmit={onSubmit}
        >
          <Container className="aspect-square w-15">
            <LogoSVG />
          </Container>
          <Heading as="h1" fontSize="medium">
            Log in
          </Heading>
          <InputField label="email" value={email} onChange={setEmail} />
          <InputField
            label="password"
            value={password}
            onChange={setPassword}
          />
          <Button css="min-w-1/3 " disabled={submitIsDisabled}>
            Login
          </Button>
        </form>
      </Card>
    </MainContainer>
  );
}
