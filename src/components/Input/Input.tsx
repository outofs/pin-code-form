import React, { FC, useState } from "react";
import "./index.css";
type Props = {
  value: string;
  isError: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: FC<Props> = ({ value, isError, onChange }) => {
  const [isPasswordVisible, setIsPasswordVsible] = useState<boolean>(false);

  return (
    <div>
      <input value={value} onChange={onChange} />
    </div>
  );
};

export default Input;
