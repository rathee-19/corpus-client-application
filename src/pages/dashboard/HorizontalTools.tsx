import React, { FC, useEffect, useRef, useState } from "react";
import { theme as antdTheme } from "antd";
import "./HorizontalTools.less";

type ToolItem = {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
};

const tools: ToolItem[] = [
  { id: "text-input", title: "Text Input", subtitle: "Type your content", icon: (<svg viewBox="0 0 24 24" width="36" height="36"><path d="M5 4h14v2H5zM5 8h10v2H5zM5 12h10v2H5zM5 16h6v2H5z" fill="currentColor"/></svg>) },
  { id: "audio-recording", title: "Audio Recording", subtitle: "Record your voice", icon: (<svg viewBox="0 0 24 24" width="36" height="36"><path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3zM19 11v1a7 7 0 0 1-14 0v-1" fill="currentColor"/></svg>) },
  { id: "video-content", title: "Video Content", subtitle: "Record or upload video", icon: (<svg viewBox="0 0 24 24" width="36" height="36"><path d="M23 7l-7 5v-3L23 7zM1 6h14v12H1z" fill="currentColor"/></svg>) },
  { id: "photo-capture", title: "Photo Capture", subtitle: "Take or upload photos", icon: (<svg viewBox="0 0 24 24" width="36" height="36"><path d="M4 7h3l2-3h6l2 3h3v11H4zM12 9a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" fill="currentColor"/></svg>) },
  { id: "document-upload", title: "Document Upload", subtitle: "Upload files (PDF, DOCX, etc.)", icon: (<svg viewBox="0 0 24 24" width="36" height="36"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6" fill="currentColor"/></svg>) },
];

const HorizontalTools: FC = () => {
  const { token } = antdTheme.useToken();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);
  const hoveredRef = useRef(false);
  const [hovered, setHovered] = useState(false);

  // px per second
  const SPEED = 60;

  // triple duplication to guarantee scrollable width
  const duplicated = [...tools, ...tools, ...tools];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // stable start
    el.scrollLeft = 0;

    function step(now: number) {
      if (lastRef.current == null) lastRef.current = now;
      const dt = now - (lastRef.current ?? now);
      lastRef.current = now;

      if (!hoveredRef.current) {
        const delta = (SPEED * dt) / 1000;
        // use non-null assertion because el is ensured above
        el!.scrollLeft += delta;

        const half = el!.scrollWidth / 2;
        if (half && el!.scrollLeft >= half) {
          el!.scrollLeft -= half;
        }
      }

      rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastRef.current = null;
    };
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    hoveredRef.current = hovered;
  }, [hovered]);

  const onCardClick = (id: string) => {
    console.log("Tool clicked:", id);
  };

  const cssVars: React.CSSProperties = {
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
  } as React.CSSProperties;

  return (
    <section className="horizontal-tools-section" style={cssVars}>
      <div className="horizontal-tools-inner container">
        <div className="tools-header">
          <h3 className="tools-title">Create new</h3>
          <p className="tools-sub">Choose a content type to get started</p>
        </div>

        <div
          className="tools-track"
          ref={containerRef}
          role="list"
          aria-label="Available content types"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
        >
          {duplicated.map((t, idx) => (
            <button
              key={`${t.id}-${idx}`}
              className="tool-card"
              onClick={() => onCardClick(t.id)}
              role="listitem"
              type="button"
            >
              <div className="tool-icon" aria-hidden>
                {t.icon}
              </div>
              <div className="tool-body">
                <h4 className="tool-title">{t.title}</h4>
                <p className="tool-sub">{t.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorizontalTools;
