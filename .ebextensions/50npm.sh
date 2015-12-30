#!/bin/bash
. /opt/elasticbeanstalk/env.vars
function error_exit
{
  eventHelper.py --msg "$1" --severity ERROR
  exit $2
}

#install not-installed yet app node_modules
if [ ! -d "/var/node_modules" ]; then
  mkdir /var/node_modules ;
fi
if [ -d /tmp/deployment/application ]; then
  ln -s /var/node_modules /tmp/deployment/application/
fi

OUT=$([ -d "/tmp/deployment/application" ] && cd /tmp/deployment/application && /opt/elasticbeanstalk/node-install/node-v$NODE_VER-linux-$ARCH/bin/npm install 2>&1) || error_exit "Failed to run npm install.  $OUT" $?
echo $OUT
