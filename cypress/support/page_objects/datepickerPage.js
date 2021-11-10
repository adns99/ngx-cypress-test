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
            cy.get('.date-cell').not('').contains(futureDay).click()
        }
    })

    return dateAssert
}

export class DatepickerPage{

    selectCommonDatepickerDateFromToday(dateFromToday){

        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()
            let dateAssert = selectDayFromCurrent(dateFromToday)
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
            cy.wrap(input).should('have.value', dateAssert)
            })
    }

    selectDatepickerWithRangeFromToday(firstDay, lastDay){
        cy.contains('nb-card', 'Datepicker With Range').find('input').then( input => {
            cy.wrap(input).click()
            let dateAssertFirst = selectDayFromCurrent(firstDay)
            let dateAssertLast = selectDayFromCurrent(lastDay)
            const finalDate = dateAssertFirst + ' - ' + dateAssertLast
            cy.wrap(input).invoke('prop', 'value').should('contain', finalDate)
            cy.wrap(input).should('have.value', finalDate)
            })
    }

}

export const onDatepickerPage = new DatepickerPage()