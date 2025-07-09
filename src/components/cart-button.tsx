"use client"

import { ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"

export function CartButton() {
  const { totalItems } = useCart()

  return (
    <Link href="/carrito">
      <Button variant="ghost" className="relative p-2">
        <ShoppingCart className="h-6 w-6 text-foreground" />
        {totalItems > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-[#D72638] text-white text-xs">{totalItems}</Badge>
        )}
      </Button>
    </Link>
  )
}
