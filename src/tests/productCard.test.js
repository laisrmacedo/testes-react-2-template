import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ProductCard from "../components/ProductsList/ProductCard"

//mocks
  const productMock = {
    id: 1,
    image: "https://image.png",
    title: "Produto teste",
    price: 12.99,
    quantity: 3
  }

  const addToCartMock = jest.fn()

//tests
describe("Product Card", () => {
  test("deve renderizar card de produto", () => {
    render(<ProductCard product={productMock} addToCart={addToCartMock}/>)
  })

  test("deve renderizar o titulo, imagem, preço e botao 'buy'", () => {
    render(<ProductCard product={productMock} addToCart={addToCartMock}/>)
    // screen.logTestingPlaygroundURL()
    const title = screen.getByRole('heading', {
      name: /produto teste/i
    })
    const image = screen.getByRole('img', {
      name: /produto teste/i
    })
    const price = screen.getByText(/\$12\.99/i)
    const addBtn = screen.getByRole('button', {
      name: /buy/i
    })

    expect(title).toBeInTheDocument()
    expect(image).toBeInTheDocument()
    expect(price).toBeInTheDocument()
    expect(addBtn).toBeInTheDocument()
  })

  test("deve acionar a funçao addToCart", async () => {

    const user = userEvent.setup()
    render(<ProductCard product={productMock} addToCart={addToCartMock}/>)

    const addBtn = screen.getByRole('button', {
      name: /buy/i
    }) 

    await user.click(addBtn)
    expect(addToCartMock).toBeCalled()
  })
})