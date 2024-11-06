import { WhetherPage } from '../support/page-objects/whetherPage';
import { WEEKLY_VIEW, TEN_DAYS_VIEW } from '../const/viewNameConstants';
import { CITY_NAME } from '../const/cityNameConstants';

const whetherPage = new WhetherPage();

describe('Test task sinoptik.ua', () => {
  it('Check that dates are correctly displayed for weekly and 10 days views', () => {
    // Open base page
    whetherPage.open()

    // Open whether for specific city
    whetherPage.searchAndOpenWhetherForCityByName(CITY_NAME.KYIV)

    // Check that weekly view selected
    whetherPage.checkViewSelected(WEEKLY_VIEW.VIEW_NAME)

    // Check dates are correctly displayed
    whetherPage.checkDatesDisplayedCorrectlyForView(WEEKLY_VIEW.AMOUNT_OF_DAYS)

    // Switch view to 10 days
    whetherPage.selectView(TEN_DAYS_VIEW.VIEW_NAME)

    // Check dates are correctly displayed
    whetherPage.checkDatesDisplayedCorrectlyForView(TEN_DAYS_VIEW.AMOUNT_OF_DAYS);
  })
})