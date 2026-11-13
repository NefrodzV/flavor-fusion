import React, { useState } from "react";
import { Container } from "./container";
interface InputLabelProps {
  label: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

export function InputField({ label, value, onChange }: InputLabelProps) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const isActive = isFocused || value.length > 0;
  return (
    <Container>
      <Container className="flex flex-col w-full relative">
        <label
          htmlFor={label}
          className={`bg-white capitalize pointer-events-none cursor-text px-1 py-0 absolute left-2 ${isActive ? "top-0 -translate-y-1/2" : "top-1/2 -translate-y-1/2"} transition-all`}
        >
          {label}
        </label>
        <input
          id={label}
          className="border-1 w-full rounded-sm p-3 outline-purple-300 [&:-webkit-autofill]:[box-shadow:0_0_0_30px_white_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:inherit]"
          onChange={(e) => onChange(e.target.value)}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </Container>
      <span className="text-red-400 px-1">Error in input here</span>
    </Container>
  );
}
