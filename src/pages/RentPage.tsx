import React from 'react';
import { PropertiesPage } from './PropertiesPage';

export const RentPage: React.FC = () => {
  return (
    <PropertiesPage
      forcedPurpose="rent"
      pageTitle="Rent Properties in Bahria Town Lahore"
      pageSubtitle="Browse executive rental homes, furnished apartments, and commercial office floors managed by Deal Land Real Estate & Builders."
    />
  );
};
