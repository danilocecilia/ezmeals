'use client';

import IconSwitcher from './IconSwitcher';

type IconType = 'profile' | 'orders';

interface NavigationButtonProps {
  type: IconType;
  title: string;
  isSelected: boolean;
  onClick: (type: string) => void;
}

const NavigationButton = (props: NavigationButtonProps) => {
  return (
    <div
      onClick={() => props.onClick(props.type)}
      className={`w-[200px] ${props.isSelected ? 'font-bold border-r-4 border-primary rounded-l-lg' : ''} cursor-pointer`}
    >
      <div className="flex gap-2">
        <IconSwitcher type={props.type} /> {props.title}
      </div>
    </div>
  );
};

export default NavigationButton;
