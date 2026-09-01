import React from "react";
import { Row, Card, Mark, Icon } from "@overcast-sh/branding";

export const CardRow = () => (
  <Row gap={16}>
    <Card label="mark" surface="light">
      <Mark variant="light" size={64} />
    </Card>
    <Card label="tile" surface="light">
      <Icon size={64} />
    </Card>
    <Card label="mark on ink" surface="dark">
      <Mark variant="dark" size={64} />
    </Card>
  </Row>
);

export const WideGap = () => (
  <Row gap={40}>
    <Card label="gap 40" surface="light">
      <Icon size={32} />
    </Card>
    <Card label="gap 40" surface="light">
      <Icon size={32} />
    </Card>
  </Row>
);
