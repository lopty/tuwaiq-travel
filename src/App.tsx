import { useEffect } from 'react';
import { resolveRoute } from './data/routes';
import { HomeView } from './components/HomeView';
import {
  BuyerQueryView,
  DestinationDetailView,
  GuideDetailView,
  PackageDetailView,
  ServiceDetailView,
} from './components/DetailViews';
import {
  DestinationsIndexView,
  GuidesIndexView,
  OffersIndexView,
  PackagesIndexView,
  ServicesIndexView,
  TrustPageView,
} from './components/IndexAndTrustViews';
import { Layout } from './components/Layout';
import { CarRentalView } from './components/CarRentalView';

export default function App({ initialPath }: { initialPath?: string }) {
  const currentPath =
    initialPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/');
  const route = resolveRoute(currentPath);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = route.meta.title;
    }
  }, [route.meta.title]);

  switch (route.kind) {
    case 'home':
      return <HomeView />;
    case 'packages-index':
      return <PackagesIndexView breadcrumbs={route.meta.breadcrumbs} />;
    case 'offers-index':
      return <OffersIndexView breadcrumbs={route.meta.breadcrumbs} />;
    case 'destinations-index':
      return <DestinationsIndexView breadcrumbs={route.meta.breadcrumbs} />;
    case 'services-index':
      return <ServicesIndexView breadcrumbs={route.meta.breadcrumbs} />;
    case 'guides-index':
      return <GuidesIndexView breadcrumbs={route.meta.breadcrumbs} />;
    case 'trust':
      return <TrustPageView slug={route.slug} breadcrumbs={route.meta.breadcrumbs} />;
    case 'package-detail':
      return <PackageDetailView pkg={route.pkg} breadcrumbs={route.meta.breadcrumbs} />;
    case 'destination-detail':
      return (
        <DestinationDetailView
          destination={route.destination}
          breadcrumbs={route.meta.breadcrumbs}
        />
      );
    case 'service-detail':
      return <ServiceDetailView service={route.service} breadcrumbs={route.meta.breadcrumbs} />;
    case 'buyer-query':
      if (route.page.slug === 'dubai-car-rental-najd') {
        return <CarRentalView page={route.page} breadcrumbs={route.meta.breadcrumbs} />;
      }
      return <BuyerQueryView page={route.page} breadcrumbs={route.meta.breadcrumbs} />;
    case 'guide-detail':
      return <GuideDetailView guide={route.guide} breadcrumbs={route.meta.breadcrumbs} />;
    case 'not-found':
      return (
        <Layout currentPath={currentPath}>
          <section className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
            <h1 className="text-3xl font-semibold text-[#111318]">Page Not Found</h1>
            <p className="text-base text-[#5B6170]">
              The page you requested could not be found. Browse our holiday packages, 16 destinations, or 15 services from Dubai.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <a
                href="/"
                className="min-h-[44px] inline-flex items-center px-6 py-2.5 rounded-full bg-[#C31A20] hover:bg-[#A3151A] text-white text-sm font-semibold transition-colors"
              >
                Return Home
              </a>
              <a
                href="/packages/"
                className="min-h-[44px] inline-flex items-center px-6 py-2.5 rounded-full border border-[#C31A20] text-[#111318] hover:bg-[#FDEDED] text-sm font-semibold transition-colors"
              >
                Browse Packages
              </a>
            </div>
          </section>
        </Layout>
      );
  }
}
