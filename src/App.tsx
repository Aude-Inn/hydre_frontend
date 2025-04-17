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
import {ForgotPassword} from './components/ForgotPassword';
import {ResetPassword} from './components/ResetPassword';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/game-details/:id" element={<GameDetails />} />
            <Route path="/game-lists" element={<GameLists />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="" element={<NotFound />} />
            {/* user */}
            <Route element={<PrivateRoute requiredRole="user" />}>
              <Route path="/profile" element={<UserProfile />} />
            </Route>
            {/* admin */}
            <Route element={<AdminRoute />}>
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

