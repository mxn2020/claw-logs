import { Settings, Database, Clock, Trash2, Github, Coffee } from "lucide-react";
import { Button, Card, Label, Select, SelectItem } from "@geenius-ui/react-css";
import "./SettingsPage.css";

export default function SettingsPage() {
    return (
        <div className="set-page">
            <h1><Settings size={20} /> Settings</h1>

            <Card padding="lg" className="set-section">
                <h2><Database size={16} /> Log Retention</h2>
                <div className="set-row">
                    <div className="set-field">
                        <Label>Keep logs for</Label>
                        <Select defaultValue="30">
                            <SelectItem value="7">7 days</SelectItem>
                            <SelectItem value="14">14 days</SelectItem>
                            <SelectItem value="30">30 days</SelectItem>
                            <SelectItem value="90">90 days</SelectItem>
                            <SelectItem value="forever">Forever</SelectItem>
                        </Select>
                    </div>
                    <p className="set-hint">Older logs will be automatically purged. Current storage: 2.4 GB</p>
                </div>
            </Card>

            <Card padding="lg" className="set-section">
                <h2><Clock size={16} /> Time Zone</h2>
                <div className="set-row">
                    <div className="set-field">
                        <Label>Display timezone</Label>
                        <Select defaultValue="UTC">
                            <SelectItem value="UTC">UTC</SelectItem>
                            <SelectItem value="local">Local (Europe/Berlin)</SelectItem>
                            <SelectItem value="eastern">US/Eastern</SelectItem>
                            <SelectItem value="pacific">US/Pacific</SelectItem>
                        </Select>
                    </div>
                </div>
            </Card>

            <Card padding="lg" className="set-section">
                <h2><Trash2 size={16} /> Danger Zone</h2>
                <div className="set-row">
                    <p>Permanently delete all stored logs and metrics. This action cannot be undone.</p>
                    <Button variant="outline" icon={<Trash2 size={14} />}>
                        Purge All Logs
                    </Button>
                </div>
            </Card>

            <Card padding="lg" className="set-section">
                <h2>About Claw Logs</h2>
                <p className="mono" style={{ marginBottom: "var(--space-3)" }}>v0.1.0 · MIT License · Open Source</p>
                <div style={{ display: "flex", gap: "var(--space-3)" }}>
                    <a href="https://github.com/mxn2020/claw-logs" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm" icon={<Github size={14} />}>GitHub</Button>
                    </a>
                    <a href="https://buymeacoffee.com/mxn2020" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm" icon={<Coffee size={14} />}>Support</Button>
                    </a>
                </div>
            </Card>
        </div>
    );
}
