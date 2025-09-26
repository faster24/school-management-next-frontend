import PageContainer from '@/components/layout/page-container';
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardFooter } from '@/components/ui/card';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { Stats } from '@/types/school-index';
import { getStats } from '@/services/stat.services';
import React from 'react';

export default async function OverViewLayout({
    sales,
    pie_stats,
    bar_stats,
    area_stats
}: {
    sales: React.ReactNode;
    pie_stats: React.ReactNode;
    bar_stats: React.ReactNode;
    area_stats: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);
    const stats: Stats = await getStats();

    console.log('>>> stats: ', stats);

    return (
        <PageContainer>
            <div className='flex flex-1 flex-col space-y-2'>
                <div className='flex items-center justify-between space-y-2'>
                    <h2 className='text-2xl font-bold tracking-tight'>
                        Hi, Welcome back {session?.user?.name} 👋
                    </h2>
                </div>

                <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4'>
                    <Card className='@container/card'>
                        <CardHeader>
                            <CardDescription>Total Students</CardDescription>
                            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                                {stats.students}
                            </CardTitle>
                        </CardHeader>
                    </Card>

                    <Card className='@container/card'>
                        <CardHeader>
                            <CardDescription>Total Teachers</CardDescription>
                            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                                {stats.teachers}
                            </CardTitle>
                        </CardHeader>
                    </Card>

                    <Card className='@container/card'>
                        <CardHeader>
                            <CardDescription>Active Accounts</CardDescription>
                            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                                {stats.total_users}
                            </CardTitle>
                        </CardHeader>
                    </Card>

                    <Card className='@container/card'>
                        <CardHeader>
                            <CardDescription>Subjects</CardDescription>
                            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                                {stats.subjects}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </PageContainer>
    );
}
