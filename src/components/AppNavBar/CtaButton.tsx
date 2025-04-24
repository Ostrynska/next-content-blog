import { Button } from '@mui/material';

export default function CtaButton({ cta }: { cta: any }) {
  if (!cta) return null;

  return (
    <Button color="primary" size="small" variant="contained" href={cta.href}>
      {cta.text}
    </Button>
  );
}