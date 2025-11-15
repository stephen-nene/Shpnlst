import { Helmet } from "react-helmet";
import {
  FaGithub,
  FaLinkedin,
  FaPhoneAlt,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { FaListAlt, FaEdit, FaTrash, FaCheckCircle } from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <Helmet>
        <title>About the Shopping List App</title>
        <meta
          name="description"
          content="A clean and simple digital shopping list app to keep your items organized."
        />
      </Helmet>

      {/* HERO SECTION */}
      <section className="text-center py-16 px-6">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          Your Smart Shopping List
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-700 dark:text-gray-300">
          A simple, organized, and intuitive way to manage everything you need
          to buy — right from your pocket.
        </p>
      </section>

      {/* FEATURES SECTION */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-center mb-10">Key Features</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow hover:shadow-xl transition">
            <FaListAlt className="text-blue-500 dark:text-blue-400 text-4xl mb-4" />
            <h3 className="font-semibold text-xl mb-2">Add Items</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Quickly add items with a simple clean input field.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow hover:shadow-xl transition">
            <FaEdit className="text-yellow-500 dark:text-yellow-400 text-4xl mb-4" />
            <h3 className="font-semibold text-xl mb-2">Edit Items</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Fix mistakes or update your list at any moment.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow hover:shadow-xl transition">
            <FaTrash className="text-red-500 dark:text-red-400 text-4xl mb-4" />
            <h3 className="font-semibold text-xl mb-2">Delete Items</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Remove items cleanly with a single click.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow hover:shadow-xl transition">
            <FaCheckCircle className="text-green-500 dark:text-green-400 text-4xl mb-4" />
            <h3 className="font-semibold text-xl mb-2">Mark as Found</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Mark items as completed & move them automatically.
            </p>
          </div>
        </div>
      </section>

      {/* HOW TO USE SECTION */}
      <section className="px-6 py-12 bg-gray-100 dark:bg-gray-700/40">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>

          <ul className="space-y-6 text-lg leading-relaxed">
            <li>
              <strong className="font-bold">1. Add Items:</strong> Type inside
              the input field & click <em>Add Item</em>.
            </li>
            <li>
              <strong className="font-bold">2. Edit Anytime:</strong> Use the
              edit button to adjust names or quantities.
            </li>
            <li>
              <strong className="font-bold">3. Remove Items:</strong> Clean up
              your list by deleting items you no longer need.
            </li>
            <li>
              <strong className="font-bold">4. Mark Items as Found:</strong>{" "}
              Click the checkbox to move them to the bottom as completed.
            </li>
          </ul>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="max-w-xl mx-auto px-6 py-14">
        <h2 className="text-3xl font-bold text-center mb-8">
          Connect with the Developer
        </h2>

        <div className="bg-white dark:bg-gray-700 shadow-xl rounded-xl p-8 text-center">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Have feedback or ideas? I'd love to hear from you.
          </p>

          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/stephen-nene"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              <FaGithub size={30} />
            </a>

            <a
              href="https://www.linkedin.com/in/stevenene"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              <FaLinkedin size={30} />
            </a>

            <a
              href="https://twitter.com/stephen_nene"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition"
            >
              <FaTwitter size={30} />
            </a>

            <a
              href="https://www.instagram.com/stephen_nene"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram size={30} />
            </a>

            <a
              href="tel:+254741780..."
              className="hover:text-green-600 transition"
            >
              <FaPhoneAlt size={30} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
