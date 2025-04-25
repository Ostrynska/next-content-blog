// 'use client';
// import React, { useEffect, useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import StyledToolbar from './ClientToolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ColorModeIconDropdown from '@/theme/ColorModeIconDropdown';
import StrapiImage from './StrapiImage';
import NavLinks from './NavLinks';
import CtaButton from './CtaButton';
import MobileDrawer from './MobileDrawer';
import { getStrapiURL } from '@/lib/utils';
import NavLogo from '../NavLogo';


async function loader()
{
  const { fetchData } = await import('@/lib/fetch');
  const path = '/api/global';
  const baseUrl = getStrapiURL();
  const query = qs.stringify({
    populate: {
      topNav: {
        populate: {
          logoLink: {
            populate: 'image',
          },
          link: true,
          cta: true,
        },
      },
    },
  }, { encodeValuesOnly: true });

  const url = new URL(path, baseUrl);
  url.search = query;

  const data = await fetchData(url.href);
  return data;
}

interface AppNavBarData {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  topNav: {
    id: number;
    logoLink: {
      id: number;
      text: string;
      href: string;
      image: {
        id: number;
        url: string;
        alternativeText: string | null;
        name: string;
      };
    };
    link: {
      id: number;
      href: string;
      text: string;
      external: boolean;
    }[];
    cta: {
      id: number;
      href: string;
      text: string;
      external: boolean;
    };
  };
  meta: Record<string, any>;
}

async function AppNavBar() {
  const data = await loader() as AppNavBarData;
  if (!data) return null;
  const navigation = data.topNav.link;
  const cta = data.topNav.cta;
  const logo = data.topNav.logoLink;

  // const [open, setOpen] = useState(false);

  // const toggleDrawer = (newOpen: boolean) => () => {
  //   setOpen(newOpen);
  // };


  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{ boxShadow: 0, bgcolor: 'transparent', backgroundImage: 'none', mt: 'calc(var(--template-frame-height, 0px) + 28px)' }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <NavLogo logo={logo} />
            {/* <StrapiImage src={logo.image.url} alt={logo.image.alternativeText || logo.image.name} width={22} height={22}/>
            <Typography variant="subtitle1" component="h2" color='info' sx={{ ml: 0.5, fontWeight: '800' }} >{logo.text}</Typography> */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 6 }}>
              <NavLinks links={navigation} />
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
            <CtaButton cta={cta} />
            <ColorModeIconDropdown />
          </Box>
          {/* <MobileDrawer open={open} toggleDrawer={toggleDrawer} links={navigation } cta={cta} /> */}
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}

export default AppNavBar;