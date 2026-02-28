import type { GetState, SetState, StateCreator } from './zustand'

interface PersistOptions {
  name: string
}

export function persist<T>(
  initializer: StateCreator<T>,
  options: PersistOptions,
): StateCreator<T> {
  return (set: SetState<T>, get: GetState<T>) => {
    const storage = typeof window !== 'undefined' ? window.localStorage : undefined

    const setWithPersist: SetState<T> = (partial, replace) => {
      set(partial, replace)

      if (storage) {
        storage.setItem(options.name, JSON.stringify(get()))
      }
    }

    const initialState = initializer(setWithPersist, get)

    if (!storage) {
      return initialState
    }

    try {
      const raw = storage.getItem(options.name)
      if (!raw) {
        storage.setItem(options.name, JSON.stringify(initialState))
        return initialState
      }

      const parsed = JSON.parse(raw) as Partial<T>
      return { ...initialState, ...parsed }
    } catch {
      return initialState
    }
  }
}
