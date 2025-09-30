## er-wiki

An attempt of a wiki for Elden Ring and its DLC. Wanted to have some fun with extracting data and parsing files.

<p align="center">
    <img src="./static/er.gif" height="128" width="128" alt="very important">
</p>

### About

A live version can be found [here](https://er-wiki.pages.dev/), not updated frequently.

This is by no means a replacement of anything currently, only supporting very basic things and few categories (weapons, armors, ashes of war).

The site is prerendered with sveltekit.

Extraction of the data is **not automated** and was done using [Smithbox](https://github.com/vawser/Smithbox), only params, text and texture data are used. The data should be organized as such:

```
// Main data folder in the root
./data/
// Item icons folder with the icons already exported to some image format
./data/icons
// Text files
./data/msg/engus/item
// Params
./data/params
// Icons, will be generated later
./static/icons
```

Do `npm i` and after making sure you have the required data as above, run `npm run convert:icons`, this will run a python3 script to convert everything to webp and save it to the `./static/icons` folder.

Run `npm run parse` to generate json files at `./data` and then `npm run dev`.

### Problems/TODO

- Separate some weapon types (shields, arrows, etc) and some consumables (pots, grease, etc) into separate pages.
- Maybe switch to a simple svelte:head component instead of using svelte-seo.
- Add crafting material page.
- Improve and add more stats.
- Improve visual of stats section.
- Script/s and tool/s to extract data to avoid manually doing it.
- Missing values for parameters like `Causes blood loss buildup (<?bleedATKpwr?>)`.\*
- Missing a lot of item locations (map location and enemy drop).\*
- Missing weapons scaling and upgrade information.\*

> \*not sure how to retrieve this information.
