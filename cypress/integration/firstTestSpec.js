// firstTestSpec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/// <reference types="cypress" /> 

const { table } = require("console")
const { get } = require("core-js/core/dict")

describe('First suite', () => {

    it('First test', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // by Tag Name
        cy.get('input')

        // by Id
        cy.get('#inputEmail1')

        // by Class Name
        cy.get('.input-full-width')

        // by Attribute Name
        cy.get('[placeholder]')

        // by Attribute Name and Value
        cy.get('[placeholder="Email"]')

        // by Class Value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        // by Tag Name Attribute with Value
        cy.get('input[placeholder="Email"]')

        // by Two Different Attributes
        cy.get('[placeholder="Email"][fullwidth]')

        // by Tag Name, Attribute with Value, Id and Class Name
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        // Most recommended way
        cy.get('[data-cy="inputEmail1"]')

    })

    it("Second test", () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[data-cy="signInButton"]')

        cy.contains('Sign in')

        cy.contains('[status="warning"]', 'Sign in')

        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click()

        cy.contains('nb-card', 'Horizontal form').find('[type="email"]')

    })

    it('Then and Wrap Methods', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // Using the Grid Form

        // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

        // Basic Form

        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')


        // Cypress Way (This is the way!)

        cy.contains('nb-card', 'Using the Grid').then(firstForm => {

            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
            expect(emailLabelFirst).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')

            cy.contains('nb-card', 'Basic form').then(secondForm => {

                const emailAddressLabelSecond = secondForm.find('[for="exampleInputEmail1"]').text()
                const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
                expect(emailAddressLabelSecond).to.equal('Email address')
                expect(passwordLabelSecond).to.equal('Password')

                // Wrap Example

                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')

            })
        })


    })

    it('Invoke Commands', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // 1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')


        // 2
        cy.get('[for="exampleInputEmail1"]').then(label => {
            expect(label.text()).to.equal('Email address')
        })


        // 3 - Invoke Command
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email address')
        })


        // 4 - Check box example
        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            .should('contain', 'checked')


        // 5 - Check box example 2
        // Notice .click() was removed since the checkbox is already checked 
        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            .then(classValue => {
                expect(classValue).to.contain('checked') // Chai assertion
            })

    })

    it('Assert property', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        // Datepicker example
        cy.contains('nb-card', 'Common Datepicker')
            .find('input')
            .then(input => {
                // As this is a Jquery element we cannot do .click so we need to wrap the element first
                cy.wrap(input).click()
                cy.get('nb-calendar-day-picker').contains('17').click()
                cy.wrap(input).invoke('prop', 'value').should('contain', 'Oct 17, 2021')
            })

    })

    it('Radio buttons', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
            cy.wrap(radioButtons)
                .first()
                .check({ force: true })
                .should('be.checked')

            cy.wrap(radioButtons)
                .eq(1)
                .check({ force: true })

            cy.wrap(radioButtons)
                .first()
                .should('not.be.checked')

            cy.wrap(radioButtons)
                .eq(2)
                .should('be.disabled')
        })

    })

    it('Check boxes', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        // cy.get('[type="checkbox"]').check({force: true}) 
        cy.get('[type="checkbox"]').eq(0).click({ force: true })

    })

    it('List and dropdowns', () => {
        cy.visit('/')

        // Example 1
        cy.get('nav nb-select').click()
        cy.get('.options-list').contains('Dark').click()
        cy.get('nav nb-select').should('contain', 'Dark')
        cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

        // Example 2 - Through the entire list of elements
        cy.get('nav nb-select').then(dropdown => {
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each((listItem, index) => {
                const itemText = listItem.text().trim()

                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)"
                }

                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                if (index < 3) {
                    cy.wrap(dropdown).click()
                }
            })
        })
    })

    it('Web Tables', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        // Scenario 1: Edit Larry's age and verify
        cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq(6).should('contain', "25")
        })

        // Scenario 2: Adding a new row
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then(tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Adrian')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Sanabria')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })

        cy.get('tbody tr').first().find('td').then(tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain', 'Adrian')
            cy.wrap(tableColumns).eq(3).should('contain', 'Sanabria')
        })

        // Scenario 3: Search

        const age = [20, 30, 40, 200]

        cy.wrap(age).each(age => {

            cy.get('thead [placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each(tableRow => {

                if (age == 200) {
                    cy.wrap(tableRow).should('contain', 'No data found')

                } else {
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age)

                }

            })

        })


    })

    it('Proper Datepicker', () => {

        function selectDayFromCurrent(day){
                    
            let date = new Date()
            date.setDate(date.getDate() + day)
            let futureDay = date.getDate()
            console.log('Future Day: ' + futureDay)
            let futureMonth = date.toLocaleString('default', {month: 'short' })
            let dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear()

            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
                if(!dateAttribute.includes(futureMonth)) {
                    cy.get('[data-name="chevron-right"]').click()
                    selectDayFromCurrent(day)
                } else {
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                }
            })

            return dateAssert
        }

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()



        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()
            let dateAssert = selectDayFromCurrent(40)

            
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
            })

    })

    it('Tooltips', () => {

        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()

        cy.contains('nb-card', 'Colored Tooltips')
            .contains('Default').click()

        cy.get('nb-tooltip').should('contain', 'This is a tooltip')

    })

    it.only('Dialog box', () => {
        
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        // Example 1 - Not ideal:
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', (confirm) => {
            expect(confirm).to.equal('Are you sure you want to delete?')
        })

        // Example 2: Better way but more complicated:
        


    })

})
