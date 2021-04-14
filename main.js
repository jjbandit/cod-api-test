
(async function() { // Had to be wrapped in an 'async' function so we can use 'await' at the top level.  Go javascript.

  const Module = require('@callofduty/api');

  const CallOfDutyAPI = new Module.default();

  const username = process.env.COD_TEST_USERNAME;
  const pw = process.env.COD_TEST_PASSWORD;

  const { xsrf, sso, atkn } = await CallOfDutyAPI.Authorize(username, pw)
  CallOfDutyAPI.UseTokens({ xsrf, sso, atkn })

  console.log(xsrf, sso, atkn);

  // NOTE(Jesse): Paste the tokens you get from the above `CallOfDutyAPI.Authorize`
  // call in here.  The API is _heavily_ rate-limited on authentications, so
  // it's important that once you auth once the tokens are cached and re-used.
  //
  // CallOfDutyAPI.UseTokens({
  //   xsrf: "redacted",
  //   sso: "redacted",
  //   atkn: "redacted"
  // })


  // Fetch the identity for this account to find username/platform for desired game
  const { titleIdentities } = await CallOfDutyAPI.Identity()

  // console.log(titleIdentities);
  // const profileData = await CallOfDutyAPI.Profile({ username: 'HusKerrs', platform: 'uno' }, 'wz', 'mw')
  // console.log(profileData);


  // NOTE(Jesse): This was an attempt to trigger the API rate-limits.
  // Let it run for about 30 minutes until I gave up.
  //
  // let count = 0;
  // try {
  //   while (true)
  //   {
  //     ++count
  //     const lastTwentyMatches = await CallOfDutyAPI.MatchHistory({ username: 'SnowF1ake#1526', platform: 'battle' }, 'wz', 'mw')
  //   }
  // } catch (e) {
  //   console.error(e);
  // }
  // console.log(count);

  const lastTwentyMatches = await CallOfDutyAPI.MatchHistory({ username: 'SnowF1ake#1526', platform: 'battle' }, 'wz', 'mw')
  // console.log(lastTwentyMatches.matches.length);
  console.log(lastTwentyMatches.matches);

  // const matchEvents = await CallOfDutyAPI.MatchEvents('9666772303916911398', 'mw')
  // console.log(matchEvents);

//   // Step 5: Filter for game-specific profiles (we'll use MW and assume there is only one profile but multiple are supported)
  // const { username, platform } = titleIdentities.find(identity => identity.title === 'wz')
  // console.log(username, platform);

})();
