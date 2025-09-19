
import AppHeaderFrontEnd from '@/layout/AppHeaderFrontEnd';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
       <AppHeaderFrontEnd />
      {children}
    </div>
  );
}
