import { Flex, List } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';

interface NavigationItemProps extends PropsWithChildren {
  href: string;
  title: string;
}

const NavLink = ({ href, title }: NavigationItemProps) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  if (isActive) {
    return (
      <Flex fontWeight="bold" justify="left" align="center" gap={1}>
        <Image height="8" width="8" alt="" src="/images/bullet2.gif" />
        <Link color="#716D6D" href={href}>
          {title}
        </Link>
      </Flex>
    );
  }

  return (
    <Flex justify="left" align="center" gap={1}>
      <Image height="8" width="8" alt="" src="/images/bullet2.gif" />
      <Link color="#716D6D" href={href}>
        {title}
      </Link>
    </Flex>
  );
};

export const Navigation = () => {
  const list = [
    { href: '/', title: 'Home' },
    { href: '/forum', title: 'Forum' },
    { href: '/members', title: 'Members' },
    { href: '/membersMap', title: 'Members Map' },
    { href: 'hvwiki', title: 'HvWiki' },
    { href: 'chatRoom', title: 'Chat Room' },
    { href: 'submitNews', title: 'Submit News' },
    { href: 'siteRules', title: 'Site Rules' },
  ];
  return (
    <List
      style={{
        color: '#716d6d',
        textDecoration: 'underline',
        fontSize: '10px',
      }}
    >
      {list.map(NavLink)}
    </List>
  );
};
