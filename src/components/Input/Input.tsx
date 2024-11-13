import React, { FC, useState } from "react";
import "./index.css";

type Props = {
  value: string;
  disabled: boolean;
  isError: boolean;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: FC<Props> = ({
  value,
  disabled,
  placeholder,
  isError,
  onChange,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  return (
    <>
      <div className={`input-container${isError ? " error" : ""}`}>
        <input
          type={isPasswordVisible ? "text" : "password"}
          autoComplete="new-password"
          className="form-input"
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={onChange}
        />

        <button
          type="button"
          className="eye-icon"
          onMouseDown={() => setIsPasswordVisible(true)}
          onMouseUp={() => {
            setIsPasswordVisible(false);
          }}
          onTouchStart={() => setIsPasswordVisible(true)}
          onTouchEnd={() => setIsPasswordVisible(false)}
        >
          <img
            src={`/assets/${isPasswordVisible ? "EyeClosed.svg" : "Eye.svg"}`}
          />
        </button>
      </div>
      {isError && (
        <p className="error-message">PIN-код повинен містити 4 цифри!</p>
      )}
    </>
  );
};

export default Input;
