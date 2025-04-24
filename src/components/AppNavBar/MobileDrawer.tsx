'use client';
import { Drawer, Box, IconButton, MenuItem, Divider, Button } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { usePathname } from 'next/navigation';

export default function MobileDrawer({ open, toggleDrawer, links, cta }: { open: boolean, toggleDrawer: (open: boolean) => () => void, links: any[], cta: any }) {
  const pathname = usePathname();

  return (
    <Drawer
      anchor="top"
      open={open}
      onClose={toggleDrawer(false)}
      PaperProps={{ sx: { top: 'var(--template-frame-height, 0px)' } }}
    >
      <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={toggleDrawer(false)}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>
        {links.map((item) => (
          <MenuItem
            key={item.id}
            component="a"
            href={item.href}
            selected={item.href === pathname}
            sx={{ fontWeight: item.href === pathname ? '600' : '400' }}
          >
            {item.text}
          </MenuItem>
        ))}
        <Divider sx={{ my: 3 }} />
        {cta && (
          <MenuItem>
            <Button color="primary" variant="contained" fullWidth href={cta.href}>
              {cta.text}
            </Button>
          </MenuItem>
        )}
      </Box>
    </Drawer>
  );
}
