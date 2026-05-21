# Media governance

Radar WebmasterID's visual layer is **source-bound** and
**editorially reviewed**. This document explains the rules that
govern which visuals reach a public page, where candidates come
from, and how attribution is enforced.

## Editorial posture

Three properties define the layer:

1. **No unverified imagery on public pages.** Every visual that
   appears anywhere on an entity, guide, or research page traces
   back to a registered `MediaAsset` with `status === "verified"`.
   Candidate and unverified records do not render in the body of
   any page; they appear only on `/visuals` so the backlog is
   visible.
2. **No invented attribution.** Verified records require an
   explicit attribution string captured from the source page —
   never a generic "Photographer Name" or "Anonymous". A
   candidate becomes verified only when an editor has read the
   source page and recorded the author name verbatim.
3. **No fake infrastructure photography.** AI-generated
   datacenter imagery, stylised stock, and decorative skylines
   without source provenance are out of scope. The visual layer
   exists to support infrastructure claims, not to decorate.

## Approved sources

| Source                            | Tier   | Notes                                                  |
| --------------------------------- | ------ | ------------------------------------------------------ |
| Self-authored SVG diagrams        | tier-1 | CC BY 4.0 (Radar WebmasterID). No external dependency. |
| Wikimedia Commons                 | tier-2 | Per-image license; attribution captured from File page.|
| Operator primary media (DE-CIX, AMS-IX, LINX, Equinix) | tier-3 | Use only when the operator explicitly licenses the media for third-party reuse. |
| Public-domain archives (Library of Congress, Internet Archive PD collection) | tier-2 | Verify PD status per item. |
| Public-domain maps (Natural Earth, IPUMS NHGIS PD) | tier-2 | Apply the same per-item licensing check. |

## Prohibited sources

- Pinterest, blog posts, social-media reshares
- Generic stock-image platforms (without an explicit, per-image,
  attribution-safe license documented at use time)
- AI-generated "infrastructure" or "datacenter" imagery
- Operator marketing material whose reuse terms are unclear
- Any image whose source page is unreachable or undocumented

## Lifecycle

```
01 Candidate identified        Editor finds an image on an approved source
       │
       ▼
02 Wikimedia/candidate         Registered in src/content/wikimedia-candidates/
       │                       or in MEDIA_ASSETS as status="candidate"
       ▼
03 Editorial review            Source page re-read, license re-verified,
       │                       author name captured, risk notes captured
       ▼
04 Promotion                   MediaAsset added with status="verified",
       │                       attribution string captured verbatim,
       │                       local optimised copy stored under public/media/
       ▼
05 Public render               VisualContentBlock resolves the asset
```

Stages 01–03 never render on public pages. Stage 04 is the
single moment a visual becomes renderable.

## Attribution rules

Verified assets where `license.attributionRequired === true` must
carry an `attribution` string. The string is rendered next to the
asset by `VisualAttribution` (inline) or `ImageCredit` (block).
It must follow the format the underlying license requires —
typically:

```
{Author name}, {License name}, via {Source}.
```

For Wikimedia Commons CC BY-SA images, this is usually:

```
{User contribution name}, CC BY-SA 4.0, via Wikimedia Commons.
```

The attribution string is read off the source File page; the
editor is responsible for capturing it verbatim.

## License handling

| License                       | Verified | Attribution required | Notes                          |
| ----------------------------- | -------- | -------------------- | ------------------------------ |
| CC BY 4.0 (Radar self-author) | yes      | yes (Radar credit)   | All self-authored diagrams.    |
| CC BY 4.0                     | yes      | yes                  | Author credit verbatim.        |
| CC BY-SA 4.0                  | yes      | yes                  | Author credit + SA notice.     |
| CC0 / Public Domain           | yes      | no                   | Still capture original source. |
| Operator-licensed (with permission) | yes | yes                | Editorial sign-off required.   |
| Unknown / unclear             | no       | n/a                  | Cannot be promoted.            |

## Risk review

Risk notes are mandatory for verified photo / infrastructure-photo
assets that depict third-party property, recognisable buildings,
or identifiable people. The validator surfaces verified assets
with non-empty risk notes so the editor can re-confirm them
before they propagate. Specifically:

- **Visible brand marks**: third-party logos on building exteriors
  must be flagged. Use `visibleBrandRisk: true` and document the
  brand in `riskNotes`.
- **Recognisable people**: photos including identifiable
  individuals require additional editorial sign-off.
- **Private property**: residential or non-commercial facilities
  visible in the asset require additional review.

## Wikimedia workflow

Candidates from Wikimedia Commons live in
`src/content/wikimedia-candidates/`. Each entry is a typed
`WikimediaCandidate` record carrying:

- `commonsPageUrl` — the Commons File or Category page.
- `recordedLicense` — what the editor read on the page.
- `attributionRequired` — whether the license requires
  attribution at use.
- `reviewStatus` — `discovered`, `license-confirmed`,
  `attribution-pending`, or `rejected`.
- `riskNotes` — captured at discovery, refined at review.

Promotion to verified is the manual step of:

1. Re-reading the Commons File page (NOT the category page).
2. Capturing the author name and license text verbatim.
3. Downloading an optimised local copy.
4. Adding a `MediaAsset` to `MEDIA_ASSETS` with status `verified`,
   `source.pageUrl` pointing at the Commons File page,
   `license.name` matching the page exactly, and `attribution`
   set to the rendered credit line.
5. Setting the candidate's `reviewStatus` to `rejected` or
   removing the candidate (since promotion is one-way).

## Visual SEO standards

- **Filenames**: kebab-case, descriptive, infrastructure-relevant.
  `de-cix-frankfurt-fabric-overview.jpg`, not `IMG_001.jpg`.
- **Alt text**: required on every verified asset. Describes what
  the visual depicts in 1–2 sentences. Mentions the operator /
  metro / category when applicable.
- **Captions**: optional but encouraged; surface the editorial
  point of the visual, not its description.
- **Responsive sizing**: every raster asset must declare
  `dimensions` so Next/Image can prevent CLS. Diagrams ship as
  inline SVG and inherit their container.
- **Lazy loading**: the default for Next/Image. Above-the-fold
  hero visuals can override.
- **No autoplay video.** No carousels. No client-heavy galleries.

## Alt-text rules

- **Decorative**: pass an empty string. The asset is rendered with
  `aria-hidden="true"` by `VisualContentBlock`.
- **Substantive**: 1–2 sentences describing the visual. Lead with
  what it depicts; close with why it's editorially relevant.
- **Diagrams**: describe the structure of the diagram (number of
  stages, layout direction) so an AI agent can extract the
  meaning without rendering the SVG.

## What this is not

- **Not a content management system.** There is no UI for
  uploading or editing media.
- **Not an auto-ingest pipeline.** No CI job pulls images.
- **Not a stock-image platform.** Visuals are editorial evidence,
  not decoration.
