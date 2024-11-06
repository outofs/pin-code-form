import React, { useState } from "react";

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

  return (
    <div>
      <div>
        <p>PIN код</p>
        <input value={formFields.pin_code} onChange={handlePinCodeChange} />
        <input
          value={formFieldsDuplicates.pin_code}
          onChange={handlePinCodeDuplicateChange}
        />
      </div>

      <div>
        <p>PIN код під примусом</p>
        <input
          value={formFields.forced_access_pin_code}
          onChange={handleForcedAccessPinCodeChange}
        />
        <input
          value={formFieldsDuplicates.forced_access_pin_code}
          onChange={handleForcedAccessPinCodeDuplicateChange}
        />
      </div>
    </div>
  );
};

export default PinCodeForm;
