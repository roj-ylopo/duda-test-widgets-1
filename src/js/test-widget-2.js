(function() {
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

  var handler = {
    // these methods must be named init and clean

    init: function(options){
      console.log('loading css')
      loadExternalCSS('https://roj-ylopo.github.io/duda-test-widgets-1/build/css/test-widget-2.css');
      createSearchBar(options);
    },

    clean: function(options) {
      options.container.innerHTML = '';
    }
  }

  dmAPI.registerExternalWidget('searchWidget', handler)
})();