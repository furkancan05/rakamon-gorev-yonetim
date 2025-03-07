import { Routes, Route, Navigate } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import { motion } from "framer-motion";

export default function Router() {
  const pageVariants = {
    initial: {
      opacity: 0.5,
      scale: 0.99,
    },
    in: {
      opacity: 1,
      scale: 1,
    },
    out: {
      opacity: 0.5,
      scale: 1.1,
    },
  };

  const pageTransition = {
    type: "tween",
    ease: "linear",
    duration: 0.2,
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="in"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Login />
          </motion.div>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <motion.div
              key={location.pathname}
              initial="initial"
              animate="in"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Homepage />
            </motion.div>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
