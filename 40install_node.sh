#!/bin/bash

set -xe

/opt/elasticbeanstalk/containerfiles/ebnode.py --action node-install

# Update npm
cd /opt/elasticbeanstalk/node-install/node-v4.2.3-linux-x64/bin/ && /opt/elasticbeanstalk/node-install/node-v4.2.3-linux-x64/bin/npm update npm -g
