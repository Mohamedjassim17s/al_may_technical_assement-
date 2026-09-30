'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { useRouter } from 'next/navigation';

interface TourContextType {
  startTour: () => void;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export function TourProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const startTour = () => {
    const driverObj = driver({
      showProgress: true,
      steps: [
        {
          popover: {
            title: 'Welcome to Al Mahy Legal Management!',
            description: 'Al Mahy is a full-stack legal case management platform. It allows law firms to seamlessly track clients, manage complex case lifecycles, and monitor firm revenue analytics all in one intuitive dashboard.',
            align: 'center'
          }
        },
        {
          element: '#tour-role-selector',
          popover: {
            title: 'Role-Based Access Control',
            description: 'The platform supports strict roles: \n1. ADMIN: Full access (Delete cases, Manage Team).\n2. LAWYER: Can create/update cases but cannot delete.\n3. CLIENT: Can only view their own case status.',
            side: 'left',
            align: 'center'
          }
        },
        {
          popover: {
            title: 'The A-to-Z Lifecycle',
            description: 'Now, let\'s take a tour of the entire case lifecycle: Creating, Updating, Deleting, and viewing Dashboard analytics.',
            onNextClick: () => {
              router.push('/management/new');
              setTimeout(() => driverObj.moveNext(), 500);
            }
          }
        },
        {
          element: '#tour-wizard',
          popover: {
            title: '1. Create a Case',
            description: 'This is the multi-step wizard. Here you can securely input all client and case details to create a new record.',
            side: 'top',
            align: 'center',
            onNextClick: () => {
              router.push('/management');
              setTimeout(() => driverObj.moveNext(), 500);
            }
          }
        },
        {
          element: '#tour-management-table',
          popover: {
            title: '2. Manage Cases',
            description: 'Your newly created cases will appear here. You can filter, search, and sort through your entire database.',
            side: 'top',
            align: 'center'
          }
        },
        {
          element: '#tour-table-actions',
          popover: {
            title: '3. Update & Delete',
            description: 'Use the Actions column to Edit a case (Update details, add notes) or click the Trash icon to Delete it completely.',
            side: 'left',
            align: 'center'
          }
        },
        {
          element: '#tour-table-checkbox',
          popover: {
            title: 'Bulk Actions',
            description: 'You can also select multiple cases at once to Bulk Update their statuses or Bulk Delete them.',
            side: 'bottom',
            align: 'start',
            onNextClick: () => {
              router.push('/');
              setTimeout(() => driverObj.moveNext(), 500);
            }
          }
        },
        {
          element: '#tour-dashboard-kpi',
          popover: {
            title: '4. Dashboard Analytics',
            description: 'Finally, all your case data, revenue, and completed cases automatically sync to this Dashboard for high-level reporting.',
            side: 'bottom',
            align: 'start'
          }
        },
        {
          popover: {
            title: 'Demo Complete!',
            description: 'You have seen the full A-to-Z lifecycle. Feel free to interact with the app now!',
          }
        }
      ]
    });

    // Start tour immediately without pushing to dashboard first since we handle it in step 1
    driverObj.drive();
  };

  return (
    <TourContext.Provider value={{ startTour }}>
      {children}
    </TourContext.Provider>
  );
}

export function useTour() {
  const context = useContext(TourContext);
  if (context === undefined) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
}
