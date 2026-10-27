import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function ProductList({ productos }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Productos registrados</CardTitle>
        <CardDescription>
          {productos.length} {productos.length === 1 ? "producto" : "productos"} en el catálogo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary hover:bg-secondary">
              <TableHead>Código</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead className="text-right">Precio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productos.map((p) => (
              <TableRow key={p.codigo} className="even:bg-muted/40">
                <TableCell className="font-medium">{p.codigo}</TableCell>
                <TableCell>{p.descripcion}</TableCell>
                <TableCell>
                  <span className="rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground">
                    {p.categoria}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  S/ {Number(p.precio).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}