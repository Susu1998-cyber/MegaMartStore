// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import Navbar from "./Components/Navbar";
// import Footer from "./Components/Footer";
// import ProtectedRoute from "./Components/ProtectedRoute";

// import Home from "./Pages/Home";
// import ProductList from "./Pages/ProductList";
// import ProductDetail from "./Pages/ProductDetail";
// import Cart from "./Pages/Cart";
// import Login from "./Pages/Login";
// import Register from "./Pages/Register";

// function MainLayout({ children }) {
//   return (
//     <div className="flex min-h-screen flex-col">
//       <Navbar />

//       <main className="flex-1">{children}</main>

//       <Footer />
//     </div>
//   );
// }

// function App() {
//   const token = localStorage.getItem("token");

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             token ? (
//               <MainLayout>
//                 <Home />
//               </MainLayout>
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />

//         {/* Authentication pages - NO Navbar / Footer */}
//         <Route path="/login" element={<Login />} />

//         <Route path="/register" element={<Register />} />

//         {/* Main application */}
//         <Route
//           path="/"
//           element={
//             <MainLayout>
//               <Home />
//             </MainLayout>
//           }
//         />

//         <Route
//           path="/products"
//           element={
//             <MainLayout>
//               <ProductList />
//             </MainLayout>
//           }
//         />

//         <Route
//           path="/products/:slug"
//           element={
//             <MainLayout>
//               <ProductDetail />
//             </MainLayout>
//           }
//         />

//         {/* Protected Cart */}
//         <Route
//           path="/cart"
//           element={
//             <ProtectedRoute>
//               <MainLayout>
//                 <Cart />
//               </MainLayout>
//             </ProtectedRoute>
//           }
//         />

//         {/* Invalid route */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ProtectedRoute from "./Components/ProtectedRoute";
import Home from "./Pages/Home";
import ProductList from "./Pages/ProductList";
import ProductDetail from "./Pages/ProductDetail";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <MainLayout>
                <Home />
              </MainLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Products can remain public */}
        <Route
          path="/products"
          element={
            <MainLayout>
              <ProductList />
            </MainLayout>
          }
        />

        <Route
          path="/products/:slug"
          element={
            <MainLayout>
              <ProductDetail />
            </MainLayout>
          }
        />

        {/* Protected Cart */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Cart />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Unknown route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
