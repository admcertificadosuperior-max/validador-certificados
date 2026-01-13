import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const codigo = searchParams.get("codigo");

  const { data } = await supabase
    .from("certificados")
    .select("*")
    .eq("codigo", codigo)
    .single();

  if (!data) {
    return Response.json({ valido: false });
  }

  return Response.json({
    valido: true,
    nome: data.nome,
    curso: data.curso,
    ano: data.ano
  });
}
