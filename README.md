# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
    },
  },
])
```

## Features & Screens

### Login (Authentication)
* **Screen:** `LoginScreen` (`src/components/Screens/LoginScreen.tsx`)
* **Components:** 
  * `TextInput` (`src/components/Inputs/TextInput.tsx`): Reusable input field with password visibility toggle capability.
  * `ButtonPrimary` (`src/components/Buttons/ButtonPrimary.tsx`): Reusable primary action button following the brand colors (`app-primary`).
* **Description:** A responsive, modern login interface matching the official Satsi ERP UI mockup. Features email and password inputs with full Tailwind CSS styling and strictly typed React functional components.

### Recursos Humanos (HR)
* **Screen:** `HRScreen` (`src/components/Screens/HRScreen.tsx`)
* **Description:** Gestión centralizada del personal. Muestra datos críticos como NSS, RFC, sueldo semanal y posición. Implementa filtros por estatus (Activo/Inactivo) y búsqueda de empleados en tiempo real.

### Documentos Legales
* **Screen:** `LegalDocumentsScreen` (`src/components/Screens/LegalDocumentsScreen.tsx`)
* **Description:** Repositorio maestro de contratos y documentos. Gestiona versiones de plantillas legales (v1.0, v2.1, etc.) y categorías de contratación (Honorarios, Home Office, Operador, etc.).

### Contratos
* **Screen:** `ContractsScreen` (`src/components/Screens/ContractsScreen.tsx`)
* **Description:** Módulo de vinculación contractual. Relaciona a los empleados con sus documentos legales específicos, permitiendo el seguimiento de fechas de inicio/fin y la carga de archivos escaneados con el contrato firmado.

### Puestos
* **Screen:** `PositionsScreen` (`src/components/Screens/PositionsScreen.tsx`)
* **Description:** Catálogo de puestos de trabajo por departamento. Permite definir las actividades y responsabilidades de cada posición, así como gestionar su disponibilidad operativa.

## Reusable UI Library (Satsi Core)

Para garantizar consistencia visual y soporte para múltiples niveles de zoom, se ha desarrollado una librería de componentes internos en `src/components/`:

* **DataTable** (`Lists/DataTable.tsx`): Contenedor de tabla responsivo con scroll horizontal inteligente y encabezados dinámicos.
* **Pagination** (`Lists/Pagination.tsx`): Control de navegación que incluye selector de tamaño de página (Show 5, 10, 20) y menús flotantes.
* **ActionButton** (`Buttons/ActionButton.tsx`): Botones de acción con soporte para iconos y etiquetas inteligentes (hide-on-mobile).
* **SearchInput** (`Inputs/SearchInput.tsx`): Campo de búsqueda compacto integrado con iconos de la marca.
