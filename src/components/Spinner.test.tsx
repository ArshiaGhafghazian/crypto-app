import { render} from "@testing-library/react"

import Spinner from "./Spinner.tsx"

test("it should render", () => {
    const { getByTestId } = render(<Spinner />)
    const spinnerElement: HTMLElement = getByTestId("spinner")
    expect(spinnerElement).toBeInTheDocument()
})
