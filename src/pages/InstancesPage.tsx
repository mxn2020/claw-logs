import { Server, Cpu, HardDrive, Activity, Wifi } from "lucide-react";
import "./InstancesPage.css";

const instances = [
    { name: "prod-1", url: "claw.example.com:8080", status: "online" as const, lastSeen: "Just now", logs24h: 18420, errorRate: 1.2, cpu: 34, ram: 62, agents: 5 },
    { name: "prod-2", url: "claw.example.com:8081", status: "online" as const, lastSeen: "Just now", logs24h: 14200, errorRate: 2.8, cpu: 56, ram: 71, agents: 4 },
    { name: "prod-3", url: "claw.example.com:8082", status: "online" as const, lastSeen: "2s ago", logs24h: 10271, errorRate: 4.1, cpu: 78, ram: 85, agents: 3 },
];

export default function InstancesPage() {
    return (
        <div className="inst-page">
            <div className="inst-header">
                <h1><Server size={20} /> Instances</h1>
                <button className="btn btn-primary btn-sm">+ Connect Instance</button>
            </div>

            <div className="inst-grid">
                {instances.map((inst) => (
                    <div key={inst.name} className="inst-card card">
                        <div className="inst-card-header">
                            <div className="inst-card-name">
                                <span className={`status-dot ${inst.status}`} />
                                <strong className="mono">{inst.name}</strong>
                            </div>
                            <span className="badge badge-success">{inst.status}</span>
                        </div>
                        <div className="inst-card-url mono">{inst.url}</div>

                        <div className="inst-metrics">
                            <div className="inst-metric">
                                <Cpu size={12} />
                                <span>CPU</span>
                                <div className="inst-bar"><div className="inst-bar-fill" style={{ width: `${inst.cpu}%`, background: inst.cpu > 70 ? "var(--color-warning)" : "var(--color-accent-primary)" }} /></div>
                                <span className="mono">{inst.cpu}%</span>
                            </div>
                            <div className="inst-metric">
                                <HardDrive size={12} />
                                <span>RAM</span>
                                <div className="inst-bar"><div className="inst-bar-fill" style={{ width: `${inst.ram}%`, background: inst.ram > 80 ? "var(--color-error)" : "var(--color-accent-primary)" }} /></div>
                                <span className="mono">{inst.ram}%</span>
                            </div>
                        </div>

                        <div className="inst-card-stats">
                            <div><Activity size={12} /> <span className="mono">{inst.logs24h.toLocaleString()}</span> <small>logs/24h</small></div>
                            <div><Wifi size={12} /> <span className="mono">{inst.errorRate}%</span> <small>error rate</small></div>
                            <div><Server size={12} /> <span className="mono">{inst.agents}</span> <small>agents</small></div>
                        </div>

                        <div className="inst-card-footer mono">
                            Last seen: {inst.lastSeen}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
