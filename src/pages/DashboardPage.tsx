import { Activity, AlertTriangle, Server, TrendingUp, ArrowDown, ArrowUp } from "lucide-react";
import { Card, Badge } from "@geenius-ui/react-css";
import "./DashboardPage.css";

const stats = [
    { label: "Total Logs Today", value: "42,891", change: "+12%", up: true, icon: Activity },
    { label: "Error Rate", value: "2.3%", change: "-0.5%", up: false, icon: AlertTriangle },
    { label: "Instances Online", value: "3 / 3", change: "100%", up: true, icon: Server },
    { label: "Avg Latency", value: "340ms", change: "-15ms", up: false, icon: TrendingUp },
];

const recentErrors = [
    { time: "10:45:30", source: "agent/code-architect", message: "Tool execution failed: file_write", instance: "prod-3" },
    { time: "10:45:28", source: "llm/openai", message: "API Error 429: Too Many Requests", instance: "prod-3" },
    { time: "10:43:12", source: "agent/data-cruncher", message: "Dataset parse error: invalid CSV at line 340", instance: "prod-2" },
    { time: "10:41:55", source: "llm/anthropic", message: "Connection timeout after 30s", instance: "prod-1" },
];

const volumeData = [
    { hour: "00", info: 820, warn: 45, error: 12, debug: 340 },
    { hour: "02", info: 410, warn: 22, error: 5, debug: 180 },
    { hour: "04", info: 150, warn: 10, error: 2, debug: 80 },
    { hour: "06", info: 680, warn: 38, error: 8, debug: 260 },
    { hour: "08", info: 2100, warn: 95, error: 28, debug: 890 },
    { hour: "10", info: 3400, warn: 150, error: 42, debug: 1200 },
];

export default function DashboardPage() {
    const maxVal = Math.max(...volumeData.map((d) => d.info + d.warn + d.error + d.debug));

    return (
        <div className="dash-page">
            <div className="dash-header">
                <h1>Dashboard</h1>
                <span className="mono" style={{ color: "var(--color-text-tertiary)", fontSize: "var(--font-size-xs)" }}>
                    Last updated: just now
                </span>
            </div>

            <div className="dash-stats">
                {stats.map((s) => (
                    <Card key={s.label} padding="md" className="dash-stat">
                        <div className="dash-stat-top">
                            <span className="dash-stat-label">{s.label}</span>
                            <s.icon size={16} style={{ color: "var(--color-text-tertiary)" }} />
                        </div>
                        <div className="dash-stat-value">{s.value}</div>
                        <div className={`dash-stat-change ${s.up ? "up" : "down"}`}>
                            {s.up ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                            {s.change}
                        </div>
                    </Card>
                ))}
            </div>

            <Card padding="lg" className="dash-chart">
                <h2>Log Volume (24h)</h2>
                <div className="dash-bars">
                    {volumeData.map((d) => {
                        const total = d.info + d.warn + d.error + d.debug;
                        return (
                            <div key={d.hour} className="dash-bar-col">
                                <div className="dash-bar-stack" style={{ height: `${(total / maxVal) * 100}%` }}>
                                    <div className="dash-bar-seg error" style={{ flex: d.error }} />
                                    <div className="dash-bar-seg warn" style={{ flex: d.warn }} />
                                    <div className="dash-bar-seg info" style={{ flex: d.info }} />
                                    <div className="dash-bar-seg debug" style={{ flex: d.debug }} />
                                </div>
                                <span className="mono">{d.hour}:00</span>
                            </div>
                        );
                    })}
                </div>
                <div className="dash-chart-legend">
                    <span><span className="legend-dot" style={{ background: "var(--color-info)" }} /> Info</span>
                    <span><span className="legend-dot" style={{ background: "var(--color-warning)" }} /> Warn</span>
                    <span><span className="legend-dot" style={{ background: "var(--color-error)" }} /> Error</span>
                    <span><span className="legend-dot" style={{ background: "var(--color-debug)" }} /> Debug</span>
                </div>
            </Card>

            <Card padding="lg" className="dash-errors">
                <h2>Recent Errors</h2>
                <div className="dash-error-list">
                    {recentErrors.map((e, i) => (
                        <div key={i} className="dash-error-row">
                            <span className="mono" style={{ color: "var(--color-text-tertiary)", width: 70 }}>{e.time}</span>
                            <Badge variant="error">ERROR</Badge>
                            <span className="mono" style={{ color: "var(--color-accent-secondary)", width: 60 }}>{e.instance}</span>
                            <span className="mono" style={{ color: "var(--color-text-secondary)", width: 180 }}>{e.source}</span>
                            <span className="mono" style={{ flex: 1 }}>{e.message}</span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
