'use client';
import { cn } from '@lib/utils';

import IconSwitcher from './IconSwitcher';

type IconType = 'profile' | 'orders';

interface NavigationButtonProps {
  type: IconType;
  title: string;
  isSelected: boolean;
  onClick: (type: IconType) => void;
}

const NavigationButton = (props: NavigationButtonProps) => {
  return (
    <div
      onClick={() => props.onClick(props.type)}
      className={cn('w-[200px] cursor-pointer', {
        'font-bold border-r-4 border-primary rounded-l-lg bg-violet-50':
          props.isSelected,
        'hover:bg-violet-200': props.isSelected,
        'hover:border-r-4 hover::border-primary hover:bg-violet-50':
          !props.isSelected
      })}
    >
      <div className="flex gap-2 p-2">
        <IconSwitcher type={props.type} /> {props.title}
      </div>
    </div>
  );
};

export default NavigationButton;
