"use client";
import { ThemeProvider } from "@/./app/ThemeContext";
import Image from "next/image";
import { motion } from "framer-motion";
import "../../styles/global.css";
import { useState, useRef, useEffect } from "react";
import ProjectModal from "@/app/ProjectModal";
import { useTheme } from "@/app/ThemeContext";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import type { Project } from "@/app/ProjectModal";

export default function Home() {
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const projectsRef = useRef<HTMLElement | null>(null);
	const { theme, toggleTheme } = useTheme();

	// On component mount, check localStorage for saved theme
	useEffect(() => {
		if (typeof window !== "undefined") {
			const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
			if (savedTheme) {
				toggleTheme(savedTheme);
			} else {
				// If no theme is saved, fallback to system preference or default to light
				const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
				toggleTheme(prefersDark ? "dark" : "light");
			}
		}
	}, [toggleTheme]);

	const handleProjectClick = (project: Project) => setSelectedProject(project);
	const handleCloseModal = () => setSelectedProject(null);

	return (
		<ThemeProvider>
			<main
				className={`min-h-screen bg-[#FFFFFF] text-black ${
					theme === "dark" ? "dark:bg-[#181818] dark:text-white" : ""
				} font-sans`}
			>
				<div className="fixed top-4 right-4 z-50">
					<button
						onClick={() => {
							toggleTheme();

							// Save the updated theme to localStorage
							if (typeof window !== "undefined") {
								const newTheme = theme === "light" ? "dark" : "light";
								localStorage.setItem("theme", newTheme);
							}
						}}
						className={`px-4 py-2 rounded-full shadow-md font-medium transition-all duration-300 ${
							theme === "dark" ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"
						}`}
						aria-label="Toggle theme"
					>
						{theme === "dark" ? "☀️ Light" : "🌙 Dark"}
					</button>
				</div>

				{/* Hero Section (Top 40% of screen height) */}
				<section
					className={`h-auto md:h-[50vh] ${
						theme === "dark" ? "dark:bg-[#1c2438]" : "bg-[#4C5479]"
					} text-white flex flex-col md:flex-row justify-center items-center gap-6 px-8 py-8`}
				>
					{/* Left Column */}
					<div className="w-full md:w-[30%] flex justify-center mb-4 md:mb-0">
						<Image
							src="/me.jpg"
							alt="Robert Reyes-Enamorado"
							width={250}
							height={250}
							className="rounded-full object-cover"
							priority
						/>
					</div>

					{/* Right Column */}
					<div className="w-full md:w-[30%] text-center md:text-left">
						<h1 className="text-4xl font-bold mb-4">Hey, I&apos;m Robert Reyes-Enamorado</h1>
						<p className="text-lg text-gray-200">I’m an aspiring software engineer who is ready for a challenge.</p>
						<br />
						{/* View My Projects Button */}
						<button
							onClick={() => {
								projectsRef.current?.scrollIntoView({ behavior: "smooth" });
							}}
							className="px-6 py-2 text-sm text-white bg-[#2F2F2F] rounded-full hover:bg-gray-500 transition-all cursor-pointer"
						>
							View My Projects
						</button>
						<div className="flex justify-center md:justify-start space-x-6 mt-6 w-full">
							<a
								href="mailto:rareyese97@gmail.com"
								className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition text-2xl"
								aria-label="Email"
							>
								<FaEnvelope />
							</a>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<a
								href="https://www.linkedin.com/in/robertreyese/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400 transition text-2xl"
								aria-label="LinkedIn"
							>
								<FaLinkedin />
							</a>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							<a
								href="https://github.com/rareyese97"
								target="_blank"
								rel="noopener noreferrer"
								className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition text-2xl"
								aria-label="GitHub"
							>
								<FaGithub />
							</a>
						</div>
					</div>
				</section>

				{/* About Me & Education Section */}
				<motion.section
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true, amount: 0.2 }}
					className={`px-8 py-16 ${theme === "dark" ? "bg-[#1d1d1d] text-white" : "bg-[#eeeeee] text-black"}`}
				>
					<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 w-full md:w-[70%] px-4 ">
						{/* About Me Column */}
						<div>
							<h2 className="text-xl font-semibold mb-4">About Me</h2>
							<p className="text-base">
								I&apos;m a developer who enjoys building thoughtful, user-focused web and mobile experiences. I’ve
								worked with modern frameworks like React and Express, and I’m always looking to improve and learn
								something new. Whether it’s refining a UI or debugging backend logic, I like diving into problems and
								figuring out clean solutions. I like to ensure that whatever I design is intuitive and workable for the
								average user.
							</p>{" "}
						</div>

						{/* Education Column */}
						<div>
							<h2 className="text-xl font-semibold mb-4 w-full md:w-[70%]">Education</h2>
							<p className="text-base whitespace-pre-line ">
								University at Buffalo - Bachelor of Science in Computer Science - 3.71 GPA{"\n\n"}
								SUNY Broome - Computer Science - 4.0 GPA{"\n\n"}
								Binghamton University - Mathematics - 3.5 GPA{"\n\n"}
								SUNY Orange - Associate of Science in Mathematics - 3.45 GPA
							</p>
						</div>
					</div>
				</motion.section>

				{/* Programming Languages, Tools, Technologies Section */}
				<motion.section
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true, amount: 0.2 }}
					className={`px-8 py-16 ${theme === "dark" ? "bg-[#171717] text-white" : "bg-white text-black"}`}
				>
					<div className="max-w-6xl mx-auto space-y-12 w-full md:w-[70%]">
						{/* Programming Languages */}
						<div>
							<h2 className="text-xl font-semibold mb-6">Programming Languages</h2>
							<div className="flex flex-wrap gap-6 items-center">
								<Image
									src="/python.svg"
									alt="Python"
									width={48}
									height={48}
									style={{ width: "48px", height: "48px" }}
								/>
								<Image
									src="/javascript.svg"
									alt="JavaScript"
									width={48}
									height={48}
									style={{ width: "48px", height: "48px" }}
								/>
								<Image src="/c.svg" alt="C" width={48} height={48} style={{ width: "48px", height: "48px" }} />
								<Image src="/cpp.svg" alt="C++" width={48} height={48} style={{ width: "48px", height: "48px" }} />
								<Image src="/go.svg" alt="Go" width={48} height={48} style={{ width: "48px", height: "48px" }} />
								<Image src="/scala.svg" alt="Scala" width={48} height={48} style={{ width: "48px", height: "48px" }} />
								<Image src="/swift.svg" alt="Swift" width={48} height={48} style={{ width: "48px", height: "48px" }} />
							</div>
						</div>
						<div>
							<h2 className="text-xl font-semibold mb-6">Frameworks</h2>
							<div className="flex flex-wrap gap-6 items-center">
								<Image src="/react.svg" alt="React" width={48} height={48} style={{ width: "48px", height: "48px" }} />
								<Image
									src="/express.svg"
									alt="Express"
									width={48}
									height={48}
									style={{ width: "48px", height: "48px" }}
								/>
								<Image src="/flask.svg" alt="Flask" width={48} height={48} style={{ width: "48px", height: "48px" }} />
								<Image src="/next.svg" alt="Next.js" width={48} height={48} style={{ width: "48px", height: "48px" }} />
							</div>
						</div>
						{/* Tools */}
						<div>
							<h2 className="text-xl font-semibold mb-6">Tools</h2>
							<div className="flex flex-wrap gap-6 items-center">
								<Image
									src="/postman.svg"
									alt="Postman"
									width={48}
									height={48}
									style={{ width: "48px", height: "48px" }}
								/>
								<Image src="/git.svg" alt="Git" width={48} height={48} style={{ width: "48px", height: "48px" }} />
								<Image
									src="/mongodb.svg"
									alt="MongoDB"
									width={48}
									height={48}
									style={{ width: "48px", height: "48px" }}
								/>
								<Image
									src="/docker.svg"
									alt="Docker"
									width={48}
									height={48}
									style={{ width: "48px", height: "48px" }}
								/>
								<Image src="/figma.svg" alt="Figma" width={48} height={48} style={{ width: "48px", height: "48px" }} />
								<Image
									src="/postgres.svg"
									alt="PostgreSQL"
									width={48}
									height={48}
									style={{ width: "48px", height: "48px" }}
								/>
							</div>
						</div>

						{/* Technologies */}
						<div>
							<h2 className="text-xl font-semibold mb-6">Technologies</h2>
							<div className="flex flex-wrap gap-6 items-center">
								<Image src="/linux.svg" alt="Linux" width={48} height={48} style={{ width: "48px", height: "48px" }} />
								<Image src="/node.svg" alt="Node.js" width={48} height={48} style={{ width: "48px", height: "48px" }} />
								<Image src="/xcode.svg" alt="XCode" width={48} height={48} style={{ width: "48px", height: "48px" }} />
								<Image
									src="/vscode.svg"
									alt="VS Code"
									width={48}
									height={48}
									style={{ width: "48px", height: "48px" }}
								/>
								<Image
									src="/tailwind.svg"
									alt="Tailwind CSS"
									width={48}
									height={48}
									style={{ width: "48px", height: "48px" }}
								/>
							</div>
						</div>
					</div>
				</motion.section>
				{/* Experience Section */}
				<motion.section
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true, amount: 0.2 }}
					className={`px-8 py-16 ${theme === "dark" ? "bg-[#1d1d1d] text-white" : "bg-[#eeeeee] text-black"}`}
				>
					<div className="max-w-6xl mx-auto w-full md:w-[70%]">
						<h2 className="text-xl font-semibold mb-3">Experience</h2>

						{/* Logos Row */}
						<div className="flex flex-wrap gap-6 mb-2">
							<Image src="/codepath.png" alt="CodePath Logo" width={60} height={60} className="object-contain" />
							<Image src="/schmidt.jpeg" alt="Schmidt Futures Logo" width={60} height={60} className="object-contain" />
						</div>

						{/* Experience Description */}
						<div className="text-base leading-relaxed space-y-4 ">
							<p className="font-semibold">
								<span className="underline">CodePath x Schmidt Futures</span>
								<span className="font-normal"> – Remote | June 2022 - August 2022</span>
							</p>
							<p className="italic">Full Stack Software Engineer Intern | PostgreSQL, Express.js, Node.js, React</p>
							<ul className="list-disc list-inside space-y-2 ml-6">
								<li>Engineered and maintained multiple websites using PostgreSQL, Express.js, React, and Node.js</li>
								<li>Managed databases and built servers, utilizing RESTful APIs for efficient data flow</li>
								<li>
									Built mobile apps in Swift, including user interfaces and core functionality like data management
								</li>
								<li>Integrated NPM libraries such as Cron and Bcrypt to facilitate frontend and backend development</li>
								<li>Collaborated with a remote team, supporting project planning and providing assistance</li>
							</ul>
						</div>
					</div>
				</motion.section>

				<motion.section
					ref={projectsRef}
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true, amount: 0.2 }}
					className={`px-8 py-16 max-w-6xl mx-auto w-full md:w-[70%] ${
						theme === "dark" ? "bg-[#171717] text-white" : "bg-white text-black"
					}`}
				>
					<h2 className="text-xl font-semibold mb-6 ">Projects</h2>
					<div className="overflow-x-auto px-3 ">
						<div className="flex gap-6 w-full overflow-x-auto pl-4 pr-4 pt-2 pb-8 snap-x snap-mandatory">
							{[
								{
									title: "Trek",
									desc: "A social media website for hikers. Post pictures of your hikes, comment on other posts, plan hikes, and message your friends. Take inspiration from other posts and maybe go visit some of the local hikes nearby users have posted about.",
									img: "/trek.png",
									techStack: ["React", "Swagger API", "Raw CSS"],
									link: "https://webdev.cse.buffalo.edu/hci/teams/wonone",
								},
								{
									title: "Medicine Tracker",
									desc: "Tracks medication schedules and sends text message notifications to users according to schedule. Also includes an interaction checker that uses National Library of Medicine's drug API. Won \"Most Impactful Project\" award at CodePath's SITE 2022 Demo Day",
									img: "/medtracker.png",
									techStack: ["PostgreSQL", "Express", "React", "Node", "Bootstrap"],
									video: "/medvid.mp4",
								},
								{
									title: "Campus Navigator",
									desc: "Helps students navigate the University at Buffalo's north campus. Utilizes Breadth First Search on a graph of points of interests in building throughout campus. Find the path between any two buildings through the tunnel system the campus provides.",
									img: "/navigate.jpg",
									techStack: ["React Native"],
									video: "/navigate.mp4",
								},
								{
									title: "Battleship Game",
									desc: "Multiplayer web game with real-time play and leaderboards. Sign up and create open lobbies with websockets. Players can see your open room and join your match and start to play live. Score are accumulated on a leaderboard, which users can see.",
									img: "/battle.png",
									techStack: ["HTML", "JavaScript", "CSS", "MongoDB", "Flask", "Websockets"],
								},
								{
									title: "Explore: Find Places Nearby",
									desc: "Find cool places nearby the University at Buffalo's North Campus. Take pictures of spots to hang out, eat, have fun, or study and then post them. Your posts will appear in a feed and on a map for others to checkout and maybe go visit.",
									img: "/Explore.png",
									techStack: ["Parse", "Postman", "XCode", "Swift"],
									video: "https://www.youtube.com/watch?v=1US3MNG-go0",
								},
							].map((project, idx) => (
								<div
									key={idx}
									className={`w-[320px] h-[340px] ${
										theme === "dark" ? "dark:bg-[#272727]" : "bg-gray-100"
									} rounded-2xl shadow-lg p-4 flex-shrink-0 transform transition-transform duration-300 hover:scale-105 flex flex-col cursor-pointer`}
									onClick={() => handleProjectClick(project)}
								>
									<Image
										src={project.img}
										alt={project.title}
										width={280}
										height={200}
										className="rounded-xl object-cover mb-3 w-full h-[120px]"
									/>
									<h3 className="text-base font-semibold mb-1">{project.title}</h3>
									<p className="text-sm ">{project.desc}</p>
								</div>
							))}
						</div>
					</div>
				</motion.section>
				{selectedProject && <ProjectModal project={selectedProject} onClose={handleCloseModal} theme={theme} />}

				{/* More sections below this... */}
			</main>
		</ThemeProvider>
	);
}
