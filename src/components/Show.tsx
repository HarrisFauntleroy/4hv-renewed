import React, { PropsWithChildren } from "react";

interface ShowProps extends PropsWithChildren {
  when: boolean;
}

export function Show({ when, children }: ShowProps) {
  return <div style={{ display: when ? undefined : "none" }}>{children}</div>;
}
