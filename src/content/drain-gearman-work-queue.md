---
title: "How-to: Drain Gearman work queue"
slug: "how-to-drain-gearman-work-queue"
publishedAt: "2022-11-14"
keywords: "how to, reset, drain, gearman, queue"
---

You can drain a [Gearman](http://gearman.org/) work queue by dumping its jobs
to `/dev/null`:

```sh
$ /usr/bin/gearman -t 999 -n -w -f $NAME_OF_FUNCTION > /dev/null
```

Beware that you will need to restart Gearman if you want to stop *new* jobs
from going to `/dev/null`!