---
title: "Draining Gearman Work Queue"
date: 2022-11-14T15:33:04+01:00
draft: false
---

You can drain a [Gearman](http://gearman.org/) work queue by dumping its jobs to `/dev/null`:

```sh
$ /usr/bin/gearman -t 999 -n -w -f $NAME_OF_FUNCTION > /dev/null
```

where `$NAME_OF_FUNCTION` is the name of the function you registered to Gearman.

Beware that you will need to restart Gearman if you want to stop *new* jobs from going to `/dev/null`!
