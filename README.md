## er-wiki

An attempt of a wiki for Elden Ring and its DLC. Wanted to have some fun with extracting data and parsing files.

<p align="center">
    <img src="./static/er.gif" height="128" width="128" alt="very important">
</p>

### About

A live version can be found [here](https://er-wiki.pages.dev/) and uses Cloudflare Pages, not updated frequently.

This is by no means a replacement of anything currently, only supporting very basic things and few categories (weapons, armors, ashes of war).

The site is prerendered with sveltekit.

Extraction of the data is **not automated** and was done using [Smithbox](https://github.com/vawser/Smithbox), only params, text and texture data are used. The data should be organized as such:

```
// Main data folder in the root
./data/
// Text files
./data/msg/engus/item
// Params
./data/params
// Icons (all were converted to .webp)
./static/icons
```

After organizing, run `npm run parse` to generate json files at `./data` and then `npm run build`.

### Problems/TODO

- Improve visual of stats section.
- Missing values for parameters like `Causes blood loss buildup (<?bleedATKpwr?>)`.\*
- Missing a lot of item locations (map location and enemy drop).\*
- Missing weapons scaling and upgrade information.\*
- Add more stats to ashes and armors.
- Script/s and tool/s to extract data to avoid manually doing it.

> \*not sure how to retrieve this information.
