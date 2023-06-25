import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Input,
  List,
  ListIcon,
  ListItem,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { PropsWithChildren, ReactNode } from 'react';
import { MdLogin, MdLogout } from 'react-icons/md';
import { ForumForm } from '../Forum/Form';
import { Online } from '../Online';
import { Navigation } from './Navigation';

type DefaultLayoutProps = { children: ReactNode };

const cardHeaderStyle: React.CSSProperties = {
  height: '18px',
  fontSize: '10px',
  fontFamily: 'verdana, tahoma, arial, sans-serif',
  color: '#FFF',
  background: 'linear-gradient(#c7d3e6 10%, #869ac0 40%, #8d9fc2 50%)',
  borderBottom: '1px solid black',
};

const cardContentStyle: React.CSSProperties = {
  padding: '4px 5px 5px 4px',
  // boxShadow: "0 0 8px #000",
  flex: '1',
};

const cardStyle: React.CSSProperties = {
  fontFamily: 'verdana, tahoma, arial, helvetica, sans-serif',
  fontSize: '10px',
  background: '#DAE7F3',
  color: '#000',
  borderRadius: '4px',
  boxShadow:
    '#505559 0px 0px 1px 2px, #5a5e62 0px 4px 6px -1px, #8b8d90 0px 1px 0px inset',
  maxWidth: '100%',
  maxHeight: '100%',
  overflow: 'scroll',
  display: 'flex',
  flexDirection: 'column',
  // border: "1px solid grey",
};

interface GridHeaderProps extends PropsWithChildren {
  title: string;
}

const GridHeader = ({ title, children }: GridHeaderProps) => (
  <Flex style={cardHeaderStyle}>
    <Flex align="center" width="100%" justify="space-between">
      <Flex
        bg="linear-gradient(#6c7e9e 50%, #5b6c8e 50%)"
        gap={1}
        align="center"
        height="100%"
        paddingRight="16px"
        borderRadius="0 11px 3px 0"
      >
        <Image
          alt="Blue circle"
          width="16"
          height="16"
          src="/images/bullet2.gif"
        />
        <Flex align="center" width="100%">
          {title}
        </Flex>
      </Flex>
      <Flex>{children}</Flex>
    </Flex>
  </Flex>
);

const GridContent = ({ children }: PropsWithChildren) => (
  <Box style={cardContentStyle}>{children}</Box>
);

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const session = useSession();

  return (
    <Flex direction="column" bg="#E4E0E0">
      <Flex
        height="86px"
        justify="center"
        align="center"
        borderBottom="1px solid black"
        padding="8px"
        background="#8fa1c4"
      >
        <Flex maxHeight="77px">
          <Image src="/images/logo.png" alt="" height="77" width="455" />
        </Flex>
      </Flex>
      <Flex
        minHeight="28px"
        maxHeight="28px"
        justify="right"
        align="center"
        gap="4px"
        borderBottom="#000 1px solid"
      >
        <input
          style={{
            width: '130px',
            height: '16px',
            marginLeft: 'auto',
            backgroundColor: '#eaeef2',
            border: '#5e5d63 1px solid',
            color: '#000000',
          }}
        />
        <Flex padding="2px 3px 0 0px">
          <Image alt="search" src="/images/search.png" width="18" height="19" />
        </Flex>
      </Flex>
      <Grid
        height="100%"
        padding="8px"
        paddingTop="16px"
        templateAreas={{
          sm: `"mainMenu content"
						 "welcome content"
						 "online content"
						 "birthdays content"
						 "contact content"
						 "support content"
						 ". content"
						 ". legal"`,
          base: `"mainMenu"
							 "welcome"
							 "content"
							 "online"
							 "birthdays"
							 "contact"
							 "support"
							 "legal"`,
        }}
        gridTemplateRows={{
          sm: 'repeat(6, minmax(max-content))',
          base: 'repeat(8, max-content)',
        }}
        gridTemplateColumns={{ sm: '160px 1fr', base: '100vw' }}
        gridAutoFlow="dense"
        gridGap="8px"
        // Nicer to read
        color={useColorModeValue('blackAlpha.700', 'whiteAlpha.700')}
      >
        <GridItem style={cardStyle} area={'mainMenu'} boxShadow="base">
          <GridHeader title="Main Menu" />
          <GridContent>
            <Navigation />
          </GridContent>
        </GridItem>

        <GridItem style={cardStyle} area={'welcome'} boxShadow="base">
          <GridHeader title="Welcome" />
          <GridContent>
            <List>
              {session ? (
                <ListItem onClick={() => signOut({ callbackUrl: '/' })}>
                  <ListIcon>
                    <MdLogout size="lg" />
                  </ListIcon>
                  Log out
                </ListItem>
              ) : (
                <ListItem onClick={async () => signIn()}>
                  <ListIcon>
                    <MdLogin size="lg" />
                  </ListIcon>
                  Log in
                </ListItem>
              )}
            </List>
          </GridContent>
        </GridItem>

        <GridItem style={cardStyle} area={'online'} boxShadow="base">
          <GridHeader title="Online" />
          <GridContent>
            <Online />
          </GridContent>
        </GridItem>

        <GridItem style={cardStyle} area={'birthdays'} boxShadow="base">
          <GridHeader title="Members Birthdays:" />
          <GridContent>birthdays</GridContent>
        </GridItem>

        <GridItem style={cardStyle} area={'contact'} boxShadow="base">
          <GridHeader title="Contact" />
          <GridContent>
            <Text>
              If you need assistance, please send an email to forum at 4hv dot
              org. To ensure your email is not marked as spam, please include
              the phrase &quot;4hv help&quot; in the subject line. You can also
              find assistance via IRC, at irc.shadowworld.net, room #hvcomm.
            </Text>
          </GridContent>
        </GridItem>

        <GridItem style={cardStyle} area={'support'} boxShadow="base">
          <GridHeader title="Support 4hv.org!" />
          <GridContent>
            <Text>
              Donate: 4hv.org is hosted on a dedicated server. Unfortunately,
              this server costs and we rely on the help of site members to keep
              4hv.org running. Please consider donating. We will place your name
              on the thanks list and you&apos;ll be helping to keep 4hv.org
              alive and free for everyone. Members whose names appear in red
              bold have donated recently. Green bold denotes those who have
              recently donated to keep the server carbon neutral.
            </Text>
            <Image src="/images/paypal.gif" alt="" height="44" width="77" />
            <Text>Special Thanks To:</Text>
            <ul>
              <li>Hazzwold</li>
              <li>TheQuantumGeneral</li>
            </ul>
            <Text>
              The aforementioned have contributed financially to the continuing
              triumph of 4hv.org. They are deserving of my most heartfelt
              thanks.
            </Text>
          </GridContent>
        </GridItem>

        <GridItem style={cardStyle} area={'content'} boxShadow="base">
          <GridHeader title="Forums">
            <ForumForm mode="add" label="New Forum" />
          </GridHeader>
          <GridContent>{children}</GridContent>
          <GridContent>
            <TableContainer height="100%" padding="4px">
              <Flex alignItems="center">
                <Text>Information</Text>
              </Flex>
              <Table>
                <Thead>
                  <Tr></Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Hello</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </GridContent>
          <GridContent>
            <HStack
              height="100%"
              border="1px solid black"
              padding="4px"
              justify="space-around"
            >
              <Flex width="1fr" justify="center" align="center">
                <Flex justify="center" align="center" gap="8px">
                  <Image
                    src="/images/new_small.png"
                    alt=""
                    height="16"
                    width="16"
                  />
                  <Stack>
                    <Text>New</Text>
                    <Text>posts</Text>
                  </Stack>
                </Flex>
                <Flex justify="center" align="center" gap="8px">
                  <Image
                    src="/images/nonew_small.png"
                    alt=""
                    height="16"
                    width="16"
                  />
                  <Stack>
                    <Text>No</Text>
                    <Text>new</Text>
                    <Text>posts</Text>
                  </Stack>
                </Flex>
                <Flex justify="center" align="center" gap="8px">
                  <Image
                    src="/images/closed_small.png"
                    alt=""
                    height="16"
                    width="16"
                  />
                  <Stack>
                    <Text>Closed</Text>
                    <Text>forum</Text>
                  </Stack>
                </Flex>
              </Flex>
              <Stack width="1fr" justify="center" align="center">
                <Input placeholder="Search" width="130px" height="16px" />
                <Button width="45.15px" height="15px">
                  Search
                </Button>
              </Stack>
              <Stack width="1fr" justify="center" align="center">
                <Text>You cannot start new topics</Text>
                <Text>You cannot post replies</Text>
                <Text>You cannot edit your posts</Text>
              </Stack>
            </HStack>
          </GridContent>
        </GridItem>

        <GridItem style={cardStyle} area={'legal'} boxShadow="base">
          <GridHeader title="Legal Information" />
          <GridContent>
            <Text>
              This site is powered by e107, which is released under the GNU GPL
              License. All work on this site, except where otherwise noted, is
              licensed under a Creative Commons Attribution-ShareAlike 2.5
              License. By submitting any information to this site, you agree
              that anything submitted will be so licensed. Please read our
              Disclaimer and Policies page for information on your rights and
              responsibilities regarding this site.
            </Text>
          </GridContent>
        </GridItem>
      </Grid>
    </Flex>
  );
};
