export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 w-full border-t border-gray-700">
      <div className="container mx-auto py-8 px-4 flex flex-col gap-4 justify-between lg:items-center">
        {/* Left Section - Navigation Links */}
        <div className="pl-4 lg:pl-0 flex flex-col sm:flex-row lg:items-center space-y-3 mb-4 lg:mb-0 sm:space-y-0 sm:space-x-6">
          <a href="/about" className="text-gray-300 hover:text-white transition">
            About
          </a>
          <a href="/services" className="text-gray-300 hover:text-white transition">
            Services
          </a>
          <a href="/publications" className="text-gray-300 hover:text-white transition">
            Publications
          </a>
          <a href="/contact" className="text-gray-300 hover:text-white transition">
            Contact
          </a>
        </div>

        <div className="mt-4 sm:mt-0 text-sm text-center">
          &copy; {new Date().getFullYear()} Skyline CMS. All rights reserved.
        </div>

        <div className="mt-4 sm:mt-0 flex space-x-4 mx-auto">
          <a
            href="https://www.linkedin.com/in/alok-dwivedi-2832122b1/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-300 hover:text-white transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="h-5 w-5"
            >
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.25c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 10.25h-3v-4.5c0-1.104-.896-2-2-2s-2 .896-2 2v4.5h-3v-9h3v1.5c.77-.976 2.048-1.5 3.25-1.5 2.209 0 4 1.791 4 4v5zm0 0" />
            </svg>
          </a>
          <a
            href="https://github.com/alokdwivedi103"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-gray-300 hover:text-white transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="h-5 w-5"
            >
              <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.387.6.111.82-.261.82-.577 0-.285-.011-1.04-.017-2.04-3.338.724-4.042-1.611-4.042-1.611-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.774.418-1.305.761-1.606-2.665-.304-5.467-1.332-5.467-5.93 0-1.31.469-2.381 1.236-3.221-.123-.304-.536-1.527.118-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.984-.399 3.005-.404 1.02.005 2.048.138 3.005.404 2.291-1.552 3.297-1.23 3.297-1.23.656 1.649.243 2.872.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.805 5.624-5.477 5.921.43.37.812 1.101.812 2.22 0 1.604-.014 2.897-.014 3.293 0 .319.218.694.824.577 4.767-1.587 8.205-6.085 8.205-11.387 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
