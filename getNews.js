const 
  Table = require('cli-table3'),
  x = require('x-ray')({
    filters: {
      clean: value => value.replace(/[\r\n]/g, ' ').trim() // removes newline characters
    }
  });

/**
* @param context {WebtaskContext}
*/
module.exports = (context, req, res) => {
  x('https://www.reuters.com/', '.module-news-headline-row', [
    {
      title: '.title-last',
      headlines: [ '.story-title | clean' ]
    }
  ])
  .then(data => {
    const 
      head = []
      rowOne = [],
      rowTwo = [],
      rowThree = [],
      table = new Table({
        head,
        colWidths: [ 68, 68 ]
      });
  
    data.slice(0, 3).forEach(({ title , headlines: [ firstHeadline, secondHeadline, thirdHeadline ] }) => {
      head.push(title);
      rowOne.push(firstHeadline);
      rowTwo.push(secondHeadline);
      rowThree.push(thirdHeadline);
    });

    table.push(rowOne, rowTwo, rowThree);

    res.setHeader('Content-Type', 'text/plain');
    res.end(`\n Latest headlines from Reuters: \n ${String(table)}`);
  });
}
