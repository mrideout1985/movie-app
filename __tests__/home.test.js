import React from "react"
import { render, screen } from '@testing-library/react'
import Home from "../pages"

describe("HomePage", () => {
	const results = "results"
	it("Should Render the HomePage", () => {
		render(<Home />)
	})
})
