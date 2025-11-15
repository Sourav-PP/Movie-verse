import type { AxiosError } from "axios";
import toast from "react-hot-toast";

export const handleApiError = (err: unknown) => {
  const error = err as AxiosError<{ message?: string }>;

  // Handle 404 Route not found (optional)
  if (error.response?.status === 404) {
    const msg = error.response.data?.message;
    if (msg === "Route not found") return; // ignore silently
  }

  // Get clean message
  const message =
    error.response?.data?.message ||
    (error.response ? `HTTP ${error.response.status} Error` : "Network error");

  toast.error(message);
};