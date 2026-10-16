# Lars Tornøe – design portfolio (recreation study)

A recreation of the layout of https://www.larstornoe.com, built from a screenshot of the reference.
Plain HTML, CSS and JavaScript. No build step, no dependencies, no internet needed.

## Run it

1. Extract the ZIP.
2. Open the `portfolio` folder and double-click `index.html`.

Optional local server:

    cd portfolio
    python3 -m http.server 8000      # then open http://localhost:8000

## Files

    index.html          Header with the wordmark (inline SVG), work grid, About, project viewer
    style.css           All styles; the measurements from the reference are in the comment at the top
    script.js           Project list, grid, project viewer (click an image; arrow keys, Esc)
    assets/favicon.svg
    assets/images/      Eight images, 2:1 ratio (865 x 435): candle-holders, sofa, bowl, rug-sneakers,
                        pendant-lamp, oak-stool, ceramic-vases, wall-shelf

## Replace the images with real photography

The images in the ZIP are illustrations, because photographs could not be created or downloaded in the
environment that built this project. See `assets/images/PHOTOS.md` for the exact list, size and subject of each photo.

For each photo:

1. Crop it to 2:1 and export at about 1730 x 870 px (JPG or WebP, under 400 KB).
2. Save it in `assets/images/`, e.g. `sofa.jpg`.
3. In `script.js`, change that project's `file` value, e.g. `file: 'sofa.jpg'`.

Alternatively, use an online photo: add `url: 'https://...'` to a project in `script.js`. If the link ever fails,
the page falls back to the local image automatically. Check that each link opens in your browser first.

You can replace some images and keep others. Use only photos you own or have a licence for.

## What matches the reference (measured at 1902 px wide)

- Side margins 58 px, two columns, 56 px gap, tiles 865 x 435 px, row gap 57 px
- Wordmark 58 px from the left and 51 px from the top, about 25 px tall
- Nav ("Work", "About") in a plain sans-serif at about 19 px, colour #333, right-aligned
- Responsive: the same layout scales with the window; one column below 560 px

## Not verified / assumptions

- Hover behaviour and the project pages of the original were not visible in the screenshot. Here, hovering fades the image slightly and clicking opens a simple full-screen viewer.
- The wordmark is redrawn as an SVG and is not the original logotype.
- The About text and the four projects after the first four are sample content.
- This is a study of someone else's design. Do not publish it as the real site.

## Deploy with GitHub Pages

1. Create a repository and upload the contents of the `portfolio` folder (so `index.html` is at the root).
2. Settings > Pages > "Deploy from a branch" > `main` and `/ (root)` > Save.
3. The site appears at `https://<username>.github.io/<repository>/`.
