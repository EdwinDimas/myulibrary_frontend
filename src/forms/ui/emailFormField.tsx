import React, { useState } from 'react';

interface InputProps {
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
}

export const EmailFormField: React.FC<InputProps> = ({ type = "email", name, value, onChange, ...props }) => {
  const [isValid, setIsValid] = useState(true);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(e.target.value)) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  return (
    <div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        className={`border p-2 rounded w-full ${!isValid ? 'border-red-500' : ''}`}
        {...props}
      />
      {!isValid && <p className="text-red-500 text-sm">Please enter a valid email address.</p>}
    </div>
  );
};
