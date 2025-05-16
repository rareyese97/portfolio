"use client";
import { useEffect } from "react";
import { useTheme } from "./ThemeContext";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
	const { theme } = useTheme();

	useEffect(() => {
		if (typeof document !== "undefined") {
			document.documentElement.classList.remove("light", "dark");
			document.documentElement.classList.add(theme);
		}
	}, [theme]);

	return <>{children}</>;
}
