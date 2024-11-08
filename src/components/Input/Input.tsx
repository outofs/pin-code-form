import React, { FC, useState } from "react";
import "./index.css";

type Props = {
  value: string;
  isError: boolean;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: FC<Props> = ({ value, placeholder, isError, onChange }) => {
  const [isPasswordVisible, setIsPasswordVsible] = useState<boolean>(false);

  return (
    <div className="input-container">
      <input
        type={isPasswordVisible ? "text" : "password"}
        autoComplete="new-password"
        className="form-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      <button
        type="button"
        className="eye-icon"
        onClick={() => setIsPasswordVsible(!isPasswordVisible)}
      >
        <img
          src={`/assets/${isPasswordVisible ? "EyeClosed.svg" : "Eye.svg"}`}
        />
      </button>
    </div>
  );
};

export default Input;
