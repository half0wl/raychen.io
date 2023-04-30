---
title: "How-to: Debug StatsD locally"
slug: "how-to-debug-statsd-locally"
publishedAt: "2023-03-22"
keywords: "how to, statsd, debug, local"
---

It's useful to know what StatsD metrics you're sending locally before it
hits your production metrics sink. Getting a metric name, namespace, or data
type incorrect in production is annoying - it can mess up metrics for a
certain time window even after it's fixed. So, I always try to test any
metric-related changes locally before it hits production.

Assuming this example that sends a few metrics every 2 seconds:

```python
from time import sleep
import statsd

c = statsd.StatsClient("localhost", 8125)

while True:
    sleep(2)
    c.timing("stats.timed", 1)
    c.incr("foo")
```

You can echo the metrics it's sending by using `netcat` to listen for
the UDP packets:

```sh
$ nc -ulv -p 8125
Received packet from 127.0.0.1:58916 -> 127.0.0.1:8125 (local)
stats.timed:1.000000|msfoo:1|c
```

`$ nc -ulv` starts `nc` in UDP listening mode:
* `-u` = UDP
* `-l` = Listen
* `-v` = Verbose Logs
* `-p` = Port of your StatsD sender

You can also take this a step further and bake it into your CI process.
Run an `nc` listener and point your app's StatsD host/port at the `nc`
process, and perform assertions against the output of `nc`.