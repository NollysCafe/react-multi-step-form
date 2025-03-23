# react-multi-step-form

<div align='center'>
  <img alt='NFE-OSL License' src='https://img.shields.io/badge/License-NFE--OSL-purple?style=flat-square' />
  <img alt='npm' src='https://img.shields.io/npm/v/react-multi-step-form?style=flat-square' />
  <img alt='npm' src='https://img.shields.io/npm/dt/react-multi-step-form?style=flat-square' />
  <img alt='GitHub Repo size' src='https://img.shields.io/github/repo-size/NollysCafe/react-multi-step-form?style=flat-square' />
  <img alt='GitHub last commit' src='https://img.shields.io/github/last-commit/NollysCafe/react-multi-step-form?style=flat-square' />
  <a href='https://nollyscafe.github.io/react-multi-step-form/'><img alt='Demo' src='https://img.shields.io/badge/Demo-online-success?style=flat-square' /></a>
</div>

> A modular, type-safe, developer-first multi-step form engine for React.

**react-multi-step-form** is a feature-complete, SSR-friendly, typed, and minimalist form engine for React projects.
Designed for devs who want full control over multi-step flows — without sacrificing flexibility or DX.

---

## 🚀 Features

- 🧠 **Type-safe** form data across all steps
- 📦 **Modular architecture** (components, hooks, steps)
- 💾 **Persistence via `localStorage`**
- ✅ Built-in step-by-step **validation system**
- 📦 **CJS + ESM** output for full bundler compatibility
- ⚛️ **Works out of the box** with Vite, Next.js, Remix, CRA, etc.
- 🔐 SSR safe by default — no runtime surprises
- 🎨 SCSS theming support

---

## 📦 Installation

```bash
pnpm add @nolly-cafe/react-multi-step-form
# or
npm install @nolly-cafe/react-multi-step-form
# or
yarn add @nolly-cafe/react-multi-step-form
```

---

## 🧠 Basic Usage

```tsx
import { MultiStepForm, StepForm, useForm, useStepValidation } from '@nolly-cafe/react-multi-step-form'

interface MyFormData {
  email: string
  interests: string[]
}

function App() {
  return (
    <MultiStepForm<MyFormData>
      onSubmit={data => console.log(data)}
      validateOnStep
      persistKey="my-form"
      includeSummary
    >
      <StepForm id="step-1" title="Email">
        <EmailStep />
      </StepForm>
      <StepForm id="step-2" title="Interests">
        <InterestStep />
      </StepForm>
    </MultiStepForm>
  )
}

function EmailStep() {
  const { formData, setFormData } = useForm<MyFormData>()
  useStepValidation(() => /\S+@\S+\.\S+/.test(formData.email || ''))

  return (
    <div className="step">
      <label>Email</label>
      <input
        type="email"
        value={formData.email || ''}
        onChange={e => setFormData({ email: e.target.value })}
      />
    </div>
  )
}
```

> To customize colors or tokens, override the CSS variables **before importing the component styles**:
```scss
:root {
  --primary: #1d4ed8;
  --error: #dc2626;
  ...
}

@use '@nolly-cafe/react-multi-step-form/dist/index.cjs.css';
```

---

## 🛠 API Reference

### `<MultiStepForm<T>>`

| Prop             | Type                         | Description                                         |
| ---------------- | ---------------------------- | --------------------------------------------------- |
| `children`       | `ReactNode`                  | Step components (`<StepForm>`)                      |
| `onSubmit`       | `(data: T) => void`          | Callback when form is submitted                     |
| `onCancel?`      | `() => void`                 | Optional cancel handler                             |
| `persistKey?`    | `string`                     | Persists data in `localStorage` with given key      |
| `validateOnStep` | `boolean` (default: `true`)  | Whether to run validation before allowing next step |
| `includeSummary` | `boolean` (default: `false`) | Whether to add a summary confirmation step          |

---

### `<StepForm>`

Minimal wrapper for each step in the form.

| Prop       | Type        | Description            |
| ---------- | ----------- | ---------------------- |
| `id`       | `string`    | Unique step identifier |
| `title`    | `string`    | Label shown in step UI |
| `children` | `ReactNode` | Content of the step    |

---

### `useForm<T>()`

Access and control form state:

```ts
const { formData, setFormData, next, previous } = useForm<MyFormData>()
```

---

### `useStepValidation(fn: () => boolean)`

Register per-step validation:

```ts
useStepValidation(() => formData.email.includes('@'))
```

---

## ✨ Example Showcase

See the [📦 Example Page](https://nollyscafe.github.io/react-multi-step-form/) for a live demo.

We'll use GitHub Pages to serve a minimal standalone example. Stay tuned.

---

## 📜 License

![NFE-OSL](https://img.shields.io/badge/License-NFE--OSL-purple?style=flat-square)

This project is licensed under the
**[Nolly’s Fair & Ethical Open-Source License v1.0](LICENSE.md)** — based on AGPL-3.0 with ethical clauses, fair attribution, and anti-abuse protection.

Commercial use requires explicit permission.
Contact: [nolly.berrebi@gmail.com](mailto:nolly.berrebi@gmail.com)

---

## 🤝 Contributing

PRs welcome.
If you fix bugs, improve types, or want to add helpers (e.g. built-in fields), feel free to open an issue or PR.

---

## ☕ Built by

**[Nolly's Cafe](https://cafe.thenolle.com)** – Indie dev tools with taste.

---

## 🔗 Links

- [GitHub Repo](https://github.com/NollysCafe/react-multi-step-form)
- [License](./LICENSE.md)
- [NFE-OSL v1.0](https://cafe.thenolle.com/nfe-osl)
