'use client';

import * as React from 'react';
import type { ThemeOptions } from '@mui/material/styles';
// import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { inputsCustomizations } from './customizations/inputs';
import { dataDisplayCustomizations } from './customizations/dataDisplay';
import { feedbackCustomizations } from './customizations/feedback';
import { navigationCustomizations } from './customizations/navigation';
import { surfacesCustomizations } from './customizations/surfaces';
import { colorSchemes, shadows, shape } from './themePrimitives';

interface AppThemeProps {
  children: React.ReactNode;
  themeComponents?: ThemeOptions['components'];
}

export default function AppTheme(props: AppThemeProps) {
  const { children, themeComponents } = props;
  const theme = React.useMemo(() => {
    return createTheme({
      cssVariables: {
        colorSchemeSelector: 'data-mui-color-scheme',
        cssVarPrefix: 'template',
      },
      colorSchemes,
      typography: {
        fontFamily: 'Inter, sans-serif',
      },
      shadows,
      shape,
      components: {
        ...inputsCustomizations,
        ...dataDisplayCustomizations,
        ...feedbackCustomizations,
        ...navigationCustomizations,
        ...surfacesCustomizations,
        ...themeComponents,
      },
    });
  }, [themeComponents]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme/>
      {children}
    </ThemeProvider>
  )
}
