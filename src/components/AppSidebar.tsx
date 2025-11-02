'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Ambulance,
  FileText,
  HeartPulse,
  Home,
  LayoutGrid,
  Newspaper,
  Pill,
  Salad,
  Shield,
  Sparkles,
  Sprout,
  Stethoscope,
  Droplets,
} from 'lucide-react';
import { AppLogo } from '@/components/AppLogo';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import type { NavItem } from '@/lib/types';

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutGrid,
    group: 'Main',
  },
  {
    title: 'Symptom Checker',
    href: '/symptom-checker',
    icon: Sparkles,
    group: 'AI Tools',
  },
  {
    title: 'Report Summarizer',
    href: '/report-summarizer',
    icon: FileText,
    group: 'AI Tools',
  },
  {
    title: 'Diet Plan',
    href: '/diet-plan',
    icon: Salad,
    group: 'AI Tools',
  },
  {
    title: 'Medical Vault',
    href: '/medical-vault',
    icon: Shield,
    group: 'AI Tools',
  },
  {
    title: 'Health Monitor',
    href: '/health-monitor',
    icon: HeartPulse,
    group: 'Services',
  },
  {
    title: 'Consult Doctor',
    href: '/consult-doctor',
    icon: Stethoscope,
    group: 'Services',
  },
  {
    title: 'Buy Medicine',
    href: '/buy-medicine',
    icon: Pill,
    group: 'Services',
  },
  {
    title: 'Book Ambulance',
    href: '/book-ambulance',
    icon: Ambulance,
    group: 'Services',
  },
  {
    title: 'Ayurvedic Remedies',
    href: '/ayurvedic-remedies',
    icon: Sprout,
    group: 'Wellness & Knowledge',
  },
  {
    title: 'Homeopathy',
    href: '/homeopathy',
    icon: Droplets,
    group: 'Wellness & Knowledge',
  },
  {
    title: 'Home Remedies',
    href: '/home-remedies',
    icon: Home,
    group: 'Wellness & Knowledge',
  },
  {
    title: 'Articles',
    href: '/articles',
    icon: Newspaper,
    group: 'Personal',
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  const navGroups = navItems.reduce((acc, item) => {
    (acc[item.group] = acc[item.group] || []).push(item);
    return acc;
  }, {} as Record<string, NavItem[]>);

  return (
    <Sidebar>
      <SidebarHeader>
        <AppLogo />
      </SidebarHeader>
      <SidebarContent className="p-2">
        {Object.entries(navGroups).map(([groupName, items]) => (
          <SidebarGroup key={groupName} className="p-0">
            <SidebarMenu className="w-full">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="w-full">
                  <Link href={item.href} className="w-full">
                    <SidebarMenuButton
                      isActive={pathname === item.href}
                      className="w-full justify-start"
                      tooltip={item.title}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <SidebarSeparator className="my-2" />
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
