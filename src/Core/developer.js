//--------------[ DEVELOPER SETTINGS ]---------------//
/* Do not change anything here!!! Or I’ll send CypherX after you... 😈 */

const fs = require('fs')
const path = require('path')
const { color } = require(path.join(__dirname, '../../lib/color'))

if (fs.existsSync(path.join(__dirname, '../../.env'))) {
    require('dotenv').config({ path: path.join(__dirname, '../../.env') })
}

global.api = "https://myapi-f721d1db95e9.herokuapp.com";

global.siputzx = "https://api.siputzx.my.id";

global.wwe = "https://www.wwe.com/api/news";

global.wwe1 = "https://www.thesportsdb.com/api/v1/json/3/searchfilename.php?e=wwe";

global.wwe2 = "https://www.thesportsdb.com/api/v1/json/3/searchevents.php?e=wrestling";

global.falcon = "https://flowfalcon.dpdns.org";

global.helpersList = [
  { name: "Richard", number: "+255789622341", country: "Tanzania", flag: "🇹🇿" },
  { name: "Klaus", number: "+260967411099", country: "Zambia", flag: "🇿🇲" },
  { name: "Mako", number: "+260971816956", country: "Zambia", flag: "🇿🇲" },
  { name: "Burzor", number: "+2347069036313", country: "Nigeria", flag: "🇳🇬" },
  { name: "Mr Guillaume", number: "+237694266773", country: "Cameroon", flag: "🇨🇲" },
  { name: "Mcchelson", number: "+233545118613", country: "Ghana", flag: "🇬🇭" },
  { name: "Kwesi", number: "+233240604923", country: "Ghana", flag: "🇬🇭" },
  { name: "Brennan", number: "+263782869919", country: "Zimbabwe", flag: "🇿🇼" },
  { name: "Trendex", number: "+254110081982", country: "Kenya", flag: "🇰🇪" },
  { name: "Arnold", number: "+254781108258", country: "Kenya", flag: "🇰🇪" },
  { name: "Guanxii Re-Jeong", number: "+27632461796", country: "South Africa", flag: "🇿🇦" }
];

global.mess = {
  done: 'Mission completed successfully.', 
  success: 'Operation successful.', 
  owner: 'This command is restricted to the owner and sudos only.', 
  group: 'This command can only be used in group chats.', 
  admin: 'Bot requires admin privileges to perform this action.', 
  notadmin: 'Only group admins can use this command.', 
  error: 'An error occurred. Please try again later.', 
  wait: 'Processing your request. Please wait...', 
  nolink: 'No valid link detected. Please provide a proper link.', 
  notext: 'No input detected. Please provide the necessary text.', 
  ban: 'You are currently banned from using the bot.', 
  unban: 'You have been unbanned and can now use the bot.', 
}

global.SESSION_ID = process.env.SESSION_ID || ''

global.postgresqls = process.env.DATABASE_URL || ""

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(color(`Updated '${__filename}'`, 'red')) 
  delete require.cache[file]
  require(file)
})