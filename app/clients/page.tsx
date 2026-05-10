import { Suspense } from "react";
import { ClientsClient } from "./clients-client";

export const metadata = {
  title: "Clients",
  description:
    "57+ brands across edtech, D2C, fintech, healthcare, B2B, and beyond — built and scaled with Ingenious Hub.",
};

export default function ClientsPage() {
  return (
    <Suspense fallback={null}>
      <ClientsClient />
    </Suspense>
  );
}
