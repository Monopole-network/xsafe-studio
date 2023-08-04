import DiamondIcon from '@mui/icons-material/Diamond';
import { RawTransactionType } from 'src/helpers/types';
import { MultisigActionDetailed } from 'src/types/MultisigActionDetailed';
import { withInstallGuard } from './withInstallGuard';
import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';
import MoreAppsDark from 'src/assets/img/MoreAppsDark.png';
import MoreAppsLight from 'src/assets/img/MoreAppsLight.png';
import MonopoleStudio from './monopole-studio';

export interface AppWithRouteConfig {
  component: React.ComponentType;
  name: string;
  id: string;
  link: string;
  description: string;
  path: string;
  icon: any; // MUI-icon
  imageUrlLight: any;
  imageUrlDark: any;
  isInstallable: boolean;
  title: string;
  transaction?: RawTransactionType;
  action?: MultisigActionDetailed;
}

const commonApps = [
  {
    name: 'Monopole Studio',
    component: MonopoleStudio,
    link: 'monopole-studio',
    id: 'monopole-studio',
    description:
      'Welcome to Monopole Studio',
    imageUrlLight: MoreAppsLight,
    imageUrlDark: MoreAppsDark,
    isInstallable: true,
    icon: <DiamondIcon />,
    path: '/monopole-studio',
    title: 'Monopole Studio',
  },
];

export const apps: AppWithRouteConfig[] =
  import.meta.env.VITE_MVX_ENVIRONMENT === EnvironmentsEnum.mainnet
    ? commonApps
    : [
        ...commonApps,
      ];


export const appsWithRouteConfig = apps.map((app) => ({
  ...app,
  component: withInstallGuard(app.id, app.component),
}));
