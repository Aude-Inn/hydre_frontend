import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { Dashboard } from "./pages/Dashboard";
import { UserProfile } from "./pages/UserProfile";
import { GameDetails } from "./pages/GameDetails";
import { GameLists } from "./pages/GameLists";
import { NotFound } from "./pages/NotFound";
import { AdminRoute, PrivateRoute } from "./components/PrivateRoute";
import { ForgotPassword } from "./components/ForgotPassword";
import { ResetPassword } from "./components/ResetPassword";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Page de réinitialisation SANS layout */}
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Toutes les autres pages AVEC layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="game-details/:id" element={<GameDetails />} />
            <Route path="game-lists" element={<GameLists />} />
            <Route path="forgot-password" element={<ForgotPassword />} />

            {/* Routes privées utilisateur */}
            <Route element={<PrivateRoute requiredRole="user" />}>
              <Route path="profile" element={<UserProfile />} />
            </Route>

            {/* Routes admin */}
            <Route element={<AdminRoute />}>
              <Route path="dashboard" element={<Dashboard />} />
            </Route>

            {/* Catch-all : page 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

