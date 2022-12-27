import MainLayout from '../layouts/MainLayout';
import { Container } from '@mui/material';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';

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

export default function Create() {
  return (
    <MainLayout>
      <Container maxWidth="sm">
        Create recipe
      </Container>
    </MainLayout>
  )
}
