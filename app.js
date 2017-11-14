const
	URL		= process.argv[2],
	PAGES	= process.argv[3];

const
	PAGE_SIZE			= 10,
	CSV_DELIM			= "|",
	TITLE_MAX_LENGTH	= 20;

const HEADER_DISPLAY_MAP =
{
	dt	: "Date"		,
	cat	: "Category"	,
	pos	: "Title"		,
	loc	: "Location"
};

const
	util		= require("util"),
	rp			= require("request-promise-native"),
	cheerio		= require("cheerio"),
	toCsvAsync	= util.promisify(require("csv-stringify"));

async function crawl(url)
{
	let html	= await rp(url);
	let $		= cheerio.load(html);

	// fill cagegories dictionary
	let categories = [];
	$("span[itemprop='occupationalCategory']").map((i, el) => {
		let key		= el.parent.parent.attribs["data-offers-id"];
		let value	= el.children[1].children[0].data;

		categories[key] = value;
	});

	// get positions
	let positions = [];
	$("a[title='Add to my Jobs']").map((i, el) => {
		let id = el.attribs["data-offers-uid"];
		let obj =
		{
			id											,
			dt	: el.attribs["data-offers-date"]		,
			cat	: categories[id]						,
			pos	: el.attribs["data-offers-title"]		,
			loc	: el.attribs["data-offers-location"]	,
			url	: el.attribs["data-offers-uri"]
		};

		positions.push(obj);
	});

	return positions;
}

async function main()
{
	let result = [];

	for (let i = 1; i <= PAGES; i++)
	{
		let positions = await crawl(URL + "&PAGEN_1=" + i);
		if (positions.length == 0) // stop crawling if there are no results
			break;

		// it is not know how many pages should be read. However the server returns positions from already processed page if next one does not exist
		// so there is a check whether any of the positions from current page were read already
		let idExisting = result.filter(el => { return el.id == positions[0].id });
		if (idExisting.length > 0) // stop processing page if ID was processed
			break;

		result = result.concat(positions); // save page results

		if (positions.length < PAGE_SIZE) // stop processing if position count is less than page size (no more results expected)
			break;
	}

	// remove unnecessary fields and convert keys to header labels
	result.forEach(el => {
		delete el.id;
		delete el.url;

		for (let keyData of Object.keys(HEADER_DISPLAY_MAP))
		{
			let keyHeader = HEADER_DISPLAY_MAP[keyData];
			el[keyHeader] = el[keyData];
			delete el[keyData];
		}
	});

	let csv = await toCsvAsync(result, { delimiter: CSV_DELIM, header: true });

	return csv;
}

///////////////////////

main()
.then(result => {
	console.log(result);
})
.catch(err => {
	console.log(err);
});

