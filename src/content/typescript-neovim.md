---
title: "neovim + TypeScript = ⚡️"
slug: "neovim-typescript"
publishedAt: "2023-03-15"
keywords: "neovim, typescript"
---

This is a rave about neovim.

I've been using (neo)vim for nearly a decade now. Investing my time into
learning how to operate it was the best decision I've made, as far as tech
skills goes.

It gives me super speed when editing. It’s lightweight and distraction-free.
It enables me to take full advantage of my "flow moments" by helping me work
faster. It runs in Terminal, my native environment for everything; I don't
have to choose between my editor or Terminal, or jankily embed a Terminal
into my editor. It lightens the load on my wrists since I never have to use
the mouse when editing or writing (which is a huge life-saver when working on
laptops!)

## My set-up

* [NERDTree](https://github.com/preservim/nerdtree) for directory navigation
* [coc.nvim](https://github.com/neoclide/coc.nvim) + a language server to turn
neovim into an IDE.
    * This gives me everything the language server offers: completion, goto
      definition, etc.
    * For TypeScript, I'm using [neoclide/coc-tsserver](https://github.com/neoclide/coc-tsserver)
    * You can find my coc.nvim config [here](https://github.com/half0wl/nvim/blob/master/coc-settings.json)
* [fzf.vim](https://github.com/junegunn/fzf.vim) for fuzzy search (filename and contents), [powered by ripgrep](https://github.com/half0wl/nvim/blob/master/init.vim#L108)

You can find all of my neovim config [here](https://github.com/half0wl/nvim).

## Here's what I can do!

### Auto-complete

<Video link="https://res.cloudinary.com/dh3yuijgy/video/upload/v1682870021/raychen.io/autocomplete_b8fbvz.mp4" startAt={5} />

`CTRL` + `N` allows me to cycle through completions, with a small window
displaying type information and docstrings.

### Navigate quickly

<Video link="https://res.cloudinary.com/dh3yuijgy/video/upload/v1682879800/raychen.io/navigation_fwflvf.mp4" startAt={4} />

I can open up a project tree with [`<leader>;`](https://github.com/half0wl/nvim/blob/master/init.vim#L93)
([NERDTree](https://github.com/preservim/nerdtree)), do a filename fuzzy-search
using [`<leader>t`](https://github.com/half0wl/nvim/blob/master/init.vim#L96) ([fzf.vim](https://github.com/junegunn/fzf.vim)).

### Fuzzy-search all files in project

<Video link="https://res.cloudinary.com/dh3yuijgy/video/upload/v1682879802/raychen.io/search_q2p9lz.mp4" startAt={3} />

[`<leader>s`](https://github.com/half0wl/nvim/blob/master/init.vim#L99)
brings up a [ripgrep](https://github.com/BurntSushi/ripgrep) window I can use
for fuzzy-searching text across the entire project.

### Browse to type signatures

<Video link="https://res.cloudinary.com/dh3yuijgy/video/upload/v1682879792/raychen.io/goto-definition_tuiexo.mp4" startAt={3} />

`SHIFT` + `K` gives me a popup with the type signature and docstring. It's a
general function for displaying information about the current symbol. It can
use the LSP, or even `man` pages, so I can `SHIFT` + `K` almost anything to
bring up its documentation!

Browsing to the full type definition (`.d.ts`) is triggered by
[`gd`](https://github.com/half0wl/nvim/blob/master/init.vim#L153) hotkey,
which calls the `jumpDefinition` function of [coc.nvim](https://github.com/neoclide/coc.nvim).

### Auto-fix and format

<Video link="https://res.cloudinary.com/dh3yuijgy/video/upload/v1682879796/raychen.io/autofix_zgjnlf.mp4" startAt={3} />

[`<leader>i`](https://github.com/half0wl/nvim/blob/master/init.vim#L102) sorts
and organize imports. It calls the LSP's (`tsserver` in this case)
`organizeImport` function via [coc.nvim](https://github.com/neoclide/coc.nvim).

[`<leader>f`](https://github.com/half0wl/nvim/blob/master/init.vim#L101)
formats the file using the same method via a configured formatter on the LSP
(I'm using [Prettier](https://prettier.io/)).

## Like what you see?

Give neovim a whirl! Once you get past the learning curve and start building
muscle memory, you'll wonder why you didn't start using it earlier.

Feel free to [contact me](mailto:ray@raychen.io) if you want some help on
using neovim - I'm happy to chat about it!

