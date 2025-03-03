import classNames from 'classnames';
import React, { ReactElement } from 'react';
import { icons } from '../../utils/icons';

type Progress = {
    number: number;
    type: 'positive' | 'negative';
}

interface statsCardProps {
    icon: string;
    label?: string;
    number?: number;
    progress?: Progress;
}

/**
 * statsCard Component
 * ------------------
 * statsCard component to display card information with an icon, label, number, and progress.
 * 
 * @param {statsCardProps} props - The properties for the statsCard component.
 * @param {string} props.icon - The icon to display.
 * @param {string} [props.label="Label"] - The label to display.
 * @param {number} [props.number=5486] - The number to display.
 * @param {Progress} [props.progress={number: 12.54, type: "positive"}] - The progress information.
 * @returns {ReactElement} The rendered statsCard component.
 */

const statsCard: React.FC<statsCardProps> = ({ icon, label = "Label", number = 5486, progress = { number: 12.54, type: "positive" } }: statsCardProps): ReactElement => {
    return (
        <div className="flex shadow-[0_2px_8px_var(--text-secondary)] max-w-[25rem] flex-col justify-around p-4 bg-[var(--sideNav-background)]/50 border border-[var(--text-secondary)] py-6 w-full h-full rounded-xl">
            {/* Icon and label section */}
            <div className='flex items-center gap-4'>
                <span className='border flex items-center justify-center shrink-0 rounded-md bg-[var(--background)]/70 w-12 h-12 text-2xl'>
                    {icons[icon]}
                </span>
                <span className='text-lg text-ellipsis overflow-hidden font-bold tracking-widest'>
                    {label}
                </span>
            </div>
            {/* Number and progress section */}
            <div className='flex px-4 rounded-xl py-1 bg-[var(--background)]/90 items-center justify-between'>
                <span className='text-lg text-ellipsis overflow-hidden font-semibold tracking-wider'>
                    {number}
                </span>
                <div className={classNames('rounded-lg flex items-center justify-center min-w-14 font-semibold px-3 py-0.5',
                    {
                        'bg-red-400/20 text-red-500': progress?.type === "negative",
                        'bg-green-800/20 text-green-800': progress?.type === "positive",
                    }
                )}>
                    <span className='text-xs whitespace-nowrap'>
                        {progress?.number} %
                    </span>
                </div>
            </div>
        </div>
    );
};

export default statsCard;