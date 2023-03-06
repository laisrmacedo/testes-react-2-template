import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ProductCard from "../components/ProductsList/ProductCard"
import CartCard from "../components/Cart/CartCard"


//mocks
const productMock = {
  id: 1,
  image: "https://image.png",
  title: "Produto teste",
  price: 12.99,
  quantity: 3
}
const addToCartMock = jest.fn()
const removeFromCartMock = jest.fn()

describe("Cart Card", () => {
  test("deve renderizar o card no carrinho com titulo, imagem, preço e botao 'remove'", async () => {
    const user = userEvent.setup()
    render(<ProductCard product={productMock} addToCart={addToCartMock}/>)
    
    const addBtn = screen.getByRole('button', {
      name: /buy/i
    }) 
    
    await user.click(addBtn)    
    render(<CartCard product={productMock} removeFromCart={removeFromCartMock}/>)

    const removeBtn = screen.getByRole('button', {
      name: /remove/i
    })
    expect(removeBtn).toBeInTheDocument()
  })

  test("deve remover o produto do carrinho quando o botao 'remove' for clicado", async () => {
    const user = userEvent.setup()
    render(<ProductCard product={productMock} addToCart={addToCartMock}/>)
    
    const addBtn = screen.getByRole('button', {
      name: /buy/i
    }) 
    
    await user.click(addBtn)    
    render(<CartCard product={productMock} removeFromCart={removeFromCartMock}/>)

    const removeBtn = screen.queryByRole('button', {
      name: /remove/i
    })

    await user.click(removeBtn)

    expect(removeFromCartMock).toBeCalledTimes(1)
    expect(removeFromCartMock).toReturn()
  })
})