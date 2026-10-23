import { onBeforeUnmount, onMounted, ref } from 'vue'

/** Id da seção que está cruzando o meio da tela, para destacar o item certo do menu. */
export function useActiveSection(ids: readonly string[]) {
  const active = ref<string | null>(null)
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    if (!('IntersectionObserver' in window)) return

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) active.value = entry.target.id
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    for (const id of ids) {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    }
  })

  onBeforeUnmount(() => observer?.disconnect())

  return active
}
