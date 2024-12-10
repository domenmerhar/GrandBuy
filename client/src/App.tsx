import GlobalStyles from "./GlobalStyles";
import { NavigationBar } from "./Components/NavigationBar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "./Util/LanguageContext";
import { MainPage } from "./pages/main/MainPage";
import { CartPage } from "./pages/Cart/CartPage";
import { HistoryPage } from "./pages/history/HistoryPage";
import { RefundPage } from "./pages/refund/RefundPage";
import { SearchPage } from "./pages/search/SearchPage";
import { SignupPage } from "./pages/signup/Signup";
import { AccountPage } from "./pages/account/AccountPage";
import { SettingsPage } from "./pages/settings/SettingsPage";

function App() {
  return (
    <LanguageProvider>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavigationBar />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/refund" element={<RefundPage />} />
            <Route path="/search" element={<SearchPage />} />
            {/* TODO: NAVIGATE TO USER ID */}
            <Route
              path="/account"
              element={<Navigate to="/account/123" replace />}
            />
            <Route path="/account/:userId" element={<AccountPage />} />
          </Route>

          <Route path="/signup" element={<SignupPage />} />

          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
