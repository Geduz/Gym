"use client"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import {
    format,
    subDays,
    subWeeks,
    subMonths,
    subYears,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
} from "date-fns"
import { es } from "date-fns/locale"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { DateRange } from "react-day-picker"

interface DateRangePickerProps {
    value?: DateRange
    onChange?: (dateRange: DateRange | undefined) => void
    placeholder?: string
    className?: string
    disabled?: boolean
}

interface PresetOption {
    label: string
    value: string
    action: () => DateRange
}

export default function DateRangePicker({
    value,
    onChange,
    placeholder = "Seleccionar fechas",
    className,
    disabled = false,
}: DateRangePickerProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [internalValue, setInternalValue] = useState<DateRange | undefined>(value)

    // Usar el valor interno o el valor del prop
    const currentValue = value || internalValue

    // Función para crear rangos predefinidos
    const createPresets = (): PresetOption[] => {
        const today = new Date()

        return [
            {
                label: "Hoy",
                value: "today",
                action: () => ({ from: today, to: today }),
            },
            {
                label: "Ayer",
                value: "yesterday",
                action: () => {
                    const yesterday = subDays(today, 1)
                    return { from: yesterday, to: yesterday }
                },
            },
            {
                label: "Esta semana",
                value: "week",
                action: () => ({
                    from: startOfWeek(today, { weekStartsOn: 1 }),
                    to: endOfWeek(today, { weekStartsOn: 1 }),
                }),
            },
            {
                label: "Semana pasada",
                value: "lastWeek",
                action: () => {
                    const lastWeek = subWeeks(today, 1)
                    return {
                        from: startOfWeek(lastWeek, { weekStartsOn: 1 }),
                        to: endOfWeek(lastWeek, { weekStartsOn: 1 }),
                    }
                },
            },
            {
                label: "Este mes",
                value: "month",
                action: () => ({
                    from: startOfMonth(today),
                    to: endOfMonth(today),
                }),
            },
            {
                label: "Mes pasado",
                value: "lastMonth",
                action: () => {
                    const lastMonth = subMonths(today, 1)
                    return {
                        from: startOfMonth(lastMonth),
                        to: endOfMonth(lastMonth),
                    }
                },
            },
            {
                label: "Últimos 3 meses",
                value: "quarter",
                action: () => ({
                    from: subMonths(today, 3),
                    to: today,
                }),
            },
            {
                label: "Último año",
                value: "year",
                action: () => ({
                    from: subYears(today, 1),
                    to: today,
                }),
            },
            {
                label: "Últimos 30 días",
                value: "last30",
                action: () => ({
                    from: subDays(today, 30),
                    to: today,
                }),
            },
        ]
    }

    // Función para manejar la selección de rangos predefinidos
    const handlePresetSelect = (preset: PresetOption) => {
        const newRange = preset.action()
        updateValue(newRange)
        setIsOpen(false)
    }

    // Función para manejar la selección del calendario
    const handleCalendarSelect = (selectedRange: DateRange | undefined) => {
        updateValue(selectedRange)
    }

    // Función para actualizar el valor y notificar al padre
    const updateValue = (newValue: DateRange | undefined) => {
        setInternalValue(newValue)
        onChange?.(newValue)
    }

    // Función para formatear el rango de fechas
    const formatDateRange = (): string => {
        if (!currentValue?.from) return placeholder

        if (!currentValue.to) {
            return format(currentValue.from, "dd MMM yyyy", { locale: es })
        }

        if (format(currentValue.from, "yyyy-MM-dd") === format(currentValue.to, "yyyy-MM-dd")) {
            return format(currentValue.from, "dd MMM yyyy", { locale: es })
        }

        return `${format(currentValue.from, "dd MMM", { locale: es })} - ${format(currentValue.to, "dd MMM yyyy", { locale: es })}`
    }

    // Función para limpiar la selección
    const handleClear = () => {
        updateValue(undefined)
        setIsOpen(false)
    }

    // Función para aplicar la selección
    const handleApply = () => {
        setIsOpen(false)
    }

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    disabled={disabled}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !currentValue?.from && "text-muted-foreground",
                        className
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formatDateRange()}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
                <div className="flex">
                    {/* Panel de rangos predefinidos */}
                    <div className="border-r border-border p-3 space-y-1">
                        <div className="text-sm font-medium mb-2">Rangos rápidos</div>
                        <div className="space-y-1">
                            {createPresets().map((preset) => (
                                <Button
                                    key={preset.value}
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-start text-sm"
                                    onClick={() => handlePresetSelect(preset)}
                                >
                                    {preset.label}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Panel del calendario */}
                    <div className="p-3">
                        <div className="text-sm font-medium mb-2">Seleccionar rango personalizado</div>
                        <CalendarComponent
                            initialFocus
                            mode="range"
                            defaultMonth={currentValue?.from}
                            selected={currentValue}
                            onSelect={handleCalendarSelect}
                            numberOfMonths={2}
                            locale={es}
                        />
                        <Separator className="my-3" />
                        <div className="flex justify-between">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleClear}
                            >
                                Limpiar
                            </Button>
                            <Button
                                size="sm"
                                onClick={handleApply}
                                className="bg-[#D72638] hover:bg-[#B91E2F]"
                            >
                                Aplicar
                            </Button>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}