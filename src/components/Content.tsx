import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function Content({ children }: Props) {
  return <div style={{ paddingLeft: 24, paddingTop: 12 }}>{children}</div>;
}