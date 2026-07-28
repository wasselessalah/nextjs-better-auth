import { getSession } from "@/lib/auth/auth";

export default async function Dashboard() {
  const session = await getSession();



  return <div> hello {session?.user.name}</div>;
}