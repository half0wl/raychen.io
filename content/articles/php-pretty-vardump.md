---
title: "PHP: A prettier way to var_dump"
date: 2022-10-02T03:21:09+08:00
draft: false
---

Dumping information about an object is crucial in development and debugging
workflows. PHP has a few options for doing so:
[`var_dump`](https://www.php.net/manual/en/function.var-dump.php),
[`var_export`](https://www.php.net/manual/en/function.var-export.php), and
[`print_r`](https://www.php.net/manual/en/function.print-r.php).
All of them does not format the output for HTML rendering, which can make it
difficult to work with given a convoluted object to dump, especially if you're
triggering the dump code by hitting a route (via browser or a HTTP API client
such as Postman, Insomnia, etc.)

Inspired by [this answer on StackOverflow](https://stackoverflow.com/a/19816742),
I wrote a function to solve that by embedding the
[`print_r`](https://www.php.net/manual/en/function.print-r.php)’d object inside
the [`highlight_string`](https://www.php.net/manual/en/function.highlight-string.php)
function:

```php
function d($obj): string {
    return highlight_string("<?php\n" . print_r($obj, true) . "\n", true);
}
echo(d($dogsBySize));

// To skip having to `echo()` it, make the function dump the output directly
// instead of returning it:
function d($obj) {
    highlight_string("<?php\n" . print_r($obj, true) . "\n", false);
}
d($dogsBySize);
```

This is the output (via [Insomnia](https://insomnia.rest/)):

![pretty dump output](/img/prettydump.png#nofloat90w)

With this mock object:

```php
<?php

declare(strict_types=1);


class Dog
{
    public function __construct(
        private string $breed,
    ) {
    }
}

$smallDogs = [
    new Dog("Chihuahua"),
    new Dog("Pug"),
];

$mediumDogs = [
    new Dog("Miniature Schnauzer"),
    new Dog("Poodle"),
];

$largeDogs = [
    new Dog("Golden Retriever"),
    new Dog("Labrador"),
    new Dog("Standard Schnauzer"),
];

$dogsBySize = [
    'small' => $smallDogs,
    'medium' => $mediumDogs,
    'large' => $largeDogs,
];
```

If you’ve used any of the dump functions, you’ll immediately see that it's a
big improvement in terms of readability :-)

# Comparison

### [`var_dump`](https://www.php.net/manual/en/function.var-dump.php)

![var_dump output](/img/vardump.png#nofloat90w)

### [`var_export`](https://www.php.net/manual/en/function.var-export.php)

![var_export output](/img/varexport.png#nofloat90w)

### [`print_r`](https://www.php.net/manual/en/function.print-r.php)

![print_r output](/img/printr.png#nofloat90w)

# Alternative(s)

I recommend checking out [Xdebug](https://xdebug.org/) for its improved [`var_dump`](https://xdebug.org/docs/develop#improved_var_dump) feature.
