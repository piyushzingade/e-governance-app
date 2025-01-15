
"use client"
import React, { useState } from 'react'

export default function PracticalFile() {

    const [formData, setFormData] = useState<any>({});
    const [errors, setErrors] = useState<any>({});
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;

      if (file) {
        const allowedTypes = ["image/doc"];

        if (!allowedTypes.includes(file.type)) {
          setErrors({
            ...errors,
            marksheet: "Only JPEG, PNG, and JPG files are allowed.",
          });
          setFormData({ ...formData, marksheet: null });
          return;
        }

        if (file.size > 10 * 1024 * 1024) {
          setErrors({
            ...errors,
            marksheet: "file size should not exceed than 10 mb.",
          });
          setFormData({ ...formData, marksheet: null });
          return;
        }
      }

      setFormData({ ...formData, marksheet: file });
      setErrors({ ...errors, marksheet: "" });
    };

    
  return (
    <div>
      <div className="border bg-white border-black mt-4 mb-10 p-5 ">
        <p>Send Practical File</p>
        <div className="mb-3">
          <label
            htmlFor="marksheet"
            className="block text-xs font-medium text-black"
          >
            Upload Pratical File
          </label>
          <input
            id="marksheet"
            type="file"
            onChange={handleFileChange}
            className=" mt-1 block w-full texts-xs text-black file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600 border border-gray-700/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.marksheet && (
            <p className="text-xs text-red-500 mt-1"> {errors.marksheet}</p>
          )}
        </div>
      </div>
    </div>
  );
}
