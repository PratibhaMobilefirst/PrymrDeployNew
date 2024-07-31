const baseURL = "https://prymr-dev-backend.vercel.app/api";

export { baseURL };

export const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNlMGNhNzhjLWIwOGMtNDZlOS1hMTM0LTA2NWE2YjU3M2E2MiIsImZpcnN0TmFtZSI6IiIsImxhc3ROYW1lIjoiIiwiZW1haWwiOiJ1c2VyMkBnbWFpbC5jb20iLCJ3YWxsZXRBZGRyZXNzIjoiMiIsInByb2ZpbGVfaXNfY29tcGxldGVkIjpmYWxzZSwiY3JlYXRlZEF0IjoiMjAyNC0wNi0wNFQwNTozOTo1Ny4xNDBaIiwidXNlck5hbWUiOm51bGwsImlhdCI6MTcxNzQ3OTU5NywiZXhwIjoxNzM2NDg3NTk3fQ.B-XhRh8TmEMV4h6zTLRSVPiM7ULV0XyI0i5-2zUVR80";

import { toast } from "react-toastify";

const toastRegistry = new Set();

export const showToast = (message, options = {}, id = message) => {
  if (!toast.isActive(id) && !toastRegistry.has(id)) {
    toastRegistry.add(id);
    toast(message, {
      ...options,
      toastId: id,
      onClose: () => toastRegistry.delete(id),
    });
  }
};
