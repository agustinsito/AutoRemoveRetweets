const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const unretweetTweet = async (tweet) => {
  try {
    await tweet.querySelector('div[data-testid="unretweet"]').click();
    await timer(150); // 
    await document.querySelector('div[data-testid="unretweetConfirm"]').click();
    console.log('****// Unretweeted Successfully //****');
  } catch (error) {
    console.error('Error during unretweet:', error);
  }
};

const unretweetUnretweetedTweet = async (tweet) => {
  try {
    await tweet.querySelector('div[data-testid="retweet"]').click();
    await timer(150); // 
    await document.querySelector('div[data-testid="retweetConfirm"]').click();
    console.log('****// Retweeted Successfully //****');
    await timer(150); // 
    unretweetTweet(tweet);
  } catch (error) {
    console.error('Error during unretweetUnretweetedTweet:', error);
  }
};

const processTweets = async () => {
  const retweetedTweetList = document.querySelectorAll('span[data-testid="socialContext"]');
  console.log('****// Retweeted Tweet List Collected //****');

  for (const retweet of retweetedTweetList) {
    const tweetWrapper = retweet.closest('[data-testid="tweet"]');
    tweetWrapper.scrollIntoView();

    const isRetweeted = tweetWrapper.querySelector('div[data-testid="unretweet"]');
    if (isRetweeted) {
      console.log('****// Green Retweet Button Found - Starting "unretweetTweet" process //****');
      await unretweetTweet(tweetWrapper);
    } else {
      console.log('****// Green Retweet Button Not Found - Starting "unretweetUnretweetedTweet" process //****');
      await unretweetUnretweetedTweet(tweetWrapper);
    }
    await timer(1000); //
  }
  console.log('****// List Completed //****');
  console.log('****// Scrolling //****');
  console.log('                  ');
  console.log('                  ');
  console.log('                  ');
  console.log('                  ');
  console.log('                  ');
  console.log('                  ');
  console.log('                  ');
  console.log('                  ');
  window.scrollTo(0, document.body.scrollHeight);

  // Call processTweets again using requestAnimationFrame to keep the loop going
  requestAnimationFrame(processTweets);
};

// Start the process initially
processTweets();
