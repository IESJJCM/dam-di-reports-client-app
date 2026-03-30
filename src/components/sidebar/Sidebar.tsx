  import { ChevronRight, FileText } from "lucide-react";

  export const Sidebar = () => {
    return (
      <aside className="flex flex-col border-r border-white/5">
        <header 
          className="p-6 flex justify-between items-center border-b border-white/5">
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
            {/* TODO: Add reports here */}
            <li className="cursor-pointer p-2 hover:bg-white/10 flex justify-between items-center">
              <div className="flex flex-col gap-0.5">
                <span className="truncate font-medium">Reporte 1</span>
                <span className="truncate text-xs text-muted">Descripción</span>
              </div>
              <ChevronRight size={16} className="text-[var(--text-muted)]" />
            </li>
          </ul>
        </nav>
      </aside>
    );
  };
