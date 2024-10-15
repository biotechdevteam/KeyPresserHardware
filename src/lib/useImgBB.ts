import { useState } from "react";

interface UseImgbbResponse {
  imageUrl: string;
  loading: boolean;
  error: string | null;
  uploadImage: (image: File) => Promise<void>;
}

const useImgbb = (): UseImgbbResponse => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (image: File) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      setImageUrl(data.data.url);
    } catch (error: any) {
      setError(error.message || "An error occurred while uploading the image");
    } finally {
      setLoading(false);
    }
  };

  return { imageUrl, loading, error, uploadImage };
};

export default useImgbb;
