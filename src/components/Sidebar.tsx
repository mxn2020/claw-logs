import { Link, useLocation } from "react-router-dom";
import { Terminal, Activity, AlertTriangle, Server, Settings } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import "./Sidebar.css";

const navItems = [
    { to: "/", icon: Terminal, label: "Log Stream" },
    { to: "/dashboard", icon: Activity, label: "Dashboard" },
    { to: "/alerts", icon: AlertTriangle, label: "Alerts" },
    { to: "/instances", icon: Server, label: "Instances" },
    { to: "/settings", icon: Settings, label: "Settings" },
];

export default function Sidebar() {
    const location = useLocation();

    return (
        <aside className="cl-sidebar">
            <div className="cl-sidebar-header">
                <Link to="/" className="cl-logo">
                    <Terminal size={18} className="cl-logo-icon" />
                    <span className="cl-logo-text">
                        claw<span className="gradient-text">logs</span>
                    </span>
                </Link>
                <ThemeToggle />
            </div>

            <nav className="cl-nav">
                {navItems.map((item) => (
                    <Link
                        key={item.to}
                        to={item.to}
                        className={`cl-nav-item ${location.pathname === item.to ? "active" : ""}`}
                    >
                        <item.icon size={16} />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>

            <div className="cl-sidebar-footer">
                <div className="cl-status">
                    <span className="status-dot online" />
                    <span className="mono">3 instances connected</span>
                </div>
            </div>
        </aside>
    );
}
