import { Divider, Flex, List, ListItem } from "@chakra-ui/react";
import Image from "next/image";
import { trpc } from "../utils/trpc";
import { Loading } from "./Loading";

export const Online = () => {
  const { data: users, status } = trpc.useQuery(["user.online"]);

  if (status === "loading") return <Loading />;

  return (
    <List>
      <ListItem>Guests: 0</ListItem>
      <ListItem>Members: 0</ListItem>
      <ListItem>Newest Member: 0</ListItem>
      <Divider />
      <ListItem>Online now</ListItem>

      {users?.map((user) => (
        <ListItem key={user.id}>
          <Flex justify="left" align="center" gap={1}>
            <Image height="8" width="8" alt="" src="/images/bullet2.gif" />
            {user.name}
          </Flex>
        </ListItem>
      ))}
    </List>
  );
};
