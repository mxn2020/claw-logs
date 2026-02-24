import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";
import Sidebar from "../components/Sidebar";
import LogStreamPage from "../pages/LogStreamPage";
import DashboardPage from "../pages/DashboardPage";
import AlertsPage from "../pages/AlertsPage";
import InstancesPage from "../pages/InstancesPage";
import SettingsPage from "../pages/SettingsPage";
import userEvent from "@testing-library/user-event";

function renderWith(ui: React.ReactElement) {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("ThemeToggle", () => {
    it("renders toggle button", () => {
        render(<ThemeToggle />);
        expect(screen.getByRole("button", { name: /switch to/i })).toBeInTheDocument();
    });

    it("toggles to light mode", async () => {
        const user = userEvent.setup();
        render(<ThemeToggle />);
        await user.click(screen.getByRole("button", { name: /switch to light mode/i }));
        expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    });
});

describe("Sidebar", () => {
    it("renders navigation items", () => {
        renderWith(<Sidebar />);
        expect(screen.getByText("Log Stream")).toBeInTheDocument();
        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        expect(screen.getByText("Alerts")).toBeInTheDocument();
        expect(screen.getByText("Instances")).toBeInTheDocument();
        expect(screen.getByText("Settings")).toBeInTheDocument();
    });

    it("shows connection status", () => {
        renderWith(<Sidebar />);
        expect(screen.getByText("3 instances connected")).toBeInTheDocument();
    });
});

describe("LogStreamPage", () => {
    it("renders log entries", () => {
        renderWith(<LogStreamPage />);
        expect(screen.getByText(/Task decomposition complete/)).toBeInTheDocument();
    });

    it("renders search input", () => {
        renderWith(<LogStreamPage />);
        expect(screen.getByPlaceholderText(/Search logs/i)).toBeInTheDocument();
    });

    it("renders level filter buttons", () => {
        renderWith(<LogStreamPage />);
        expect(screen.getByText("ALL")).toBeInTheDocument();
        expect(screen.getAllByText("ERROR").length).toBeGreaterThan(0);
        expect(screen.getAllByText("WARN").length).toBeGreaterThan(0);
    });

    it("shows entry count", () => {
        renderWith(<LogStreamPage />);
        expect(screen.getByText("15 entries")).toBeInTheDocument();
    });
});

describe("DashboardPage", () => {
    it("renders stat cards", () => {
        renderWith(<DashboardPage />);
        expect(screen.getByText("Total Logs Today")).toBeInTheDocument();
        expect(screen.getByText("42,891")).toBeInTheDocument();
        expect(screen.getByText("Error Rate")).toBeInTheDocument();
    });

    it("renders volume chart", () => {
        renderWith(<DashboardPage />);
        expect(screen.getByText("Log Volume (24h)")).toBeInTheDocument();
    });

    it("renders recent errors", () => {
        renderWith(<DashboardPage />);
        expect(screen.getByText("Recent Errors")).toBeInTheDocument();
    });
});

describe("AlertsPage", () => {
    it("renders alert rules", () => {
        renderWith(<AlertsPage />);
        expect(screen.getByText("High Error Rate")).toBeInTheDocument();
        expect(screen.getByText("Instance Down")).toBeInTheDocument();
    });
});

describe("InstancesPage", () => {
    it("renders all 3 instances", () => {
        renderWith(<InstancesPage />);
        expect(screen.getByText("prod-1")).toBeInTheDocument();
        expect(screen.getByText("prod-2")).toBeInTheDocument();
        expect(screen.getByText("prod-3")).toBeInTheDocument();
    });
});

describe("SettingsPage", () => {
    it("renders settings sections", () => {
        renderWith(<SettingsPage />);
        expect(screen.getByText("Log Retention")).toBeInTheDocument();
        expect(screen.getByText("Time Zone")).toBeInTheDocument();
        expect(screen.getByText("Danger Zone")).toBeInTheDocument();
    });
});
