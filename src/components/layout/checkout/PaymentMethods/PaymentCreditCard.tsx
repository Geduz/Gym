"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard } from "lucide-react"
import type { ChangeEvent } from "react"

interface PaymentCreditCardProps {
    cardNumber: string
    cardName: string
    expiryMonth: string
    expiryYear: string
    cvv: string
    months: { value: string; label: string }[]
    years: { value: string; label: string }[]
    onChangeCardNumber: (e: ChangeEvent<HTMLInputElement>) => void
    onChangeCardName: (e: ChangeEvent<HTMLInputElement>) => void
    onChangeExpiryMonth: (value: string) => void
    onChangeExpiryYear: (value: string) => void
    onChangeCVV: (e: ChangeEvent<HTMLInputElement>) => void
}

export const PaymentCreditCard: React.FC<PaymentCreditCardProps> = ({
    cardNumber,
    cardName,
    expiryMonth,
    expiryYear,
    cvv,
    months,
    years,
    onChangeCardNumber,
    onChangeCardName,
    onChangeExpiryMonth,
    onChangeExpiryYear,
    onChangeCVV,
}) => (
    <div className="space-y-4 border-t pt-4">
        <div>
            <Label htmlFor="cardNumber">Número de tarjeta</Label>
            <div className="relative">
                <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={onChangeCardNumber}
                    maxLength={19}
                    className="pl-10"
                    required
                />
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
        </div>
        <div>
            <Label htmlFor="cardName">Nombre en la tarjeta</Label>
            <Input
                id="cardName"
                placeholder="NOMBRE APELLIDO"
                value={cardName}
                onChange={onChangeCardName}
                required
            />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label>Fecha de expiración</Label>
                <div className="flex space-x-2">
                    <Select value={expiryMonth} onValueChange={onChangeExpiryMonth} required>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Mes" />
                        </SelectTrigger>
                        <SelectContent>
                            {months.map((month) => (
                                <SelectItem key={month.value} value={month.value}>
                                    {month.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={expiryYear} onValueChange={onChangeExpiryYear} required>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Año" />
                        </SelectTrigger>
                        <SelectContent>
                            {years.map((year) => (
                                <SelectItem key={year.value} value={year.value}>
                                    {year.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                    id="cvv"
                    placeholder="123"
                    value={cvv}
                    onChange={onChangeCVV}
                    maxLength={4}
                    required
                />
            </div>
        </div>
    </div>
)
