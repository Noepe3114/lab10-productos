import { useRef, useState } from "react"
import ProductList from "@/components/ProductList"
import ProductForm from "@/components/ProductForm"

const productosIniciales = [
  { codigo: 1, descripcion: "Coca Cola 500 ml", precio: 2.5, categoria: "Bebidas" },
  { codigo: 2, descripcion: "Inca Kola 1 L", precio: 4.2, categoria: "Bebidas" },
  { codigo: 3, descripcion: "Papas Lays clásicas", precio: 1.8, categoria: "Snacks" },
  { codigo: 4, descripcion: "Leche Gloria 1 L", precio: 5.1, categoria: "Lácteos" },
  { codigo: 5, descripcion: "Arroz Costeño 1 kg", precio: 4.8, categoria: "Abarrotes" },
]

function Resumen({ titulo, valor, detalle }) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <p className="text-sm text-muted-foreground">{titulo}</p>
      <p className="mt-1 text-2xl font-bold">{valor}</p>
      <p className="mt-1 truncate text-xs text-muted-foreground">{detalle}</p>
    </div>
  )
}

export default function App() {
  const [productos, setProductos] = useState(productosIniciales)
  const siguienteCodigo = useRef(
    Math.max(...productosIniciales.map((p) => p.codigo)) + 1
  )

  const registrarProducto = (datos) => {
    const nuevo = { codigo: siguienteCodigo.current, ...datos }
    siguienteCodigo.current += 1
    setProductos((anteriores) => [...anteriores, nuevo])
  }

  const total = productos.length
  const promedio = productos.reduce((suma, p) => suma + p.precio, 0) / total
  const categoriasEnUso = new Set(productos.map((p) => p.categoria)).size
  const masCaro = productos.reduce((a, b) => (b.precio > a.precio ? b : a))

  return (
    <div className="min-h-screen">
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
          <h1 className="text-3xl font-bold tracking-tight">Gestión de productos</h1>
          <p className="mt-1 text-primary-foreground/80">
            Datos de ejemplo guardados solo en memoria: al recargar la página se
            pierden los productos registrados en esta sesión.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 md:px-8">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Resumen
            titulo="Total de productos"
            valor={total}
            detalle="Registrados en esta sesión"
          />
          <Resumen
            titulo="Precio promedio"
            valor={`S/ ${promedio.toFixed(2)}`}
            detalle="Promedio del catálogo"
          />
          <Resumen
            titulo="Categorías en uso"
            valor={categoriasEnUso}
            detalle="Tipos de producto distintos"
          />
          <Resumen
            titulo="Producto más caro"
            valor={`S/ ${masCaro.precio.toFixed(2)}`}
            detalle={masCaro.descripcion}
          />
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-3">
          <div className="order-1 lg:sticky lg:top-6 lg:order-2">
            <ProductForm onRegistrar={registrarProducto} />
          </div>
          <div className="order-2 lg:order-1 lg:col-span-2">
            <ProductList productos={productos} />
          </div>
        </div>
      </main>
    </div>
  )
}