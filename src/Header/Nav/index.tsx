'use client';

import React from 'react';

import type { Header as HeaderType } from '@/payload-types';

import { CMSLink } from '@/components/Link';
import Link from 'next/link';
import { SearchIcon } from 'lucide-react';

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || [];

  const renderNavItems = (items: HeaderType['navItems'] | null | undefined, isSubmenu = false) => {
    // Verificar si items es válido
    if (!items || items.length === 0) return null;

    return (
      <ul className={isSubmenu ? 'absolute hidden group-hover:block bg-white shadow-md' : 'flex gap-3 items-center'}>
        {items.map(({ link, subItems }, i) => (
          <li key={i} className={`relative group ${isSubmenu ? 'px-4 py-2' : ''}`}>
            {/* Enlace principal */}
            <CMSLink {...link} appearance="link" />

            {/* Submenú */}
            {subItems && subItems.length > 0 && renderNavItems(subItems, true)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <nav className="flex items-center gap-3">
      {renderNavItems(navItems)}
      <Link href="/search" className="flex items-center">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  );
};
