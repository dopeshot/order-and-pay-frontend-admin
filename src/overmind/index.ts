import { IContext } from 'overmind'
import { createActionsHook, createStateHook } from 'overmind-react'
import { namespaced } from 'overmind/config'
import * as allergens from './allergens'
import * as app from './app'
import * as categories from './categories'
import * as dishes from './dishes'
import * as labels from './labels'
import * as menuoverview from './menuoverview'
import * as menus from './menus'
import * as tables from './tables'
import * as users from './users'

export const config = namespaced({
    tables,
    app,
    labels,
    allergens,
    menuoverview,
    menus,
    dishes,
    users,
    categories
})

export type Context = IContext<{
    state: typeof config.state,
    actions: typeof config.actions,
    effects: typeof config.effects
}>

export const useAppState = createStateHook<Context>()
export const useActions = createActionsHook<Context>()