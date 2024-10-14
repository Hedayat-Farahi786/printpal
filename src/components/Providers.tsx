"use client";

import { AuthProvider } from "@/context/AuthContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";

const client = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={client}>
      <AuthProvider>{children}</AuthProvider> {/* Wrap with AuthProvider */}
    </QueryClientProvider>
  );
};

export default Providers;
