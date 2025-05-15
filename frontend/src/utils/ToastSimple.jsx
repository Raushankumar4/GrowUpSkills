import { toast } from "sonner";


export const showSuccessToast = (message) => {
  toast.success(message);
};


export const showErrorToast = (message) => {
  toast.error(message);
};


export const showLoadingToast = (message) => {
  toast.loading(message);
};
