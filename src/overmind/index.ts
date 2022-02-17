import { IContext } from 'overmind'
import { createActionsHook, createStateHook } from 'overmind-react'
import { namespaced } from 'overmind/config'
import * as allergens from './allergens'
import * as app from './app'
import * as labels from './labels'
import * as menuoverview from './menuoverview'
import * as tables from './tables'

export const config = namespaced({
    tables,
    app,
    labels,
    allergens,
    menuoverview
})

export type Context = IContext<{
    state: typeof config.state,
    actions: typeof config.actions,
    effects: typeof config.effects
}>

export const useAppState = createStateHook<Context>()
export const useActions = createActionsHook<Context>()