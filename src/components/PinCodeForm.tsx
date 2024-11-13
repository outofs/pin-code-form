import React, { useState } from "react";
import Input from "./Input/Input";
import toast from "react-hot-toast";

interface FormFields {
  pin_code: string;
  forced_access_pin_code: string;
}

interface FormErrors {
  isPinCodeError: boolean;
  isForcedAccessPinCode: boolean;
}

const formFieldsDefaultValues: FormFields = {
  pin_code: "",
  forced_access_pin_code: "",
};

const formErrorsDefaultValues: FormErrors = {
  isPinCodeError: false,
  isForcedAccessPinCode: false,
};

const errorToast = (message: string) =>
  toast.error(message, {
    style: {
      border: "1px solid #c01c1c",
      padding: "16px",
      color: "#c01c1c",
      fontSize: "20px",
    },
    iconTheme: {
      primary: "#c01c1c",
      secondary: "#ffeaeaab",
    },
  });

const PinCodeForm = () => {
  const [formFields, setFormFields] = useState<FormFields>(
    formFieldsDefaultValues
  );

  const [formErrors, setFormErrors] = useState<FormErrors>(
    formErrorsDefaultValues
  );

  const [errorMessage, setErrorMessage] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePinCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const result = event.target.value.replace(/\D/g, "");

    if (result.length <= 4) {
      setFormFields((prev) => ({
        ...prev,
        pin_code: result,
      }));
    }

    if (result.length < 4) {
      setFormErrors((prev) => ({
        ...prev,
        isPinCodeError: true,
      }));
    } else {
      setFormErrors((prev) => ({
        ...prev,
        isPinCodeError: false,
      }));
    }
  };

  const handleForcedAccessPinCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const result = event.target.value.replace(/\D/g, "");

    if (result.length <= 4) {
      setFormFields((prev) => ({
        ...prev,
        forced_access_pin_code: result,
      }));
    }

    if (result.length < 4) {
      setFormErrors((prev) => ({
        ...prev,
        isForcedAccessPinCode: true,
      }));
    } else {
      setFormErrors((prev) => ({
        ...prev,
        isForcedAccessPinCode: false,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      console.log("Submit!");
      errorToast("Error! Something went wrong! Please, try later!");
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit} autoComplete="off">
      <div className="input-block">
        <p className="input-block__title">
          PIN-код<span style={{ color: "#c01c1c" }}>*</span>
        </p>
        <div className="input-block__input-container">
          <Input
            value={formFields.pin_code}
            placeholder="Введіть PIN"
            disabled={isLoading}
            isError={formErrors.isPinCodeError}
            onChange={handlePinCodeChange}
          />
        </div>
      </div>

      <div className="input-block">
        <p className="input-block__title">
          PIN-код під примусом<span style={{ color: "#c01c1c" }}>*</span>
        </p>
        <div className="input-block__input-container">
          <Input
            value={formFields.forced_access_pin_code}
            placeholder="Введіть PIN"
            disabled={isLoading}
            isError={formErrors.isForcedAccessPinCode}
            onChange={handleForcedAccessPinCodeChange}
          />
        </div>
      </div>

      <div className="submit-button-container">
        <button
          type="submit"
          className="submit-button"
          disabled={
            formErrors.isPinCodeError ||
            formErrors.isForcedAccessPinCode ||
            !formFields.pin_code ||
            !formFields.forced_access_pin_code ||
            isLoading
          }
        >
          {isLoading ? "Відправка..." : "Відправити"}
        </button>
      </div>
    </form>
  );
};

export default PinCodeForm;
