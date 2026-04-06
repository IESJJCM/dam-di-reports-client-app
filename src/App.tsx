import { Main, Sidebar } from './components';
import { useReports } from './hooks/useReports';

function App() {

  const { reports } = useReports();
  console.log(reports);

  return (
    <div className="app-layout">
      <Sidebar />

      <Main />
    </div>
  );
}

export default App;
