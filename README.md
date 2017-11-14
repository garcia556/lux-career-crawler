# Luxoft Career crawler

While waiting for a new position in Luxoft I got too bored monitoring different filters manually using web page so I've kind of automated it

## Prerequisites

- bash
- docker
- \*NIX-like OS (tested successfully on macOS and Ubuntu Server)

## Usage

```sh
./run.sh ${FILTER_CSV}
```

During first run the script will install necessary node modules as well as fetch docker node image.
`${FILTER_CSV}` is an optional parameter passing file name where lookup URLs can be found. By default `filter.csv` file is used, there are the filters I was interested in.

### Filter file example

```CSV
Database - Other,https://career.luxoft.com/job-opportunities/?arrFilter_ff%5BNAME%5D=&arrFilter_pf%5Bcategories%5D=117902&set_filter=Y,2
North America,https://career.luxoft.com/job-opportunities/?arrFilter_ff%5BNAME%5D=&countryID%5B0%5D=1803&countryID%5B1%5D=781&arrFilter_pf%5Bcategories%5D=&set_filter=Y,3
SL3,https://career.luxoft.com/job-opportunities/?arrFilter_ff%5BNAME%5D=&arrFilter_pf%5Bcategories%5D=118321&set_filter=Y,2
```

It corresponds to the following fields:

Index | Field           | Description
----- | :-------------: | -----------
1     | Label           | Just a title of selection option for convenience
2     | Search URL      | Flter URL from the [careers page](https://career.luxoft.com/job-opportunities/)
3     | Pages to lookup | How many pages to process back in time, page size is *10* positions

##### Additional filters

Simply go to the [careers page](https://career.luxoft.com/job-opportunities/) in the browser, configure the filter and press **Search** to get the results and copy the URL from the address bar, it can be used as is. Ensure you are on the 1st page of search results..

