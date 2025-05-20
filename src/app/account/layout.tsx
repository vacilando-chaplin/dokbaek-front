import Footer from "@/components/organisms/footer";
import TopNavigation from "@/components/organisms/topNavigation";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const token = cookies().get("jwt")?.value;

  if (!token) {
    redirect("/");
  }

  return (
    <main className="flex min-h-dvh w-full flex-col items-center justify-center bg-background-base-light dark:bg-background-base-dark">
      <TopNavigation />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
