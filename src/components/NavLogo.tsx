"use client";
import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StrapiImage from '@/components/AppNavBar/StrapiImage';

const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();

interface LogoImage {
  url: string;
  alternativeText?: string | null;
  name: string;
}

interface LogoLink {
  text: string;
  href: string;
  image: LogoImage;
}

interface NavLogoProps {
  logo: LogoLink;
}

export default function NavLogo({ logo }: NavLogoProps) {
    return (
        <Link href={logo.href || '/'} underline="none">
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    typography: 'body1',
                    textDecoration: 'none',
                    gap: 1,
                }}
                onClick={preventDefault}
                >
                    <StrapiImage
                        src={logo.image.url}
                        alt={logo.image.alternativeText || logo.image.name}
                        width={22}
                        height={22}
                    />
                    <Typography
                        variant="subtitle1"
                        component="h2"
                        color="info"
                        sx={{ fontWeight: 800, textDecoration: 'none' }}
                    >
                    {logo.text}
                    </Typography>
        </Box>
    </Link>
  );
}
