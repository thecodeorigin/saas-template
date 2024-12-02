import type { RouteLocationRaw } from 'vue-router'
import type { Actions, Subjects } from '@thecodeorigin/nuxt/utils/casl'
import type { NavGroupType, NavItem } from '@thecodeorigin/nuxt/@layouts/types'

declare module '#app' {
  interface PageMeta {
    action?: Actions
    subject?: Subjects
    sidebar?: (NavItem & {
      group: NavGroupType
    })
    layoutWrapperClasses?: string
    navActiveLink?: RouteLocationRaw

    unauthenticatedOnly?: boolean
    public?: boolean
  }
}

declare module 'nuxt/schema' {
  interface RuntimeConfig {
    //
  }
  interface PublicRuntimeConfig {
    apiBaseUrl: string
  }
}

// It is always important to ensure you import/export something when augmenting a type
export { }
