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
import { AuthProvider } from "./contexts/AuthContext";
import { RouteProtector } from "./Components/RouteProtector";

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
          <AuthProvider>
            <LanguageProvider>
              <Routes>
                <Route path="/" element={<NavigationBar />}>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/search/:query" element={<SearchPage />} />
                  <Route path="/product/:productId" element={<ProductPage />} />

                  <Route path="/account" element={<AccountPage />}>
                    <Route
                      path="/account/user/:userId"
                      element={<ReviewReplyWindow />}
                    />

                    <Route
                      path="/account/seller/:userId"
                      element={<SaleSection />}
                    />

                    <Route
                      path="*"
                      element={<Navigate to="/" replace />}
                      index
                    />
                  </Route>

                  {/* User Routes */}
                  <Route
                    path="/wishlist"
                    element={
                      <RouteProtector allowedRoles={["user"]}>
                        <WishlistPage />
                      </RouteProtector>
                    }
                  />

                  <Route
                    path="/cart"
                    element={
                      <RouteProtector allowedRoles={["user"]}>
                        <CartPage />
                      </RouteProtector>
                    }
                  />

                  <Route
                    path="/refund"
                    element={
                      <RouteProtector allowedRoles={["user"]}>
                        <RefundPage />{" "}
                      </RouteProtector>
                    }
                  />

                  <Route
                    path="/orders"
                    element={
                      <RouteProtector allowedRoles={["user"]}>
                        <OrdersPage />
                      </RouteProtector>
                    }
                  />

                  <Route
                    path="/add-product"
                    element={
                      <RouteProtector allowedRoles={["seller"]}>
                        <AddProductPage />
                      </RouteProtector>
                    }
                  />
                  <Route
                    path="/my-products"
                    element={
                      <RouteProtector allowedRoles={["seller"]}>
                        <MyProductsPage />
                      </RouteProtector>
                    }
                  />

                  <Route
                    path="/dashboard"
                    element={
                      <RouteProtector allowedRoles={["admin", "seller"]}>
                        <Dashboard />{" "}
                      </RouteProtector>
                    }
                  >
                    <Route
                      path="reviews"
                      element={
                        <RouteProtector allowedRoles={["seller"]}>
                          <ReviewsPage />
                        </RouteProtector>
                      }
                    />
                    <Route
                      path="orders"
                      element={
                        <RouteProtector allowedRoles={["seller"]}>
                          <OrdersDashboardPage />
                        </RouteProtector>
                      }
                    />
                    <Route
                      path="refund"
                      element={
                        <RouteProtector allowedRoles={["seller"]}>
                          <RefundDashboardPage />
                        </RouteProtector>
                      }
                    />
                    <Route
                      path="coupon"
                      element={
                        <RouteProtector allowedRoles={["seller"]}>
                          <CouponPage />
                        </RouteProtector>
                      }
                    />
                  </Route>

                  {/* Authorized routes  */}
                  <Route
                    path="/settings"
                    element={
                      <RouteProtector
                        allowedRoles={["user", "seller", "admin"]}
                      >
                        <SettingsPage />
                      </RouteProtector>
                    }
                  />

                  <Route
                    path="/history"
                    element={
                      <RouteProtector
                        allowedRoles={["user", "seller", "admin"]}
                      >
                        <HistoryPage />
                      </RouteProtector>
                    }
                  />

                  <Route
                    path="/notifications"
                    element={
                      <RouteProtector
                        allowedRoles={["user", "seller", "admin"]}
                      >
                        <NotificationPage />
                      </RouteProtector>
                    }
                  />
                </Route>

                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route path="*" element={<h1>404 Not Found</h1>} />
              </Routes>
            </LanguageProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
