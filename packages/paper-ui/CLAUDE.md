# Paper UI: design and engineering contract

Use the actual supplied Whispers renders for visual judgment, not generic shadcn aesthetics.

- Treat the Paper Shaders preset in src/tokens.ts as read-only source data.
- Keep semantic React DOM above texture canvases.
- Do not add physics, fold meshes, parallax, ambient audio, or other effects just because they are visually tempting.
- No per-thumbnail WebGL instances. Limit shaders to large contiguous surfaces.
- PaperTexture angle is an artistic direction setting, not a physically measured point light.
- Keep Tegaki font bundle imports explicit; use Nanum Pen Script for Korean.
- Reduced motion, keyboard focus, content legibility, and mobile responsiveness are release requirements.
- Avoid cosmetic controls that do nothing; all demo toggles must change actual component behaviour.
- Before calling this production-ready, run Bun workspace install, unit tests, typechecking, Vite build, and actual browser checks at desktop and mobile viewports.
- No public publishing, deploy, or upstream package rename without deliberate approval.
