const fs = require('fs');

const args = process.argv.slice(2);

console.log(args);
if(args.length != 2) {
    console.log('Usage: node main.js com/decom <file>');
    process.exit(1);
}else {
if(args[0] == 'com') {
// get contents of file in args[0]
fs.readFile(args[1], 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
  var newData = "";
  // find patterns in data and make a map of them
    const map = {};
    const regex = /\b(\w+)\b/g;
    let match;
    while (match = regex.exec(data)) {
        map[match[1]] = (map[match[1]] || 0) + 1;
    }
    console.log(map);
    const wordList = [];
    i = 0;
    for (let word in map) {
        wordList.push({
            word: word,
            id: i
        });
        i++;
    }
    console.log(wordList);
    // replace all words in data with their ids in wordList
    newData = JSON.stringify(wordList);
    newData = newData + '; \n' + data.replace(/\b(\w+)\b/g, function(p1) {
        return wordList.find(word => word.word === p1).id;
    });
    console.log("-----------------");
    console.log(newData);
  // write newData to Newfile
  const newFile = args[1].split('.')[0] + '.catp';
  fs.writeFile(newFile, newData, (err) => {
    if (err) throw err;
    console.log('File written');
  });
});
}else if(args[0] == 'decom') {
    //read file in args[1]
    fs.readFile(args[1], 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
        var newData = "";
        // get wordList from data
        const wordList = JSON.parse(data.split(';')[0]);
        console.log(wordList);
        // replace all ids in data with their words in wordList
        newData = data.split(';')[1].replace(/\b(\d+)\b/g, function(p1) {
            return wordList.find(word => word.id === parseInt(p1)).word;
        });
        console.log("-----------------");
        console.log(newData);
        // write newData to Newfile
        const newFile = args[1].split('.')[0] + '.txt';
        fs.writeFile(newFile, newData, (err) => {
            if (err) throw err;
            console.log('File written');
        });
    });
}
}