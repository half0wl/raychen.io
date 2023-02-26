---
title: "How to: Stop Docker from auto-restarting containers"
slug: "/writing/how-to-stop-docker-from-auto-restarting-containers"
date: 2022-11-14
tags:
  - "docker"
---

I have a bunch (...a lot) of docker containers with `restart-policy=always`.
Changing *each* `docker-compose.yml` individually is too time-consuming, so I
just modified all containers' `restart-policy` to `no` using:


```sh
$ docker update --restart=no $(docker ps -a -q)
```

I should stop using `restart-policy=always` as a default. This has gotten out
of hand for me because it's wasting precious system resources by running a ton
of containers that I don't actually need.

If you're in the same situation, this should help!
