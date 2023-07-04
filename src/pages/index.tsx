import { Card } from "@mantine/core";
import { Changelog } from "src/components/Releases";

const Index = () => {
  return (
    <Card bg="transparent">
      <Changelog repo="HarrisFauntleroy/4hv-renewed" />
    </Card>
  );
};

export default Index;
