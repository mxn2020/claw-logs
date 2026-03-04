import { useState } from "react";
import { Search, Filter, Pause, Play } from "lucide-react";
import { Button, Badge, Input } from "@geenius-ui/react-css";
import "./LogStreamPage.css";

const demoLogs = [
    { id: "1", timestamp: "10:45:32.100", level: "info", source: "agent/content-writer", instance: "prod-1", message: "Starting task: generate blog post for Q4 summary" },
    { id: "2", timestamp: "10:45:32.050", level: "debug", source: "llm/openai", instance: "prod-2", message: "GPT-4o request: 1,450 tokens in / 520 tokens out (latency: 820ms)" },
    { id: "3", timestamp: "10:45:31.800", level: "info", source: "agent/research-analyst", instance: "prod-2", message: "Fetched 12 pages from knowledge base. Relevance score: 0.89" },
    { id: "4", timestamp: "10:45:31.500", level: "warn", source: "llm/anthropic", instance: "prod-1", message: "Rate limit approaching: 85% of 60 RPM quota used" },
    { id: "5", timestamp: "10:45:30.990", level: "error", source: "agent/code-architect", instance: "prod-3", message: "Tool execution failed: 'file_write' — permission denied at /output/report.md" },
    { id: "6", timestamp: "10:45:30.550", level: "info", source: "orchestrator/pipeline", instance: "prod-1", message: "Pipeline step 2/5 complete. Handoff to research-analyst." },
    { id: "7", timestamp: "10:45:29.900", level: "debug", source: "system/memory", instance: "prod-2", message: "Context window: 42,800/128,000 tokens used (33.4%)" },
    { id: "8", timestamp: "10:45:29.400", level: "info", source: "agent/summarizer", instance: "prod-1", message: "Summary generated: 320 words from 4,200 word input (92% reduction)" },
    { id: "9", timestamp: "10:45:28.900", level: "error", source: "llm/openai", instance: "prod-3", message: "API Error 429: Too Many Requests. Retry in 12s." },
    { id: "10", timestamp: "10:45:28.100", level: "info", source: "agent/qa-inspector", instance: "prod-2", message: "Validation pass: 8/8 assertions passed for task output" },
    { id: "11", timestamp: "10:45:27.600", level: "warn", source: "system/disk", instance: "prod-3", message: "Disk usage at 78%. Consider cleanup of /tmp/agent-artifacts." },
    { id: "12", timestamp: "10:45:27.100", level: "debug", source: "llm/anthropic", instance: "prod-1", message: "Claude 3.5 Sonnet request: 2,100 tokens in / 890 tokens out (latency: 1,200ms)" },
    { id: "13", timestamp: "10:45:26.500", level: "info", source: "agent/content-writer", instance: "prod-2", message: "Draft complete: blog-post-q4-summary.md (1,450 words)" },
    { id: "14", timestamp: "10:45:25.900", level: "info", source: "orchestrator/mission-cmd", instance: "prod-1", message: "All 4 subtasks completed. Assembling final output." },
    { id: "15", timestamp: "10:45:25.200", level: "debug", source: "system/connection", instance: "prod-3", message: "WebSocket reconnected to wss://api.openai.com (attempt 2)" },
];

export default function LogStreamPage() {
    const [paused, setPaused] = useState(false);
    const [search, setSearch] = useState("");
    const [levelFilter, setLevelFilter] = useState<string>("all");

    const filtered = demoLogs.filter((log) => {
        const matchSearch = log.message.toLowerCase().includes(search.toLowerCase()) || log.source.includes(search.toLowerCase());
        const matchLevel = levelFilter === "all" || log.level === levelFilter;
        return matchSearch && matchLevel;
    });

    return (
        <div className="ls-page">
            <div className="ls-toolbar">
                <div className="ls-search">
                    <Search size={14} />
                    <Input
                        type="text"
                        placeholder="Search logs... (grep syntax)"
                        value={search}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                    />
                </div>
                <div className="ls-filters">
                    <Filter size={14} />
                    {["all", "info", "warn", "error", "debug"].map((l) => (
                        <Button
                            key={l}
                            size="sm"
                            variant={levelFilter === l ? "primary" : "outline"}
                            onClick={() => setLevelFilter(l)}
                        >
                            {l.toUpperCase()}
                        </Button>
                    ))}
                </div>
                <Button
                    size="sm"
                    variant={paused ? "outline" : "primary"}
                    onClick={() => setPaused(!paused)}
                    icon={paused ? <Play size={14} /> : <Pause size={14} />}
                >
                    {paused ? "Resume" : "Live"}
                </Button>
            </div>

            <div className="ls-meta mono">
                <span>{filtered.length} entries</span>
                <span>
                    {!paused && <span className="status-dot online" />}
                    {paused ? "Paused" : "Streaming"}
                </span>
            </div>

            <div className="ls-stream">
                {filtered.map((log) => (
                    <div key={log.id} className="ls-line">
                        <span className="ls-time mono">{log.timestamp}</span>
                        <Badge variant={log.level === "error" ? "error" : log.level === "warn" ? "warning" : log.level === "info" ? "info" : "secondary"} size="sm">{log.level.toUpperCase()}</Badge>
                        <span className="ls-instance mono">{log.instance}</span>
                        <span className="ls-source mono">{log.source}</span>
                        <span className="ls-msg mono">{log.message}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
