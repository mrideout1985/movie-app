import React from 'react'
import styles from "../../styles/Layout.module.scss"
import Navbar from '../navbar/navbar'

const Layout = ({ children }) => {
	return (
		<>
			<Navbar />
			<main className={styles.container}>
				{children}
			</main>
			<footer>
				I am footer
			</footer>
		</>
	)
}

export default Layout
