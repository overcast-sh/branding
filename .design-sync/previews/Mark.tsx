import React from "react";
import { Mark, Card, Row } from "@overcast-sh/branding";

export const FullColor = () => (
  <Row gap={16}>
    <Card label="light surfaces" surface="light">
      <Mark variant="light" size={96} />
    </Card>
    <Card label="dark surfaces" surface="dark">
      <Mark variant="dark" size={96} />
    </Card>
  </Row>
);

export const Mono = () => (
  <Row gap={16}>
    <Card label="mono · ink" surface="light">
      <Mark variant="mono-ink" size={72} />
    </Card>
    <Card label="mono · white" surface="dark">
      <Mark variant="mono-white" size={72} />
    </Card>
  </Row>
);

export const MinimumSize = () => (
  <Row gap={16}>
    <Card label="24px — minimum" surface="light">
      <Mark variant="light" size={24} />
    </Card>
    <Card label="48px" surface="light">
      <Mark variant="light" size={48} />
    </Card>
  </Row>
);
