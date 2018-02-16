# hackercamp-twitterapi
### twitter search API

Server is listening on port no ```3000```  
Database used: MongoDB ```2.2.33```  
DB port no: ```27017```  
DB name: myDB  


#### API 1:
To search a keyword:
file: hackercamp-twitterapi/api/routes/searchKeyword.js
request: localhost:3000/searchKeyword/<key word>
eg: localhost:3000/searchKeyword/modi

Variable countTweetsToDisplay sets the limit on the number of tweets which will be fetched and sent in response and stored in database.


#### API 2:
NOTE: Each page contains 5 results.

To search a username:
request: localhost:3000/searchTT?username=<username>&page=<page no>
eg: localhost:3000/searchTT?username=rajat&page=3

To search a tweet text:
request: localhost:3000/searchTT?tweettext=<text of tweet>&page=<page no>
eg: localhost:3000/searchTT?tweettext=happy birthday&page=2
  
To search screen name of a user:
request: localhost:3000/searchTT?screen_name=<screen name>&page=<page no>
eg: localhost:3000/searchTT?screen_name=rajat.a&page=1
  
To search tweets of a particular language (language should be provided according to twitter codes eg. en for English):
request: localhost:3000/searchTT?language=<language code>&page=<page no>
eg: localhost:3000/searchTT?language=en&page=10


Filter requests follow following format:
localhost:3000/filter/<FILTERING_FIELD>?<FILTERING_CRITERIA>=<FILTER_STRING>&page=<page no>

FILTERING_FIELD can be one of following (without angle brackets):
  username
  screen_name
  tweettext
  urls
  user_mentions
  
FILTERING_CRITERIA can be one of the following:
  startswith
  endswith
  contains

eg:
To filter username starting with a given string say "ra":
localhost:3000/filter/username?startswith=ra&page=1

To filter screen_name ending with a given string say "at":
localhost:3000/filter/screen_name?endswith=at&page=1

To filter tweettext contains a string "modi"
localhost:3000/filter/tweettext?contains=modi&page=1

To filter urls starting with "http://twitter"
localhost:3000/filter/urls?startswith=http://twitter &page=1

To filter tweets in which user_mentions contain "rajat"
localhost:3000/filter/user_mentions?contains=rajat&page=1


Count requests follow following format:
localhost:3000/counts?<COUNT_FIELD>=<VALUE>&comparator=<CONDITION>&page=<PAGE NO>
COUNT_FIELD can be one of the following:
  retweet_count
  favorite_count
  userfollower_count
comparator CONDITION can be one of the following:
  eq for equal
  lt for less than
  gt for greater than
  
eg:
localhost:3000/counts?favorite_count=5&comparator=gt&page=5
localhost:3000/counts?retweet_count=5&comparator=lt&page=5
localhost:3000/counts?userfollower_count=5&comparator=eq&page=5


Sort tweets on basis of datetime in ascending order:
localhost:3000/datetime/sort_asc?page=<page no>
Sort tweets on basis of datetime in descending order:
localhost:3000/datetime/sort_desc?page=<page no>



#### API 3:
Query response returned in API 2 is saved in file.csv






