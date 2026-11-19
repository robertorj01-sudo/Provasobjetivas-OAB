import React from 'react';

/**
 * Formats relative timestamps in Brazilian Portuguese.
 */
export function formatRelativeDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return 'agora';
  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'agora mesmo';
  if (diffMins < 60) return `há ${diffMins} min`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `há ${diffHours}h`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'ontem';
  if (diffDays < 7) return `há ${diffDays} dias`;
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

/**
 * Renders inline rich formatting supporting **bold** and highlighted legal citations
 * (e.g., Art. 17, Lei nº 8.906/94, Súmula 588, CF/88).
 */
export function renderFormattedLegalText(text: string): React.ReactNode {
  const paragraphs = text.split('\n');

  const renderInlineTokens = (line: string, keyPrefix: string): React.ReactNode[] => {
    // Split by **bold** tokens first
    const boldParts = line.split(/(\*\*[^*]+\*\*)/g);
    const nodes: React.ReactNode[] = [];

    boldParts.forEach((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
        nodes.push(
          <strong key={`${keyPrefix}-b-${idx}`} className="font-bold text-slate-900">
            {highlightCitations(part.slice(2, -2), `${keyPrefix}-b-${idx}`)}
          </strong>
        );
      } else if (part) {
        nodes.push(
          <React.Fragment key={`${keyPrefix}-t-${idx}`}>
            {highlightCitations(part, `${keyPrefix}-t-${idx}`)}
          </React.Fragment>
        );
      }
    });

    return nodes;
  };

  return (
    <div className="space-y-2">
      {paragraphs.map((paragraph, pIdx) => {
        const trimmed = paragraph.trim();
        if (!trimmed) return <div key={`sp-${pIdx}`} className="h-1" />;

        if (trimmed.startsWith('> ')) {
          return (
            <blockquote
              key={`q-${pIdx}`}
              className="px-3.5 py-2 rounded-lg bg-amber-50/70 border border-amber-200/80 text-slate-800 italic text-[0.94em]"
            >
              {renderInlineTokens(trimmed.slice(2), `q-${pIdx}`)}
            </blockquote>
          );
        }

        return (
          <p key={`p-${pIdx}`} className="leading-relaxed">
            {renderInlineTokens(paragraph, `p-${pIdx}`)}
          </p>
        );
      })}
    </div>
  );
}

const CITATION_REGEX =
  /(\b(?:Arts?\.?\s*\d+[º°]?(?:,\s*(?:caput|parágrafo único|§§?\s*\d+[º°]?|[IVXLCDM]+|alínea\s*['"a-z]+))*|Leis?\s*(?:Complementar\s*)?(?:n[º°]?\s*)?[\d.]+\/\d{2,4}|Súmula(?:\s+Vinculante)?\s*(?:n[º°]?\s*)?\d+(?:\s+do\s+(?:STF|STJ|TST))?|EAOAB|CPC|CPP|CLT|CDC|CTN|CRFB\/88|CF\/88|CED(?:\/OAB)?)\b)/gi;

function highlightCitations(segment: string, keyPrefix: string): React.ReactNode[] {
  const parts = segment.split(CITATION_REGEX);
  return parts.map((chunk, i) => {
    if (!chunk) return null;
    // Check if it matched our citation regex
    if (i % 2 === 1) {
      return (
        <span
          key={`${keyPrefix}-cit-${i}`}
          className="font-semibold text-amber-900 bg-amber-100/70 px-1 py-0.2 rounded font-mono text-[0.92em]"
        >
          {chunk}
        </span>
      );
    }
    return <React.Fragment key={`${keyPrefix}-plain-${i}`}>{chunk}</React.Fragment>;
  });
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return 'JT';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}
