import { Helmet } from "react-helmet";
import {
  FaGithub,
  FaLinkedin,
  FaPhoneAlt,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
      {/* Adding meta tags for SEO */}
      <Helmet>
        <title>About the Shopping List App</title>
        <meta
          name="description"
          content="This app lets you easily manage your shopping items, add new ones, mark them as found, and even edit or remove them."
        />
        <meta property="og:title" content="About the Shopping List App" />
        <meta
          property="og:description"
          content="A digital shopping list app that helps you manage and organize your items."
        />
        <meta
          property="og:image"
          content="https://www.example.com/path-to-image.jpg" // Add your image URL here
        />
        <meta property="og:url" content="https://www.example.com/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About the Shopping List App" />
        <meta
          name="twitter:description"
          content="This app helps you manage your shopping list with ease."
        />
        <meta
          name="twitter:image"
          content="https://www.example.com/path-to-image.jpg" // Add your image URL here
        />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-center mb-6">
          About the Shopping List App
        </h1>
        <p className="text-lg mb-4">
          Welcome to the digital version of your shopping list! This app lets
          you easily manage your shopping items, add new ones, mark them as
          found, and even edit or remove them.
        </p>
        <h2 className="text-2xl font-semibold mb-4">
          How to Use the Shopping List
        </h2>
        <ul className="list-disc pl-6 mb-4 text-lg">
          <li>
            <strong>Add Items:</strong> Simply type your item in the input field
            and click "Add Item" to add it to your list.
          </li>
          <li>
            <strong>Edit Items:</strong> You can edit any item by clicking the
            "Edit" button next to it.
          </li>
          <li>
            <strong>Delete Items:</strong> Remove an item by clicking the
            "Delete" button next to it.
          </li>
          <li>
            <strong>Mark Items as Found:</strong> Tick the checkbox next to an
            item that you’ve found. It will be moved to the bottom of your list.
          </li>
        </ul>
        <p className="text-lg mb-6">
          Your shopping list is saved in your browser’s local storage, so it
          stays even after refreshing the page.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Contact the Developer</h2>
        <p className="text-lg mb-4">
          If you have any questions or suggestions, feel free to reach out. I'm
          always happy to hear feedback!
        </p>
        <div className="text-center mt-8">
          <h2 className="text-2xl font-bold mb-4">Connect with Me</h2>
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/stephen-nene"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
            >
              <FaGithub size={30} />
            </a>
            <a
              href="https://www.linkedin.com/in/stevenene"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
            >
              <FaLinkedin size={30} />
            </a>
            <a
              href="https://twitter.com/stephen_nene"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
            >
              <FaTwitter size={30} />
            </a>
            <a
              href="https://www.instagram.com/stephen_nene"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 dark:text-white hover:text-pink-600 dark:hover:text-pink-400"
            >
              <FaInstagram size={30} />
            </a>
            <a
              href="tel:+254741780..."
              className="text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400"
            >
              <FaPhoneAlt size={30} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
