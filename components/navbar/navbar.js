import React, { useRef } from 'react'
import Link from "next/Link"
import { useRouter } from "next/router";
import { SvgMovie } from "../icons/Movie"

import styles from "../../styles/Navbar.module.scss"

const Navbar = () => {
	const router = useRouter();
	return (
		<nav className={styles.container} aria-label="RMDB Menu">
			<div className={styles.logo}>
				<Link href="/" role="menuitem" tabindex="-1">
					<a>
						<SvgMovie color={"fff"} height={50} width={50} />
						<h1>RMDB</h1>
					</a>
				</Link>
			</div>

			<div className={styles.links}>
				<Link href="/"><a className={[
					[styles["default"]],
					[router.pathname === "/" ? styles["active"] : ""],
				].join(" ")}>Movies</a></Link>
				<Link href="/tvshows"><a className={[
					[styles["default"]],
					[router.pathname === "/tvshows" ? styles["active"] : ""],
				].join(" ")}>TV Shows</a></Link>
				<Link href="/actors"><a className={[
					[styles["default"]],
					[router.pathname === "/actors" ? styles["active"] : ""],
				].join(" ")}>Actors</a></Link>
			</div>

			<div className={styles.search}>
				<input className={styles.styledinput} />
			</div>
		</nav>
	)
}

export default Navbar
