type LocationQueryValue = string | null
type LocationQuery = Record<
  string,
  LocationQueryValue | LocationQueryValue[] | undefined
>
type RouteLike = {
  path: string
  query: LocationQuery
}

export default defineNuxtRouteMiddleware((to: RouteLike) => {
  if (to.path === '/') {
    return navigateTo(
      {
        path: '/auth/login',
        query: to.query,
      },
      {
        replace: true,
        redirectCode: 302,
      },
    )
  }
})
