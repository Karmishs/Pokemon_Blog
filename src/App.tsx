import AppRoutes from './routes/AppRoutes';
import { QueryClient, QueryClientProvider } from 'react-query';
import './styles/index.css';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App app-background">
        <AppRoutes />
      </div>
    </QueryClientProvider>
  );
}

export default App;
