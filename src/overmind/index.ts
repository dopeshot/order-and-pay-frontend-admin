import { IContext } from 'overmind'
import { createActionsHook, createStateHook } from 'overmind-react'
import { namespaced } from 'overmind/config'
import * as allergens from './allergens'
import * as app from './app'
import * as auth from './auth'
import * as categories from './categories'
import * as dishes from './dishes'
import * as labels from './labels'
import * as menuoverview from './menuoverview'
import * as menus from './menus'
import * as notify from './notify'
import * as orders from './orders'
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
    auth,
    users,
    categories,
    notify,
    orders
})

export type Context = IContext<{
    state: typeof config.state,
    actions: typeof config.actions,
    effects: typeof config.effects
}>

export const useAppState = createStateHook<Context>()
export const useActions = createActionsHook<Context>()