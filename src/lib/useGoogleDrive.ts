import { useState } from "react";

interface UseGoogleDriveResponse {
  fileUrl: string;
  loading: boolean;
  error: string | null;
  uploadFile: (file: File) => Promise<void>;
}

const useGoogleDrive = (): UseGoogleDriveResponse => {
  const [fileUrl, setFileUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/uploadToDrive", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file to Google Drive");
      }

      const data = await response.json();
      setFileUrl(data.fileUrl); // Google Drive file URL
    } catch (error: any) {
      setError(error.message || "An error occurred while uploading the file");
    } finally {
      setLoading(false);
    }
  };

  return { fileUrl, loading, error, uploadFile };
};

export default useGoogleDrive;
