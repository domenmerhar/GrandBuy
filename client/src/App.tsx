import GlobalStyles from "./GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppRouter } from "./AppRouter";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Toaster } from "react-hot-toast";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorBox } from "./Components/ErrorBox";

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

      <ErrorBoundary fallback={<ErrorBox fullPage={true} />}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster />
          <AuthProvider>
            <LanguageProvider>
              <DarkModeProvider>
                <AppRouter />
              </DarkModeProvider>
            </LanguageProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
