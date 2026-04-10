import { useContext } from "react";

import { Play, FileText, Loader2 } from "lucide-react";
import { ReportsContext } from "../../context/reports.context";

export const Main = () => {
  const { reportUrl, loadingReport, selectedReport, load } =
    useContext(ReportsContext);

  return (
    <main className="flex flex-col overflow-hidden">
      <header className="px-10 py-4 bg-slate-800/70 border border-white/10">
        <button className="flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed" 
          onClick={() => void load()} 
          disabled={!selectedReport}
          title={!selectedReport ? "No hay reporte seleccionado" : "Re-ejecutar reporte"}>
          <Play size={16} /> Re-ejecutar
        </button>
      </header>

      {/* TODO: Add report view here */}
      <section className="flex-1 p-8 overflow-hidden relative flex">
        {
          // If loading report, show loading state
          loadingReport ? (
            <div className="flex flex-col items-center gap-4 m-auto text-center">
              <Loader2 size={64} className="text-muted" strokeWidth={1} />
              <h3>Cargando reporte...</h3>
            </div>
          ) : 
          // If report url is available, show report iframe
          reportUrl ? (
            <iframe
              src={reportUrl}
              title="Report Viewer"
              className="report-iframe"
              onError={(e) => {
                console.error("Iframe error:", e);
              }}
              onLoad={() => {
                console.log("Iframe loaded successfully");
              }}
            />
          ) : (
            // If no report url is available, show empty state
            <div className="flex flex-col items-center gap-4 m-auto text-center">
              <FileText size={64} className="text-muted" strokeWidth={1} />
              <h3>Vista Previa del Reporte</h3>
              <p>
                Selecciona un reporte de la lista de la izquierda para
                visualizarlo.
              </p>
            </div>
          )
        }
      </section>
    </main>
  );
};
