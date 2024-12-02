import type { NavGroupType, NavItem } from '@thecodeorigin/nuxt/@layouts/types'
import type { selectSysUserSchema } from '@thecodeorigin/nuxt/schemas'
import type { Actions, Subjects } from '@thecodeorigin/nuxt/utils/casl'
import type { Page } from 'puppeteer'
import type { RouteLocationRaw } from 'vue-router'
import type { z } from 'zod'

declare module 'vue-router' {
  interface RouteMeta {
    action?: Actions
    subject?: Subjects
    sidebar?: (NavItem & {
      group: NavGroupType
    })
    layoutWrapperClasses?: string
    navActiveLink?: RouteLocationRaw
    layout?: 'blank' | 'default'
    unauthenticatedOnly?: boolean
    public?: boolean
  }
}

declare global {
  // eslint-disable-next-line vars-on-top
  var $page: Page
}

declare module 'nitropack' {
  interface NitroRuntimeHooks {
    'user:created': (data: z.infer<typeof selectSysUserSchema>) => void
    'user:get': (data: z.infer<typeof selectSysUserSchema>) => void
  }
}

export {}
