import { IconProps } from '../../types';

const CloseIcon = (props: IconProps) => {
	const { className = 'w-6 h-6' } = props;
	return (
		<svg
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
		>
			<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
		</svg>
	);
};

export default CloseIcon;
