---
title: "PHP: A prettier way to var_dump"
slug: "php-a-prettier-way-to-vardump"
publishedAt: "2022-10-02"
keywords: "php, debugging, vardump"
---

## [`var_dump`](https://www.php.net/manual/en/function.var-dump.php) is ugly:

![var_dump output](https://res.cloudinary.com/dh3yuijgy/image/upload/v1682879804/raychen.io/vardump_uvcavi.png)

## Here's how you can make it pretty:

Use [`print_r`](https://www.php.net/manual/en/function.print-r.php), and embed
the output inside
[`highlight_string`](https://www.php.net/manual/en/function.highlight-string.php).


```php
<?php

function d($obj): string {
    return highlight_string("<?php\n" . print_r($obj, true) . "\n", true);
}
echo(d($dogsBySize));
```

![pretty dump output](https://res.cloudinary.com/dh3yuijgy/image/upload/v1682879804/raychen.io/prettydump_gwjchm.png)

It's a tremendous improvement in readability! If you want to skip having to
`echo()` the output, make the function dump it directly instead of returning it:
```php
<?php

function d($obj) {
    highlight_string("<?php\n" . print_r($obj, true) . "\n", false);
}
d($dogsBySize);
```

## Alternatives

If you use `var_dump` a lot, check out [Xdebug](https://xdebug.org/)'s
improved [`var_dump`](https://xdebug.org/docs/develop#improved_var_dump) feature.
None of the native dump functions format the output for HTML rendering (as it
shouldn't!), which makes it difficult to read when you have a large/convoluted
object. For comparison:

### var_export

![var_export output](https://res.cloudinary.com/dh3yuijgy/image/upload/v1682879804/raychen.io/varexport_kjxzt9.png)

### print_r

![print_r output](https://res.cloudinary.com/dh3yuijgy/image/upload/v1682879805/raychen.io/printr_l5yobz.png)

