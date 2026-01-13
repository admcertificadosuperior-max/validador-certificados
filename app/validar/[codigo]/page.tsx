export const dynamic = "force-dynamic";

import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

function mascararCPF(cpf: string) {
  if (!cpf) return "";
  const n = cpf.replace(/\D/g, "");
  if (n.length !== 11) return cpf;
  return `***.${n.slice(3, 6)}.${n.slice(6, 9)}-**`;
}

function formatarData(data: string) {
  if (!data) return "";
  return new Date(data).toLocaleDateString("pt-BR");
}

/* ====== ESTILOS ====== */
const tituloSecao = {
  fontSize: 18,
  fontWeight: 600,
  color: "#111827",
  marginBottom: 16,
};

const card = {
  border: "1px solid #e5e7eb",
  borderRadius: 6,
  padding: 20,
  marginBottom: 24,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 16,
};

const campo = {};
const label = { fontSize: 12, color: "#6b7280", marginBottom: 2 };
const valor = { fontSize: 14, color: "#111827" };

export default async function Validar({
  params,
}: {
  params: { codigo: string };
}) {
  const { data } = await supabase
    .from("certificados")
    .select("*")
    .eq("codigo", params.codigo)
    .single();

  const valido = !!data;

  return (
    <div
      style={{
        fontFamily: "Inter, Roboto, Helvetica, Arial, sans-serif",
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
        padding: "32px 16px",
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          backgroundColor: "#ffffff",
          padding: 40,
          borderRadius: 4,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        {/* CABEÇALHO */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Link href="/">
            <img
              src="https://portalinstitucional-assets.azureedge.net/strapi/assets/unopar_8f493bde5b_1_98d0368b58.png"
              style={{ height: 64, cursor: "pointer" }}
            />
          </Link>
          <h2 style={{ marginTop: 12 }}>Validação de Diploma</h2>
        </div>

        {/* STATUS */}
        <div
          style={{
            background: valido ? "#e6f4ea" : "#fdecea",
            borderLeft: `6px solid ${valido ? "#2e7d32" : "#c62828"}`,
            padding: 16,
            marginBottom: 32,
            fontWeight: 600,
          }}
        >
          {valido ? "Diploma válido" : "Diploma inválido"}
        </div>

        {!valido && (
          <p>Este diploma não consta na base de dados da instituição.</p>
        )}

        {valido && (
          <>
            {/* PDF */}
           {data.pdf_url && (
  <div
    style={{
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: 24,
    }}
  >
    <a
      href={data.pdf_url}
      target="_blank"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 10px",
        height: 28,
        border: "1px solid #d1d5db",
        borderRadius: 4,
        backgroundColor: "transparent",
        color: "#374151",
        fontSize: 12,
        fontWeight: 500,
        textDecoration: "none",
      }}
    >
      {/* Ícone download */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>

      Baixar diploma
    </a>
  </div>
)}



            {/* DIPLOMADO */}
            <div style={card}>
              <div style={tituloSecao}>Diplomado</div>
              <div style={grid}>
                <div><div style={label}>Nome</div><div style={valor}>{data.nome}</div></div>
                <div><div style={label}>CPF</div><div style={valor}>{mascararCPF(data.cpf)}</div></div>
                <div><div style={label}>Nacionalidade</div><div style={valor}>{data.nacionalidade}</div></div>
                <div><div style={label}>Naturalidade</div><div style={valor}>{data.naturalidade}</div></div>
                <div><div style={label}>Data de Nascimento</div><div style={valor}>{formatarData(data.data_nascimento)}</div></div>
                <div><div style={label}>Data de Ingresso</div><div style={valor}>{formatarData(data.data_ingresso)}</div></div>
              </div>
            </div>

            {/* DIPLOMA */}
            <div style={card}>
              <div style={tituloSecao}>Diploma</div>
              <div style={grid}>
                <div><div style={label}>Data de Expedição</div><div style={valor}>{formatarData(data.data_expedicao)}</div></div>
                <div><div style={label}>Número de Registro</div><div style={valor}>{data.numero_registro}</div></div>
                <div><div style={label}>Data de Registro</div><div style={valor}>{formatarData(data.data_registro)}</div></div>
              </div>
            </div>

            {/* CURSO */}
            <div style={card}>
              <div style={tituloSecao}>Dados do Curso</div>
              <div style={grid}>
                <div><div style={label}>Curso</div><div style={valor}>{data.nome_curso}</div></div>
                <div><div style={label}>Código e-MEC</div><div style={valor}>{data.codigo_emec_curso}</div></div>
                <div><div style={label}>Habilitação</div><div style={valor}>{data.nome_habilitacao}</div></div>
                <div><div style={label}>Título Conferido</div><div style={valor}>{data.titulo_conferido}</div></div>
                <div><div style={label}>Grau</div><div style={valor}>{data.grau_conferido}</div></div>
                <div><div style={label}>Polo</div><div style={valor}>{data.polo}</div></div>
              </div>
            </div>

            {/* INSTITUIÇÃO */}
            <div style={card}>
              <div style={tituloSecao}>Instituição Emissora</div>
              <div style={grid}>
                <div><div style={label}>Nome</div><div style={valor}>{data.instituicao_nome}</div></div>
                <div><div style={label}>Código e-MEC</div><div style={valor}>{data.instituicao_codigo_emec}</div></div>
                <div><div style={label}>CNPJ</div><div style={valor}>{data.instituicao_cnpj}</div></div>
                <div><div style={label}>Endereço</div><div style={valor}>{data.instituicao_endereco}</div></div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
