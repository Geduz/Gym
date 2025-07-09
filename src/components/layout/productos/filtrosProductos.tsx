"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { sortOptions } from '@/utils/productoUtils'
import { ProductosFilterProps } from '@/types/productos'

const ProductosFilter = ({ selectedCategory, setSelectedCategory, sortBy, setSortBy, categories }: ProductosFilterProps) => {
    return (
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                                {category.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {sortOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default ProductosFilter