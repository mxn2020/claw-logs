import { AlertTriangle, Bell, Plus, Check, X } from "lucide-react";
import { Button, Card, Badge } from "@geenius-ui/react-css";
import "./AlertsPage.css";

const alerts = [
    { id: 1, name: "High Error Rate", condition: "error_rate > 5%", channel: "slack", target: "#ops-alerts", enabled: true, lastTriggered: "2 hours ago" },
    { id: 2, name: "Instance Down", condition: "instance.status == offline", channel: "email", target: "ops@team.com", enabled: true, lastTriggered: "3 days ago" },
    { id: 3, name: "Rate Limit Warning", condition: "api_usage > 80%", channel: "slack", target: "#api-monitoring", enabled: true, lastTriggered: "45 min ago" },
    { id: 4, name: "Disk Space Low", condition: "disk_usage > 85%", channel: "email", target: "admin@team.com", enabled: false, lastTriggered: "1 week ago" },
    { id: 5, name: "Token Budget Exceeded", condition: "daily_tokens > 1M", channel: "webhook", target: "https://hooks.example.com/alerts", enabled: true, lastTriggered: "Never" },
];

export default function AlertsPage() {
    return (
        <div className="alerts-page">
            <div className="alerts-header">
                <h1><AlertTriangle size={20} /> Alerts</h1>
                <Button variant="primary" size="sm" icon={<Plus size={14} />}>New Alert</Button>
            </div>

            <div className="alerts-list">
                {alerts.map((a) => (
                    <Card key={a.id} padding="md" className={`alert-row ${!a.enabled ? "disabled" : ""}`}>
                        <div className="alert-info">
                            <div className="alert-name">
                                <Bell size={14} />
                                <strong>{a.name}</strong>
                                {!a.enabled && <Badge variant="secondary">Disabled</Badge>}
                            </div>
                            <div className="alert-condition mono">{a.condition}</div>
                        </div>
                        <div className="alert-meta">
                            <div className="alert-channel">
                                <Badge variant="info">{a.channel}</Badge>
                                <span className="mono">{a.target}</span>
                            </div>
                            <span className="alert-triggered mono">Last: {a.lastTriggered}</span>
                        </div>
                        <div className="alert-actions">
                            <Button variant="ghost" size="sm" icon={a.enabled ? <X size={14} /> : <Check size={14} />} />
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
