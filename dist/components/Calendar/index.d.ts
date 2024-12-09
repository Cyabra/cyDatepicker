import { DateType } from 'types';
interface Props {
    date: Date;
    minDate?: DateType;
    maxDate?: DateType;
    onClickPrevious: () => void;
    onClickNext: () => void;
    changeMonth: (month: number) => void;
    changeYear: (year: number) => void;
}
declare const Calendar: (props: Props) => import("react").JSX.Element;
export default Calendar;
