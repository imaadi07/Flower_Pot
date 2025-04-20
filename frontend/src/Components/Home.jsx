import Navbar from "./Navbar.jsx";
import Dashboard from "./Dashboard.jsx";
import Footer from "./Footer.jsx";
import "../Styles/Home.css";
import Contact from "./Contact.jsx";

export default function Home() {
  return (
    <div className="body min-h-screen flex flex-col">
      <main className="flex-grow">
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
}
