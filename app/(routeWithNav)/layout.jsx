import Navbar from "../../components/Navbar";

export default async function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
