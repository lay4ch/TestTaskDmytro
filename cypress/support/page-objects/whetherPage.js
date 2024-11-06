import {CommonPage} from "./commonPage";
import {WEEK_DAYS_NAME, MONTH_NAME} from '../../const/dateConstants';
import moment from "moment";

export class WhetherPage extends CommonPage {
    get cardDateInfo() {
        return cy.get(".VJgadyZ9")
    }

    get todayWhetherImg() {
        return "[class='kby+TyNs'][srcset*='/resources/icons']"
    }

    get searchField() {
        return 'input[type="search"]'
    }

    get searchListOption() {
        return 'menu a'
    }

    get selectedView() {
        return 'a[tabindex="-1"]'
    }

    get weekTabDate() {
        return cy.get("main > div > a[href*='/погода']");
    }

    viewSwitcher(viewName) {
        return `[href*=${viewName.replace(' ', '-')}]`;
    }

    searchAndOpenWhetherForCityByName(cityName) {
        cy.intercept(/.*\/stats\/visit\/.*/).as('pageLoading')
        cy.get(this.searchField).type(cityName);
        cy.get(this.searchListOption).contains(cityName).first().click();
        cy.wait('@pageLoading').its('response.statusCode').should('eq', 200)
    }

    checkViewSelected(viewName) {
        cy.get(this.selectedView).should('contain.text', viewName)
    }

    selectView(viewName) {
        cy.get(this.viewSwitcher(viewName)).click();
    }

    checkDateTileInfo(element, expectedDate) {
        element.then(($dateElement) => {
            const dayOfWeek = $dateElement.find('p').eq(0).text();
            const dayNumber = $dateElement.find('p').eq(1).text();
            const month = $dateElement.find('p').eq(2).text();

            cy.log('Expected Date:' + expectedDate);
            console.log('Expected Date:' + expectedDate)
            expect(dayOfWeek).eq(WEEK_DAYS_NAME[expectedDate.isoWeekday() - 1]);
            expect(dayNumber).eq(expectedDate.format('DD'));
            expect(month).eq(MONTH_NAME[expectedDate.format('MM') - 1]);
        });
    }

    openTabForDate(dayNumberInView) {
        cy.intercept(new RegExp(`.*\/${moment().add(dayNumberInView, 'days').format('YYYY-MM-DD')}`)).as('newWeekDayLoading')
        this.weekTabDate.eq(dayNumberInView).click()
        cy.wait('@newWeekDayLoading').its('response.statusCode').should('eq', 200)
    }

    checkDatesDisplayedCorrectlyForView(amountOfDaysToCheck) {
        const today = moment();

        // Check that view contain expected amount of days
        this.weekTabDate.should('have.length', amountOfDaysToCheck)

        // Check that data is displayed correctly for all days on selected view
        for (let selectDateNumberInView = amountOfDaysToCheck - 1; selectDateNumberInView >= 0; selectDateNumberInView--) {
            // Open last day of the selected view
            let selectedDate = moment(today).add(selectDateNumberInView, 'days');
            this.openTabForDate(selectDateNumberInView)

            // Check that tab title dates displayed correctly
            this.checkDateTileInfo(this.weekTabDate.eq(selectDateNumberInView), selectedDate);

            if (selectedDate.calendar() === today.calendar()) {
                // Check that for today whether image is displayed
                cy.get(this.todayWhetherImg).should('be.visible');
            } else {
                // Check card body dates info displayed correctly
                this.checkDateTileInfo(this.cardDateInfo, selectedDate);
            }
        }
    }
}