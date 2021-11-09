// testWithPageObjects.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/// <reference types="cypress" /> 

const { navigateTo } = require("../support/page_objects/navigationPage")

describe('Test With Page Objects', () => {

    beforeEach('open application', () => {
        cy.visit('/')
    })

    it('Verify Navigation Across the Pages', () => {
        navigateTo.formsLayoutPage()
        navigateTo.datepickerPage() 
        navigateTo.smartTablePage()
        navigateTo.tooltipPage()
        navigateTo.toasterPage()

    })

})