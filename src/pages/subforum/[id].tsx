import {
  Flex,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Text,
  Tr,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Loading } from "../../components/Loading";
import { Breadcrumb } from "../../components/Subforum/Breadcrumb";
import { SubforumHeaders } from "../../components/Subforum/SubforumHeaders";
import { Thread } from "../../components/Thread";
import { ThreadForm } from "../../components/Thread/Form";
import { trpc } from "../../utils/trpc";

const Subforum = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { data: subforum, status } = trpc.useQuery(["subforum.byId", { id }]);

  if (status === "loading") return <Loading />;

  return (
    <TableContainer height="100%" key={subforum?.id}>
      <Stack gap={1}>
        <Flex
          height="32.5px"
          align="center"
          justify="space-between"
          bg="linear-gradient(#3c60a5, #5c98e5, #629fff )"
          padding="4px 5px 5px 4px"
          fontSize="12px"
          color="#fff"
          border="1px solid #345487"
        >
          <Breadcrumb subforum={subforum} />
          <ThreadForm
            mode="create"
            label="New thread"
            subforumId={subforum?.id}
          />
        </Flex>
        <Flex align="center" gap={1}>
          <span>
            <Image height="32" width="32" src="/images/e.png" alt="" />
          </span>

          <Text
            fontSize="11px"
            fontFamily="verdana, tahoma, arial, helvetica, sans-serif"
            fontWeight="bold"
          >
            {subforum?.title}
          </Text>
        </Flex>
        <Table>
          <SubforumHeaders />
          <Tbody>
            {/* Threads  */}
            {subforum?.threads.length === 0 ? (
              <Tr>
                <Text padding="8px">Nothing here yet...</Text>
              </Tr>
            ) : (
              subforum?.threads.map((thread) => (
                <Thread key={thread.id} {...thread} />
              ))
            )}
          </Tbody>
        </Table>
      </Stack>
    </TableContainer>
  );
};

export default Subforum;
