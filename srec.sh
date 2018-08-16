#!/bin/bash
gorec() {
	cd recordsome
}
setconf() {
	cp project-template/record/server.js recordsome/config/server.js
	echo "setted template/record/server.js to recordsome config"
	echo "token is:"
	cat recordsome/config/server.js | grep 'xtoken'
}
case $1 in
	"pull")
		gorec
		git pull
	;;
	"getconfig")
		cp recordsome/config/server.js project-template/record/server.js
	;;
	"setconfig")
		cp project-template/record/server.js recordsome/config/server.js
	;;
	"start")
		setconf
		gorec
		pm2 start npm --name record -- run server --max-memory-restart 400M
	;;
	"restart")
		setconf
		gorec
		pm2 restart record
	;;
	"build")
		gorec
		npm run build
esac
