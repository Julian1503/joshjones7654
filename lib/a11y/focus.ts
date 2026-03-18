export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => !element.hasAttribute('disabled') && !element.getAttribute('aria-hidden'))
}

export function trapFocusWithin(event: KeyboardEvent, container: HTMLElement): void {
  if (event.key !== 'Tab') return

  const focusables = getFocusableElements(container)
  if (focusables.length === 0) {
    event.preventDefault()
    return
  }

  const first = focusables[0]
  const last = focusables[focusables.length - 1]
  const activeElement = document.activeElement as HTMLElement | null

  if (event.shiftKey && activeElement === first) {
    event.preventDefault()
    last.focus()
    return
  }

  if (!event.shiftKey && activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

