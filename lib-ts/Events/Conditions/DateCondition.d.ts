import Condition from "./Condition";
import Country from "../../Country";
export default class DateCondition extends Condition {
    private type;
    private _when;
    set when(date: string);
    isValid(country: Country, date: Date): boolean;
}
