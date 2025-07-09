"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/hooks/use-toast"

// Tipos para los items del carrito
export type CartItemType = {
  id: number | string
  name: string
  price: number
  quantity: number
  image?: string
  type: "product" | "membership" // Para diferenciar entre productos y membresías
  description?: string
}

// Tipo para el contexto del carrito
type CartContextType = {
  cartItems: CartItemType[]
  addToCart: (item: CartItemType) => boolean
  removeFromCart: (id: number | string, type: "product" | "membership") => void
  updateQuantity: (id: number | string, type: "product" | "membership", quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

// Crear el contexto
const CartContext = createContext<CartContextType | undefined>(undefined)

// Proveedor del contexto
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItemType[]>([])
  const [totalItems, setTotalItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const { toast } = useToast()

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("powerfit_cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setCartItems(parsedCart)
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error)
      }
    }
  }, [])

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("powerfit_cart", JSON.stringify(cartItems))
    } else {
      localStorage.removeItem("powerfit_cart")
    }

    // Calcular totales
    const items = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    const price = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    setTotalItems(items)
    setTotalPrice(price)
  }, [cartItems])

  // Modificar la función addToCart para incluir la validación de un solo entrenador y una sola membresía
  const addToCart = (item: CartItemType) => {
    // Verificar si es un entrenador (los entrenadores tienen id que comienza con "trainer-")
    const isTrainer = typeof item.id === "string" && item.id.startsWith("trainer-")

    // Verificar si ya existe un entrenador en el carrito
    const hasTrainerInCart =
      isTrainer && cartItems.some((cartItem) => typeof cartItem.id === "string" && cartItem.id.startsWith("trainer-"))

    // Verificar si ya existe una membresía en el carrito
    const hasMembershipInCart =
      item.type === "membership" && cartItems.some((cartItem) => cartItem.type === "membership")

    // Si intenta agregar un segundo entrenador, mostrar error
    if (isTrainer && hasTrainerInCart) {
      toast({
        title: "No se puede agregar",
        description: "Solo puedes tener un entrenador en tu carrito. Elimina el actual si deseas cambiar.",
        variant: "destructive",
        duration: 4000,
      })
      return false
    }

    // Si intenta agregar una segunda membresía, mostrar error
    if (item.type === "membership" && hasMembershipInCart) {
      toast({
        title: "No se puede agregar",
        description: "Solo puedes tener una membresía en tu carrito. Elimina el actual si deseas cambiar.",
        variant: "destructive",
        duration: 4000,
      })
      return false
    }

    setCartItems((prevItems) => {
      // Verificar si el item ya existe en el carrito
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.type === item.type,
      )

      if (existingItemIndex >= 0) {
        // Si existe, actualizar la cantidad
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += item.quantity
        return updatedItems
      } else {
        // Si no existe, añadir nuevo item
        return [...prevItems, item]
      }
    })

    return true
  }

  // Eliminar item del carrito
  const removeFromCart = (id: number | string, type: "product" | "membership") => {
    setCartItems((prevItems) => prevItems.filter((item) => !(item.id === id && item.type === type)))
  }

  // Actualizar cantidad de un item
  const updateQuantity = (id: number | string, type: "product" | "membership", quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, type)
      return
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id && item.type === type ? { ...item, quantity } : item)),
    )
  }

  // Limpiar carrito
  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem("powerfit_cart")
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Hook para usar el contexto del carrito
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
