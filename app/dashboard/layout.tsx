export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-y-auto bg-gray100 px-4 pt-[64px] md:px-6 md:pl-[112px] desktop:pl-[336px] desktop:pt-[94px]">
      {children}
    </div>
  );
}
