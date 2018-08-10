import * as moment from 'moment';

class Budget {
    constructor(
        startDate: string,
        duration: number
    ) {
        this.startDate = startDate;
        this.duration = duration;
    }

    startDate: string;
    duration: number;

    dateFormat: string = 'MM-DD-YYYY';
    appreciation: any[] = [5, 10, 15, 20, 25];

    /**
     * getBusinessDays
     *
     * Return an integer which represents the number of days in a range between two given dates
     * @param startDate
     * @param endDate
     */
    getRange(startDate: moment.Moment, endDate: moment.Moment): number {
        return Math.abs(startDate.diff(endDate, 'days'));
    }

    /**
     * getBusinessDays
     *
     * Return an Array which represents future days excluding weekend days
     * @param startDate
     * @param endDate
     */
    getBusinessDays(startDate: moment.Moment, endDate: moment.Moment) {
        const len = this.getRange(startDate, endDate);
        let currentDate, final = [];

        for (var i = 0; i < len; i++) {
            currentDate = startDate.add(1, 'days');

            if (currentDate.day() !== 0 && currentDate.day() !== 6) {
                final.push(this.appreciation[this.weekOfMonth(currentDate)]);
            } else {
                final.push(null);
            }
        }
        return final;
    }

    /**
     * weekOfMonth
     *
     * Return an integer that represents the specific number of week in a month, based on a Date input
     * @param date
     */
    weekOfMonth(date: moment.Moment): number {
        return date.week() - moment(date).startOf('month').week();
    }

    /**
     * format
     *
     * Format a number into its value as a currency
     * @param num
     */
    format(num: number): string {
        return `$${(num * .01).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
    }

    /**
     * getPrice
     *
     * Return a string representation of the formatted currency
     */
    getPrice(): any {
        const startDate = moment.utc(this.startDate, this.dateFormat);
        const endDate = moment.utc(this.startDate, this.dateFormat).add(this.duration, 'days');

        return this.format(this.getBusinessDays(startDate, endDate)
            .reduce((a, b) => a + b, 0));
    }
}

const bananaBudget = new Budget('8/10/18', 250);

console.log(bananaBudget.getPrice());