import React, { useEffect, useState } from "react";
import { Container, Heading } from "~/components/ui";
import { Check } from "lucide-react";
import { useNavigate } from "react-router";
export function SuccessComponent() {
  const [secondsLeft, setSecondsLeft] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    if (secondsLeft === 0) navigate("/menu");
    const timer = setTimeout(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  return (
    <Container className="p-4 flex flex-col gap-6 justify-center  w-full md:w-auto items-center  md:shadow-sm md:rounded-sm md:border-purple-100 md:border-1 md:bg-white md:min-w-1/2 lg:min-w-1/4 md:min-h-[400px] flex flex-col">
      <Check className="h-12 w-12 text-emerald-600" strokeWidth={2.5} />
      <Heading as="h1" fontSize="large">
        Registry Successful
      </Heading>
      <p>Your account has been created and you're ready to go.</p>
      <p>For convenience, we're logging you in. Redirecting in {secondsLeft}</p>
    </Container>
  );
}
