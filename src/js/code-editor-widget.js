(function() {
  function createSearchBar(options) {
    const {container, props} = options;
    const {bathsSelector, bedsSelector, currencyLanguage, priceSelector, propertyTypeSelector, searchSettings, sqftSelector} = props;
        
    console.log('props:', props);
    // Create main container
    container.style.fontFamily = 'sans-serif';
    container.style.maxWidth = '1000px';
    container.style.padding = '16px';
    container.style.border = '1px solid #ccc';
    container.style.borderRadius = '8px';
    container.style.background = '#fafafa';
    container.className = 'search-widget-container';

    // Search input and button
    const searchRow = document.createElement('div');
    searchRow.style.display = 'flex';
    searchRow.style.marginBottom = '12px';
    searchRow.className = 'search-row';

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search...';
    searchInput.style.flex = '1';
    searchInput.style.padding = '8px';

    const searchBtn = document.createElement('button');
    searchBtn.textContent = 'Search';
    searchBtn.style.marginLeft = '8px';
    searchBtn.style.padding = '8px 16px';

    searchRow.appendChild(searchInput);
    searchRow.appendChild(searchBtn);

    // Radio buttons
    const radioRow = document.createElement('div');
    radioRow.style.marginBottom = '12px';
    radioRow.className = 'search-type-radio-row';
    

    const areaRadio = document.createElement('input');
    areaRadio.type = 'radio';
    areaRadio.name = 'searchType';
    areaRadio.value = 'area';
    areaRadio.id = 'search-area';
    areaRadio.checked = true;

    const areaLabel = document.createElement('label');
    areaLabel.htmlFor = 'search-area';
    areaLabel.textContent = 'Search by Area';
    areaLabel.style.marginRight = '16px';

    const addressRadio = document.createElement('input');
    addressRadio.type = 'radio';
    addressRadio.name = 'searchType';
    addressRadio.value = 'address';
    addressRadio.id = 'search-address';

    const addressLabel = document.createElement('label');
    addressLabel.htmlFor = 'search-address';
    addressLabel.textContent = 'Search by Address';

    radioRow.appendChild(areaRadio);
    radioRow.appendChild(areaLabel);
    radioRow.appendChild(addressRadio);
    radioRow.appendChild(addressLabel);

    // Dropdowns
    function createDropdown(labelText, optionsArr) {
      const wrapper = document.createElement('div');
      wrapper.style.marginBottom = '8px';

      const label = document.createElement('label');
      label.textContent = labelText;
      label.style.display = 'block';
      label.style.marginBottom = '2px';

      const select = document.createElement('select');
      select.style.width = '100%';
      select.style.padding = '6px';

      optionsArr.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.label;
        select.appendChild(option);
      });

      wrapper.appendChild(label);
      wrapper.appendChild(select);
      return wrapper;
    }

    const propertyTypes = [
      { value: '', label: 'Any Type' },
      { value: 'house', label: 'House' },
      { value: 'condo', label: 'Condo' },
      { value: 'townhouse', label: 'Townhouse' },
      { value: 'apartment', label: 'Apartment' }
    ];

    const priceOptions = [
      { value: '', label: 'Any' },
      { value: '100000', label: '$100,000' },
      { value: '200000', label: '$200,000' },
      { value: '300000', label: '$300,000' },
      { value: '400000', label: '$400,000' },
      { value: '500000', label: '$500,000+' }
    ];

    const sqftOptions = [
      { value: '', label: 'Any' },
      { value: '500', label: '500+' },
      { value: '1000', label: '1,000+' },
      { value: '1500', label: '1,500+' },
      { value: '2000', label: '2,000+' }
    ];

    const bedBathOptions = [
      { value: '', label: 'Any' },
      { value: '1', label: '1+' },
      { value: '2', label: '2+' },
      { value: '3', label: '3+' },
      { value: '4', label: '4+' }
    ];

    const propertyTypeDropdown = propertyTypeSelector ? createDropdown('Property Type', propertyTypes) : null;
    const minPriceDropdown = priceSelector ? createDropdown('Min Price', priceOptions) : null;
    const maxPriceDropdown = priceSelector ? createDropdown('Max Price', priceOptions) : null;
    const minSqftDropdown = sqftSelector ? createDropdown('Min Sq Ft', sqftOptions) : null;
    const maxSqftDropdown = sqftSelector ? createDropdown('Max Sq Ft', sqftOptions) : null;
    const bedsDropdown = bedsSelector ? createDropdown('Beds', bedBathOptions) : null;
    const bathsDropdown = bathsSelector ? createDropdown('Baths', bedBathOptions) : null;

    // Clear button
    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Clear';
    clearBtn.style.marginTop = '12px';
    clearBtn.style.width = '100%';
    clearBtn.style.padding = '8px';

    // Clear functionality
    clearBtn.onclick = function() {
      searchInput.value = '';
      areaRadio.checked = true;
      addressRadio.checked = false;
      propertyTypeDropdown.querySelector('select').selectedIndex = 0;
      minPriceDropdown.querySelector('select').selectedIndex = 0;
      maxPriceDropdown.querySelector('select').selectedIndex = 0;
      minSqftDropdown.querySelector('select').selectedIndex = 0;
      maxSqftDropdown.querySelector('select').selectedIndex = 0;
      bedsDropdown.querySelector('select').selectedIndex = 0;
      bathsDropdown.querySelector('select').selectedIndex = 0;
    };

    // Assemble everything
    container.appendChild(searchRow);
    container.appendChild(radioRow);
    propertyTypeDropdown ? container.appendChild(propertyTypeDropdown) : null;
    minPriceDropdown ? container.appendChild(minPriceDropdown) : null;
    maxPriceDropdown ? container.appendChild(maxPriceDropdown) : null;
    minSqftDropdown ? container.appendChild(minSqftDropdown) : null;
    maxSqftDropdown ? container.appendChild(maxSqftDropdown) : null;
    bedsDropdown ? container.appendChild(bedsDropdown) : null;
    bathsDropdown ? container.appendChild(bathsDropdown) : null;
    container.appendChild(clearBtn);

    // return container;
  }
  function loadExternalCSS(href) {
  if (!document.querySelector(`link[href="${href}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }
  }
  function createCodeEditor(options) {
    const {container, props} = options;
    dmAPI.getCollection({collectionName: 'code-blocks'}).then(
      function(data){ 
        console.log(data); 
        console.log('getting current code from collection');
        const currentCode = data[0].data.html; // Assuming you want the HTML from the first item in the collection
        console.log('Current code from collection:', currentCode);
        currentCode ? container.innerHTML = currentCode : container.innerHTML = '<p>No code found in collection.</p>';
      }
    )
  }

  var handler = {
    // these methods must be named init and clean

    init: function(options){
      // loadExternalCSS('/test-widget-1.css');
      // createSearchBar(options);
      createCodeEditor(options);
    },

    clean: function(options) {
      options.container.innerHTML = '';
    }
  }

  dmAPI.registerExternalWidget('code-editor', handler)
})();