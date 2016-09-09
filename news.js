'use strict';
var request = require('request');
var xmlreader = require('xmlreader');

module.exports.news = function(callback, newsNum) {
    request('https://meduza.io/rss/all', function (error, response, xml) {
      if (error)
        throw error;

      if ( response.statusCode !== 200 )
        return console.log('incorrect statusCode: ', response.statusCode);

      let result = [];

      xmlreader.read(xml, function (err, res){
            if(err) return console.log(err);

            // Выводим последние 3 новости. i < res.rss.channel.item.count() - все новости
            if ( newsNum >= res.rss.channel.item.count()) newsNum = res.rss.channel.item.count();
            if ( newsNum < 0 ) newsNum = 1;

            for(var i = 0; i < newsNum; i++){
                result[i] = { 'title' : res.rss.channel.item.at(i).title.text(),
                              'pubdate' : res.rss.channel.item.at(i).pubDate.text(),
                              'description' : res.rss.channel.item.at(i).description.text(),
                              'img' : res.rss.channel.item.at(i).enclosure.attributes().url,
                              'link' : res.rss.channel.item.at(i).link.text()
                            };
            }
      });
      callback(result);
    });
};
