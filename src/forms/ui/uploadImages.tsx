import { useState } from "react";

interface ImageUploadButtonProps {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
  }
  
  export default function ImageUploadButton(props: ImageUploadButtonProps) {
    const { onChange, required } = props;
    const handleChange = onChange ?? (() => {});
    
    const [fileName, setFileName] = useState("");
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        setFileName(event.target.files[0].name);
      } else {
        setFileName("");
      }
      handleChange(event);
    };
  
    return (
      <div className="flex items-center space-x-2">
        <input
          id="file"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          required={required}
        />
        <label
          htmlFor="file"
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
        >
          Select File
        </label>
        {fileName && <span className="text-gray-700">{fileName}</span>}
      </div>
    );
  }