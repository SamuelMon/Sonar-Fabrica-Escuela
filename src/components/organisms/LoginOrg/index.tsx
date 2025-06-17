import React, { useState, FormEvent } from "react";
import Image from "next/image";
import InputText from "@/components/atoms/InputText";
import Button from "@/components/atoms/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { login, showNotification } = useAuth();
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://inno4-production.up.railway.app/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ correo, contrasena }),
        }
      );

      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const data = await response.json();
      login(data.token);
      showNotification("¡Inicio de sesión exitoso!", "success");
      router.push("/");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido";
      setError(errorMessage);
      showNotification(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent">
      <div className="fixed top-10 mb-8">
        <Image
          src="/innoSistemasLogo.png"
          alt="InnoSistemas Logo"
          width={400}
          height={160}
          priority
          className="object-contain"
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80 flex flex-col gap-4 mt-48"
      >
        <h2 className="text-xl font-bold mb-2">Iniciar Sesión</h2>
        <InputText
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <InputText
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
        <Button
          text={loading ? "Cargando..." : "Entrar"}
          type="submit"
          disabled={loading}
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div className="text-sm text-center mt-4">
          ¿No tienes una cuenta?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Regístrate aquí
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Index;
