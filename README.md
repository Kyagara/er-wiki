# er-wiki

<p align="center">
    <img src="./static/er.gif" height="256" width="256" alt="very important">
    <br/>
    <em>a er... wiki for elden wing</em>
</p>

### About

A prerendered wiki using SvelteKit for Elden Ring and its DLC.

Wanted to have some fun extracting data and parsing files. This is by no means a replacement of anything currently.

A live version can be found [here](https://er-wiki.pages.dev/), only updated after big changes.

### Setup

Extraction of the data is currently **not automated** and is done using [Smithbox](https://github.com/vawser/Smithbox), with Row Name import enabled.

> I used [WitchyBND](https://github.com/ividyon/WitchyBND) to unpack the icons `.dds` files in bulk instead of Smithbox.

The data should be organized as such:

```
// Main data folder in the root
./data/
// Folder with the icons already exported to some image format
./data/icons
// Text files
./data/msg/engus/item
// Params
./data/params
// Icons, will be generated later
./static/icons
```

Run `npm i` to install the packages.

After making sure you have the required data as above, run `npm run convert:icons`, this will run a `python3` script to convert the icons to webp and save it to `./static/icons`.

Run `npm run parse` to generate json files at `./data` and then finally `npm run dev`.

### Problems/TODO

- Separate some weapon types (shields, arrows, etc) and some consumables (pots, grease, etc) into separate pages.
- Add crafting material page.
- Improve and add more stats.
- Improve visual of stats section.
- Script/s and tool/s to extract data to avoid manually doing it.
- Improve summary for seo related descriptions.
- Missing values for parameters like `Causes blood loss buildup (<?bleedATKpwr?>)`.\*
- Missing a lot of item locations (map location and enemy drop).\*
- Missing weapons scaling and upgrade information.\*

> \*not sure how to retrieve this information.
