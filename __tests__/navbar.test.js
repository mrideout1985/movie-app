import Navbar from "../components/navbar/navbar"
import { render, screen } from '@testing-library/react'


const useRouter = jest.spyOn(require('next/router'), 'useRouter')

const getComponent = (props) => render(<Navbar />)

describe("<Navbar />", () => {


	it('renders navbar', () => {
		render(<Navbar />)
	})
	it("renders all links", async () => {
		render(<Navbar />)
		const movie = await screen.findByRole('link', { name: "Movies" })
		// const tv = screen.findByRole('link', { name: /tv shows/i })
		// const actors = screen.findByRole('link', { name: /actors/i })
		// const movie = screen.getByText('Movies')
		expect(movie).toBeInTheDocument()

	})
})