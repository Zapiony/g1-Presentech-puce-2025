# Guía de estilos - PresenTech

## Principios de diseño

### 1. Mobile First
- Diseñar primero para pantallas de 375px
- Expandir a tablet y desktop sin perder funcionalidad
- Botones táctiles mínimo 40px de altura

### 2. Sobrio y Profesional
- Sin emojis
- Sin decoraciones innecesarias
- Tono académico e institucional
- Colores serios y confiables

### 3. Claridad y Funcionalidad
- Texto legible
- Jerarquía visual clara
- Espaciado generoso en mobile
- Acciones fáciles de identificar

## Componentes principales

### Button
```tsx
import { Button } from "./components/ui/button";

// Variantes
<Button variant="default">Primario</Button>
<Button variant="outline">Secundario</Button>
<Button variant="destructive">Peligro</Button>
<Button variant="ghost">Fantasma</Button>

// Tamaños
<Button size="sm">Pequeño</Button>
<Button size="default">Normal</Button>
<Button size="lg">Grande</Button>

// Estados
<Button disabled>Deshabilitado</Button>
```

### Input
```tsx
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";

<div className="space-y-2">
  <Label htmlFor="email">Correo</Label>
  <Input
    id="email"
    type="email"
    placeholder="correo@ejemplo.com"
    className="h-11"
  />
</div>
```

### Badge
```tsx
import { Badge } from "./components/ui/badge";

// Estados de asistencia
<Badge variant="default" className="bg-success">Presente</Badge>
<Badge variant="destructive">Ausente</Badge>
<Badge variant="secondary" className="bg-warning text-warning-foreground">
  Atrasado
</Badge>
```

### Modal/Dialog
```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Título</DialogTitle>
      <DialogDescription>Descripción</DialogDescription>
    </DialogHeader>
    
    {/* Contenido */}
    
    <DialogFooter>
      <Button variant="outline" onClick={() => setOpen(false)}>
        Cancelar
      </Button>
      <Button onClick={handleConfirm}>Confirmar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Layouts

### AppLayout
```tsx
import { AppLayout } from "./components/layout/AppLayout";

<AppLayout title="Título de la página" showBottomNav={true}>
  {/* Contenido */}
</AppLayout>
```

### Container responsivo
```tsx
<div className="container max-w-4xl mx-auto px-4 py-6">
  {/* Contenido */}
</div>
```

## Colores personalizados

### Clases Tailwind adicionales
```css
/* Estados semánticos */
bg-success          /* #166534 */
text-success        /* #166534 */
bg-success-bg       /* #F0FDF4 */

bg-warning          /* #9A3412 */
text-warning        /* #9A3412 */
bg-warning-bg       /* #FFF7ED */

bg-error            /* #991B1B */
text-error          /* #991B1B */
bg-error-bg         /* #FEF2F2 */

/* Institucionales */
text-primary-dark   /* #1E3A5F */
```

## Espaciado

### Mobile
- Padding lateral: `px-4` (16px)
- Padding vertical: `py-6` (24px)
- Gap entre elementos: `gap-4` (16px)
- Gap entre secciones: `gap-6` (24px)

### Desktop
- Max width contenedor: `max-w-4xl` (896px)
- Padding lateral: `px-4` o más según necesidad

## Tipografía

### Jerarquía
```tsx
<h1>Título principal</h1>        {/* text-2xl, font-medium */}
<h2>Título de sección</h2>       {/* text-xl, font-medium */}
<h3>Subtítulo</h3>               {/* text-lg, font-medium */}
<p className="text-sm text-muted-foreground">Texto secundario</p>
```

### Tamaños
- `text-xs`: 12px - Para labels pequeños y metadatos
- `text-sm`: 14px - Para texto secundario
- `text-base`: 16px - Para texto principal
- `text-lg`: 18px - Para subtítulos
- `text-xl`: 20px - Para títulos de sección
- `text-2xl`: 24px - Para títulos principales

## Iconos

```tsx
import { Calendar, Upload, LogOut, ChevronLeft } from "lucide-react";

// Tamaño estándar
<Calendar className="h-4 w-4" />

// Con botón
<Button>
  <Calendar className="h-4 w-4 mr-2" />
  Ver calendario
</Button>
```

## Estados de la interfaz

### Estado vacío
```tsx
import { EmptyState } from "./components/common/EmptyState";
import { GraduationCap } from "lucide-react";

<EmptyState
  icon={GraduationCap}
  title="No hay clases asignadas"
  description="Cuando se le asignen clases, aparecerán aquí"
/>
```

### Estado de error
```tsx
import { ErrorState } from "./components/common/ErrorState";

<ErrorState
  title="Error de conexión"
  message="No se pudo cargar los datos"
  onRetry={handleRetry}
/>
```

### Estado de carga
```tsx
import { LoadingState } from "./components/common/LoadingState";

<LoadingState message="Cargando clases..." />
```

## Responsive

### Breakpoints Tailwind
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

### Patrones comunes
```tsx
// Ocultar en mobile, mostrar en desktop
<div className="hidden md:block">Desktop only</div>

// Mostrar en mobile, ocultar en desktop
<div className="md:hidden">Mobile only</div>

// Grid responsive
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {/* Cards */}
</div>
```

## Accesibilidad

### Labels
```tsx
// ✅ Correcto
<Label htmlFor="input-id">Etiqueta</Label>
<Input id="input-id" />

// ❌ Incorrecto
<Input placeholder="Sin label visible" />
```

### Botones
```tsx
// ✅ Con texto visible
<Button>Guardar</Button>

// ✅ Solo icono con screen reader
<Button>
  <LogOut className="h-4 w-4" />
  <span className="sr-only">Cerrar sesión</span>
</Button>
```

### Contraste
- Verificar contraste mínimo de 4.5:1 para texto normal
- 3:1 para textos grandes
- Los colores de la paleta ya cumplen con WCAG 2.1 AA

## Buenas prácticas

### ✅ Hacer
- Usar componentes de UI existentes
- Mantener consistencia en espaciado
- Botones táctiles grandes en mobile (min 40px)
- Labels visibles en formularios
- Estados de carga y error claros
- Validación de formularios

### ❌ Evitar
- Crear componentes duplicados
- Usar estilos inline
- Botones pequeños difíciles de tocar
- Textos largos en botones mobile
- Tablas anchas en mobile
- Dependencia de hover en mobile
- Decoraciones innecesarias
- Emojis
