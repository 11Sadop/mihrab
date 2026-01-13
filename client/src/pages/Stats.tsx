import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Users, Eye, TrendingUp, BarChart3, Calendar, FileText } from "lucide-react";

interface PageStats {
  totalVisits: number;
  todayVisits: number;
  pages: { page: string; count: number }[];
  last7Days: { date: string; count: number }[];
}

export default function Stats() {
  const urlParams = new URLSearchParams(window.location.search);
  const adminKey = urlParams.get("key");
  
  if (adminKey !== "mihrab2024") {
    return (
      <div className="min-h-screen pb-32 bg-background" dir="rtl">
        <Header title="غير مصرح" />
        <div className="container max-w-md mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">غير مسموح بالوصول</p>
        </div>
      </div>
    );
  }

  const { data: stats, isLoading } = useQuery<PageStats>({
    queryKey: ["/api/stats/page-stats", adminKey],
    queryFn: async () => {
      const res = await fetch(`/api/stats/page-stats?key=${adminKey}`);
      return res.json();
    },
    refetchInterval: 30000,
  });

  const { data: visitors } = useQuery<{ count: number }>({
    queryKey: ["/api/stats/visitors"],
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    return `${days[date.getDay()]} ${date.getDate()}/${date.getMonth() + 1}`;
  };

  const maxCount = Math.max(...(stats?.last7Days?.map(d => d.count) || [1]), 1);

  return (
    <div className="min-h-screen pb-32 bg-background" dir="rtl">
      <Header title="إحصائيات الزيارات" />
      
      <main className="container max-w-2xl mx-auto px-4 py-6 space-y-6">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">الزوار الفريدين</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{visitors?.count || 0}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">إجمالي الزيارات</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.totalVisits || 0}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">زيارات اليوم</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.todayVisits || 0}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">الصفحات</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.pages?.length || 0}</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-2">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  آخر 7 أيام
                </CardTitle>
              </CardHeader>
              <CardContent>
                {stats?.last7Days && stats.last7Days.length > 0 ? (
                  <div className="space-y-3">
                    {stats.last7Days.map((day) => (
                      <div key={day.date} className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground w-24 text-right">{formatDate(day.date)}</span>
                        <div className="flex-1 h-6 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all duration-500"
                            style={{ width: `${(day.count / maxCount) * 100}%` }}
                          />
                        </div>
                        <span className="font-bold text-sm w-12 text-left">{day.count}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-4">لا توجد بيانات بعد - انتظر زيارات جديدة</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-2">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  الصفحات الأكثر زيارة
                </CardTitle>
              </CardHeader>
              <CardContent>
                {stats?.pages && stats.pages.length > 0 ? (
                  <div className="space-y-3">
                    {stats.pages.map((page, index) => (
                      <div key={page.page} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === 0 ? 'bg-amber-500 text-white' :
                            index === 1 ? 'bg-gray-400 text-white' :
                            index === 2 ? 'bg-amber-700 text-white' :
                            'bg-secondary text-muted-foreground'
                          }`}>
                            {index + 1}
                          </span>
                          <span className="font-medium">{page.page}</span>
                        </div>
                        <span className="text-primary font-bold text-lg">{page.count}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-4">لا توجد بيانات بعد - انتظر زيارات جديدة</p>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}
