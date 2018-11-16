# getNews

> Cli endpoint to quickly grab the latest headlines from Reuters.com

![getNews table in terminal](https://i.imgur.com/AuN0RnH.png)


## Usage

`curl https://wt-e63b63f6cf3cc11e64f3e24f6f56b98a-0.sandbox.auth0-extend.com/getNews`

For a more concise syntax, set the webtask url to a variable, like so (Note: This variable won't persist after the shell is closed):

`news="https://wt-e63b63f6cf3cc11e64f3e24f6f56b98a-0.sandbox.auth0-extend.com/getNews"`

You can now call the endpoint like this:

`curl $news`

## More info

getNews uses the [x-ray](https://github.com/matthewmueller/x-ray) module to scrape headlines from Reuters.com, and uses [cli-table3](https://github.com/cli-table/cli-table3) to display these headlines in a table format.

