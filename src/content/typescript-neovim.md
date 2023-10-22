---
title: "neovim + TypeScript = ⚡️"
slug: "neovim-typescript"
publishedAt: "2023-03-15"
pin: true
keywords: "neovim, typescript"
---

This is a rave about neovim. I've been using (neo)vim for nearly a decade now.
Investing my time into learning how to operate it was the best decision I've
made, as far as tech skills goes.

<H2A id="why">Why?</H2A>

- It enables me to take full advantage of my "flow moments" by helping me work
faster
- It's distraction-free. There are no shiny buttons or panels like in IDEs,
and nothing that takes my focus away
- It runs in the Terminal, my native environment for everything. I don't
have to choose between my editor or Terminal or jankily embed a Terminal
into my editor
- It lightens the load on my wrists since I never have to use the mouse when
editing or writing (which is a huge life-saver when working on laptops)
- It's lightweight - the CPU/memory footprint is 5-10x lesser than an IDE or
other editors (except Sublime Text) on average

<H2A id="what-i-can-do">Here's what I can do:</H2A>

*...without touching the mouse at all :-)*

<H3A id="autocomplete">Auto-complete</H3A>

<Video link="https://res.cloudinary.com/dh3yuijgy/video/upload/v1682870021/raychen.io/autocomplete_b8fbvz.mp4" startAt={5} />

`CTRL + N` lets me to cycle through completions, with a small window displaying
type information and docstrings.

<H3A id="navigate-quickly">Navigate quickly</H3A>

<Video link="https://res.cloudinary.com/dh3yuijgy/video/upload/v1682879800/raychen.io/navigation_fwflvf.mp4" startAt={4} />

I can open up a project tree with `<leader>;` (powered by
[NERDTree](https://github.com/preservim/nerdtree)),
and do a filename fuzzy-search using `<leader>t`
(powered by [fzf.vim](https://github.com/junegunn/fzf.vim)).

<H3A id="fuzzy-search-all">Fuzzy-search all files in directory</H3A>

<Video link="https://res.cloudinary.com/dh3yuijgy/video/upload/v1682879802/raychen.io/search_q2p9lz.mp4" startAt={3} />

`<leader>s` brings up a [ripgrep](https://github.com/BurntSushi/ripgrep) window
for fuzzy-searching text across the entire directory.

<H3A id="browse-to-type-sig">Browse to type signatures</H3A>

<Video link="https://res.cloudinary.com/dh3yuijgy/video/upload/v1682879792/raychen.io/goto-definition_tuiexo.mp4" startAt={3} />

`SHIFT + K` gives me a popup with the type signature and docstring. It's a
general function for displaying information about the current symbol. It can
use the LSP or even `man` pages, so I can `SHIFT + K` almost anything to
bring up its documentation when available.

Browsing to the full type definition (`.d.ts`) is triggered by `gd` keybind,
which calls the `jumpDefinition` function of
[coc.nvim](https://github.com/neoclide/coc.nvim).

<H3A id="autofix">Autofix</H3A>

<Video link="https://res.cloudinary.com/dh3yuijgy/video/upload/v1682879796/raychen.io/autofix_zgjnlf.mp4" startAt={3} />

`<leader>i` sorts and organize imports. It calls the LSP's (`tsserver` in this
case) `organizeImport` function via
[coc.nvim](https://github.com/neoclide/coc.nvim).

`<leader>f` formats the file using the same method via a configured formatter
on the LSP (I'm using [Prettier](https://prettier.io/)).

<H2A id="my-setup">My set-up</H2A>

- [NERDTree](https://github.com/preservim/nerdtree) for directory navigation
- [coc.nvim](https://github.com/neoclide/coc.nvim) as an extension host for
language servers
- [neoclide/coc-tsserver](https://github.com/neoclide/coc-tsserver) on top of
`coc.nvim` for TypeScript
- [fzf.vim](https://github.com/junegunn/fzf.vim) for fuzzy search (filename
and contents) powered by [ripgrep](https://github.com/half0wl/nvim/blob/master/init.vim#L108)

You can find all of my neovim config [here](https://github.com/half0wl/dotfiles/tree/master/nvim).

<H2A id="try-it-out">Like what you see?</H2A>

Give (neo)vim a whirl! Once you get past the learning curve and start building
muscle memory, you'll wonder why you didn't start using it earlier.
