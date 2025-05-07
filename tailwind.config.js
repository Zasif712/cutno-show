/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{ts,tsx}",
      "./components/**/*.{ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: "#4F46E5",
            light:   "#6366F1",
          },
          accent: "#14B8A6",
          neutral: {
            100: "#F3F4F6",
            200: "#E5E7EB",
            800: "#1F2937",
            900: "#111827",
          },
        },
      },
    },
    plugins: [],
  };
  