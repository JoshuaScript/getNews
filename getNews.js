/**
 * This webtask grabs the latest headlines from Reuters & outputs them in a table in which they are sorted by category
 * Usage: curl https://wt-e63b63f6cf3cc11e64f3e24f6f56b98a-0.sandbox.auth0-extend.com/getNews
 * The webtask url may also be set to an environment variable in order to make the synatax more terse. 
 *   For example: $ export news=https://wt-e63b63f6cf3cc11e64f3e24f6f56b98a-0.sandbox.auth0-extend.com/getNews
       Once this is done, the endpoint can be called with more concise syntax (curl $news)
 */

const Table = require('cli-table3');
const x = require('x-ray')({
  filters: {
    clean: value => {
      // removes the line break characters that were showing up in the headlines
      return value.replace(/[\r\n]/g, ' ').trim();
    }
  }
});

/**
* @param context {WebtaskContext}
*/
module.exports = (context, req, res) => {
  x('https://www.reuters.com/', '.module-news-headline-row', [
    {
      title: '.title-last',
      titleLink: 'h4 a@href',
      headlines: [ '.story-title | clean' ],
      headlineLinks: [ '.story-title a@href' ]
    }
  ]).then(data => {
      const titleArr = [];
      for (let i = 0; i < 3; i++) {
        titleArr.push(data[i].title);
      }
      const table = new Table({
        head: titleArr
      });
    
      const rowOne = [];
      const rowTwo = [];
      const rowThree = [];
      for (let i = 0; i < 3; i++) {
        rowOne.push(data[i].headlines[0]);
        rowTwo.push(data[i].headlines[1]);
        rowThree.push(data[i].headlines[2]);
      }
      
      table.push(rowOne);
      table.push(rowTwo);
      table.push(rowThree);

      res.writeHead(200, { 'Content-Type': 'text/plain ' });
      res.write('\n Latest headlines from Reuters: \n');
      res.write(table.toString());
      res.end();
    });
  };
