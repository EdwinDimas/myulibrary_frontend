import { ChangeEvent } from "react";




interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string | number;
}
export const Input: React.FC<InputProps> = ({ type = "text", name, value, onChange, ...props }) => (
  <input type={type} name={name} value={value} onChange={onChange} className="border p-2 rounded w-full" {...props} />
);

export const Image: React.FC<{ onChange: (e: ChangeEvent<HTMLInputElement>) => void, required: boolean | undefined }> = ({ onChange, required }) => {
  return (
    <>
  
    <input id="file" type="file" accept="image/*" onChange={onChange} className="hidden" required={required} />
    <label htmlFor="file">Select file</label>

    </>
  )
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
export const Button: React.FC<ButtonProps> = ({ children, className = "", ...props }) => (
  <button className={`bg-blue-500 text-white p-2 rounded ${className}`} {...props}>{children}</button>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  value: string;
  children: React.ReactNode;
}
export const Select: React.FC<SelectProps> = ({ name, value, onChange, children, ...props }) => (
  <select name={name} value={value} onChange={onChange} className="border p-2 rounded w-full" {...props}>
    {children}
  </select>
);

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  value: string;
}
export const Textarea: React.FC<TextareaProps> = ({ name, value, onChange, ...props }) => (
  <textarea name={name} value={value} onChange={onChange} className="border p-2 rounded w-full" {...props}></textarea>
);

interface LabelProps {
  children: React.ReactNode;
}
export const Label: React.FC<LabelProps> = ({ children }) => (
  <label className="block font-semibold mb-1">{children}</label>
);
