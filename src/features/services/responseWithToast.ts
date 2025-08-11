import toast from "react-hot-toast";

import { type AppDispatch } from "../../store/store";

import { setLoading } from "../../store/uiSlice";

interface SuccessResponse {
  message: string;
  [key: string]: any;
}

export async function responseWithToast<T extends SuccessResponse>(
  loadingMessage: string,
  fn: () => Promise<T>,
  dispatch: AppDispatch
): Promise<T | null> {
  dispatch(setLoading(true));

  const toastId = toast.loading(loadingMessage);

  try {
    const result = await fn();
    toast.success(result.message, { id: toastId });
    return result;
  } catch (error) {
    const err = error as { status?: number; data?: { message?: string } };
    toast.error(err?.data?.message || "Unknown Error", { id: toastId });
    return null;
  } finally {
    dispatch(setLoading(false));
  }
}
