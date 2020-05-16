#!/bin/bash
cd ~/song-list
git stash
git checkout master
git pull
npm install
npm run build
sudo systemctl restart gpcsongs
