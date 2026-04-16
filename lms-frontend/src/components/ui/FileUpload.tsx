"use client";

import { useState, useEffect } from "react";

export default function FileUpload({
  preview,
  onFileSelect,
}: any) {
  const [localPreview, setLocalPreview] = useState<string>("");

  
  useEffect(() => {
    if (preview) {
      setLocalPreview(preview);
    }
  }, [preview]);

  const handleChange = (e: any) => {
    const file = e.target.files[0];

    if (!file) return;

    onFileSelect(file);

    // create preview
    const url = URL.createObjectURL(file);
    setLocalPreview(url);
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />

      {/* SHOW EXISTING OR NEW IMAGE */}
      {localPreview && (
        <img
          src={localPreview}
          alt="preview"
          style={{
            width: "150px",
            marginTop: "10px",
            borderRadius: "8px",
          }}
        />
      )}
    </div>
  );
}