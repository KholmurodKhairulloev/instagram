/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/LoginPage.tsx  (или где у тебя находится страница логина)
import { useState } from "react";
import { useNavigate } from "react-router";
import WebLogo from "@/assets/photo_2025-04-04_16-36-39.jpg";
import { useLoginMutation } from '@/entities/account/api/authApi'
import { LoginForm } from '@/pages/(protected)/authForm'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const navigate =  useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (data: { username: string; password: string }) => {
    try {
      setError(null);
      const response = await login(data).unwrap();

      // Предполагаем структуру ответа: { token: string } или { data: { token: string } }
      // Измени под реальную структуру твоего бэкенда!
      const accessToken = response?.data

      if (accessToken) {
        localStorage.setItem("access_token", accessToken);
        navigate("/", { replace: true });
      } else {
        setError("Токен не получен от сервера");
      }
    } catch (err: any) {
      console.error("Login error:", err);

      const serverMessage =
        err?.data?.message ||
        err?.data?.error ||
        (err?.status === 500 ? "Ошибка сервера (500)" : "");

      setError(serverMessage || "Не удалось войти. Проверьте данные.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-10 p-4 sm:flex-row sm:items-start">
      <div className="hidden sm:flex sm:w-1/2 sm:justify-center lg:justify-end">
        <img
          src={WebLogo}
          alt="App Logo"
          className="w-40 sm:w-64 lg:w-96"
        />
      </div>

      <div className="w-full max-w-md sm:w-96">
        <LoginForm onSubmit={handleLogin} />
        {error && <p className="mt-4 text-center text-red-600">{error}</p>}
        {isLoading && <p className="mt-4 text-center">Загрузка...</p>}
      </div>
    </div>
  );
}