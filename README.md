# rvpacker-json-txt

[README на русском](https://github.com/savannstm/rpg-maker-translation-tools/blob/main/README-ru.md)

## General

This tool is designed to read RPG Maker game files into .txt files and write them back to .json.

This tool inherits its name from the original rvpacker tool, which was created for those versions of RPG Maker that did not use .json files.

This tool for RPG Maker XP, VX and VX Ace engines that don't use .json files can be found in [this repository](https://github.com/savannstm/rvpacker-txt).

[A GUI](https://github.com/savannstm/rpgm-translation-gui) that allows comfortably edit parsed files (and it also automatically parses unparsed games when you select their folder) (and you also can easily write files back to .json with a single button click) (and it also supports RPG Maker XP, VX and VX Ace!)

## Installation

You can download binary files in the Releases section.

Files with the .exe extension are designed for Windows x64, while files without an extension are designed for Linux x64.

## Usage

You can get help on usage by calling `json-writer -h.`

```
This tool allows to parse RPG Maker MV/MZ games text to .txt files and write them back to their initial form.

Usage: rvpacker-json-txt COMMAND [OPTIONS]

Commands:
  read
          Parses files from "original" or "data" folders of input directory to "translation" folder of output directory.
  write
          Writes translated files using original files from "original" or "data" folders of input directory and writes
          results to "output" folder of output directory.

Options:
  -i, --input-dir <INPUT_PATH>
          When reading: Input directory, containing folder "original" or "data" with original game files.
          When writing: Input directory, containing folder "original" or "data" with original game files, and folder
          "translation" with translation .txt files.
  -o, --output-dir <OUTPUT_PATH>
          When reading: Output directory, where a "translation" folder with translation .txt files will be created.
          When writing: Output directory, where an "output" folder with "data" and "js" subfolders with game files with
          translated text from .txt files will be created.
      --disable-processing <FILENAMES>
          Skips processing specified files.
          Example: --disable-processing=maps,other,system.
          [Allowed values: maps, other, system, plugins]
  -r, --romanize
          If you parsing text from a Japanese game, that contains symbols like 「」, which are just the Japanese quotation
          marks, it automatically replaces these symbols by their roman equivalents (in this case, ""). This flag will
          automatically be used when writing if you parsed game text with it.
      --disable-custom-processing
          Disables built-in custom processing, implemented for some games. This flag will automatically be used when
          writing if you parsed game text with it.
  -l, --language <LANGUAGE>
          Sets the localization of the tool to the selected language.
          Example: --language en.
          [Allowed values: en, ru]
      --log
          Enables logging.
  -h, --help
          Prints the program's help message or for the entered subcommand.
```

Examples:

`rvpacker-json-txt read --input-dir "E:/Documents/RPGMakerGame"` parses the text of the game into the `translation` folder of the specified directory.

`rvpacker-json-txt write --input-dir E:/Documents/RPGMakerGame"` will write the translation from the \_trans files of the `translation` folder to .the json files to the `output` folder.

The tool does not parse text from a plugins.js file since it is very difficult to isolate the text displayed in the game from the plugins.

## License

The repository is licensed under [WTFPL](http://www.wtfpl.net/).
This means that you can use and modify the program in any way. You can do what the fuck you want to.
