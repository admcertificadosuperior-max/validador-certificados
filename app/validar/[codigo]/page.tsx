import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

function mascararCPF(cpf: string) {
  if (!cpf) return "";
  return cpf.replace(/^(\d{3})\d{3}(\d{3})\d{2}$/, "***.$2.$3-**");
}

function formatarData(data: string) {
  if (!data) return "";
  return new Date(data).toLocaleDateString("pt-BR");
}

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
    <div style={{ background: "#f2f2f2", minHeight: "100vh", padding: 24 }}>
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          background: "#fff",
          padding: 32,
          borderRadius: 6,
          boxShadow: "0 1px 6px rgba(0,0,0,.1)",
        }}
      >
        {/* CABEÇALHO */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <img src="/logo.png" height={64} />
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
            <h3>Dados públicos do diploma</h3>

            <h4>Diplomado</h4>
            <p><strong>Nome</strong><br />{data.nome}</p>
            <p><strong>Nacionalidade</strong><br />{data.nacionalidade}</p>
            <p><strong>Naturalidade</strong><br />{data.naturalidade}</p>
            <p><strong>CPF</strong><br />{mascararCPF(data.cpf)}</p>
            <p><strong>Data de Nascimento</strong><br />{formatarData(data.data_nascimento)}</p>
            <p><strong>Data de Ingresso</strong><br />{formatarData(data.data_ingresso)}</p>

            <h4>Diploma</h4>
            <p><strong>Data de Expedição</strong><br />{formatarData(data.data_expedicao)}</p>
            <p><strong>Número de Registro</strong><br />{data.numero_registro}</p>
            <p><strong>Data de Registro</strong><br />{formatarData(data.data_registro)}</p>

            <h4>Dados do Curso</h4>
            <p><strong>Nome do Curso</strong><br />{data.nome_curso}</p>
            <p><strong>Código do Curso e-MEC</strong><br />{data.codigo_emec_curso}</p>
            <p><strong>Nome da Habilitação</strong><br />{data.nome_habilitacao}</p>
            <p><strong>Título Conferido</strong><br />{data.titulo_conferido}</p>
            <p><strong>Grau Conferido</strong><br />{data.grau_conferido}</p>
            <p><strong>Endereço do Curso</strong><br />{data.endereco_curso}</p>
            <p><strong>Polo</strong><br />{data.polo}</p>
            <p><strong>Autorização</strong><br />{data.autorizacao}</p>
            <p><strong>Reconhecimento</strong><br />{data.reconhecimento}</p>
            <p><strong>Renovação de Reconhecimento</strong><br />{data.renovacao_reconhecimento}</p>

            <h4>Instituição de Ensino Emissora</h4>
            <p><strong>Nome</strong><br />{data.instituicao_nome}</p>
            <p><strong>Código e-MEC</strong><br />{data.instituicao_codigo_emec}</p>
            <p><strong>CNPJ</strong><br />{data.instituicao_cnpj}</p>
            <p><strong>Endereço</strong><br />{data.instituicao_endereco}</p>
            <p><strong>Credenciamento</strong><br />{data.instituicao_credenciamento}</p>
            <p><strong>Recredenciamento</strong><br />{data.instituicao_recredenciamento}</p>
            <p><strong>Mantenedora</strong><br />{data.instituicao_mantenedora}</p>

            <h4>Instituição de Ensino Registradora</h4>
            <p><strong>Nome</strong><br />{data.registradora_nome}</p>
            <p><strong>Código e-MEC</strong><br />{data.registradora_codigo_emec}</p>
            <p><strong>CNPJ</strong><br />{data.registradora_cnpj}</p>
            <p><strong>Endereço</strong><br />{data.registradora_endereco}</p>
            <p><strong>Credenciamento</strong><br />{data.registradora_credenciamento}</p>
            <p><strong>Recredenciamento</strong><br />{data.registradora_recredenciamento}</p>
            <p><strong>Mantenedora</strong><br />{data.registradora_mantenedora}</p>
          </>
        )}
      </div>
    </div>
  );
}
