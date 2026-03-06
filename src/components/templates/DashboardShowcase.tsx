import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { useSlideIn, useFadeIn, useFadeOut, useRotate, useTypewriter, useZoom } from "../../hooks/animations";
import { Button } from "../atoms/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../atoms/ui/card";
import { DollarSign, Users, Activity, CreditCard } from "lucide-react";

// --- SUB-COMPONENTS (These read relative frames from their parent <Sequence>) ---

interface TranslatableProps {
    t: (key: string) => string;
}

const Scene1: React.FC<{ text: string }> = ({ text }) => {
    return (
        <AbsoluteFill className="flex items-center justify-center z-50">
            <h1
                className="text-[140px] font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-300 via-purple-400 to-indigo-600 tracking-tighter leading-tight text-center max-w-[1600px] whitespace-normal px-10"
                style={{
                    opacity: useFadeIn({ durationInFrames: 30 }) * useFadeOut({ durationInFrames: 25, delayInFrames: 95 }),
                    transform: useZoom({ durationInFrames: 90, startScale: 0.8, endScale: 1.1 })
                }}
            >
                {useTypewriter({ text, durationInFrames: 50 })}
            </h1>
        </AbsoluteFill>
    );
};

const Sidebar: React.FC<TranslatableProps> = ({ t }) => {
    return (
        <div className="w-[450px] bg-[#111118] border-r border-white/5 h-full p-12 flex flex-col gap-12 z-20 shadow-[20px_0_100px_rgba(0,0,0,0.5)]"
            style={{
                transform: useSlideIn({ durationInFrames: 60, direction: "left", distance: 300 }),
                opacity: useFadeIn({ durationInFrames: 40 })
            }}>
            <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-indigo-600/30"
                    style={{ transform: useRotate({ durationInFrames: 90, degrees: 360 }) }}>S</div>
                <span className="font-bold text-4xl text-white tracking-tight">Sawabona</span>
            </div>
            <nav className="flex flex-col gap-4 mt-8">
                <Button variant="secondary" className="justify-start bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 font-bold border border-indigo-500/20 h-20 text-2xl px-8 rounded-2xl">{t("navDashboard")}</Button>
                <Button variant="ghost" className="justify-start text-neutral-400 hover:text-white hover:bg-white/5 h-20 text-2xl font-medium px-8 rounded-2xl">{t("navAnalytics")}</Button>
                <Button variant="ghost" className="justify-start text-neutral-400 hover:text-white hover:bg-white/5 h-20 text-2xl font-medium px-8 rounded-2xl">{t("navCustomers")}</Button>
                <Button variant="ghost" className="justify-start text-neutral-400 hover:text-white hover:bg-white/5 h-20 text-2xl font-medium px-8 rounded-2xl">{t("navSettings")}</Button>
            </nav>
        </div>
    );
};

const Header: React.FC<TranslatableProps> = ({ t }) => {
    return (
        <header className="h-40 border-b border-white/5 bg-[#111118]/80 backdrop-blur-md px-16 flex items-center justify-between z-10"
            style={{
                transform: useSlideIn({ durationInFrames: 60, direction: "down", distance: 150 }),
                opacity: useFadeIn({ durationInFrames: 40 })
            }}>
            <h2 className="text-5xl font-semibold text-white tracking-tight">
                {useTypewriter({ text: t("welcomeAdmin"), durationInFrames: 50, delayInFrames: 10 })}
            </h2>
            <div className="flex gap-6" style={{ opacity: useFadeIn({ durationInFrames: 40, delayInFrames: 40 }) }}>
                <Button variant="outline" className="border-white/10 text-neutral-300 hover:text-white hover:bg-white/5 bg-transparent h-16 text-xl px-8 rounded-2xl font-medium">{t("btnExport")}</Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-600/25 h-16 text-xl px-10 rounded-2xl font-bold">{t("btnCreateNew")}</Button>
            </div>
        </header>
    );
};

const MetricCard: React.FC<{ title: string, value: string, icon: React.ReactNode, pColor: string, delay: number }> = ({ title, value, icon, pColor, delay }) => {
    return (
        <div style={{
            opacity: useFadeIn({ durationInFrames: 40, delayInFrames: delay }),
            transform: `${useSlideIn({ durationInFrames: 50, direction: "up", distance: 100, delayInFrames: delay })} ${useZoom({ durationInFrames: 50, startScale: 0.8, endScale: 1, delayInFrames: delay })}`
        }}>
            <Card className={`bg-[#111118] border-white/5 shadow-2xl rounded-3xl h-56 px-2 flex flex-col justify-center`}>
                <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0 px-10 pt-8">
                    <CardTitle className="text-2xl font-medium text-neutral-400">{title}</CardTitle>
                    <div className={`p-5 rounded-2xl ${pColor}`} style={{ transform: useRotate({ durationInFrames: 80, delayInFrames: delay + 10, degrees: 360 }) }}>{icon}</div>
                </CardHeader>
                <CardContent className="px-10 pb-8">
                    <div className="text-7xl font-bold text-white tracking-tight">{value}</div>
                </CardContent>
            </Card>
        </div>
    );
};

const MetricsRow: React.FC<TranslatableProps> = ({ t }) => {
    return (
        <div className="grid grid-cols-4 gap-10">
            <MetricCard title={t("metricRevenue")} value="R$45,00" icon={<DollarSign className="w-10 h-10 text-indigo-400" />} pColor="bg-indigo-500/10" delay={0} />
            <MetricCard title={t("metricUsers")} value="2,350" icon={<Users className="w-10 h-10 text-purple-400" />} pColor="bg-purple-500/10" delay={15} />
            <MetricCard title={t("metricSales")} value="12,234" icon={<CreditCard className="w-10 h-10 text-blue-400" />} pColor="bg-blue-500/10" delay={30} />
            <MetricCard title={t("metricActiveNow")} value="573" icon={<Activity className="w-10 h-10 text-emerald-400" />} pColor="bg-emerald-500/10" delay={45} />
        </div>
    );
};

const ChartArea: React.FC<TranslatableProps> = ({ t }) => {
    return (
        <div className="flex-1" style={{
            opacity: useFadeIn({ durationInFrames: 50 }),
            transform: useSlideIn({ durationInFrames: 60, direction: "up", distance: 200 })
        }}>
            <Card className="h-full bg-[#111118] border-white/5 shadow-2xl relative overflow-hidden rounded-[3rem] flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-purple-500/5 pointer-events-none" />
                <CardHeader className="p-12">
                    <CardTitle className="text-4xl text-white font-bold">{t("chartTitle")}</CardTitle>
                    <CardDescription className="text-2xl text-neutral-400 mt-3">{t("chartDesc")}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 px-16 pb-0 flex items-end justify-between gap-6 relative z-10">
                    {[30, 50, 40, 70, 55, 90, 65, 100, 80, 60, 85, 50].map((h, i) => (
                        <div
                            key={i}
                            className="bg-gradient-to-t from-indigo-600 to-purple-500 rounded-t-3xl w-full shadow-[0_0_30px_rgba(79,70,229,0.2)] relative group"
                            style={{
                                height: `${h}%`,
                                transformOrigin: "bottom center",
                                transform: useZoom({ durationInFrames: 60, delayInFrames: 10 + (i * 3), startScale: 0, endScale: 1 }),
                                opacity: useFadeIn({ durationInFrames: 40, delayInFrames: 10 + (i * 3) })
                            }}
                        />
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};

const TextOverlay: React.FC<{ text: string, color: 'indigo' | 'purple', large?: boolean, delayInFrames?: number }> = ({ text, color, large, delayInFrames = 0 }) => {
    const bgMap = {
        indigo: "bg-indigo-500/20 border-indigo-400/40 shadow-[0_0_80px_rgba(99,102,241,0.5)]",
        purple: "bg-purple-500/20 border-purple-400/40 shadow-[0_0_80px_rgba(168,85,247,0.5)]"
    };

    if (large) {
        return (
            <AbsoluteFill className="items-center justify-center z-[100] pointer-events-none">
                <div className="px-24 py-12 bg-indigo-600/40 backdrop-blur-3xl border border-indigo-500/50 rounded-[3rem] shadow-[0_0_150px_rgba(99,102,241,0.7)]"
                    style={{
                        opacity: useFadeIn({ durationInFrames: 35 }) * useFadeOut({ durationInFrames: 30, delayInFrames: 90 }),
                        transform: useZoom({ durationInFrames: 55, startScale: 0.6, endScale: 1 })
                    }}>
                    <h3 className="text-white text-7xl font-black tracking-widest uppercase text-center">
                        {useTypewriter({ text, durationInFrames: 50 })}
                    </h3>
                </div>
            </AbsoluteFill>
        );
    }

    return (
        <AbsoluteFill className="items-center justify-start pt-[60px] z-[100] pointer-events-none">
            <div className={`px-16 py-8 backdrop-blur-3xl border rounded-full ${bgMap[color]}`}
                style={{
                    opacity: useFadeIn({ durationInFrames: 35 }) * useFadeOut({ durationInFrames: 30, delayInFrames: 70 }),
                    transform: useSlideIn({ durationInFrames: 45, direction: "down", distance: 100 })
                }}>
                <h3 className="text-white text-6xl font-bold tracking-tight">
                    {useTypewriter({ text, durationInFrames: 40, delayInFrames })}
                </h3>
            </div>
        </AbsoluteFill>
    );
};

const EndingScene: React.FC<{ text: string }> = ({ text }) => {
    return (
        <AbsoluteFill
            className="bg-[#050508] flex flex-col items-center justify-center z-[100]"
            style={{ opacity: useFadeIn({ durationInFrames: 45 }) }}
        >
            <div className="w-56 h-56 rounded-[3rem] bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 flex items-center justify-center shadow-[0_0_150px_rgba(99,102,241,0.6)] mb-12"
                style={{ transform: useSlideIn({ durationInFrames: 60, direction: "down", distance: 100 }) + " " + useZoom({ durationInFrames: 65, startScale: 0.5, endScale: 1 }) }}>
                <span className="text-[120px] font-extrabold text-white tracking-widest translate-x-4">S</span>
            </div>
            <h2 className="text-[140px] font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-400 to-indigo-600 tracking-tighter px-10"
                style={{ opacity: useFadeIn({ durationInFrames: 45, delayInFrames: 30 }), transform: useSlideIn({ durationInFrames: 60, delayInFrames: 30, direction: "up", distance: 100 }) }}>
                {useTypewriter({ text, durationInFrames: 50, delayInFrames: 30 })}
            </h2>
        </AbsoluteFill>
    );
};

const AppWindow: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div
            className="w-[1920px] h-[1080px] bg-[#0c0c11] border border-white/5 shadow-[0_0_150px_rgba(99,102,241,0.15)] flex relative overflow-hidden"
            style={{
                transform: `scale(0.70) ${useSlideIn({ durationInFrames: 60, direction: "up", distance: 400 })}`,
                opacity: useFadeIn({ durationInFrames: 45 }) * useFadeOut({ durationInFrames: 45, delayInFrames: 600 }),
                borderRadius: '4rem'
            }}
        >
            {children}
        </div>
    );
}

const FadeOutVeil: React.FC = () => {
    return (
        <div
            className="absolute inset-0 bg-[#050508]/90 backdrop-blur-3xl z-40"
            style={{ opacity: useFadeIn({ durationInFrames: 45 }) }}
        />
    )
}

// --- MAIN SHOWCASE COMPONENT ---
export const DashboardShowcase: React.FC<{
    dictionary?: Record<string, string>
}> = ({ dictionary }) => {
    // Default fallback translations
    const translate = (key: string) => {
        if (dictionary && dictionary[key]) {
            return dictionary[key];
        }

        const fallbacks: Record<string, string> = {
            "scene1": "Crie vídeos dinâmicos em React.",
            "scene2": "Navegação Modular",
            "scene3": "Cabeçalhos Inteligentes",
            "scene4": "Métricas Animadas",
            "scene5": "Gráficos Interativos",
            "scene6": "Sawabona Motion Engine",
            "ending": "Sawabona Motion Engine",
            "navDashboard": "Dashboard",
            "navAnalytics": "Analytics",
            "navCustomers": "Customers",
            "navSettings": "Settings",
            "welcomeAdmin": "Welcome back, Admin",
            "btnExport": "Export Report",
            "btnCreateNew": "Create New",
            "metricRevenue": "Revenue",
            "metricUsers": "Users",
            "metricSales": "Sales",
            "metricActiveNow": "Active Now",
            "chartTitle": "Overview Performance",
            "chartDesc": "Monthly profit margins and expansion data visualized."
        };
        return fallbacks[key] || key;
    };

    return (
        <AbsoluteFill className="bg-[#050508] font-sans overflow-hidden">

            {/* --- SCENE 1: Intro Text (0 - 120) --- */}
            <Sequence from={0} durationInFrames={120}>
                <Scene1 text={translate('scene1')} />
            </Sequence>

            {/* --- THE DASHBOARD CONTAINER (starts at 100, stays until 750) --- */}
            <Sequence from={100} durationInFrames={650}>
                <AbsoluteFill className="flex items-center justify-center pt-24">
                    <AppWindow>
                        {/* SIDEBAR */}
                        <Sequence from={50} layout="none">
                            <Sidebar t={translate} />
                        </Sequence>

                        {/* MAIN CONTENT AREA */}
                        <div className="flex-1 flex flex-col h-full bg-[#0c0c11] relative overflow-hidden rounded-r-[4rem]">
                            {/* HEADER */}
                            <Sequence from={100} layout="none">
                                <Header t={translate} />
                            </Sequence>

                            {/* DASHBOARD GRID */}
                            <div className="p-16 flex-1 flex flex-col gap-12 overflow-hidden relative">
                                {/* METRICS ROW */}
                                <Sequence from={150} layout="none">
                                    <MetricsRow t={translate} />
                                </Sequence>

                                {/* CHART AREA */}
                                <Sequence from={250} layout="none">
                                    <ChartArea t={translate} />
                                </Sequence>
                            </div>

                            {/* Blur overlay at end of dashboard lifecycle */}
                            <Sequence from={600} layout="none">
                                <FadeOutVeil />
                            </Sequence>
                        </div>
                    </AppWindow>
                </AbsoluteFill>
            </Sequence>

            {/* --- INDEPENDENT OVERLAYS: SCENE TEXTS AT THE TOP OF THE VIDEO --- */}

            <Sequence from={150} durationInFrames={100}>
                <TextOverlay text={translate('scene2')} color="indigo" />
            </Sequence>

            <Sequence from={260} durationInFrames={100}>
                <TextOverlay text={translate('scene3')} color="purple" />
            </Sequence>

            <Sequence from={370} durationInFrames={110}>
                <TextOverlay text={translate('scene4')} color="indigo" />
            </Sequence>

            <Sequence from={490} durationInFrames={130}>
                <TextOverlay text={translate('scene5')} color="purple" />
            </Sequence>

            <Sequence from={630} durationInFrames={120}>
                <TextOverlay text={translate('scene6')} color="indigo" large />
            </Sequence>

            {/* --- SCENE 7: ENDING (Starts at 750) --- */}
            <Sequence from={750} durationInFrames={150}>
                <EndingScene text={translate('ending')} />
            </Sequence>

        </AbsoluteFill>
    );
};
