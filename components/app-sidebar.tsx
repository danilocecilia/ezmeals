'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from '@components/ui/sidebar';
import { useCurrentSession } from '@hooks/useCurrentSession';
import {
  LayoutDashboardIcon,
  ShoppingBag,
  Utensils,
  CalendarRange
} from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

const DynamicSideBarAuth = dynamic(() => import('./SideBarAuth'), {
  ssr: false
});

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg'
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/admin/dashboard',
      icon: LayoutDashboardIcon
    },
    {
      title: 'Orders',
      url: '/admin/orders',
      icon: ShoppingBag
    },
    {
      title: 'Meals',
      url: '/admin/meals',
      icon: Utensils,
      items: [
        {
          title: 'Add Meal',
          url: '/admin/meals/add',
          isActive: true
        },
        {
          title: 'List Meals',
          url: '/admin/meals'
        }
      ]
    },
    {
      title: 'Meal Planner',
      url: '/admin/meal-planner',
      icon: CalendarRange,
      items: [
        {
          title: 'Schedule Meal',
          url: '/admin/meal-planner/schedule'
        },
        {
          title: 'List Schedules',
          url: '/admin/meal-planner/schedules'
        }
      ]
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { session, status } = useCurrentSession();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link
                href="/"
                className="sm:hidden flex md:flex items-center gap-2 text-lg font-semibold md:text-base"
              >
                <Image
                  src="/logo_nav.png"
                  width={50}
                  height={50}
                  alt="Eazy Meal Logo"
                  style={{ objectFit: 'cover', maxWidth: 'unset' }}
                />
                <span className="sr-only">Acme Inc</span>

                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Eazy Meal</span>
                  {/* <span className="">v1.0.0</span> */}
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className="flex"
                >
                  <span>
                    {item.icon && <item.icon />}
                    <a href={item.url} className="font-medium">
                      {item.title}
                    </a>
                  </span>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <span>
                            <a href={item.url}>{item.title}</a>
                          </span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            {session && (
              //@ts-expect-error - This is a dynamic import
              <DynamicSideBarAuth session={session} status={status} />
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
