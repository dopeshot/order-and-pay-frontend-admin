import { HttpResponseInterceptor, RouteMatcher, StaticResponse, } from 'cypress/types/net-stubbing';

export function interceptIndefinitely(route: RouteMatcher, response?: StaticResponse | HttpResponseInterceptor): any {
    let sendResponse

    const trigger = new Promise((resolve) => {
        sendResponse = resolve;
    })

    cy.intercept(route, (request) => {
        return trigger.then(() => {
            request.reply(response);
        })
    })

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