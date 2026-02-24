import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    logs: defineTable({
        instanceId: v.string(),
        level: v.union(
            v.literal("info"),
            v.literal("warn"),
            v.literal("error"),
            v.literal("debug")
        ),
        message: v.string(),
        source: v.string(),
        metadata: v.optional(v.string()),
        timestamp: v.string(),
    })
        .index("by_instance", ["instanceId"])
        .index("by_level", ["level"])
        .index("by_timestamp", ["timestamp"]),

    instances: defineTable({
        name: v.string(),
        url: v.string(),
        status: v.union(v.literal("online"), v.literal("offline"), v.literal("error")),
        lastSeen: v.string(),
        logCount: v.number(),
        errorRate: v.number(),
    }).index("by_status", ["status"]),

    alerts: defineTable({
        name: v.string(),
        condition: v.string(),
        channel: v.union(v.literal("email"), v.literal("slack"), v.literal("webhook")),
        target: v.string(),
        enabled: v.boolean(),
        lastTriggered: v.optional(v.string()),
        createdAt: v.string(),
    }),

    metrics: defineTable({
        instanceId: v.string(),
        type: v.union(
            v.literal("log_volume"),
            v.literal("error_rate"),
            v.literal("latency"),
            v.literal("token_usage")
        ),
        value: v.number(),
        timestamp: v.string(),
    })
        .index("by_instance_type", ["instanceId", "type"])
        .index("by_timestamp", ["timestamp"]),
});
