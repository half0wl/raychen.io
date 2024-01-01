---
pinned: true
title: "Home Lab setup"
slug: "homelab-setup"
publishedAt: "2024-01-01"
keywords: "homelab, ansible, docker"
---

<ImageWithCaption src="https://res.cloudinary.com/dh3yuijgy/image/upload/v1704127081/gallifrey-sh_xw0esp.png
" alt="Homelab" />

I recently picked up a used Dell OptiPlex 3070 to replace my aging Pi, and
went down a (fun!) rabbit hole of automating provision/management using a
combination of Ansible and Docker Compose.

<H2A id="setup">Setup</H2A>

I started fresh from a debian-standard ISO image and configured the net interface.
Docs were consulted heavily (thank you Archwiki/Debian docs), as it has been
awhile since I did this! Turns out the `ethN` etc. interface names are all
deprecated, and interfaces now have more unique names. I had to dig around to
figure out what to use, via:

```sh
$ ls /sys/class/net
```

That gave me `enp1s0`, which I stuck into `/etc/network/interfaces`:

```sh
auto enp1s0
allow-hotplug enp1s0
iface enp1s0 inet dhcp
```

And with that, I now have a working network connection. The next step was
setting up SSH keypair access (`ssh-keygen` + `ssh-copy-id`), and then I let
Ansible take over.

I use an [Ansible playbook](https://github.com/half0wl/homelab/blob/main/ansible/setup.yml)
to automate the server config. It does the bare host-system setup: timezone/NTP,
disables IPv6 (because my ISP doesn't support it... in 2024; though I could
just easily use it on my internal network), installs Docker, etc.

All services are managed through Docker Compose that gets invoked via Ansible.

<H2A id="management">Management</H2A>

Everything is managed through Ansible. Services are containerized and managed
by Docker Compose (also via Ansible). This means that the directory structure
looks like:

- [`./ansible/`](https://github.com/half0wl/homelab/tree/main/ansible) - Ansible-related manifests
- [`./services/<service-name>`](https://github.com/half0wl/homelab/tree/main/services) - Service-related files, i.e.:
    - A `docker-compose.yml` file - manages/runs the service(s)
    - An Ansible `playbook.yml` file - deploys the service
    - Any service-related files (e.g. configuration)

You can find the Ansible task responsible for provisioning a service [here](https://github.com/half0wl/homelab/blob/main/ansible/tasks/setup_service.yml).

<H2A id="reverse-proxy-and-dns">Reverse Proxy & DNS</H2A>

I use [nginx](https://github.com/half0wl/homelab/tree/main/services/nginx-certbot)
as a reverse proxy to expose services over my internal network through the
following domains:

- [`gallifrey.sh`](https://gallifrey.sh) - Home
- [`dns.gallifrey.sh`](https://dns.gallifrey.sh) - DNS/PiHole
- [`unifi.gallifrey.sh`](https://unifi.gallifrey.sh) - Unifi Controller
- etc.

I also run PiHole. It comes with `dnsmasq` that I leverage as an all-in-one DNS
solution. Each DNS record is set up via Ansible tasks in
[`./services/pihole-and-dns/playbook.yml#L24-L50`](https://github.com/half0wl/homelab/blob/d710f65cef417e1ab2815bb9e56edc7e580a8751/services/pihole-and-dns/playbook.yml#L25-L30).

You can also do this via PiHole's UI under Local DNS > DNS Records, but I prefer
keeping mine programmatic and idempotent.

### Unblocking iCloud Private Relay

PiHole blocks iCloud Private Relay by default. You can unblock it by setting
`BLOCK_ICLOUD_PR=false` in its FTL conf file. I did it via an Ansible task
[here](https://github.com/half0wl/homelab/blob/d710f65cef417e1ab2815bb9e56edc7e580a8751/services/pihole-and-dns/playbook.yml#L60-L65).

<H2A id="letsencrypt">SSL via LetsEncrypt</H2A>

I registered the domain `gallifrey.sh` and stuck it on Cloudflare, then used
Certbot to auto-provision LetsEncrypt certs via Cloudflare DNS challenge. This
means I get free SSL over my internal network without having to deal with any
self-signed certs.

You can find my certbot command in [`services/nginx-certbot/docker-compose.yml#L12-L21`](https://github.com/half0wl/homelab/blob/d710f65cef417e1ab2815bb9e56edc7e580a8751/services/nginx-certbot/docker-compose.yml#L12-L21).

<H2A id="spinning-up-new-services">Spinning up new services</H2A>

Since everything's managed via Ansible, adding a new service means creating a
new directory under [`./services/<service-name>`](https://github.com/half0wl/homelab/tree/main/services),
tossing in a `docker-compose.yml`, and an Ansible playbook to deploy it.

Check out these commits to see how I deploy an observability stack using
Grafana, cAdvisor, NodeExporter, and VictoriaMetrics:

- [`34e31b7` service(observability): Deploy](https://github.com/half0wl/homelab/commit/34e31b780535edb5e3e318465e3f4e4922a5f748) sets up the core services
- [`d710f65` service(observability): Setup DNS + r-proxy](https://github.com/half0wl/homelab/commit/d710f65cef417e1ab2815bb9e56edc7e580a8751) sets up the URL `observability.gallifrey.sh`

After the two commits above, I run the following playbooks:
```sh
# Deploy observability stack
$ ansible-playbook \
    -i ansible/inventory.yml \
    services/observability/playbook.yml \
    --ask-become-pass
# Update nginx conf
$ ansible-playbook \
    -i ansible/inventory.yml \
    services/nginx-certbot/playbook.yml \
    --ask-become-pass
# Update DNS
$ ansible-playbook \
    -i ansible/inventory.yml \
    services/pihole-and-dns/playbook.yml \
    --ask-become-pass
```

Et voila:

<ImageWithCaption src="https://res.cloudinary.com/dh3yuijgy/image/upload/v1704127081/gallifrey-obs_sp3mun.png" alt="Basic Grafana Monitoring Dashboard" caption="Basic Grafana Monitoring Dashboard" />

<H2A id="improvements">Improvements</H2A>

- The Ansible stuff is rather repetitive. I guess that's YAML for you - I'm
sure I can cut down on some of the repetition, but that's a rabbit hole for
another day.
- Make a "deploy all" Ansible playbook? The reverse proxy + DNS stuff is
repetitive and running three playbooks to deploy a single service is a bit
jarring.
- Logs! I should set up something to collect logs from all my services.
- More services! Now that my Pi's spec is no longer a limiting factor, I could
toss in Jellyfin/Sonarr etc. and have everything running smoothly.
- Separate DNS/PiHole using my old Pi? A single host means a single
point-of-failure, and DNS is more critical than others.
- Figure out a better way to provision services? I'm not a fan of wrangling
YAML in general.

You can find all of my configuration in this repository: [half0wl/homelab](https://github.com/half0wl/homelab).
