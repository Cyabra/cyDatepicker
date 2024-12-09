interface Props {
    currentMonth: number;
    clickMonth: (month: number) => void;
}
declare const Months: (props: Props) => import("react").JSX.Element;
export default Months;
