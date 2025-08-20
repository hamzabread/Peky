import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react"; // optional, install: npm i lucide-react

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 pr-2.5 pl-2.5 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors"
    >
      {theme === "light" ? <Moon className="w-5 h-5 text-gray-900" /> : <Sun className="w-5 h-5 text-yellow-400" />}
    </button>
  );
}

export default ThemeToggle