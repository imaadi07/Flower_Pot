import "../Styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer-body bg-gray-800 text-white p-6 text-center">
      <h1 className="text-xl font-semibold mb-2">Contact Us</h1>
      <p>
        <a href="mailto:support@plants.com" className="underline">
          support@plants.com
        </a>
      </p>
      <p className="mt-2">| Copyright © 2025 |</p>
    </footer>
  );
}
