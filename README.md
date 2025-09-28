## er-wiki

An attempt of a wiki for Elden Ring and its DLC. Wanted to have some fun with datamining and parsing extracted files.

This is by no means a replacement of anything currently, only supporting very basic things and few categories (weapons, armors, ashes of war).

The site is made with sveltekit and is prerendered.

Extraction of the data is not automated and was done using [Smithbox](https://github.com/vawser/Smithbox), only params, text and texture data are used. The data should be organized as such:

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

After organizing, run `npm run parse` to generate json files at `./data`.
