import GlobalStyles from "./GlobalStyles";
import { NavigationBar } from "./Components/NavigationBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "./Util/LanguageContext";
import { MainPage } from "./pages/main/MainPage";
import { AccountPage } from "./pages/settings/SettingsPage";
import { CartPage } from "./pages/Cart/CartPage";
import { HistoryPage } from "./pages/history/HistoryPage";
import { RefundPage } from "./pages/refund/RefundPage";
import { SearchPage } from "./pages/search/SearchPage";
import { SignupPage } from "./pages/signup/Signup";
import { UserPage } from "./pages/user/UserPage";

function App() {
  return (
    <LanguageProvider>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavigationBar />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/settings" element={<AccountPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/refund" element={<RefundPage />} />
            <Route path="/search" element={<SearchPage />} />
            {/* <Route path="/user/:userId" element={<UserPage />} /> */}
          </Route>

          <Route path="/signup" element={<SignupPage />} />

          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
