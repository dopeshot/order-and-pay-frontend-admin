import { Method } from 'axios';
import { HttpResponseInterceptor, RouteMatcher, StaticResponse } from 'cypress/types/net-stubbing';

export function interceptIndefinitely(method: Method, route: RouteMatcher, alias: string, response?: StaticResponse | HttpResponseInterceptor): any {
    let sendResponse

    const trigger = new Promise((resolve) => {
        sendResponse = resolve;
    })

    cy.intercept(method, route, (request) => {
        return trigger.then(() => {
            request.reply(response);
        })
    }).as(alias)

    return { sendResponse }
}

export function getTableNumberAsArray() {
    const tableNumbers: string[] = []

    return new Cypress.Promise(resolve => {
        cy.get('[data-cy="table-table-row"]')
            .children()
            .each(($el, $index) => {
                if ($index == 1)
                    tableNumbers.push($el.text())

                if ($index == 6)
                    tableNumbers.push($el.text())

                if ($index == 11)
                    tableNumbers.push($el.text())

                if ($index == 16)
                    tableNumbers.push($el.text())
            })
            .then(() => resolve(tableNumbers))
    })
}

export function getCapacitiesAsArray() {
    const capacities: number[] = []

    return new Cypress.Promise(resolve => {
        cy.get('[data-cy="table-table-row"]')
            .children()
            .each(($el, $index) => {
                if ($index == 2)
                    capacities.push(parseInt($el.text()))

                if ($index == 7)
                    capacities.push(parseInt($el.text()))

                if ($index == 12)
                    capacities.push(parseInt($el.text()))

                if ($index == 17)
                    capacities.push(parseInt($el.text()))
            })
            .then(() => resolve(capacities))
    })
}