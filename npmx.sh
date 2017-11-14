#!/bin/bash

IMAGE="alpine"

mode=$1
cmd="-v"

if [ -z "${mode}" ]; then
	echo "Mode not set"
	exit 1
else
	case ${mode} in
		"u") # update
			cmd="update --save --silent"
			;;
		"i") # install package
			cmd="install $2 --save --silent"
			;;
		"r") # run
			shift
			args=""
			for var in "$@"
			do
				args="${args} ${var}"
			done

			cmd="start --silent ${args}"
			;;
	esac
fi

docker run					\
	--rm					\
	--workdir /app			\
	--volume $(pwd):/app	\
	"node:${IMAGE}"			\
	npm ${cmd}

