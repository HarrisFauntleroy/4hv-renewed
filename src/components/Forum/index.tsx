import { Subforum, SubforumWithThreads } from "../Subforum";
import { SubforumForm } from "../Subforum/Form";
import { SettingsIcon } from "@chakra-ui/icons";
import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Forum as PrismaForum, User } from "@prisma/client";

export interface ForumWithSubforums extends PrismaForum {
  user: User;
  subforums: SubforumWithThreads[];
}

export const Forum = (forum: ForumWithSubforums) => {
  return (
    <TableContainer
      height="100%"
      key={forum.id}
      border="1px solid black"
      padding="4px"
    >
      <Flex align="center" justify="space-between">
        <Text>{forum.title}</Text>
        <SubforumForm
          mode="create"
          forumId={forum.id}
          icon={<SettingsIcon />}
        />
      </Flex>
      <Table>
        {/* Subforum headings  */}
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Forums</Th>
            <Th>Topics</Th>
            <Th>Replies</Th>
            <Th>Last Post</Th>
          </Tr>
        </Thead>
        <Tbody>
          {/* Subforums  */}
          {forum.subforums.length === 0 ? (
            <Tr>
              <Text padding="8px">Nothing here yet...</Text>
            </Tr>
          ) : (
            forum.subforums.map((subforum) => (
              <Subforum key={subforum.id} {...subforum} />
            ))
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
