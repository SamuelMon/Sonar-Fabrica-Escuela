import React, { useState, FormEvent, ChangeEvent } from "react";
import InputText from "@/components/atoms/InputText";
import Button from "@/components/atoms/Button";

const Index = () => {
  const [form, setForm] = useState({
    correo: "",
    contrasena: "",
    nombre: "",
    apellido: "",
    documento: "",
    numero: "",
    idRol: 1,
    idTipoDocumento: 1,
    idEquipo: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      console.log("Datos a enviar:", form);

      // Agregamos un timeout de 10 segundos
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(
        "https://innosistemas-feature4.onrender.com/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            idRol: Number(form.idRol),
            idTipoDocumento: Number(form.idTipoDocumento),
            idEquipo: Number(form.idEquipo),
          }),
        }
      );

      clearTimeout(timeoutId);

      console.log("Status:", response.status);

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Error de conexión con el servidor" }));
        throw new Error(errorData.message ?? "Error en el registro");
      }

      const data = await response.json();
      setSuccess("Usuario registrado exitosamente");
      console.log("Respuesta exitosa:", data);
    } catch (err: unknown) {
      console.error("Error detallado:", err);
      if (err instanceof Error) {
        if (err.name === "AbortError") {
          setError("Tiempo de espera agotado. Por favor, intenta de nuevo.");
        } else {
          setError(err.message || "Error al conectar con el servidor");
        }
      } else {
        setError("Error al conectar con el servidor");
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
        <h2 className="text-xl font-bold mb-2">Registro</h2>
        <InputText
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
        />
        <InputText
          name="apellido"
          placeholder="Apellido"
          value={form.apellido}
          onChange={handleChange}
        />
        <InputText
          name="correo"
          type="email"
          placeholder="Correo"
          value={form.correo}
          onChange={handleChange}
        />
        <InputText
          name="contrasena"
          type="password"
          placeholder="Contraseña"
          value={form.contrasena}
          onChange={handleChange}
        />
        <InputText
          name="documento"
          placeholder="Documento"
          value={form.documento}
          onChange={handleChange}
        />
        <InputText
          name="numero"
          placeholder="Número Telefono"
          value={form.numero}
          onChange={handleChange}
        />
        <Button
          text={loading ? "Registrando..." : "Registrarse"}
          type="submit"
          disabled={loading}
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
      </form>
    </div>
  );
};

export default Index;
