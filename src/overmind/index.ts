import { IContext } from 'overmind'
import { createActionsHook, createStateHook } from 'overmind-react'
import { namespaced } from 'overmind/config'
import * as app from './app'
import * as example from './example'
import * as labels from './labels'
import * as tables from './tables'
export const config = namespaced({
    example,
    tables,
    app,
    labels
})

export type Context = IContext<{
    state: typeof config.state,
    actions: typeof config.actions,
    effects: typeof config.effects
}>

export const useAppState = createStateHook<Context>()
export const useActions = createActionsHook<Context>()