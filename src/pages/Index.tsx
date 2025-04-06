
import { Navigate } from "react-router-dom";

const Index = () => {
  // Redirects to onboarding page
  return <Navigate to="/onboarding" replace />;
};

export default Index;
