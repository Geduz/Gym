export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-[#D72638] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground">Procesando tu compra...</p>
      </div>
    </div>
  )
}
