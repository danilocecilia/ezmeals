'use client';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@root/components/ui/breadcrumb';
import { useSelectedLayoutSegments } from 'next/navigation';
import React from 'react';

export const BreadcrumbBuilder = () => {
  const segments = useSelectedLayoutSegments();

  // Construct cumulative paths for links
  const cumulativePaths = segments.reduce<string[]>((acc, segment) => {
    const lastPath = acc.length > 0 ? acc[acc.length - 1] : '/admin';
    acc.push(`${lastPath}/${segment}`);
    return acc;
  }, []);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Admin Link */}
        <BreadcrumbItem>
          <BreadcrumbLink href="/admin">{'Admin'}</BreadcrumbLink>
        </BreadcrumbItem>

        {/* Render segments */}
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const segmentName = segment
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase());

          return (
            <React.Fragment key={index}>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{segmentName}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={cumulativePaths[index]}>
                    {segmentName}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
