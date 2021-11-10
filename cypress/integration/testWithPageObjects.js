// testWithPageObjects.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/// <reference types="cypress" /> 

const { onDatepickerPage } = require("../support/page_objects/datepickerPage")
const { onFormLayoutPage } = require("../support/page_objects/formsLayoutPage")
const { navigateTo } = require("../support/page_objects/navigationPage")
const { onSmartTablePage } = require("../support/page_objects/smartTablePage")

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

    it.only('Should submit Inline and Basic form and select tomorro date in the calendar', () => {
        navigateTo.formsLayoutPage()
        onFormLayoutPage.submitInlineFormWithNameAndEmail('AdrianQA', 'test@test.com')
        onFormLayoutPage.submitBasicFormWithEmailAndPassword('test@testQA.com', 'QA')
        navigateTo.datepickerPage()
        onDatepickerPage.selectCommonDatepickerDateFromToday(1)
        onDatepickerPage.selectDatepickerWithRangeFromToday(7, 14)
        navigateTo.smartTablePage()
        onSmartTablePage.updateAgeByFirstName('Larry', '19')
        onSmartTablePage.addNewRecordWithFirstAndLastName('Adrian', 'Sanabria')
        onSmartTablePage.deleteRowByIndex(1)


    })

})