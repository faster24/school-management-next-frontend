'use client';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from '@/components/ui/collapsible';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail
} from '@/components/ui/sidebar';
import { navItems as adminNavItems, studentNavItems, teacherNavItems } from '@/constants/data';
import { useMediaQuery } from '@/hooks/use-media-query';
import { IconChevronRight, IconLogout } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { Icons } from '../icons';
import { OrgSwitcher } from '../org-switcher';
import { signOut, useSession } from 'next-auth/react';
import { Skeleton } from '../ui/skeleton';

export default function AppSidebar() {
    const pathname = usePathname();
    const { isOpen } = useMediaQuery();
    const { data: session, status } = useSession();

    React.useEffect(() => {
        // Side effects based on sidebar state changes
    }, [isOpen]);

    const roleNavItems: Record<string, typeof adminNavItems> = {
        admin: adminNavItems,
        teacher: teacherNavItems,
        student: studentNavItems,
    };

    const navItems = roleNavItems[session?.role as string] ?? studentNavItems;

    return (
        <Sidebar collapsible='icon'>
            <SidebarHeader>
                <OrgSwitcher />
            </SidebarHeader>
            {status === 'loading' ? (
                <div className='mt-5 flex flex-col gap-2 px-3'>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                        <Skeleton key={item} className='h-8 w-full' />
                    ))}
                </div>
            ) : (
                <>
                    <SidebarContent className='overflow-x-hidden'>
                        <SidebarGroup>
                            <SidebarGroupLabel>Overview</SidebarGroupLabel>
                            <SidebarMenu>
                                {navItems.map((item) => {
                                    const Icon = item.icon ? Icons[item.icon] : Icons.logo;
                                    return item?.items && item?.items?.length > 0 ? (
                                        <Collapsible
                                            key={item.title}
                                            asChild
                                            defaultOpen={item.isActive}
                                            className='group/collapsible'
                                        >
                                            <SidebarMenuItem>
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton
                                                        tooltip={item.title}
                                                        isActive={pathname === item.url}
                                                    >
                                                        {item.icon && <Icon />}
                                                        <span>{item.title}</span>
                                                        <IconChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent>
                                                    <SidebarMenuSub>
                                                        {item.items?.map((subItem) => (
                                                            <SidebarMenuSubItem key={subItem.title}>
                                                                <SidebarMenuSubButton
                                                                    asChild
                                                                    isActive={pathname === subItem.url}
                                                                >
                                                                    <Link href={subItem.url}>
                                                                        <span>{subItem.title}</span>
                                                                    </Link>
                                                                </SidebarMenuSubButton>
                                                            </SidebarMenuSubItem>
                                                        ))}
                                                    </SidebarMenuSub>
                                                </CollapsibleContent>
                                            </SidebarMenuItem>
                                        </Collapsible>
                                    ) : (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                asChild
                                                tooltip={item.title}
                                                isActive={pathname === item.url}
                                            >
                                                <Link href={item.url}>
                                                    <Icon />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter className='mb-20'>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    className='cursor-pointer'
                                    tooltip='Logout'
                                    onClick={() => signOut()}
                                >
                                    <IconLogout className='h-4 w-4' />
                                    <span>Logout</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                </>
            )}
            <SidebarRail />
        </Sidebar>
    );
}
