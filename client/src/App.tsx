import GlobalStyles from "./GlobalStyles";
import { NavigationBar } from "./Components/NavigationBar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "./Util/LanguageContext";
import { MainPage } from "./pages/main/MainPage";
import { CartPage } from "./pages/Cart/CartPage";
import { HistoryPage } from "./pages/history/HistoryPage";
import { RefundPage } from "./pages/refund/RefundPage";
import { SearchPage } from "./pages/search/SearchPage";
import { SignupPage } from "./pages/signup/SignupPage";
import { AccountPage } from "./pages/account/AccountPage";
import { SettingsPage } from "./pages/settings/SettingsPage";
import { ProductPage } from "./pages/product/ProductPage";
import { LoginPage } from "./pages/login/LoginPage";
import { MyProductsPage } from "./pages/myProducts/MyProductsPage";
import { OrdersPage } from "./pages/orders/OrdersPage";
import { WishlistPage } from "./pages/wishlist/WishlistPage";
import { NotificationPage } from "./pages/notification/NotificationPage";
import { Dashboard } from "./Components/Dashboard/Dashboard";
import { ReviewReplyWindow } from "./pages/account/ReviewReplyWindow";
import { SaleSection } from "./pages/main/SaleSection";
import { AddProductPage } from "./pages/addProduct/AddProductPage";
import { ReviewsPage } from "./pages/dashboard/reviews/ReviewsPage";
import { OrdersDashboardPage } from "./pages/dashboard/orders/OrdersDashboardPage";
import { RefundDashboardPage } from "./pages/dashboard/refund/RefundDashboardPage";
import { CouponPage } from "./pages/dashboard/coupon/CouponPage";
import { ScrollToTop } from "./Components/ScrollToTop";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
        <BrowserRouter>
          <ScrollToTop />
          <LanguageProvider>
            <Routes>
              <Route path="/" element={<NavigationBar />}>
                <Route path="/" element={<MainPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/refund" element={<RefundPage />} />
                <Route path="/search/:query" element={<SearchPage />} />
                <Route path="/my-products" element={<MyProductsPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/notifications" element={<NotificationPage />} />

                <Route path="/account" element={<AccountPage />}>
                  <Route
                    path="/account/user/:userId"
                    element={<ReviewReplyWindow />}
                  />
                  <Route
                    path="/account/seller/:userId"
                    element={<SaleSection />}
                  />
                  <Route path="*" element={<Navigate to="/" replace />} index />
                </Route>

                <Route path="/add-product" element={<AddProductPage />} />
                <Route path="/product/:productId" element={<ProductPage />} />

                <Route path="/dashboard" element={<Dashboard />}>
                  <Route path="reviews" element={<ReviewsPage />} />
                  <Route path="orders" element={<OrdersDashboardPage />} />
                  <Route path="refund" element={<RefundDashboardPage />} />
                  <Route path="coupon" element={<CouponPage />} />
                </Route>
              </Route>

              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />

              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
          </LanguageProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
