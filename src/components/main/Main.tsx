import { Play, FileText } from "lucide-react";

export const Main = () => {
  return (
    <main className="flex flex-col overflow-hidden">
      <header className="px-10 py-4 bg-slate-800/70 border border-white/10">
        <button className="flex items-center gap-2">
          <Play size={16} /> Re-ejecutar
        </button>
      </header>

      {/* TODO: Add report view here */}
      <section className="flex-1 p-8 overflow-hidden relative flex">
        <div className="flex flex-col items-center gap-4 m-auto text-center">
          <FileText size={64} className="text-muted" strokeWidth={1} />
          <h3>Vista Previa del Reporte</h3>
          <p>
            Selecciona un reporte de la lista de la izquierda para visualizarlo.
          </p>
        </div>
      </section>
    </main>
  );
};
