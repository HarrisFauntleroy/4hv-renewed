import {
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Grid,
  GridItem,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import { Comment } from "../../components/Comment";
import { CommentForm } from "../../components/Comment/Form";
import { Loading } from "../../components/Loading";
import { ThreadForm } from "../../components/Thread/Form";
import { trpc } from "../../utils/trpc";

const ThreadLayout = ({ children }: PropsWithChildren) => (
  <Grid
    height="100%"
    padding="8px"
    paddingTop="16px"
    templateAreas={{
      sm: `"user content"
		 			 "user content"`,
      base: `"user"
			 			 "content"`,
    }}
    gridTemplateRows={{
      sm: "repeat(6, minmax(max-content))",
      base: "repeat(8, max-content)",
    }}
    gridTemplateColumns={{ sm: "160px 1fr", base: "100vw" }}
    gridAutoFlow="dense"
    gridGap="8px"
    // Nicer to read
    color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}
  >
    {children}
  </Grid>
);

const Thread = () => {
  const router = useRouter();
  const id = String(router.query.id);

  const { data: thread, status } = trpc.useQuery(["thread.byId", { id }]);

  if (status === "loading") return <Loading />;

  return (
    <Stack>
      <Stack padding="4px">
        <Flex align="center" justify="space-between">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link href="/" passHref>
                <BreadcrumbLink>4hv.org</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link href="/forum" passHref>
                <BreadcrumbLink>Forums</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link href={`/subforum/${thread?.subforum?.id}`} passHref>
                <BreadcrumbLink>{thread?.subforum?.title}</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
          </Breadcrumb>
          <ThreadForm mode="update" label="Edit Thread" thread={thread} />
        </Flex>
        <Flex align="center" gap={1}>
          <span>
            <Image height="32" width="32" src="/images/e.png" alt="" />
          </span>

          <Text
            fontSize="11px"
            fontFamily="verdana, tahoma, arial, helvetica, sans-serif"
            color="#000"
          >
            {thread?.title}
          </Text>
        </Flex>
        <Flex>
          <Text>Replies: {thread?.comments.length}</Text>
        </Flex>
      </Stack>
      <ThreadLayout>
        <GridItem area={"user"} boxShadow="base">
          <Avatar variant="square" src={thread?.user.image ?? ""} />
          <Link href={`/user/${thread?.userId}`}>
            <Text>{thread?.user.name}</Text>
          </Link>
        </GridItem>
        <GridItem area={"content"} boxShadow="base">
          <Card>
            <CardHeader>{thread?.title}</CardHeader>
            <CardBody>{thread?.content}</CardBody>
            <CardFooter fontSize={10}>
              <Text>Posted: {thread?.createdAt.toLocaleDateString()}</Text>
              <Text>Last updated: {thread?.updatedAt.toLocaleString()}</Text>
            </CardFooter>
          </Card>
        </GridItem>
      </ThreadLayout>
      {thread?.comments.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
      <Flex align="center" justify="center">
        <CommentForm mode="create" label="Add comment" threadId={thread?.id} />
      </Flex>
    </Stack>
  );
};

export default Thread;
