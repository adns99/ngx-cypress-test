// firstTestSpec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/// <reference types="cypress" /> 

describe('First suite', () => {

    it('First test', () =>{

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

        cy.contains('nb-card','Horizontal form').find('[type="email"]')

    })

    it('Then and Wrap Methods', () =>{

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
        
        cy.contains('nb-card', 'Using the Grid').then( firstForm => {

            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
            expect(emailLabelFirst).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')

            cy.contains('nb-card', 'Basic form').then( secondForm =>{

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
        cy.get('[for="exampleInputEmail1"]').then( label =>{
            expect(label.text()).to.equal('Email address')
        })


        // 3 - Invoke Command
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text => {
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
         .then( classValue =>{
             expect(classValue).to.contain('checked') // Chai assertion
         })

    })

    it('Assert property', () =>{

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        // Datepicker example
        cy.contains('nb-card', 'Common Datepicker')
        .find('input')
        .then(input =>{
            // As this is a Jquery element we cannot do .click so we need to wrap the element first
            cy.wrap(input).click()
            cy.get('nb-calendar-day-picker').contains('17').click()
            cy.wrap(input).invoke('prop', 'value').should('contain', 'Oct 17, 2021')
        })

    })

    it('Radio buttons', () =>{

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radioButtons =>{
            cy.wrap(radioButtons)
            .first()
            .check({force: true})
            .should('be.checked')

            cy.wrap(radioButtons)
            .eq(1)
            .check({force: true})

            cy.wrap(radioButtons)
            .first()
            .should('not.be.checked')

            cy.wrap(radioButtons)
            .eq(2)
            .should('be.disabled')
        })

    })

    it('Check boxes', () =>{
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        // cy.get('[type="checkbox"]').check({force: true}) 
        cy.get('[type="checkbox"]').eq(0).click({force: true})

    })

    it.only('List and dropdowns', () =>{
        cy.visit('/')

        cy.get('nav nb-select').click()
        
    })


})