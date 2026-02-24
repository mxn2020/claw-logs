import { Settings, Database, Clock, Trash2, Github, Coffee } from "lucide-react";
import "./SettingsPage.css";

export default function SettingsPage() {
    return (
        <div className="set-page">
            <h1><Settings size={20} /> Settings</h1>

            <section className="set-section card">
                <h2><Database size={16} /> Log Retention</h2>
                <div className="set-row">
                    <div className="set-field">
                        <label>Keep logs for</label>
                        <select className="input" style={{ width: "auto" }}>
                            <option>7 days</option>
                            <option>14 days</option>
                            <option>30 days</option>
                            <option>90 days</option>
                            <option>Forever</option>
                        </select>
                    </div>
                    <p className="set-hint">Older logs will be automatically purged. Current storage: 2.4 GB</p>
                </div>
            </section>

            <section className="set-section card">
                <h2><Clock size={16} /> Time Zone</h2>
                <div className="set-row">
                    <div className="set-field">
                        <label>Display timezone</label>
                        <select className="input" style={{ width: "auto" }}>
                            <option>UTC</option>
                            <option>Local (Europe/Berlin)</option>
                            <option>US/Eastern</option>
                            <option>US/Pacific</option>
                        </select>
                    </div>
                </div>
            </section>

            <section className="set-section card">
                <h2><Trash2 size={16} /> Danger Zone</h2>
                <div className="set-row">
                    <p>Permanently delete all stored logs and metrics. This action cannot be undone.</p>
                    <button className="btn" style={{ borderColor: "var(--color-error)", color: "var(--color-error)" }}>
                        <Trash2 size={14} /> Purge All Logs
                    </button>
                </div>
            </section>

            <section className="set-section card">
                <h2>About Claw Logs</h2>
                <p className="mono" style={{ marginBottom: "var(--space-3)" }}>v0.1.0 · MIT License · Open Source</p>
                <div style={{ display: "flex", gap: "var(--space-3)" }}>
                    <a href="https://github.com/mxn2020/claw-logs" className="btn btn-sm" target="_blank" rel="noopener noreferrer">
                        <Github size={14} /> GitHub
                    </a>
                    <a href="https://buymeacoffee.com/mxn2020" className="btn btn-sm" target="_blank" rel="noopener noreferrer">
                        <Coffee size={14} /> Support
                    </a>
                </div>
            </section>
        </div>
    );
}
