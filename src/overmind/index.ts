import { IContext } from 'overmind'
import { createActionsHook, createStateHook } from 'overmind-react'
import { namespaced } from 'overmind/config'
import * as allergens from './allergens'
import * as app from './app'
import * as labels from './labels'
import * as menus from './menus'
import * as tables from './tables'

export const config = namespaced({
    tables,
    app,
    labels,
    allergens,
    menus
})

export type Context = IContext<{
    state: typeof config.state,
    actions: typeof config.actions,
    effects: typeof config.effects
}>

export const useAppState = createStateHook<Context>()
export const useActions = createActionsHook<Context>()