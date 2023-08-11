import { memo } from 'react';
import DiamondIcon from '@mui/icons-material/Diamond';
import { RawTransactionType } from 'src/helpers/types';
import { MultisigActionDetailed } from 'src/types/MultisigActionDetailed';
import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';
import MoreAppsDark from 'src/assets/img/MoreAppsDark.png';
import MoreAppsLight from 'src/assets/img/MoreAppsLight.png';
import StudioEndpoints from './StudioEndpoints';
import StudioQueries from './StudioQueries';
import Staking from './Staking';

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
    name: 'Studio Endpoints',
    component: StudioEndpoints,
    link: 'studio-endpoints',
    id: 'studio-endpoints',
    description:
      'Welcome to Monopole Studio Endpoints',
    imageUrlLight: MoreAppsLight,
    imageUrlDark: MoreAppsDark,
    isInstallable: true,
    icon: <DiamondIcon />,
    path: '/studio-endpoints',
    title: 'Studio Endpoints',
  },
  {
    name: 'Studio Queries',
    component: StudioQueries,
    link: 'studio-queries',
    id: 'studio-queries',
    description:
      'Welcome to Monopole Studio Queries',
    imageUrlLight: MoreAppsLight,
    imageUrlDark: MoreAppsDark,
    isInstallable: true,
    icon: <DiamondIcon />,
    path: '/studio-queries',
    title: 'Studio Queries',
  },
  {
    name: 'Staking',
    component: Staking,
    link: 'staking',
    id: 'staking',
    description:
      'Welcome to Monopole Staking',
    imageUrlLight: MoreAppsLight,
    imageUrlDark: MoreAppsDark,
    isInstallable: true,
    icon: <DiamondIcon />,
    path: '/staking',
    title: 'Staking',
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
  component: memo(app.component),
}));
