---
title: "Microtik: Removing ISP DNS servers"
slug: "microtik-remove-isp-dns-servers"
publishedAt: "2024-03-18"
keywords: "microtik,dns,dynamic server,isp dns"
---

If your ISP provides DNS servers by default, Microtik will use them even if
you have a custom DNS server.

Doing a `/ip dns print` will show this in `dynamic-servers` field:
```sh
[admin@ATik-Pro-1G] /ip/dns> print
servers: 1.1.1.1
dynamic-servers: xxx.x.xxx.xx,xxx.xxx.xxx.xx <--- From ISP
use-doh-server:
verify-doh-cert: no
...
```

To disable this completely, set `use-peer-dns=no` on your WAN interface's DHCP
client:
```sh
/ip dhcp-client set 0 use-peer-dns=no
```

Results:
```sh
[admin@ATik-Pro-1G] /ip/dns> /ip dns print
servers: 1.1.1.1
dynamic-servers:                             <--- No more!
use-doh-server:
verify-doh-cert: no
...
```

This will ensure your custom DNS server is always used, instead of your ISP's.
