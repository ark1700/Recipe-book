import MainLayout from '../layouts/MainLayout';
import { Container } from '@mui/material';
import { getSession, signOut } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { Button } from '@mui/material';
import Link from 'next/link';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  return {
    props: {session}
  }
}

export default function Create({session}: any) {
  const googleSignOutHandle = async () =>{
    signOut({
      callbackUrl: `/`
    })
  }
  return (
    <MainLayout>
      <Container maxWidth="sm">
        <p>{`Hello ${session.user.email}`}</p>
        <Button
          variant="contained"
          size="small"
          component={Link}
          href="/create"
          passHref
          sx={{
            mr: 1
          }}
          >
          Create recipe
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={googleSignOutHandle}
          >
          Sign Out
        </Button>
      </Container>
    </MainLayout>
  )
}
