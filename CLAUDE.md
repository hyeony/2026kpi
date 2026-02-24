# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HnineDS is a **Zero CSS Import** React component library monorepo. Components automatically inject their styles into `<head>` on mount — no CSS imports required by consumers. Built with TypeScript, Vite, and Turbo.

## Commands

**Prerequisites:** Node 20.8.1+, pnpm 8.15.0+

```bash
# Install dependencies
pnpm install

# Development servers
pnpm dev:core        # playground-core → localhost:5173
pnpm dev:styles      # playground-styles → localhost:5174
pnpm dev:storybook   # Storybook docs → localhost:6006

# Build
pnpm build:packages  # Build @hnineds/core and @hnineds/styles
pnpm build:all       # Build everything (packages + apps)
pnpm clean           # Clean all dist/ and cache
```

There is no test runner configured — testing is done via Storybook and the playground apps.

## Architecture

### Dual-Package Structure

- **`packages/core`** (`@hnineds/core`): Base package with minimal default styles. Fully standalone.
- **`packages/styles`** (`@hnineds/styles`): Enhanced package (gradients, shadows, animations). Re-exports everything from core and registers style overrides at module load time via `styleRegistry.ts`.

### Style Injection System

When a component mounts, the `useComponentStyle` hook (`packages/core/src/hooks/useComponentStyle.ts`) serializes the component's CSS object and injects a `<style>` tag into `<head>` with a `data-hnineds-id` attribute. A reference counter in `injectStyle.ts` tracks usage; the tag is removed when the last instance unmounts.

`@hnineds/styles` registers overrides in the global `styleRegistry` at import time. Core components check this registry on mount and inject the override styles instead of their defaults — enabling provider-less usage.

### Prefix-Based Class Name Isolation

All class names use a build prefix: `{prefix}-{componentId}-{modifier}` (e.g., `hnineds1-btn-primary`).

- Default prefix comes from `BUILD_PREFIX` in `packages/core/src/prefix.ts`, set via the `VITE_BUILD_PREFIX` env var (`.env` default: `hnineds1`).
- `HnineDSProvider` overrides the prefix at runtime via React Context.
- **Changing the prefix changes the CSS namespace** — `useComponentStyle` generates CSS rules and class names using the same prefix together, so styles remain intact. Different prefix instances are fully isolated from each other.
- `getClass(prefix, componentId, modifier)` in `prefix.ts` is the utility for building class names.
- Component short names (e.g., `Button → "btn"`) are centrally registered in `componentNames.ts`.

### Component Structure

Each component follows this file pattern (e.g., `packages/core/src/components/Button/`):
- `Button.tsx` — JSX, hooks
- `Button.types.ts` — Props interface
- `Button.style.ts` — Returns `CssObject` for style injection
- `index.ts` — Named export

### Key Files

| File | Role |
|------|------|
| `packages/core/src/utils/injectStyle.ts` | CSS serialization, DOM injection, reference counting |
| `packages/core/src/hooks/useComponentStyle.ts` | Hook that drives on-demand style injection |
| `packages/core/src/styleRegistry.ts` | Global registry for `@hnineds/styles` overrides |
| `packages/core/src/context/HnineDSProvider.tsx` | React Context for runtime prefix override |
| `packages/core/src/prefix.ts` | `BUILD_PREFIX` constant and `getClass()` |
| `packages/core/src/componentNames.ts` | Central component short-name registry |

### Build & Monorepo

- Turbo orchestrates tasks; build outputs go to `dist/` per package.
- Development uses Vite alias resolution directly to `src/` — no build step needed during dev.
- Each package distributes ESM + CJS + TypeScript declarations.
- Only `dist/` and `CHANGELOG.md` are included in published packages.
