import { forwardRef, ReactNode } from 'react';

interface Props {
	children?: ReactNode;
}

const Arrow = forwardRef<HTMLDivElement, Props>((props, ref) => {
	return (
		<div
			{...props}
			ref={ref}
			className="absolute z-20 ml-[1.2rem] mt-0.5 h-4 w-4 rotate-45 border-l border-t border-gray-300 bg-white dark:border-slate-600 dark:bg-slate-800"
		/>
	);
});

Arrow.displayName = 'Arrow';

export default Arrow;
