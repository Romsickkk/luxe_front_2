import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export async function updateNewImage(
  file: File,
  setNewAvatar: (url: string) => void,
  updateImage: (payload: { avatar: string }) => Promise<void>
) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("No auth token");
    navigate("/login");
    throw new Error("No auth token");
  }

  const formData = new FormData();
  formData.append("avatar", file);

  try {
    const response = await fetch("http://127.0.0.1:8000/api/admin/upload-avatar", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      toast.error(`Ошибка загрузки: ${errorData.message || "Неизвестная ошибка"}`);
      throw new Error(errorData.message || "Upload failed");
    }

    const data = await response.json();
    const imageUrl = data.url;

    await updateImage({ avatar: imageUrl });
    setNewAvatar(imageUrl);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Неизвестная ошибка";
    toast.error(`Ошибка: ${message}`);
    throw err;
  }
}
