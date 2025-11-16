import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { theme as antdTheme } from "antd";
import "./HorizontalTools.less";
const tools = [
    { id: "text-input", title: "Text Input", subtitle: "Type your content", icon: (_jsx("svg", { viewBox: "0 0 24 24", width: "36", height: "36", children: _jsx("path", { d: "M5 4h14v2H5zM5 8h10v2H5zM5 12h10v2H5zM5 16h6v2H5z", fill: "currentColor" }, void 0) }, void 0)) },
    { id: "audio-recording", title: "Audio Recording", subtitle: "Record your voice", icon: (_jsx("svg", { viewBox: "0 0 24 24", width: "36", height: "36", children: _jsx("path", { d: "M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3zM19 11v1a7 7 0 0 1-14 0v-1", fill: "currentColor" }, void 0) }, void 0)) },
    { id: "video-content", title: "Video Content", subtitle: "Record or upload video", icon: (_jsx("svg", { viewBox: "0 0 24 24", width: "36", height: "36", children: _jsx("path", { d: "M23 7l-7 5v-3L23 7zM1 6h14v12H1z", fill: "currentColor" }, void 0) }, void 0)) },
    { id: "photo-capture", title: "Photo Capture", subtitle: "Take or upload photos", icon: (_jsx("svg", { viewBox: "0 0 24 24", width: "36", height: "36", children: _jsx("path", { d: "M4 7h3l2-3h6l2 3h3v11H4zM12 9a4 4 0 1 0 0 8 4 4 0 0 0 0-8z", fill: "currentColor" }, void 0) }, void 0)) },
    { id: "document-upload", title: "Document Upload", subtitle: "Upload files (PDF, DOCX, etc.)", icon: (_jsx("svg", { viewBox: "0 0 24 24", width: "36", height: "36", children: _jsx("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6", fill: "currentColor" }, void 0) }, void 0)) },
];
const HorizontalTools = () => {
    const { token } = antdTheme.useToken();
    const containerRef = useRef(null);
    const rafRef = useRef(null);
    const lastRef = useRef(null);
    const hoveredRef = useRef(false);
    const [hovered, setHovered] = useState(false);
    // px per second
    const SPEED = 60;
    // triple duplication to guarantee scrollable width
    const duplicated = [...tools, ...tools, ...tools];
    useEffect(() => {
        const el = containerRef.current;
        if (!el)
            return;
        // stable start
        el.scrollLeft = 0;
        function step(now) {
            if (lastRef.current == null)
                lastRef.current = now;
            const dt = now - (lastRef.current ?? now);
            lastRef.current = now;
            if (!hoveredRef.current) {
                const delta = (SPEED * dt) / 1000;
                // use non-null assertion because el is ensured above
                el.scrollLeft += delta;
                const half = el.scrollWidth / 2;
                if (half && el.scrollLeft >= half) {
                    el.scrollLeft -= half;
                }
            }
            rafRef.current = requestAnimationFrame(step);
        }
        rafRef.current = requestAnimationFrame(step);
        return () => {
            if (rafRef.current)
                cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
            lastRef.current = null;
        };
        // run once on mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        hoveredRef.current = hovered;
    }, [hovered]);
    const onCardClick = (id) => {
        console.log("Tool clicked:", id);
    };
    const cssVars = {
        // @ts-ignore
        "--ht-bg": token.colorBgContainer,
        // @ts-ignore
        "--ht-primary": token.colorPrimary,
        // @ts-ignore
        "--ht-text": token.colorText,
        // @ts-ignore
        "--ht-muted": token.colorTextTertiary || "#6b7280",
        // @ts-ignore
        "--ht-radius": token.borderRadiusLG || "12px",
    };
    return (_jsx("section", { className: "horizontal-tools-section", style: cssVars, children: _jsxs("div", { className: "horizontal-tools-inner container", children: [_jsxs("div", { className: "tools-header", children: [_jsx("h3", { className: "tools-title", children: "Create new" }, void 0), _jsx("p", { className: "tools-sub", children: "Choose a content type to get started" }, void 0)] }, void 0), _jsx("div", { className: "tools-track", ref: containerRef, role: "list", "aria-label": "Available content types", onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false), onFocus: () => setHovered(true), onBlur: () => setHovered(false), children: duplicated.map((t, idx) => (_jsxs("button", { className: "tool-card", onClick: () => onCardClick(t.id), role: "listitem", type: "button", children: [_jsx("div", { className: "tool-icon", "aria-hidden": true, children: t.icon }, void 0), _jsxs("div", { className: "tool-body", children: [_jsx("h4", { className: "tool-title", children: t.title }, void 0), _jsx("p", { className: "tool-sub", children: t.subtitle }, void 0)] }, void 0)] }, `${t.id}-${idx}`))) }, void 0)] }, void 0) }, void 0));
};
export default HorizontalTools;
