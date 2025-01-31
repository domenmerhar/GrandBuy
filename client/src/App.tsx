import GlobalStyles from "./GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppRouter } from "./AppRouter";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./Util/LanguageContext";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />

        <AuthProvider>
          <LanguageProvider>
            <AppRouter />
          </LanguageProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
