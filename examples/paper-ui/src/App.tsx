import { PaperButton, PaperCard, PaperSurface, PencilText, WHISPERS_PAPER_PRESET } from '@in-c0/paper-ui';
import { useState } from 'react';

type StudyKind = 'branch' | 'window' | 'cup';

function Study({ kind }: { kind: StudyKind }) {
  if (kind === 'branch') {
    return (
      <svg className="study" viewBox="0 0 320 260" role="img" aria-label="Graphite study of small branches">
        <g fill="none" stroke="#5d5751" strokeWidth="1.55" strokeLinecap="round">
          <path d="M152 235 Q152 163 172 102 Q193 48 218 26" />
          <path d="M163 165 Q124 119 83 104 M172 119 Q204 100 248 109 M189 74 Q151 57 145 28" />
          <path d="M134 131 Q104 100 88 105 Q93 126 134 131 M149 113 Q135 78 115 74 Q116 101 149 113" />
          <path d="M180 105 Q191 70 223 67 Q218 97 180 105 M205 108 Q231 89 257 98 Q245 119 205 108" />
          <path d="M188 72 Q181 38 201 18 Q217 42 188 72 M166 142 Q190 130 213 145 Q197 163 166 142" />
        </g>
      </svg>
    );
  }
  if (kind === 'cup') {
    return (
      <svg className="study" viewBox="0 0 320 260" role="img" aria-label="Pencil study of a coffee cup">
        <g fill="none" stroke="#605a52" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="154" cy="77" rx="77" ry="21" />
          <path d="M77 76 L91 199 Q154 233 219 199 L231 76" />
          <path d="M230 97 Q276 86 273 128 Q269 163 224 155 M230 107 Q259 101 260 125 Q257 142 227 141" />
          <path d="M90 197 Q145 222 219 197 M65 224 Q155 236 246 223" opacity=".5" />
          <path d="M126 48 Q113 24 125 13 M158 48 Q144 25 162 8 M194 49 Q183 25 193 15" opacity=".55" />
        </g>
      </svg>
    );
  }
  return (
    <svg className="study" viewBox="0 0 320 260" role="img" aria-label="Window and curtain sketch">
      <g fill="none" stroke="#61594f" strokeWidth="1.55" strokeLinecap="round">
        <path d="M69 35 L259 35 L259 222 L69 222 Z M81 47 L246 47 L246 211 L81 211 Z" />
        <path d="M164 47 L164 211 M81 133 L246 133" />
        <path d="M68 38 Q48 86 67 125 Q47 176 68 222 M259 38 Q283 95 259 129 Q279 174 259 222" opacity=".72" />
        <path d="M90 119 Q115 103 132 117 M177 112 Q205 91 237 113 M97 197 Q122 173 155 193" opacity=".5" />
      </g>
    </svg>
  );
}

export function App() {
  const [texture, setTexture] = useState(true);
  const [light, setLight] = useState<'desk' | 'diffuse' | 'none'>('desk');
  const [angle, setAngle] = useState(WHISPERS_PAPER_PRESET.angle);
  const [writing, setWriting] = useState(true);
  const [writingRun, setWritingRun] = useState(0);
  const [tone, setTone] = useState<'paper' | 'charcoal'>('paper');

  return (
    <PaperSurface className="demo-shell" texture={texture} material={{ angle }} light={light} tone={tone}>
      <main className="demo-inner">
        <header className="site-header">
          <div>
            <p className="overline">MATERIAL / INTERACTION / TYPE</p>
            <div className="wordmark">
              paper ui<span>.</span>
            </div>
          </div>
          <span className="edition">experimental no. 01</span>
        </header>

        <section className="intro" aria-labelledby="intro-title">
          <p className="overline">THE SMALL THINGS</p>
          <h1 id="intro-title">
            A little, <em>over time.</em>
          </h1>
          <p className="intro-description">
            A quiet design system for things made by hand. Light on paper, graphite on a page, and interactions that know when to be still.
          </p>
        </section>

        <div className="columns">
          <section className="collection" aria-labelledby="collection-title">
            <div className="section-heading">
              <h2 id="collection-title">From the sketchbook</h2>
              <span>03 studies</span>
            </div>
            <div className="gallery">
              {(
                [
                  { kind: 'branch', title: 'A branch in morning light', date: 'DAY 009' },
                  { kind: 'cup', title: 'The first cup', date: 'DAY 010' },
                  { kind: 'window', title: 'By the window', date: 'DAY 011' },
                ] as const
              ).map((item) => (
                <PaperCard key={item.kind} interactive className="artwork">
                  <div className="artwork-image">
                    <Study kind={item.kind} />
                  </div>
                  <div className="artwork-caption">
                    <span>{item.title}</span>
                    <small>{item.date}</small>
                  </div>
                </PaperCard>
              ))}
            </div>
          </section>

          <aside className="controls" aria-labelledby="control-title">
            <div className="section-heading">
              <h2 id="control-title">Materials</h2>
              <span>LIVE CONTROLS</span>
            </div>
            <div className="settings">
              <div className="setting-row">
                <span>Paper texture</span>
                <PaperButton variant={texture ? 'ink' : 'outline'} aria-pressed={texture} onClick={() => setTexture((v) => !v)}>
                  {texture ? 'On' : 'Off'}
                </PaperButton>
              </div>
              <label className="angle-control" htmlFor="light-angle">
                <span>Light direction</span>
                <output htmlFor="light-angle">{angle}°</output>
              </label>
              <input
                id="light-angle"
                type="range"
                min={0}
                max={360}
                step={5}
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
              />
              <fieldset className="choices">
                <legend>Atmosphere</legend>
                {(['desk', 'diffuse', 'none'] as const).map((v) => (
                  <PaperButton key={v} variant={light === v ? 'ink' : 'outline'} aria-pressed={light === v} onClick={() => setLight(v)}>
                    {v}
                  </PaperButton>
                ))}
              </fieldset>
              <fieldset className="choices">
                <legend>Surface</legend>
                {(['paper', 'charcoal'] as const).map((v) => (
                  <PaperButton key={v} variant={tone === v ? 'ink' : 'outline'} aria-pressed={tone === v} onClick={() => setTone(v)}>
                    {v}
                  </PaperButton>
                ))}
              </fieldset>
              <p className="setting-note">
                The original Paper Shaders preset remains unchanged. Only the selected light angle is varied here. Dark mode uses a CSS
                surface without a white shader.
              </p>
            </div>
          </aside>
        </div>

        <section className="handwriting" aria-labelledby="handwriting-title">
          <div className="section-heading">
            <h2 id="handwriting-title">Written softly</h2>
            <span>TEGAKI</span>
          </div>
          <PaperCard className="note">
            <div className="note-content">
              <span className="note-overline">A NOTE TO SELF</span>
              <div className="handwritten" aria-live="off">
                <PencilText key={writingRun} animate={writing}>
                  Things made along the way.
                </PencilText>
              </div>
              <p>Some days, making something small is enough.</p>
              <div className="button-row">
                <PaperButton
                  variant="ink"
                  onClick={() => {
                    setWriting(true);
                    setWritingRun((v) => v + 1);
                  }}
                >
                  Write again
                </PaperButton>
                <PaperButton
                  variant="outline"
                  onClick={() => {
                    setWriting(false);
                    setWritingRun((v) => v + 1);
                  }}
                >
                  Show instantly
                </PaperButton>
              </div>
            </div>
          </PaperCard>
        </section>

        <footer className="footer">
          <span>paper ui — an experiment in quieter interfaces</span>
          <span>Whispers / A little, over time.</span>
        </footer>
      </main>
    </PaperSurface>
  );
}
