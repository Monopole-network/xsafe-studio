import { Box } from '@mui/material';
import SafeSettings from './SafeSettings';
import { SettingsWrapper } from './settings-style';

function Settings() {
  return (
    <Box maxWidth="550px">
      <SettingsWrapper>
        <SafeSettings />
      </SettingsWrapper>
    </Box>
  );
}

export default Settings;
