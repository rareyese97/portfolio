"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiExternalLink } from "react-icons/fi";

interface Project {
	title: string;
	desc: string;
	img: string;
	techStack: string[];
	video?: string;
	link?: string;
}

interface ModalProps {
	project: Project | null;
	onClose: () => void;
	theme: "light" | "dark";
}

export default function ProjectModal({ project, onClose, theme }: ModalProps) {
	if (!project) return null;

	const renderMedia = () => {
		if (project.video) {
			if (project.video.includes("youtube.com") || project.video.includes("youtu.be")) {
				const videoId = project.video.includes("v=")
					? project.video.split("v=")[1].split("&")[0]
					: project.video.split("/").pop();

				const tMatch = project.video.match(/[?&]t=(\d+)s?/);
				const startTime = tMatch ? tMatch[1] : "0";

				return (
					<iframe
						src={`https://www.youtube.com/embed/${videoId}?start=${startTime}`}
						title={project.title}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
						className="w-full h-100 rounded-lg mb-4"
					/>
				);
			} else {
				return <video
					src={project.video}
					controls
					className="w-full max-h-[80vh] object-contain rounded-lg mb-4"
				/>;
			}
		} else {
			return (
				<div className="relative mb-4">
					<img src={project.img} alt={project.title} className="w-full h-100 object-cover rounded-lg" />
					{project.link && (
						<a
							href={project.link}
							target="_blank"
							rel="noopener noreferrer"
							className="absolute top-2 right-2 text-white bg-black bg-opacity-60 hover:bg-opacity-80 rounded-full p-2"
							aria-label="Visit project link"
						>
							<FiExternalLink size={20} />
						</a>
					)}
				</div>
			);
		}
	};

	return (
		<div className="fixed inset-0 bg-white/40 dark:bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 px-4 py-8">
			<motion.div
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.9, opacity: 0 }}
				className={`rounded-2xl shadow-xl max-w-3xl p-8 relative overflow-y-auto max-h-[90vh] ${
					theme === "dark" ? "bg-[#181818] text-white" : "bg-white text-black"
				}`}
			>
				<button
					onClick={onClose}
					className="absolute top-3 right-4 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white text-lg font-bold"
				>
					×
				</button>

				<h2 className={`text-2xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-black"}`}>{project.title}</h2>

				{renderMedia()}

				<p className={`rounded text-base ${theme === "dark" ? "text-white" : "text-black"}`}>{project.desc}</p>
				{project.techStack && project.techStack.length > 0 && (
					<div className="mt-4">
						<h3 className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-black"}`}>
							Tech Stack
						</h3>
						<ul className={`flex flex-wrap gap-2 `}>
							{project.techStack.map((tech, index) => (
								<li
									key={index}
									className="bg-gray-200 dark:bg-[#636363] text-sm text-gray-800 dark:text-gray-100 px-3 py-1 rounded-full"
								>
									{tech}
								</li>
							))}
						</ul>
					</div>
				)}
			</motion.div>
		</div>
	);
}
