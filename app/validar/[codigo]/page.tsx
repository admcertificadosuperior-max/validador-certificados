import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

function mascararCPF(cpf: string) {
  if (!cpf) return "";

  const somenteNumeros = cpf.replace(/\D/g, "");

  if (somenteNumeros.length !== 11) return cpf;

  return `***.${somenteNumeros.slice(3, 6)}.${somenteNumeros.slice(
    6,
    9
  )}-**`;
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
  marginTop: 36,
  marginBottom: 20,
};

const subtitulo = {
  fontSize: 14,
  fontWeight: 600,
  color: "#374151",
  marginTop: 24,
  marginBottom: 12,
};

const campo = {
  marginBottom: 14,
};

const label = {
  fontSize: 12,
  color: "#6b7280",
};

const valor = {
  fontSize: 14,
  color: "#111827",
};

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
          maxWidth: 980,
          margin: "0 auto",
          backgroundColor: "#ffffff",
          padding: 40,
          borderRadius: 4,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        {/* CABEÇALHO */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <img
            src="https://portalinstitucional-assets.azureedge.net/strapi/assets/unopar_8f493bde5b_1_98d0368b58.png"
            alt="Instituição de Ensino"
            style={{ height: 64, marginBottom: 12 }}
          />
          <h2
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#1f2937",
              margin: 0,
            }}
          >
            Validação de Diploma
          </h2>
        </div>

        {/* STATUS */}
        <div
          style={{
            backgroundColor: valido ? "#e6f4ea" : "#fdecea",
            borderLeft: `6px solid ${valido ? "#2e7d32" : "#c62828"}`,
            padding: 16,
            marginBottom: 32,
            fontWeight: 600,
            color: "#1f2937",
          }}
        >
          {valido ? "Diploma válido" : "Diploma inválido"}
        </div>

        {!valido && (
          <p style={{ color: "#374151" }}>
            Este diploma não consta na base de dados da instituição.
          </p>
        )}

        {valido && (
          <>
            {/* BOTÃO PDF */}
            {data.pdf_url && (
              <div style={{ marginBottom: 32 }}>
                <a
                  href={data.pdf_url}
                  target="_blank"
                  style={{
                    display: "inline-block",
                    backgroundColor: "#2563eb",
                    color: "#ffffff",
                    padding: "10px 20px",
                    borderRadius: 4,
                    textDecoration: "none",
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  Baixar diploma em PDF
                </a>
              </div>
            )}

            <div style={tituloSecao}>Dados públicos do diploma</div>

            <div style={subtitulo}>Diplomado</div>
            <div style={campo}><div style={label}>Nome</div><div style={valor}>{data.nome}</div></div>
            <div style={campo}><div style={label}>Nacionalidade</div><div style={valor}>{data.nacionalidade}</div></div>
            <div style={campo}><div style={label}>Naturalidade</div><div style={valor}>{data.naturalidade}</div></div>
            <div style={campo}><div style={label}>CPF</div><div style={valor}>{mascararCPF(data.cpf)}</div></div>
            <div style={campo}><div style={label}>Data de Nascimento</div><div style={valor}>{formatarData(data.data_nascimento)}</div></div>
            <div style={campo}><div style={label}>Data de Ingresso</div><div style={valor}>{formatarData(data.data_ingresso)}</div></div>

            <div style={subtitulo}>Diploma</div>
            <div style={campo}><div style={label}>Data de Expedição</div><div style={valor}>{formatarData(data.data_expedicao)}</div></div>
            <div style={campo}><div style={label}>Número de Registro</div><div style={valor}>{data.numero_registro}</div></div>
            <div style={campo}><div style={label}>Data de Registro</div><div style={valor}>{formatarData(data.data_registro)}</div></div>

            <div style={subtitulo}>Dados do Curso</div>
            <div style={campo}><div style={label}>Nome do Curso</div><div style={valor}>{data.nome_curso}</div></div>
            <div style={campo}><div style={label}>Código do Curso e-MEC</div><div style={valor}>{data.codigo_emec_curso}</div></div>
            <div style={campo}><div style={label}>Nome da Habilitação</div><div style={valor}>{data.nome_habilitacao}</div></div>
            <div style={campo}><div style={label}>Título Conferido</div><div style={valor}>{data.titulo_conferido}</div></div>
            <div style={campo}><div style={label}>Grau Conferido</div><div style={valor}>{data.grau_conferido}</div></div>
            <div style={campo}><div style={label}>Endereço do Curso</div><div style={valor}>{data.endereco_curso}</div></div>
            <div style={campo}><div style={label}>Polo</div><div style={valor}>{data.polo}</div></div>
            <div style={campo}><div style={label}>Autorização</div><div style={valor}>{data.autorizacao}</div></div>
            <div style={campo}><div style={label}>Reconhecimento</div><div style={valor}>{data.reconhecimento}</div></div>
            <div style={campo}><div style={label}>Renovação de Reconhecimento</div><div style={valor}>{data.renovacao_reconhecimento}</div></div>

            <div style={subtitulo}>Instituição de Ensino Emissora</div>
            <div style={campo}><div style={label}>Nome</div><div style={valor}>{data.instituicao_nome}</div></div>
            <div style={campo}><div style={label}>Código e-MEC</div><div style={valor}>{data.instituicao_codigo_emec}</div></div>
            <div style={campo}><div style={label}>CNPJ</div><div style={valor}>{data.instituicao_cnpj}</div></div>
            <div style={campo}><div style={label}>Endereço</div><div style={valor}>{data.instituicao_endereco}</div></div>
            <div style={campo}><div style={label}>Credenciamento</div><div style={valor}>{data.instituicao_credenciamento}</div></div>
            <div style={campo}><div style={label}>Recredenciamento</div><div style={valor}>{data.instituicao_recredenciamento}</div></div>
            <div style={campo}><div style={label}>Mantenedora</div><div style={valor}>{data.instituicao_mantenedora}</div></div>

            <div style={subtitulo}>Instituição de Ensino Registradora</div>
            <div style={campo}><div style={label}>Nome</div><div style={valor}>{data.registradora_nome}</div></div>
            <div style={campo}><div style={label}>Código e-MEC</div><div style={valor}>{data.registradora_codigo_emec}</div></div>
            <div style={campo}><div style={label}>CNPJ</div><div style={valor}>{data.registradora_cnpj}</div></div>
            <div style={campo}><div style={label}>Endereço</div><div style={valor}>{data.registradora_endereco}</div></div>
            <div style={campo}><div style={label}>Credenciamento</div><div style={valor}>{data.registradora_credenciamento}</div></div>
            <div style={campo}><div style={label}>Recredenciamento</div><div style={valor}>{data.registradora_recredenciamento}</div></div>
            <div style={campo}><div style={label}>Mantenedora</div><div style={valor}>{data.registradora_mantenedora}</div></div>
          </>
        )}
      </div>
    </div>
  );
}
