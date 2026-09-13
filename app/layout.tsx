import type { Metadata } from "next";import "./globals.css";
export const metadata:Metadata={title:"A14 · Miền ký ức",description:"Album, câu chuyện và lưu bút của lớp A14. Cùng giữ lại một thời thanh xuân.",icons:{icon:"/favicon.svg",shortcut:"/favicon.svg"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="vi"><body>{children}</body></html>}