import axios from "axios";
import { router } from "@/app/router.ts";

const apiUrl = __APP_ENV__.VITE_API_URL;

export async function generateEncryptKey(): Promise<string> {
  const key = await window.crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"],
  );
  const exportedKey = await window.crypto.subtle.exportKey("raw", key);
  return btoa(String.fromCharCode(...new Uint8Array(exportedKey)));
}

export const logout = async () => {
  await axios.post(`${apiUrl}/auth/logout`);
  await router.push("/sign-in");
  console.log("go");
};
