import {render, screen, cleanup } from "@testing-library/react"
import { Truncating } from "../ReusablesComponents/Truncating"

test('should render truncating component', () => {
    render(<Truncating/>)
})