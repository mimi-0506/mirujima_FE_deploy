import React from 'react';

export default function Layout({
  children,
  note
}: {
  children: React.ReactNode;
  note: React.ReactNode;
}) {
  return (
    <>
      {children}
      {note}
    </>
  );
}
