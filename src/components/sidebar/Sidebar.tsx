import { useContext } from 'react';
import { ChevronRight, FileText, Loader2 } from 'lucide-react';
import { ReportsContext } from '../../context/reports.context';

export const Sidebar = () => {
  const { reports, loadingReports, setSelectedReport } = useContext(ReportsContext);


  return (
    <aside className="flex flex-col border-r border-white/5">
      <header className="p-6 flex justify-between items-center border-b border-white/5">
        <h1 className="flex items-center gap-3 font-bold text-lg">
          <FileText className="text-primary" />

          <span>Sakila Reports App</span>
        </h1>
      </header>
      <nav className="flex-1 overflow-y-auto p-6">
        <h3 className="text-xs uppercase tracking-wider text-muted mb-4">
          Reportes Disponibles
        </h3>
        <ul>

          { 
            loadingReports ? (
              <li>
                <Loader2 size={16} className="animate-spin" />
              </li>
            ) : (
              reports.map((report) => (
                <li key={report.uri} 
                  className="cursor-pointer p-2 hover:bg-white/10 flex justify-between items-center" 
                  onClick={() => setSelectedReport(report)} >

                  <div className="flex flex-col gap-0.5">
                    <span className="truncate font-medium">{report.label}</span>
                    <span className="truncate text-xs text-muted">{report.description}</span>
                  </div>
                  <ChevronRight size={16} className="text-(--text-muted)" />
                  
                </li>
              ))
            )
          }
          
        </ul>
      </nav>
    </aside>
  );
};
