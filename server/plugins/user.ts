export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('user:created', async (sysUser) => {})
})
