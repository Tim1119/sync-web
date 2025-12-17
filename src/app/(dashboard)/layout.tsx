// src/app/(dashboard)/layout.tsx

import DashboardLayout from '@/app/components/organization-dashboard/Layout';
import { headers } from 'next/headers'; 
import React from 'react';
import { ThemeProvider } from "@/app/components/general/ThemeProvider";
// This is a Server Component. We use headers to reliably get the path.
export default async function DashboardRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Determine the current path to highlight the correct sidebar item
  const headersList = headers();
  // Get the path from the request headers
  const pathname = (await headersList).get('x-pathname') || '/dashboard'; 
  
  return (
    <DashboardLayout activePath={pathname}>
      {children}
    </DashboardLayout>
  );
}