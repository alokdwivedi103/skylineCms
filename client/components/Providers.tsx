import { cookies } from "next/headers";
import { AuthProvider } from "@/context/AuthContext";

export default async function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;


  return <AuthProvider token={token || ""}>{children}</AuthProvider>;
}
