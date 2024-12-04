import GlobalStyles from "./GlobalStyles";
import { NavigationBar } from "./Components/NavigationBar";
import { BrowserRouter } from "react-router-dom";
import { AccountPage } from "./pages/account/AccountPage";
import { LanguageProvider } from "./Util/LanguageContext";

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <GlobalStyles />
        <NavigationBar />
        <AccountPage />
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
