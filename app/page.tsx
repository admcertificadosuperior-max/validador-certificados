"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [codigo, setCodigo] = useState("");
  const router = useRouter();

  function consultar(e: React.FormEvent) {
    e.preventDefault();
    if (!codigo.trim()) return;
    router.push(`/validar/${codigo.trim()}`);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 420,
          width: "100%",
          background: "#fff",
          padding: 32,
          borderRadius: 6,
          boxShadow: "0 2px 10px rgba(0,0,0,.1)",
          textAlign: "center",
        }}
      >
        <img
          src="https://portalinstitucional-assets.azureedge.net/strapi/assets/unopar_8f493bde5b_1_98d0368b58.png"
          style={{ height: 56, marginBottom: 24 }}
        />

        <h2 style={{ marginBottom: 8 }}>Validação de Diploma</h2>
        <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 24 }}>
          Informe o código do diploma
        </p>

        <form onSubmit={consultar}>
          <input
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Ex: 000.000.x0000xxx000x"
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 4,
              border: "1px solid #d1d5db",
              marginBottom: 16,
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: 12,
              background: "#2563eb",
              color: "#fff",
              fontWeight: 600,
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Consultar diploma
          </button>
        </form>
      </div>
    </div>
  );
}
