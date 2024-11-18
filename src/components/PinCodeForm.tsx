import React, { useState } from "react";
import Input from "./Input/Input";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { changePin } from "../util/api/apiMethods";

interface FormFields {
  pin: string;
  forced_pin: string;
}

interface FormErrors {
  isPinCodeError: boolean;
  isForcedAccessPinCode: boolean;
}

const formFieldsDefaultValues: FormFields = {
  pin: "",
  forced_pin: "",
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

const successToast = (message: string) =>
  toast.success(message, {
    style: {
      border: "1px solid #224582",
      padding: "16px",
      color: "#224582",
      fontSize: "20px",
    },
    iconTheme: {
      primary: "#224582",
      secondary: "#f1f7ff",
    },
  });

const PinCodeForm = () => {
  const { code } = useParams();
  const [formFields, setFormFields] = useState<FormFields>(
    formFieldsDefaultValues
  );

  const [formErrors, setFormErrors] = useState<FormErrors>(
    formErrorsDefaultValues
  );

  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePinCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const result = event.target.value.replace(/\D/g, "");

    if (result.length <= 4) {
      setFormFields((prev) => ({
        ...prev,
        pin: result,
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
        forced_pin: result,
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

    if (!Boolean(code) && typeof code !== "string") {
      return;
    } else {
      try {
        setIsLoading(true);
        await changePin({ code: code as string, ...formFields });
        successToast("Готово!");
        setIsCompleted(true);
      } catch (error: any) {
        errorToast(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {isCompleted ? (
        <p className="success-message">
          <img src={`/assets/Tick.svg`} style={{ marginRight: "10px" }} />
          PIN-коди успішно змінено!
        </p>
      ) : (
        <form className="form" onSubmit={handleSubmit} autoComplete="off">
          <div className="input-block">
            <p className="input-block__title">
              PIN-код<span style={{ color: "#c01c1c" }}>*</span>
            </p>
            <div className="input-block__input-container">
              <Input
                value={formFields.pin}
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
                value={formFields.forced_pin}
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
                !formFields.pin ||
                !formFields.forced_pin ||
                isLoading ||
                !Boolean(code)
              }
            >
              {isLoading ? "Відправка..." : "Відправити"}
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default PinCodeForm;
