import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { MobileNav } from "./components/MobileNav";
import { Toast } from "./components/Toast";
import { Cursor } from "./components/Cursor";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Auth } from "./pages/Auth";
import { Dashboard } from "./pages/Dashboard";
import { About } from "./pages/About";
import { Journal } from "./pages/Journal";
import { Contact } from "./pages/Contact";
import { Wishlist } from "./pages/Wishlist";
import { FragranceFinder } from "./pages/FragranceFinder";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

function Layout() {
  const { pathname } = useLocation();
  const bare = pathname === "/login";
  return (
    <>
      {!bare && <Navbar />}
      <main className={!bare ? "min-h-screen pb-16 lg:pb-0" : "min-h-screen"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/fragrance-finder" element={<FragranceFinder />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      {!bare && <Footer />}
      {!bare && <MobileNav />}
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Cursor />
        <Layout />
      </BrowserRouter>
    </StoreProvider>
  );
}
