import React, { useState, FormEvent } from "react";
import InputText from "@/components/atoms/InputText";
import Button from "@/components/atoms/Button";
import Link from "next/link";

const Index = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    console.log("Enviando:", { correo, contrasena });

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
      setToken(data.token);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al iniciar sesión");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80 flex flex-col gap-4"
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
        {token && (
          <div className="text-green-600 break-all">Token: {token}</div>
        )}
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
