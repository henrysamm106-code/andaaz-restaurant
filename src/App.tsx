import React from 'react';
import { AnimatePresence } from 'motion/react';
import { RouterProvider, useRouter } from './lib/router';
import { ReservationProvider } from './context/ReservationContext';
import { Layout } from './components/Layout';
import { AskAndaaz } from './components/AskAndaaz';
import { HomePage } from './pages/HomePage';
import { OurStoryPage } from './pages/OurStoryPage';
import { MenuPage } from './pages/MenuPage';
import { GalleryPage } from './pages/GalleryPage';
import { ReservationsPage } from './pages/ReservationsPage';
import { ExperiencesPage } from './pages/ExperiencesPage';
import { ExperienceDetailPage } from './pages/ExperienceDetailPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { getExperienceBySlug } from './data/experiences';

function RouteSwitch() {
  const { pathname } = useRouter();

  let page: React.ReactNode = <NotFoundPage />;

  if (pathname === '/') {
    page = <HomePage />;
  } else if (pathname === '/our-story') {
    page = <OurStoryPage />;
  } else if (pathname === '/menu') {
    page = <MenuPage />;
  } else if (pathname === '/gallery') {
    page = <GalleryPage />;
  } else if (pathname === '/reservations') {
    page = <ReservationsPage />;
  } else if (pathname === '/experiences') {
    page = <ExperiencesPage />;
  } else if (pathname === '/contact') {
    page = <ContactPage />;
  } else if (pathname.startsWith('/experiences/')) {
    const slug = pathname.replace('/experiences/', '');
    const exp = getExperienceBySlug(slug);
    if (exp) {
      page = <ExperienceDetailPage slug={exp.slug} />;
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <div key={pathname}>{page}</div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <ReservationProvider>
        <Layout assistantSlot={<AskAndaaz />}>
          <RouteSwitch />
        </Layout>
      </ReservationProvider>
    </RouterProvider>
  );
}
