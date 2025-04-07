
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

interface NotFoundProps {
  title?: string;
  message?: string;
}

export default function NotFound({ title = "Page Not Found", message = "Sorry, the page you are looking for doesn't exist or has been moved." }: NotFoundProps) {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-muted-foreground mb-8 max-w-md">{message}</p>
        <div className="space-x-4">
          <Button onClick={() => navigate(-1)} variant="outline">
            Go Back
          </Button>
          <Button onClick={() => navigate("/dashboard")}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    </Layout>
  );
}
