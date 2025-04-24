'use client';
import { Button } from '@mui/material';
import { usePathname } from 'next/navigation';

export default function NavLinks({ links }: { links: any[] }) {
  const pathname = usePathname();

  return (
    <>
      {links.map((item) => (
        <Button
          key={item.id}
          variant="text"
          color={item.href === pathname ? 'secondary' : 'info'}
          size="small"
          href={item.href}
          sx={{
            minWidth: 0,
            fontWeight: item.href === pathname ? '600' : '400',
          }}
        >
          {item.text}
        </Button>
      ))}
    </>
  );
}
