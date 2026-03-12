import React, { useState, useEffect } from 'react';
import Landing from './Landing.jsx';
import RestaurantPage from './RestaurantPage.jsx';
import CategoryPage from './CategoryPage.jsx';
import CaterersPage from './CaterersPage.jsx';
import { CityPage, AboutPage, ContactPage, ForRestaurantsPage, PrivacyPage } from './Pages.jsx';
import AdminPage from './AdminPage.jsx';

export default function App() {
  const [page, setPage] = useState('home');
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    const handlePop = () => {
      const path = window.location.pathname;
      routeFromPath(path);
    };
    window.addEventListener('popstate', handlePop);
    routeFromPath(window.location.pathname);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const routeFromPath = (path) => {
    if (path === '/' || path === '') {
      setPage('home'); setPageData(null);
    } else if (path.startsWith('/restaurant/')) {
      setPage('restaurant'); setPageData(path.replace('/restaurant/', ''));
    } else if (path.startsWith('/category/')) {
      setPage('category'); setPageData(path.replace('/category/', ''));
    } else if (path.startsWith('/city/')) {
      setPage('city'); setPageData(path.replace('/city/', ''));
    } else if (path === '/about') {
      setPage('about'); setPageData(null);
    } else if (path === '/contact') {
      setPage('contact'); setPageData(null);
    } else if (path === '/for-restaurants') {
      setPage('for-restaurants'); setPageData(null);
    } else if (path === '/privacy') {
      setPage('privacy'); setPageData(null);
    } else if (path === '/caterers') {
      setPage('caterers'); setPageData(null);
    } else if (path === '/admin') {
      setPage('admin'); setPageData(null);
    } else {
      setPage('home'); setPageData(null);
    }
  };

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    routeFromPath(path);
    window.scrollTo(0, 0);
  };

  if (page === 'caterers') return <CaterersPage navigate={navigate} />;
  if (page === 'restaurant') return <RestaurantPage slug={pageData} navigate={navigate} />;
  if (page === 'category') return <CategoryPage slug={pageData} navigate={navigate} />;
  if (page === 'city') return <CityPage slug={pageData} navigate={navigate} />;
  if (page === 'about') return <AboutPage navigate={navigate} />;
  if (page === 'contact') return <ContactPage navigate={navigate} />;
  if (page === 'for-restaurants') return <ForRestaurantsPage navigate={navigate} />;
  if (page === 'privacy') return <PrivacyPage navigate={navigate} />;
  if (page === 'admin') return <AdminPage navigate={navigate} />;
  return <Landing navigate={navigate} />;
}
