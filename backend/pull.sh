sudo git add .
sudo git stash
sudo git pull
echo 'Killing node'
sudo pkill -9 node
sudo /home/ben/.nvm/versions/node/v13.7.0/bin/node app.js &
echo 'Running...'
