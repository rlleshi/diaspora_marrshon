# Site Favicon Design

## Goal

Use the revitalized Albanian flag artwork as the site's browser-tab and mobile bookmark icon.

## Design

- Crop the source image to a centered square so the eagle remains prominent at small sizes.
- Preserve the original artwork and red-black diagonal without regeneration.
- Export a multi-size browser favicon, a 512 px Next.js icon, and a 180 px Apple touch icon.
- Keep `docs/revitalized_flag.jpeg` unchanged as the source asset.

## Verification

- Confirm the generated files are square and use the expected dimensions.
- Run the production build and verify Next.js emits the icon metadata.
