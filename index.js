// get url
// check for dns record at _eth.url
// if exists, add a bar
// handle actions on bar
// handle closing the bar or already paying

void async function main() {
  let addr = await getAddr()
  if (addr) {
    console.log(addr);
    addBar()
  }
}()

async function getAddr() {
  let url = window.location.host
  try {
    let res = await window.fetch(`https://cloudflare-dns.com/dns-query?name=_eth.${url}&type=TXT`, {
      headers: { 'accept': 'application/dns-json' }
    })
    let json = await res.json()

    if (json.Status == 0 && json.Answer[0] && json.Answer[0].type == 16) {
      // eth address
      return json.Answer[0].data;
    } else {
      // NXDOMAIN
      return false
    }
  } catch (err) {
    console.error(err);
    return false
  }

}

async function addBar() {
  let bar = document.createElement('div')
  let body = document.body
  bar.innerHTML = await generateBarHTML()
  body.insertBefore(bar, body.firstChild)
}

async function generateBarHTML() {
  return `<div id="buy-me-an-eth-bar"><p>support ${window.location.host} and send some love in the form of ETH</p><button class="send-me-an-eth-amount-button">$1</button><button class="send-me-an-eth-amount-button">$3</button><button class="send-me-an-eth-amount-button">$5</button></div>`
}

async function usdToETH(usd) {
  // https://api.coinmarketcap.com/v1/ticker/ethereum/
}

async function initializeWebThree() {

}
