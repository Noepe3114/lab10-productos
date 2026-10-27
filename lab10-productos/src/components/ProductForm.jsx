import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const CATEGORIAS = ["Bebidas", "Snacks", "Lácteos", "Abarrotes", "Limpieza"]

export default function ProductForm({ onRegistrar }) {
  const [descripcion, setDescripcion] = useState("")
  const [precio, setPrecio] = useState("")
  const [categoria, setCategoria] = useState("")
  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState("")

  const validar = () => {
    const nuevos = {}
    if (descripcion.trim().length < 3) {
      nuevos.descripcion =
        "La descripción es obligatoria y debe tener al menos 3 caracteres."
    }
    const precioNumero = Number(precio)
    if (precio.trim() === "" || Number.isNaN(precioNumero) || precioNumero <= 0) {
      nuevos.precio = "El precio es obligatorio y debe ser un número mayor que cero."
    }
    if (!categoria) {
      nuevos.categoria = "Debes seleccionar una categoría."
    }
    return nuevos
  }

  const limpiar = () => {
    setDescripcion("")
    setPrecio("")
    setCategoria("")
    setErrores({})
    setMensaje("")
  }

  const manejarSubmit = (e) => {
    e.preventDefault()
    const nuevos = validar()
    setErrores(nuevos)

    if (Object.keys(nuevos).length > 0) {
      setMensaje("")
      return
    }

    onRegistrar({
      descripcion: descripcion.trim(),
      precio: Number(precio),
      categoria,
    })

    setDescripcion("")
    setPrecio("")
    setCategoria("")
    setMensaje("Producto registrado correctamente (solo durante esta sesión).")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Registrar producto</CardTitle>
        <CardDescription>Completa los datos del nuevo producto.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={manejarSubmit} noValidate className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Input
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Ej. Inca Kola 1 L"
            />
            {errores.descripcion && (
              <p className="text-sm text-red-700">{errores.descripcion}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="precio">Precio de venta (S/)</Label>
            <Input
              id="precio"
              type="number"
              step="0.01"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              placeholder="0.00"
            />
            {errores.precio && (
              <p className="text-sm text-red-700">{errores.precio}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoria">Categoría</Label>
            <select
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-card px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              <option value="">Selecciona una categoría</option>
              {CATEGORIAS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {errores.categoria && (
              <p className="text-sm text-red-700">{errores.categoria}</p>
            )}
          </div>

          <div className="flex gap-2">
            <Button type="submit">Registrar producto</Button>
            <Button type="button" variant="outline" onClick={limpiar}>
              Limpiar
            </Button>
          </div>

          {mensaje && (
            <Alert className="border-accent-foreground/30 bg-accent text-accent-foreground">
              <AlertDescription className="text-accent-foreground">
                {mensaje}
              </AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  )
}