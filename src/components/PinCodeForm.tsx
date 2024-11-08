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
      <div>
        <p>PIN код</p>
        <Input
          value={formFields.pin_code}
          placeholder="Введіть PIN"
          isError={false}
          onChange={handlePinCodeChange}
        />
        <Input
          value={formFieldsDuplicates.pin_code}
          placeholder="Введіть повторно PIN"
          isError={false}
          onChange={handlePinCodeDuplicateChange}
        />
      </div>

      <div>
        <p>PIN код під примусом</p>
        <Input
          value={formFields.forced_access_pin_code}
          isError={false}
          onChange={handleForcedAccessPinCodeChange}
        />
        <Input
          value={formFieldsDuplicates.forced_access_pin_code}
          isError={false}
          onChange={handleForcedAccessPinCodeDuplicateChange}
        />
      </div>

      <div>
        <button type="submit" className="submit-button">
          Відправити
        </button>
      </div>
    </form>
  );
};

export default PinCodeForm;
