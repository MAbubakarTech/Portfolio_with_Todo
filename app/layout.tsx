import "./globals.css";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>My Portfolio</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
