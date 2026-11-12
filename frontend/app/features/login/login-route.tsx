import React, { useState } from "react";
import { LogoSVG } from "~/components/layout/logo-svg";
import { MainContainer } from "~/components/layout/main-container";
import { Container, Card, Button } from "~/components/ui";

export default function LoginRoute() {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <MainContainer className="min-h-screen flex items-center justify-center">
      <Card className="min-w-1/4 min-h-1/2 h-fit">
        <form className="w-full flex flex-col p-4 border-box items-center justify-items-center">
          <Container className="aspect-square w-15">
            <LogoSVG />
          </Container>
          <Container className="flex flex-col w-full relative">
            <label
              onClick={() => setIsFocused((prev) => !prev)}
              className={`bg-white px-1 py-0 absolute left-2 ${isFocused ? "top-1/2 -translate-y-1/2" : "top-0 -translate-y-1/2"} transition-all`}
            >
              Email
            </label>
            <input className="border-1 rounded-sm p-2" />
          </Container>
          <Container>
            <label>Email</label>
            <input />
          </Container>
          <Button>Login</Button>
        </form>
      </Card>
    </MainContainer>
  );
}
