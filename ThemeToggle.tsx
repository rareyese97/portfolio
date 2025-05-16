"use client";
import { useTheme } from "@/app/ThemeContext";

export default function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();

	const handleToggle = () => {
		// Toggle theme using the provided function
		toggleTheme();

		// Set the new theme in localStorage
		const newTheme = theme === "light" ? "dark" : "light";
		localStorage.setItem("theme", newTheme);

		// Update root HTML class for dark/light theme
		if (typeof document !== "undefined") {
			document.documentElement.classList.remove("light", "dark");
			document.documentElement.classList.add(newTheme);
		}
	};

	return (
		<button onClick={handleToggle} className="p-2 border rounded">
			Switch to {theme === "light" ? "Dark" : "Light"} Mode
		</button>
	);
}
