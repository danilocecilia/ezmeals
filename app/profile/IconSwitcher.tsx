import { User, CreditCard } from 'lucide-react';
import React from 'react';

type IconType = 'profile' | 'orders';

interface IconSwitcherProps {
  type: IconType;
}

const IconSwitcher: React.FC<IconSwitcherProps> = ({ type }) => {
  switch (type) {
    case 'profile':
      return <User className="h-5 w-5" />;
    case 'orders':
      return <CreditCard className="h-5 w-5" />;
    default:
      return null;
  }
};

export default IconSwitcher;
