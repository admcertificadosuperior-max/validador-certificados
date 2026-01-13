export default function Validar({ params }: { params: { codigo: string } }) {
  return (
    <div style={{ padding: 40 }}>
      <h1>Rota validar funcionando</h1>
      <p>Código recebido: {params.codigo}</p>
    </div>
  );
}
