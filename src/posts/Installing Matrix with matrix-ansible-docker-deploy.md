---
title: Installing Matrix with matrix-ansible-docker-deploy
isPublished: true
date: "20211108"
image: element.png
alt: Element login screen showing an option to log in with Keycloak
tags:
  - radical-directory
  - projects
---

Steps that I've taken (following
[this guide](https://github.com/spantaleev/matrix-docker-ansible-deploy/tree/master/docs))

- Set up a DigitalOcean droplet with Debian 11, ssh key linked to my machine,
  $12 plan (2GB Ram)
- SSH in to check it has Python 3 installed (it does)
- Install Ansible on my machine

  - pip3 install ansible --user
  - this installs ansible on my machine but doesn't add it to the path, so cli
    commands starting with `ansible-playbook` etc don't work
  - following
    [a post on here](https://superuser.com/questions/1302028/ansible-installed-on-mac-with-success-message-but-not-found)
    I added `export PATH="/Users/shantanu/Library/Python/3.9/bin:$PATH"` to
    `~/.zshrc` then ran `source ~/.zshrc` which fixed it

- Git clone the Ansible playbook from the repo
- configure the playbook
  - enable ma1sd
  - enable Mautrix Signal bridge
  - enable shared secret (this makes double puppetting possible)
  - enable
    [Appservice Discord](https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/docs/configuring-playbook-bridge-appservice-discord.md#getting-administrator-access-in-a-portal-bridged-room)
    bridge
- run the playbook install script
  - didn't work at first, i think due to issue with Apple Silicon - had to
    `pip install passlib` which fixed it
- run the playbook run script
- [register a user](https://github.com/spantaleev/matrix-docker-ansible-deploy/blob/master/docs/registering-users.md)
