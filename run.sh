#!/bin/bash 

DB=$1

if [ -z "${DB}" ]; then
	DB="url.db"
fi

DB_DELIM=","
DB_IX_KEY=1
DB_IX_URL=2
DB_IX_PAGES=3

cmd_cut="cut -d ${DB_DELIM} -f"

options=$(cat ${DB} | ${cmd_cut} ${DB_IX_KEY})

OLD_IFS=${IFS}
OLD_COLUMNS=${COLUMNS}

IFS="
"
COLUMNS=20

# ensure all modules are installed
./npmx.sh u

PS3="Choose search option: "
select opt in ${options}
do
	case $opt in
		"Quit")
			break
			;;
		*)
			line=$(cat ${DB} | grep "${opt}")

			url=$(echo "${line}" | cut -d ${DB_DELIM} -f ${DB_IX_URL})
			pgs=$(echo "${line}" | cut -d ${DB_DELIM} -f ${DB_IX_PAGES})

			echo ""
			./npmx.sh r "${url}" "${pgs}" | column -s "|" -c 4 -t
			break
			;;
	esac
done

IFS=${OLD_IFS}
COLUMNS=${OLD_COLUMNS}

