// components/Footer.jsx

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          {new Date().getFullYear()} My Website. All Rights Reserved.
        </p>
        <p>
          Built with <span className="text-blue-500 font-semibold">Next.js</span> and{' '}
          <span className="text-blue-500 font-semibold">Tailwind CSS</span>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
