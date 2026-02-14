(function() {
  //TODO: Test if we can make api calls to https://my.duda.co/api/uis/pages without much changes to authenication.
  function createSearchBar(options) {
    console.log('Creating Search Bar with options2:', options);
    const {container, props} = options;
    const {bathsSelector, bedsSelector, currencyLanguage, priceSelector, propertyTypeSelector, searchSettings, sqftSelector} = props;
    const $v5SearchWidget =$(`
      <div class="v5-search">
      <div class="search-input-container">
        <input id="search-listings-input" type="text" aria-label="Search Input" title="Search Input" placeholder="Start your search by City, Neighborhood or Zip Code" tabindex="0">
        <div class="search-button" aria-hidden="true" title="Start Search">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="3.8 3 42.8 43.6">
              <path d="M21 3a17 17 0 1 0 9 31.3l12.4 12.3 4.2-4.2-12.1-12.1A17 17 0 0 0 21 3Zm0 4a13 13 0 1 1 0 26 13 13 0 1 1 0-26Z" style="fill:#fff"/>
            </svg>
        </div>
        <div class="suggested-listings-content"></div>
        <div class="suggested-listings-loading"><h4>Loading</h4></div>
      
      </div>
      <div class="search-type-container">
        <label for="search-by-area">
          <span>Search by area</span>
          <input type="radio" id="search-by-area" class="search-type" name="search-type" value="area" checked>
        </label>
        <label for="search-by-address">
          <span>Search by address</span>
          <input type="radio" id="search-by-address" class="search-type" name="search-type" value="address">
        </label>
      </div>
      <div class="search-filters-wrapper">
        <div id="search-filters">
          <div class="search-config-field propertyTypeSelector">
          </div>
        </div>
      </div>
      <div class="mobile-expand">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="48 80 416 352"><path fill="#000000" d="M381.3 112a48 48 0 0 0-90.6 0H48v32h242.8a48 48 0 0 0 90.4 0H464v-32ZM176 208a48 48 0 0 0-45.3 32H48v32h82.8a48 48 0 0 0 90.4 0H464v-32H221.2a48 48 0 0 0-45.2-32Zm160 128a48 48 0 0 0-45.3 32H48v32h242.8a48 48 0 0 0 90.4 0H464v-32h-82.8a48 48 0 0 0-45.2-32Z"/></svg>		
      </div>
    </div>`);

    const $propertyTypeSelector = $(`
      <div class="search-config-field propertyTypeSelector">
        <label class="ylopo-hidden-label" for="property-type">Property Type</label>
        <div id="property-type" class="dropdown">
          <div class="property-types-btn">Property Types 
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"></path></svg>
          </div>
          <div class="dropdown-content" style="display: block;">
            <div class="dropdown-item">
              <input type="checkbox" class="search-config-item default" id="house" name="s[propertyTypes][house]" checked="" tabindex="0">
              <label for="house">Single Family Home</label>
            </div>
            <div class="dropdown-item">
              <input type="checkbox" class="search-config-item default" id="condo" name="s[propertyTypes][condo]" checked="" tabindex="0">
              <label for="condo">Condo</label>
            </div>
            <div class="dropdown-item">
              <input type="checkbox" class="search-config-item " id="townhouse" name="s[propertyTypes][townhouse]" tabindex="0">
              <label for="townhouse">Townhouse</label>
            </div>
            <div class="dropdown-item">
              <input type="checkbox" class="search-config-item " id="manufactured" name="s[propertyTypes][manufactured]" tabindex="0">
              <label for="manufactured">Manufactured</label>
            </div>
            <div class="dropdown-item">
              <input type="checkbox" class="search-config-item " id="apt" name="s[propertyTypes][apt]" tabindex="0">
              <label for="apt">Multi-Family</label>
            </div>
            <div class="dropdown-item">
              <input type="checkbox" class="search-config-item " id="land" name="s[propertyTypes][land]" tabindex="0">
              <label for="land">Lots and Land</label>
            </div>
            <div class="dropdown-item">
              <input type="checkbox" class="search-config-item " id="comm" name="s[propertyTypes][comm]" tabindex="0">
              <label for="comm">Commercial</label>
            </div>
          </div>
        </div>
      </div>`);
    const $minPriceSelector = $(`
      <div class="search-config-field priceSelector">
        <label class="ylopo-hidden-label" for="min-price">Min Price</label>
        <select id="min-price" class="search-config-item">
          <option value="">Min Price</option>
          <option value="10000">$10,000</option>
          <option value="20000">$20,000</option>
          <option value="30000">$30,000</option>
          <option value="40000">$40,000</option>
          <option value="50000">$50,000</option>
          <option value="60000">$60,000</option>
          <option value="70000">$70,000</option>
          <option value="80000">$80,000</option>
          <option value="90000">$90,000</option>
          <option value="100000">$100,000</option>
        </select>
      </div>`);
    const $maxPriceSelector = $(`
      <div class="search-config-field priceSelector">
        <label class="ylopo-hidden-label" for="max-price">Max Price</label>
        <select id="max-price" class="search-config-item">
          <option value="">Max Price</option>
          <option value="100000">$100,000</option>
          <option value="200000">$200,000</option>
          <option value="300000">$300,000</option>
          <option value="400000">$400,000</option>
          <option value="500000">$500,000</option>
          <option value="600000">$600,000</option>
          <option value="700000">$700,000</option>
          <option value="800000">$800,000</option>
          <option value="900000">$900,000</option>
          <option value="1000000">$1,000,000</option>
        </select>
      </div>`);

    const $minSqftSelector = $(`
      <div class="search-config-field sqftSelector">
        <label class="ylopo-hidden-label" for="min-sqft">Min Sqft</label>
        <select id="min-sqft" class="search-config-item">
          <option value="">Min Sqft</option>
          <option value="200">200 sqft</option>
          <option value="400">400 sqft</option>
          <option value="600">600 sqft</option>
          <option value="800">800 sqft</option>
          <option value="1000">1,000 sqft</option>
          <option value="1200">1,200 sqft</option>
          <option value="1400">1,400 sqft</option>
          <option value="1600">1,600 sqft</option>
          <option value="1800">1,800 sqft</option>
          <option value="2000">2,000 sqft</option>
        </select>
      </div>`);

    const $maxSqftSelector = $(`
      <div class="search-config-field sqftSelector">
        <label class="ylopo-hidden-label" for="max-sqft">Max Sqft</label>
        <select id="max-sqft" class="search-config-item">
          <option value="">Max Sqft</option>
          <option value="2000">2,000 sqft</option>
          <option value="4000">4,000 sqft</option>
          <option value="6000">6,000 sqft</option>
          <option value="8000">8,000 sqft</option>
          <option value="10000">10,000 sqft</option>
          <option value="12000">12,000 sqft</option>
          <option value="14000">14,000 sqft</option>
          <option value="16000">16,000 sqft</option>
          <option value="18000">18,000 sqft</option>
          <option value="20000">20,000 sqft</option>
        </select>
      </div>`);

    const $bedsSelector = $(`
      <div class="search-config-field bedsSelector">
        <label class="ylopo-hidden-label" for="beds">Beds</label>
        <select id="beds" class="search-config-item">
          <option value="">Beds</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
          <option value="6">6+</option>
        </select>
      </div>`);

    const $bathsSelector = $(`
      <div class="search-config-field bathsSelector">
        <label class="ylopo-hidden-label" for="baths">Baths</label>
        <select id="baths" class="search-config-item">
          <option value="">Baths</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
          <option value="6">6+</option>
        </select>
      </div>`);

    if(propertyTypeSelector){
      $v5SearchWidget.find('#search-filters .propertyTypeSelector').append($propertyTypeSelector);
    }
    if(priceSelector){
      $v5SearchWidget.find('#search-filters').append($minPriceSelector);
      $v5SearchWidget.find('#search-filters').append($maxPriceSelector);
    }
    if (sqftSelector) {
      $v5SearchWidget.find('#search-filters').append($minSqftSelector);
      $v5SearchWidget.find('#search-filters').append($maxSqftSelector);
    }
    if (bedsSelector){
      $v5SearchWidget.find('#search-filters').append($bedsSelector);
    }
    if (bathsSelector){
      $v5SearchWidget.find('#search-filters').append($bathsSelector);
    }
    $v5SearchWidget.appendTo(container);
  }
  function loadExternalCSS(href) {
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }
  }
  function callTestAPI(){
    console.log('Calling test API');
    const myHeaders = new Headers();
    myHeaders.append("accept", "*/*");
    myHeaders.append("accept-language", "en-US,en;q=0.9");
    myHeaders.append("baggage", "sentry-environment=direct,sentry-release=production_6180,sentry-public_key=0d2f170da99ddd8d3befc10a7f4ddd29,sentry-trace_id=6655a5e03856429ab32ea84645875850,sentry-org_id=1402758,sentry-sampled=false,sentry-sample_rand=0.6192290653392194,sentry-sample_rate=0.1");
    myHeaders.append("cache-control", "no-cache");
    myHeaders.append("content-type", "application/json");
    myHeaders.append("dm_loc", "/home/site/e3fd21df/home");
    myHeaders.append("dsid", "1240288");
    myHeaders.append("pragma", "no-cache");
    myHeaders.append("priority", "u=1, i");
    myHeaders.append("referer", "https://my.duda.co/home/site/e3fd21df/home");
    myHeaders.append("sec-ch-ua", "\"Not(A:Brand\";v=\"8\", \"Chromium\";v=\"144\", \"Google Chrome\";v=\"144\"");
    myHeaders.append("sec-ch-ua-mobile", "?0");
    myHeaders.append("sec-ch-ua-platform", "\"Windows\"");
    myHeaders.append("sec-fetch-dest", "empty");
    myHeaders.append("sec-fetch-mode", "cors");
    myHeaders.append("sec-fetch-site", "same-origin");
    myHeaders.append("sentry-trace", "6655a5e03856429ab32ea84645875850-b2d78c5ea7398f1e-0");
    myHeaders.append("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36");
    myHeaders.append("x-requested-with", "XMLHttpRequest");
    myHeaders.append("Cookie", "IR_gbd=duda.co; _fbp=fb.1.1766180421868.82038659091200705; cebs=1; hubspotutk=ead7da40a4a0d309143553cb48d3d06f; __hssrc=1; _dm_ga_clientId=4a100b0b-a286-4676-b4e0-581d17cd0404; language=en; landingPage=/signup; d_signup_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpcCI6IjEyNC4yMTcuMjAuNTgiLCJjcmVhdGVkQXQiOjE3NjYxODEwMzh9.QJJCiGTK-w8H7AYPci1-abygSJ4FbjR7Q-X-G8dE6bo; account_uuid=7ad764c28d7c424d8e4a39d38796864a; _gd_visitor=8b69b600-cf7c-4bbf-863a-f2f3fb3b3589; __zlcmid=1VgoE9xDfLyWC63; _gd_svisitor=3dd1027aece93800f5b332691e030000eef40100; __stripe_mid=b2e69729-c434-48d8-8f4d-ac835d9520ca3cb3ea; _dm_ac_tokens=ChE4tvjHXpvKSrg/NmomZAMPh08tjyhpB5WR/PHV/q+4ozbZmsPI5A==; first_conversion_medium_touchpoints=null%3B%20null%3B%20null%3B%20null; first_conversion_campaign_touchpoints=null%3B%20null%3B%20null%3B%20null; first_conversion_term_touchpoints=null%3B%20null%3B%20null%3B%20null; first_conversion_content_touchpoints=null%3B%20null%3B%20null%3B%20null; __adroll_fpc=0a7dd2848e0a4aec79bd51b94853dcf8-1769464891653; __ar_v4=NK6BCP2ZPJC2BEAS7JMXC2%3A20260125%3A9%7C5PYFNWAESVGU5BU47WLRIT%3A20260125%3A9%7CLVLOIN3JF5FT3CD5CBETI7%3A20260125%3A9; first_conversion_source_touchpoints=direct%3B%20direct%3B%20direct%3B%20di; _dm_remember_me=VWIzTUZoNCUyRjhUT3VoVTZlRHdhQzhnJTNEJTNEOkEyckJMV09YeWN6UnlVYkplc2ZMdWclM0QlM0Q; _gid=GA1.2.1889925267.1770982022; _ce.clock_data=808%2C124.217.22.235%2C1%2C8e253f85246590342756399a57054cb8%2CChrome%2CPH; _ga_9WXYK3PMB6=GS2.1.s1771033413$o12$g1$t1771033429$j44$l0$h0; _conv_r=s%3Auniversity.duda.co*m%3Areferral*t%3A*c%3A; JSESSIONID=B5AFD73034B0E10B3CF0D42B13B16178; _dm_account=%7B%22name%22%3A%22rbedana%40ylopo.com%22%2C%22uuid%22%3A%227ad764c28d7c424d8e4a39d38796864a%22%2C%22gaType%22%3A%22STAFF%22%2C%22lastLogin%22%3A1771033417000%7D; cebsp_=22; _ce.s=v~6f07ee01c69aa40ea49e8e8b8e871488065c366e~lcw~1771063240141~vir~returning~lva~1771012969186~vpv~0~v11ls~04893b90-098c-11f1-87ec-7bd067c5f15c~vdva~1769299199999~gtrk.la~mlls3ifk~v11.cs~268877~v11.s~04893b90-098c-11f1-87ec-7bd067c5f15c~v11.vs~6f07ee01c69aa40ea49e8e8b8e871488065c366e~v11.fsvd~eyJ1cmwiOiJzdXBwb3J0LmR1ZGEuY28vaGMvZW4tdXMvYXJ0aWNsZXMvKiIsInJlZiI6Imh0dHBzOi8vbXkuZHVkYS5jby8iLCJ1dG0iOltdfQ%3D%3D~v11.sla~1771063240141~v11.wss~1771063240141~lcw~1771063241733; __hstc=244318362.ead7da40a4a0d309143553cb48d3d06f.1766180422957.1771033440027.1771063355191.37; _gcl_au=1.1.2086644868.1766180421.682060753.1769626712.1769627205; _ga=GA1.1.4a100b0b-a286-4676-b4e0-581d17cd0404; _ga_GFZCS4CS4Q=GS2.1.s1770982022$o32$g1$t1771063355$j60$l0$h0; IR_13628=1771063356030%7C0%7C1771063356030%7C%7C; __hssc=244318362.3.1771063355191; _conv_v=vi%3A1*sc%3A39*cs%3A1771063357*fs%3A1766180419*pv%3A208*ps%3A1771036154; _conv_s=si%3A39*sh%3A1771063356648-0.1769813991363558*pv%3A1; _gd_session=45a0e66e-af76-4280-8d7f-2bee07c32391; _uetsid=f7bc912008ce11f19e0c3d62ce354c09; _uetvid=5214fbd0dd2311f091bf0951eb8c0064; _dm_se_token_me=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50VXVpZCI6IjdhZDc2NGMyOGQ3YzQyNGQ4ZTRhMzlkMzg3OTY4NjRhIiwiYWNjb3VudE5hbWUiOiJyYmVkYW5hQHlsb3BvLmNvbSIsImNyZWF0aW9uVGltZSI6MTc3MTA2MzUzMzUxNiwiZXhwIjoxNzcxMDY1OTMzfQ.ece02-cz28pkOaI0ETEU7BQo0-qEaD6i5ewo3kdhRTI; AWSALB=kv9aU4RfVJ4ExqDR3xMgElumVUIY3oaBIrvdyXxvbrCchx5cAdZQpEqxb2ZtzUcSBfcRo+1u8zN9egBcnJXbeAy5KvNcarB5cUKvZbLthZiRPfKT/TvMtO3K5pOX; AWSALB=DgI9SbXxVEG6kM+W/LqMHXvoGbD6LvpMkSpQBXVDItfAIMs7xayABOQZ0FC8zhaZYXvYvNAPRpR2VLFsuy2Uf9DyRKHwUEDln/VS1MdcvnKpcd40QwcrVFTEmG2I; AWSALBCORS=DgI9SbXxVEG6kM+W/LqMHXvoGbD6LvpMkSpQBXVDItfAIMs7xayABOQZ0FC8zhaZYXvYvNAPRpR2VLFsuy2Uf9DyRKHwUEDln/VS1MdcvnKpcd40QwcrVFTEmG2I");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("https://my.duda.co/api/uis/htmlcsseditor/page/19853281/element/830275703/html?currentEditorPageId=19853281&_=1771063228384", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }

  var handler = {
    // these methods must be named init and clean

    init: function(options){
      console.log('loading css')
      loadExternalCSS('https://roj-ylopo.github.io/duda-test-widgets-1/build/css/test-widget-2.css');
      createSearchBar(options);
      console.log('Calling test API after init');
      callTestAPI();
    },

    clean: function(options) {
      options.container.innerHTML = '';
    }
  }

  dmAPI.registerExternalWidget('searchWidget', handler)
})();