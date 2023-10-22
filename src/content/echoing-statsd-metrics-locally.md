---
title: "Echo-ing StatsD metrics locally"
slug: "echoing-statsd-metrics-locally"
keywords: "statsd, debug, echo, local"
publishedAt: "2023-03-22"
---

It's useful to know what StatsD metrics you're sending locally before it
hits your production metrics sink. Getting a metric name, namespace, or data
type incorrect in production is annoying, and it can mess up metrics for a
certain time window after it's fixed.

Assuming this example that sends a metric:

```python
from time import sleep
import statsd

c = statsd.StatsClient("localhost", 8125)

while True:
    sleep(2)
    c.timing("stats.timed", 1)
    c.incr("foo")
```

You can follow what it's sending locally by using `netcat` to listen for the
UDP packets:

```sh
$ nc -ulv -p 8125
Received packet from 127.0.0.1:58916 -> 127.0.0.1:8125 (local)
stats.timed:1.000000|msfoo:1|c
```

`$ nc -ulv` starts `nc` in UDP listening mode:
* `-u` = UDP
* `-l` = Listen
* `-v` = Verbose Logs
* `-p` = Port of your StatsD emitter
