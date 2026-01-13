"use client";
import { useState } from "react";

export default function Home() {
  const [codigo, setCodigo] = useState("");
  const [dados, setDados] = useState<any>(null);

  async function validar() {
    const res = await fetch(`/api/validar?codigo=${codigo}`);
    const data = await res.json();
    setDados(data);
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ maxWidth: 400, width: "100%", padding: 24, border: "1px solid #ddd", borderRadius: 12 }}>
        <h2>Validação de Certificado</h2>

        <input
          placeholder="Código do certificado"
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
          onChange={(e) => setCodigo(e.target.value)}
        />

        <button onClick={validar} style={{ width: "100%", padding: 10 }}>
          Validar
        </button>

        {dados && (
          <div style={{ marginTop: 16 }}>
            {dados.valido ? (
              <>
                <p>✅ Certificado válido</p>
                <p><b>Nome:</b> {dados.nome}</p>
                <p><b>Curso:</b> {dados.curso}</p>
                <p><b>Ano:</b> {dados.ano}</p>
              </>
            ) : (
              <p>❌ Código não encontrado</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
