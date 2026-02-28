import { useSyncExternalStore } from 'react'

type Listener = () => void
type StateValue<T> = T | Partial<T>
type SetStateInput<T> = StateValue<T> | ((state: T) => StateValue<T>)

export type SetState<T> = (partial: SetStateInput<T>, replace?: boolean) => void
export type GetState<T> = () => T
export type StateCreator<T> = (set: SetState<T>, get: GetState<T>) => T

export interface UseBoundStore<T> {
  (): T
  <U>(selector: (state: T) => U): U
  getState: GetState<T>
  setState: SetState<T>
  subscribe: (listener: Listener) => () => void
}

function createStore<T>(initializer: StateCreator<T>) {
  let state: T
  const listeners = new Set<Listener>()

  const getState: GetState<T> = () => state
  const setState: SetState<T> = (partial, replace = false) => {
    const nextState =
      typeof partial === 'function'
        ? (partial as (currentState: T) => StateValue<T>)(state)
        : partial
    const shouldReplace =
      replace ||
      typeof nextState !== 'object' ||
      nextState === null ||
      Array.isArray(nextState)

    state = shouldReplace ? (nextState as T) : ({ ...state, ...nextState } as T)
    listeners.forEach((listener) => listener())
  }

  state = initializer(setState, getState)

  const subscribe = (listener: Listener) => {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  }

  return { getState, setState, subscribe }
}

type Selector<T, U> = (state: T) => U

function createBoundStore<T>(initializer: StateCreator<T>): UseBoundStore<T> {
  const api = createStore(initializer)

  const useStore = (<U>(selector?: Selector<T, U>) => {
    const select = selector ?? ((currentState: T) => currentState as unknown as U)
    return useSyncExternalStore(
      api.subscribe,
      () => select(api.getState()),
      () => select(api.getState()),
    )
  }) as UseBoundStore<T>

  useStore.getState = api.getState
  useStore.setState = api.setState
  useStore.subscribe = api.subscribe

  return useStore
}

export function create<T>(): (initializer: StateCreator<T>) => UseBoundStore<T>
export function create<T>(initializer: StateCreator<T>): UseBoundStore<T>
export function create<T>(initializer?: StateCreator<T>) {
  if (!initializer) {
    return (delayedInitializer: StateCreator<T>) => createBoundStore(delayedInitializer)
  }

  return createBoundStore(initializer)
}
