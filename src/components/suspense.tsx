import { Suspense, ComponentPropsWithoutRef, ReactElement } from "react"

export const SuspenseOnClient = (
  props: ComponentPropsWithoutRef<typeof Suspense> & { fallback: ReactElement }
) => (process.browser ? <Suspense {...props} /> : null)
