import React, { useState } from "react";
import Input from "./Input/Input";

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

const PinCodeForm = () => {
  const [formFields, setFormFields] = useState<FormFields>(
    formFieldsDefaultValues
  );
  const [formFieldsDuplicates, setFormFieldsDuplicates] = useState<FormFields>(
    formFieldsDefaultValues
  );

  const [formErrors, setFormErrors] = useState<FormErrors>(
    formErrorsDefaultValues
  );

  const handlePinCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormFields((prev) => ({
      ...prev,
      pin_code: event.target.value.trim(),
    }));
  };

  const handleForcedAccessPinCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormFields((prev) => ({
      ...prev,
      forced_access_pin_code: event.target.value.trim(),
    }));
  };

  const handlePinCodeDuplicateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormFieldsDuplicates((prev) => ({
      ...prev,
      pin_code: event.target.value.trim(),
    }));

    setFormErrors((currErrors) => ({
      ...currErrors,
      isPinCodeError: false,
    }));

    if (event.target.value !== formFields.pin_code) {
      setFormErrors((currErrors) => ({
        ...currErrors,
        isPinCodeError: true,
      }));
    }
  };

  const handleForcedAccessPinCodeDuplicateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormFieldsDuplicates((prev) => ({
      ...prev,
      forced_access_pin_code: event.target.value.trim(),
    }));

    setFormErrors((currErrors) => ({
      ...currErrors,
      isForcedAccessPinCode: false,
    }));

    if (event.target.value !== formFields.forced_access_pin_code) {
      setFormErrors((currErrors) => ({
        ...currErrors,
        isForcedAccessPinCode: true,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className="form" onSubmit={handleSubmit} autoComplete="off">
      <div className="input-block">
        <p className="input-block__title">PIN код</p>
        <div className="input-block__input-container">
          <Input
            value={formFields.pin_code}
            placeholder="Введіть PIN"
            isError={false}
            onChange={handlePinCodeChange}
          />
        </div>
        <div className="input-block__input-container">
          <Input
            value={formFieldsDuplicates.pin_code}
            placeholder="Введіть повторно PIN"
            isError={false}
            onChange={handlePinCodeDuplicateChange}
          />
        </div>
      </div>

      <div className="input-block">
        <p className="input-block__title">PIN код під примусом</p>
        <div className="input-block__input-container">
          <Input
            value={formFields.forced_access_pin_code}
            placeholder="Введіть PIN під примусом"
            isError={false}
            onChange={handleForcedAccessPinCodeChange}
          />
        </div>
        <div className="input-block__input-container">
          <Input
            value={formFieldsDuplicates.forced_access_pin_code}
            placeholder="Введіть повторно PIN під примусом"
            isError={false}
            onChange={handleForcedAccessPinCodeDuplicateChange}
          />
        </div>
      </div>

      <div className="submit-button-container">
        <button type="submit" className="submit-button">
          Відправити
        </button>
      </div>
    </form>
  );
};

export default PinCodeForm;
