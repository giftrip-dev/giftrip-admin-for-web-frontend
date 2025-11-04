import { Toaster } from "@/components/ui/toaster";
import GlobalNavBar from "../_components/global-nav-bar";

interface GlobalNavBarLayoutProps {
  children: React.ReactNode;
}

const GlobalNavBarLayout = ({ children }: GlobalNavBarLayoutProps) => {
  return (
    <>
      <div className="w-screen overflow-x-hidden pl-[240px]">
        <GlobalNavBar />
        <div className="relative min-h-screen">{children}</div>
      </div>

      <Toaster />
    </>
  );
};
export default GlobalNavBarLayout;
