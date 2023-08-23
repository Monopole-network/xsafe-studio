import { memo } from 'react';
import { FileDownloadDone, Upload, Download } from '@mui/icons-material';
import { RawTransactionType } from 'src/helpers/types';
import { MultisigActionDetailed } from 'src/types/MultisigActionDetailed';
import { EnvironmentsEnum } from '@multiversx/sdk-dapp/types';
import MoreAppsDark from 'src/assets/img/MoreAppsDark.png';
import MoreAppsLight from 'src/assets/img/MoreAppsLight.png';
import StudioCalls from './StudioCalls';
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
    name: 'Call Studio',
    component: StudioCalls,
    link: 'studio-calls',
    id: 'studio-calls',
    description:'',
    imageUrlLight: MoreAppsLight,
    imageUrlDark: MoreAppsDark,
    isInstallable: true,
    icon: <Upload />,
    path: '/studio-calls',
    title: 'Studio Calls',
  },
  {
    name: 'Query Studio',
    component: StudioQueries,
    link: 'studio-queries',
    id: 'studio-queries',
    description:'',
    imageUrlLight: MoreAppsLight,
    imageUrlDark: MoreAppsDark,
    isInstallable: true,
    icon: <Download />,
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
    icon: <FileDownloadDone />,
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
