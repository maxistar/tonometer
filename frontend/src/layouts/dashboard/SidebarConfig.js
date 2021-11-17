import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Main Metrics',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'Validators',
    path: '/dashboard/validators',
    icon: getIcon(peopleFill)
  },
  {
    title: 'Transactions',
    path: '/dashboard/transactions',
    icon: getIcon(shoppingBagFill)
  },
];

export default sidebarConfig;
