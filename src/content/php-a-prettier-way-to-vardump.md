---
title: "PHP: A prettier way to var_dump"
slug: "php-a-prettier-way-to-vardump"
publishedAt: "2022-10-02"
keywords: "php, debugging, vardump"
---

There are various ways to dump information about a variable/object in PHP.
Typically, you'd use them in a breakpoint-y fashion by inserting some dump
function and hitting the endpoint to trigger the code. You hit the endpoint
by `curl`-ing or visiting its URL, and you realize that the output is
unreadable:

<ImageWithCaption src="https://res.cloudinary.com/dh3yuijgy/image/upload/f_auto,q_auto/v1/raychen.io/php-pretty-vardump/o91epzpfilvlbjpid5hr" alt="var_dump" caption="^ var_dump" />

<ImageWithCaption src="https://res.cloudinary.com/dh3yuijgy/image/upload/f_auto,q_auto/v1/raychen.io/php-pretty-vardump/f4na8pxpcun8gy3enwin" alt="var_export" caption="^ var_export" />

<ImageWithCaption src="https://res.cloudinary.com/dh3yuijgy/image/upload/f_auto,q_auto/v1/raychen.io/php-pretty-vardump/dzrspqroeqkrrstikxvz" alt="print_r" caption="^ print_r" />

This happens because none of them formats the output for HTML rendering (as it
shouldn't!), which makes it extra difficult to parse when you have a large object.

## Here's how I make it pretty:

```php
<?php

function d($obj): string {
    return highlight_string("<?php\n" . print_r($obj, true) . "\n", true);
}
echo(d($dogsBySize));
```

This embeds the output of [`print_r`](https://www.php.net/manual/en/function.print-r.php)
inside [`highlight_string`](https://www.php.net/manual/en/function.highlight-string.php)
to make it render nicely:

![pretty dump output](https://res.cloudinary.com/dh3yuijgy/image/upload/f_auto,q_auto/v1/raychen.io/php-pretty-vardump/jdyc6bguub1mmvmwqgmx)

It's a tremendous improvement in readability. If you want to skip having to
`echo()` the output, make the function dump it directly instead of returning it:
```php
<?php

function d($obj) {
    highlight_string("<?php\n" . print_r($obj, true) . "\n", false);
}
d($dogsBySize);
```

Alternatively, check out [Xdebug](https://xdebug.org/)'s improved
[`var_dump`](https://xdebug.org/docs/develop#improved_var_dump).
