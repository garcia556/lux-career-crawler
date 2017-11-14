# Luxoft Career crawler

While waiting for a new position in Luxoft I got too bored monitoring different filters manually using web page so I've kind of automated it

### Prerequisites

- bash
- docker
- \*NIX-like OS (tested successfully on macOS and Ubuntu Server)

### Usage

```sh
./run.sh ${FILTER_CSV}
```

`${FILTER_CSV}` is an optional parameter passing file name where lookup URLs can be found. By default `filter.csv` file is used, there are the filters I was interested in.

```CSV
Database - Other,https://career.luxoft.com/job-opportunities/?arrFilter_ff%5BNAME%5D=&arrFilter_pf%5Bcategories%5D=117902&set_filter=Y,2
North America,https://career.luxoft.com/job-opportunities/?arrFilter_ff%5BNAME%5D=&countryID%5B0%5D=1803&countryID%5B1%5D=781&arrFilter_pf%5Bcategories%5D=&set_filter=Y,3
SL3,https://career.luxoft.com/job-opportunities/?arrFilter_ff%5BNAME%5D=&arrFilter_pf%5Bcategories%5D=118321&set_filter=Y,2
```

### Filter file schema

During first run the script will install necessary node modules as well as fetch docker node image.

