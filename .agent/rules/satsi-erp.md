---
trigger: always_on
---

## 🗣️ Interaction Language

- **Communication:** Always communicate with the USER in Spanish.
- **Exceptions:** Technical terms, code snippets, and terminal outputs should remain in their original language or English as per the "Language Standards" section.

# AI Agent Rules - SATSI ERP Web App
## 📱 Project Overview

This is a **React** web application using TypeScript and vite for the SATSI ERP product. The app manages user authentication,employees, payroll, attendance control, reports and billing.

---

## 🏗️ Architecture & Structure

### Routing System

- **Router** with file-based routing in `src/pages/`
- `public/` - Screens accessible without authentication (login, signup)
- `protected/dashboard/` - Authenticated screens only

### Source Code Organization

```
src/
├── api/           # API services (axios-based)
├── pages/         # Router screens
├── components/    # Reusable UI components (organized by category)
├── contexts/      # React Context providers
├── data/          # Static data & constants
├── hooks/         # Custom React hooks
├── Interfaces/    # TypeScript interfaces & types
├── lib/           # Utility libraries
└── utils/         # Helper functions
```

---

## 📐 Coding Standards

### 🌐 Language Standards

> **All project content must be written in English.** This ensures consistency and enables collaboration across the entire team.

This applies to:

- **Code comments** - All inline and block comments
- **Variable names** - Functions, constants, classes, interfaces
- **Commit messages** - Git commit descriptions
- **Documentation** - README, inline docs, JSDoc
- **Error messages** - User-facing and console messages
- **File names** - Components, hooks, utils, services

**Examples:**

```typescript
// ✅ Good - English comments and names
const fetchUserData = async () => {
  // Get user profile from API
  const response = await api.get('/user/profile');
  return response.data;
};

// ❌ Bad - Spanish comments and names
const obtenerDatosUsuario = async () => {
  // Obtener perfil de usuario desde API
  const respuesta = await api.get('/user/profile');
  return respuesta.data;
};
```

### TypeScript

- **Always use TypeScript** - No `.js` files in `src/`
- Define interfaces in `src/Interfaces/` with descriptive filenames (e.g., `buttonGreenPrimaryProps.ts`)
- Use proper typing for all props, state, and function parameters
- Export interfaces with descriptive names following PascalCase

### Components

- Use **functional components with arrow functions**
- Export components using `export default ComponentName`
- Props must have dedicated interface in `src/Interfaces/`
- Follow the naming pattern: `ComponentName.tsx` (PascalCase)
- **Screen Architecture:** The actual logic and UI must reside in a separate component within `src/components/Screens/` named `ScreenNameScreen.tsx`.

**Component Template:**

```typescript
import React from 'react';
import { ComponentNameProps } from '@/src/Interfaces/componentNameProps';

const ComponentName = ({ prop1, prop2, disabled = false }: ComponentNameProps) => {
  return (
    <div className="...">
      <div className="...">{prop1}</div>
    </div>
  );
};

export default ComponentName;
```

### Styling with NativeWind/Tailwind CSS

- Use Tailwind CSS classes via `className` prop
- Use predefined colors from `tailwind.config.js`:
  - `app-primary` - Main brand green
  - `app-secondary` - Secondary green
  - `app-gray-*` - Gray variations
  - `yellow-primary`, `green-light`, etc.
- Use predefined fonts: `font-nunito`, `font-nunitosans`
- **Never use inline styles** unless absolutely necessary
- Keep className strings clean and readable

### State Management

- Use **React Context API** for global state
- Contexts are in `src/contexts/`
- Create custom hooks in `src/hooks/` for reusable logic
- Custom hook naming: `useFeatureName.ts` (camelCase with `use` prefix)

### API Services

- All API calls go in `src/api/`
- Use the centralized axios instance from `src/api/axios.ts`
- Name services descriptively: `featureService.ts`
- Handle errors consistently using try/catch

### Navigation

- Use Router's `useRouter()` for navigation
- **Route Group Exclusion:** Never include folder names in parentheses in path strings. If TypeScript flags an error due to generated types, use a type assertion (e.g., `router.push('/path' as any)`) instead of including the group names.
- Deep links follow pattern: `flexdondecredito://ScreenName/params`
- Route files match URL paths

## Error Handling

- Use try/catch for async operations
- Console.error for debugging with meaningful messages
- Graceful fallbacks for API failures
- User-friendly error messages via toast context

---

## 🧪 Testing

- Use **Detox** for E2E testing
- Test files location: `e2e/` directory
- Test file naming: `featurename.test.js`
- Build test binaries before running tests:
  ```bash
  npx detox build --configuration android.release
  npx detox test --configuration android.release
  ```

---

## 📝 Code Quality

### Prettier Configuration

```javascript
{
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  bracketSameLine: true
}
```

### ESLint

- Using `eslint-config-expo` with Prettier integration
- Run `npx expo-doctor` to check for issues

### Imports

- Use path aliases: `@/src/...` for absolute imports from src
- Order imports: React → React Native → Third-party → Local
- Group imports by type with blank lines between groups

---

## 🚀 Build & Development

### Development

```bash
npx expo start --clear
npx expo run:android
```

### Build Commands

```bash
# Local APK
eas build -p android --profile preview --local

# iOS via EAS
eas build --platform ios

# Local Android without EAS
cd androidbuild && ./prebuild.sh && ./buildandroid.sh apk
```

### Environment Configuration

- `APP_NAME` - Brand identifier (flexdondecredito, flexdondecreditocolombia)
- `NODE_ENV` - Environment (qa, prod)
- Config files in `appconfig/` directory

## Before Committing

1. Run `npm run lint` to fix and check issues
2. Run `npm run format` to format code
3. Run `npm run doctor` to check project health

---

## 🚫 Git Restrictions

> **The AI agent must NOT execute any git commands.** The user will handle all git operations manually via command line.

**What the agent CAN do:**

- ✅ Provide instructions on which git commands to run
- ✅ Suggest commit messages following conventions
- ✅ Recommend branching strategies
- ✅ Advise on merge/rebase approaches

**What the agent CANNOT do:**

- ❌ Execute `git add`, `git commit`, `git push`, `git pull`, etc.
- ❌ Create or switch branches
- ❌ Perform merges or rebases
- ❌ Any git operation that modifies the repository

**Example - Correct approach:**

```
Agent: "To commit your changes, run these commands:"
  git add src/components/NewButton.tsx
  git commit -m "feat: add NewButton component"
  git push origin feature/new-button
```

---

## ⚠️ Important Conventions

1. **Never commit** `node_modules/`, `.expo/`, build artifacts
2. **Always run** ESLint and Prettier before committing
3. **Create interfaces** for all new component props
4. **Follow existing patterns** in the codebase
5. **Use existing components** from `src/components/` when possible
6. **Minimal Comments:** Do NOT add comments (inline or block) when implementing or modifying code, unless explicitly requested. Avoid documenting logic with comments as per user preference.
7. **Test thoroughly** on both Android and iOS
8. **Update README.md** when adding new screens or features
9. **Components:** PascalCase (`ButtonGreenPrimary`)
10. **Files:** kebab-case for utilities (`format-date.ts`), PascalCase for components (`ButtonGreenPrimary.tsx`)
11. **Hooks:** camelCase with `use` prefix (`useStorage`)
12. **Interfaces:** PascalCase with descriptive names (`ButtonGreenPrimaryProps`)
13. **Variables:** camelCase (`isLoading`, `userEmail`)
14. **No Auto-Comments:** The AI must not add explanatory comments or annotations to the code unless specifically asked to document a particular section.
15. **Decoupled Screens:** Route files in `src/app/` MUST be simple wrappers using `SafeAreaView`. UI/Logic belongs in `src/components/Screens/`. **Crucial:** Always use `edges={['left', 'right', 'bottom']}` on `SafeAreaView` when a header is present to prevent excessive top spacing.
16. **Utility Reuse:** Always check `src/utils/` for existing helper functions before implementing new formatting or processing logic. Reusable functions (e.g., date, currency, or string formatting) should be placed in this directory to ensure consistency across the application.

---

## 🔧 New Feature Checklist

When adding a new feature:

- [ ] Create screen in appropriate route group (`(public)` or `(protected)`)
- [ ] Define TypeScript interfaces in `src/Interfaces/`
- [ ] Create reusable components in `src/components/[Category]/`
- [ ] Add API service if needed in `src/api/`
- [ ] Create custom hook if complex logic in `src/hooks/`
- [ ] Update context if global state needed
- [ ] Add E2E tests in `e2e/`
- [ ] Update README.md with screen documentation
- [ ] Test on Android emulator and iOS simulator

---

## 📚 Component Categories

When creating new components, place them in the appropriate category:

| Category      | Purpose              | Example                  |
| ------------- | -------------------- | ------------------------ |
| `Backgrounds` | Background visuals   | Gradients, patterns      |
| `Boxes`       | Container components | Cards, wrappers          |
| `Buttons`     | Interactive buttons  | ActionButton, IconButton |
| `Carousels`   | Sliding content      | Image carousel           |
| `Checkboxes`  | Selection controls   | Checkbox, Radio          |
| `Dialogs`     | Modal dialogs        | Confirmation, Alert      |
| `Forms`       | Form elements        | Input groups             |
| `Headers`     | Page/section headers | ScreenHeader             |
| `Inputs`      | Text inputs          | TextField, OTP           |
| `Lists`       | List displays        | TransactionList          |
| `Screens`     | Full screen layouts  | BaseScreen               |
| `Sheets`      | Bottom sheets        | ActionSheet              |
| `Skeletons`   | Loading placeholders | CardSkeleton             |
| `Wizards`     | Multi-step flows     | ChangeNipWizard          |