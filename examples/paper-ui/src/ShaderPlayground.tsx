import { MaterialEffect, MATERIAL_KINDS, MATERIAL_PRESETS, PaperButton, type MaterialKind, type MaterialTuning } from '@in-c0/paper-ui';
import { useEffect, useState } from 'react';
import './shader-lab.css';

type Control = { key: keyof MaterialTuning; label: string; min: number; max: number; step: number };

const controls: Record<MaterialKind, Control[]> = {
  'grain-sphere': [
    { key: 'speed', label: 'Motion', min: 0, max: 2, step: 0.01 },
    { key: 'intensity', label: 'Distortion', min: 0, max: 1, step: 0.01 },
    { key: 'noise', label: 'Grain', min: 0, max: 1, step: 0.01 },
    { key: 'scale', label: 'Scale', min: 0.2, max: 3, step: 0.01 },
  ],
  'grain-blob': [
    { key: 'speed', label: 'Motion', min: 0, max: 2, step: 0.01 },
    { key: 'intensity', label: 'Distortion', min: 0, max: 1, step: 0.01 },
    { key: 'noise', label: 'Grain', min: 0, max: 1, step: 0.01 },
    { key: 'scale', label: 'Scale', min: 0.2, max: 3, step: 0.01 },
  ],
  'grain-wave': [
    { key: 'speed', label: 'Motion', min: 0, max: 2, step: 0.01 },
    { key: 'intensity', label: 'Distortion', min: 0, max: 1, step: 0.01 },
    { key: 'noise', label: 'Grain', min: 0, max: 1, step: 0.01 },
    { key: 'scale', label: 'Scale', min: 0.2, max: 3, step: 0.01 },
  ],
  dithering: [
    { key: 'speed', label: 'Motion', min: 0, max: 2, step: 0.01 },
    { key: 'size', label: 'Pixel size', min: 1, max: 12, step: 0.25 },
    { key: 'scale', label: 'Scale', min: 0.2, max: 3, step: 0.01 },
  ],
  halftone: [
    { key: 'size', label: 'Dot size', min: 0, max: 1, step: 0.01 },
    { key: 'contrast', label: 'Contrast', min: 0, max: 1, step: 0.01 },
    { key: 'scale', label: 'Scale', min: 0.2, max: 3, step: 0.01 },
  ],
};

function isMaterialKind(value: string | null): value is MaterialKind {
  return MATERIAL_KINDS.some((item) => item === value);
}

function readUrl() {
  if (typeof window === 'undefined') return { kind: 'grain-sphere' as MaterialKind, tuning: {} as MaterialTuning };
  const params = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  const requested = params.get('effect');
  const kind = isMaterialKind(requested) ? requested : 'grain-sphere';
  const tuning: MaterialTuning = {};
  for (const control of controls[kind]) {
    const raw = params.get(control.key);
    if (raw === null) continue;
    const value = Number(raw);
    if (Number.isFinite(value)) {
      const bounded = Math.min(control.max, Math.max(control.min, value));
      tuning[control.key] = bounded;
    }
  }
  return { kind, tuning };
}

function baseValue(kind: MaterialKind, key: keyof MaterialTuning): number {
  const preset = MATERIAL_PRESETS[kind] as unknown as Record<string, unknown>;
  const value = preset[key];
  return typeof value === 'number' ? value : 0;
}

function formatValue(value: number) {
  return String(Math.round(value * 100) / 100);
}

function snippet(kind: MaterialKind, tuning: MaterialTuning, paused: boolean): string {
  const attrs = [
    `kind="${kind}"`,
    ...controls[kind]
      .filter(({ key }) => tuning[key] !== undefined && tuning[key] !== baseValue(kind, key))
      .map(({ key }) => `${key}: ${formatValue(tuning[key] as number)}`),
  ];
  const settings = attrs.slice(1);
  const tuningProp = settings.length ? ` tuning={{ ${settings.join(', ')} }}` : '';
  const imageProp = kind === 'halftone' ? ' image="/halftone-study.svg"' : '';
  const pausedProp = paused ? ' paused' : '';
  return `import { MaterialEffect } from '@in-c0/paper-ui';\n\n<MaterialEffect kind="${kind}"${tuningProp}${imageProp}${pausedProp} />`;
}

export function ShaderPlayground() {
  const [initial] = useState(readUrl);
  const [kind, setKind] = useState<MaterialKind>(initial.kind);
  const [tuning, setTuning] = useState<MaterialTuning>(initial.tuning);
  const [paused, setPaused] = useState(false);
  const [previewText, setPreviewText] = useState('a quiet moment');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('effect', kind);
    for (const control of controls[kind]) {
      const value = tuning[control.key];
      if (value !== undefined) params.set(control.key, formatValue(value));
    }
    window.history.replaceState(null, '', `#${params.toString()}`);
  }, [kind, tuning]);

  async function copy(text: string, message: string) {
    try {
      await navigator.clipboard.writeText(text);
      setStatus(message);
    } catch {
      setStatus('Clipboard unavailable. Select and copy the settings manually.');
    }
  }

  function reset() {
    setTuning({});
    setPaused(false);
    setStatus('Original preset restored.');
  }

  const current = MATERIAL_PRESETS[kind];

  return (
    <section className="shader-playground" aria-labelledby="shader-playground-title">
      <div className="section-heading">
        <h2 id="shader-playground-title">Material studies</h2>
        <span>5 LIVE SHADERS</span>
      </div>
      <p className="lab-intro">Paper, light and print, carefully separated. Choose a study and adjust it yourself.</p>
      <div className="lab-shell">
        <div className="lab-main">
          <div className="lab-presets" role="group" aria-label="Select material">
            {MATERIAL_KINDS.map((item) => (
              <button
                type="button"
                key={item}
                className={`lab-preset ${kind === item ? 'lab-preset--selected' : ''}`}
                aria-pressed={kind === item}
                onClick={() => { setKind(item); setTuning({}); setStatus(''); }}
              >
                {MATERIAL_PRESETS[item].label}
              </button>
            ))}
          </div>
          <div className="lab-stage">
            <MaterialEffect kind={kind} tuning={tuning} paused={paused} image="/halftone-study.svg" className="lab-effect">
              {kind !== 'halftone' && (
                <div className="lab-overlay">
                  <span className="lab-overlay-kicker">whispers. / material study</span>
                  <span className="lab-overlay-title">{previewText || ' '}</span>
                  <span className="lab-overlay-footer">a little, over time.</span>
                </div>
              )}
            </MaterialEffect>
          </div>
          <div className="lab-stage-foot">
            <div>
              <strong>{current.label}</strong>
              <p>{current.description}</p>
            </div>
            <small>{kind === 'halftone' ? 'STILL / IMAGE FILTER' : paused ? 'PAUSED' : 'LIVE / GPU'}</small>
          </div>
        </div>
        <aside className="lab-controls" aria-label="Material parameters">
          <div className="lab-control-header">
            <span>Adjust</span>
            <PaperButton variant="quiet" onClick={reset}>Reset</PaperButton>
          </div>
          {controls[kind].map((control) => {
            const value = tuning[control.key] ?? baseValue(kind, control.key);
            return (
              <div className="lab-control" key={control.key}>
                <label htmlFor={`mat-${control.key}`}>
                  <span>{control.label}</span>
                  <output htmlFor={`mat-${control.key}`}>{formatValue(value)}</output>
                </label>
                <input
                  id={`mat-${control.key}`}
                  type="range"
                  min={control.min}
                  max={control.max}
                  step={control.step}
                  value={value}
                  onChange={(e) => setTuning((old) => ({ ...old, [control.key]: Number(e.target.value) }))}
                />
              </div>
            );
          })}
          {kind !== 'halftone' && (
            <div className="lab-control">
              <label htmlFor="lab-preview-text">Sample text</label>
              <input
                id="lab-preview-text"
                type="text"
                maxLength={50}
                value={previewText}
                onChange={(event) => setPreviewText(event.target.value)}
              />
            </div>
          )}
          {kind !== 'halftone' && (
            <PaperButton variant="outline" onClick={() => setPaused((old) => !old)}>
              {paused ? 'Resume motion' : 'Pause motion'}
            </PaperButton>
          )}
          <div className="lab-actions">
            <PaperButton variant="ink" onClick={() => copy(snippet(kind, tuning, paused), 'React example copied.')}>Copy React code</PaperButton>
            <PaperButton variant="outline" onClick={() => copy(window.location.href, 'Preset link copied.')}>Copy link</PaperButton>
          </div>
          <p className="lab-feedback" role="status">{status}</p>
          <p className="lab-footnote">Each preset retains the original Paper Shaders colours and default parameters. Sliders only override the values shown here.</p>
        </aside>
      </div>
    </section>
  );
}
