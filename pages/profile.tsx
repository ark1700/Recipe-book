import { useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { Container } from '@mui/material';
import { getSession, signOut } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { Button } from '@mui/material';

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
  useEffect(() => {
    console.log(session);
  }, [])
  return (
    <MainLayout>
      <Container maxWidth="sm">
        <p>{`Hello ${session.user.email}`}</p>
        <Button
          variant="contained"
          size="small"
          onClick={googleSignOutHandle}
          >
          Sign Out
        </Button>
      </Container>
    </MainLayout>
  )
}
