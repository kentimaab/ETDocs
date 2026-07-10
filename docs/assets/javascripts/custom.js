// Palette persistence fix: __md_scope is page-specific so the saved theme key
// differs on every subpage. Wrap __md_get/__md_set to also read/write a root
// key (/.__palette) and retroactively re-apply the palette if the page-local
// restoration missed it.
(function () {
  var ROOT_KEY = '/.__palette';

  if (typeof __md_get !== 'undefined') {
    var _get = __md_get;
    var _set = __md_set;

    __md_get = function (e, t, _) {
      var v = _get(e, t, _);
      if (v !== null) return v;
      if (e === '__palette') {
        try { return JSON.parse((t || localStorage).getItem(ROOT_KEY)); } catch (err) {}
      }
      return null;
    };

    __md_set = function (e, t, _, a) {
      _set(e, t, _, a);
      if (e === '__palette') {
        try { (_ || localStorage).setItem(ROOT_KEY, JSON.stringify(t)); } catch (err) {}
      }
    };

    // Retroactively apply the root-stored palette if the page-local restore missed it.
    document.addEventListener('DOMContentLoaded', function () {
      var stored = null;
      try { stored = JSON.parse(localStorage.getItem(ROOT_KEY)); } catch (e) {}
      if (!stored || !stored.color || !stored.color.scheme) return;

      var wantedScheme = stored.color.scheme;
      if (document.body.getAttribute('data-md-color-scheme') !== wantedScheme) {
        for (var key in stored.color) {
          document.body.setAttribute('data-md-color-' + key, stored.color[key]);
        }
        var inputs = document.querySelectorAll('[name="__palette"]');
        var idx = typeof stored.index === 'number' ? stored.index : 0;
        if (inputs && inputs[idx]) inputs[idx].checked = true;
      }
    });
  }
})();

document.addEventListener('DOMContentLoaded', function () {
    const tagInput = document.getElementById('tagInput');
    const feedback = document.getElementById('feedback');
    if (!tagInput || !feedback) return;

    const tagPattern = /^[A-Za-z0-9_]+\.[A-Za-z0-9_]+\.[A-Za-z0-9_]+_[A-Za-z0-9_]+_[A-Za-z0-9]+$/;

    tagInput.addEventListener('input', function () {
        const input = this.value;
        
        if (tagPattern.test(input)) {
            this.classList.add('valid');
            feedback.classList.remove('hidden');
            
        } else {
            
            this.classList.remove('valid');
            feedback.classList.add('hidden');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const tagTextarea = document.getElementById('tagTextarea');
    const tagResults = document.getElementById('tagResults');
    const filterButton = document.getElementById('filterButton');
    if (!tagTextarea || !tagResults || !filterButton) return;

    // Updated regex pattern with exactly two underscores and alphanumerics after the last underscore
    const tagPattern = /^[A-Za-z0-9_]+\.[A-Za-z0-9_]+\.[A-Za-z0-9_]+_[A-Za-z0-9_]+_[A-Za-z0-9]+$/;

    let showOnlyInvalid = false;

    function suggestCorrection(tag) {
        const parts = tag.split('_');
        if (parts.length !== 3) return '';

        // Try to correct common mistakes:
        // 1. Ensure the last part contains only alphanumeric characters.
        const lastPart = parts[2].replace(/[^A-Za-z0-9]/g, '');

        // 2. Reconstruct the tag with corrected last part
        return `${parts[0]}_${parts[1]}_${lastPart}`;
    }

    function validateTags() {
        const rows = tagTextarea.value.split('\n');
        tagResults.innerHTML = ''; // Clear previous results

        rows.forEach(row => {
            const resultDiv = document.createElement('div');
            resultDiv.classList.add('tag-result');
            resultDiv.textContent = row;

            if (tagPattern.test(row)) {
                resultDiv.classList.add('valid');
                resultDiv.innerHTML += ' <span class="icon">✅</span>'; // Checkmark
            } else {
                resultDiv.classList.add('invalid');
                resultDiv.innerHTML += ' <span class="icon">❌</span>'; // Cross

                // Add suggestion
                const suggestion = suggestCorrection(row);
                if (suggestion) {
                    const suggestionDiv = document.createElement('div');
                    suggestionDiv.classList.add('suggestion');
                    suggestionDiv.textContent = `Did you mean: ${suggestion}?`;
                    resultDiv.appendChild(suggestionDiv);
                }
            }

            if (showOnlyInvalid && resultDiv.classList.contains('valid')) {
                resultDiv.style.display = 'none';
            } else {
                resultDiv.style.display = 'block';
            }

            tagResults.appendChild(resultDiv);
        });
    }

    function toggleFilter() {
        showOnlyInvalid = !showOnlyInvalid;
        filterButton.textContent = showOnlyInvalid ? 'Show All Tags' : 'Show Only Invalid Tags';
        validateTags(); // Re-validate to apply the filter
    }

    tagTextarea.addEventListener('input', validateTags);
    filterButton.addEventListener('click', toggleFilter);

    // Initial validation on page load
    validateTags();
});


document.addEventListener('DOMContentLoaded', function () {
    const tagTextarea = document.getElementById('tagTextarea-modbus');
    const tagResults = document.getElementById('tagResults-modbus');
    const filterButton = document.getElementById('filterButton-modbus');
    if (!tagTextarea || !tagResults || !filterButton) return;

    // Updated regex pattern with exactly two underscores and alphanumerics after the last underscore
    const tagPattern = /^[A-Za-z0-9_]+_[A-Za-z0-9_]+_[A-Za-z0-9]+$/;

    function validateTags() {
        const rows = tagTextarea.value.split('\n');
        tagResults.innerHTML = ''; // Clear previous results

        rows.forEach(row => {
            const resultDiv = document.createElement('div');
            resultDiv.classList.add('tag-result');
            resultDiv.textContent = row;

            if (tagPattern.test(row)) {
                resultDiv.classList.add('valid');
                resultDiv.innerHTML += ' <span class="icon">✅</span>'; // Checkmark
            } else {
                resultDiv.classList.add('invalid');
                resultDiv.innerHTML += ' <span class="icon">❌</span>'; // Cross
            }

            tagResults.appendChild(resultDiv);
        });
    }

    function filterInvalidTags() {
        const allResults = document.querySelectorAll('.tag-result');
        allResults.forEach(result => {
            if (result.classList.contains('valid')) {
                result.style.display = 'none';
            } else {
                result.style.display = 'block';
            }
        });
    }

    tagTextarea.addEventListener('input', validateTags);
    filterButton.addEventListener('click', filterInvalidTags);

    // Initial validation on page load
    validateTags();
});


const modifyBtn = document.getElementById('modifyBtn');
if (modifyBtn) modifyBtn.addEventListener('click', function () {
    try {
        const wqFileInput = document.getElementById('themeFile');
        const themeFileInput = document.getElementById('wqFile');

        if (wqFileInput.files.length === 0 || themeFileInput.files.length === 0) {
            alert('Please select both XML files.');
            return;
        }

        const xmlFile = wqFileInput.files[0];
        const themeFile = themeFileInput.files[0];

        const reader1 = new FileReader();
        const reader2 = new FileReader();

        reader1.onload = function (e1) {
            const xmlString = e1.target.result;

            // Parse the XML
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

            // Find all <color> tags and modify them
            const colors = xmlDoc.getElementsByTagName('color');
            const newColors = [];
            for (let i = 0; i < colors.length; i++) {
                const colorElement = colors[i];
                const colorName = colorElement.getAttribute('name').replace('md_theme_', '');
                const colorValue = colorElement.textContent.replace('#', 'ff'); // Convert #RRGGBB to ffRRGGBB

                // Create new <Color> tag
                const newColorElement = xmlDoc.createElement('Color');
                newColorElement.setAttribute('Name', colorName);
                newColorElement.setAttribute('Value', colorValue);

                // Store the new <Color> tag for later insertion
                newColors.push(newColorElement);
            }

            reader2.onload = function (e2) {
                try {
                    const themeString = e2.target.result;

                    // Parse the theme XML
                    const themeDoc = parser.parseFromString(themeString, 'text/xml');
                    const themes = themeDoc.getElementsByTagName('Themes');

                    const newTheme = themeDoc.createElement('Theme');
                    newTheme.setAttribute('Name', 'newTheme');

                    // Set RoleColors
                    const roleColorsElement = themeDoc.createElement('RoleColors');
                    
                    newTheme.appendChild(roleColorsElement);

                    // Set the <UserColors> element in the theme file
                    const userColorsElement = themeDoc.createElement('UserColors');

                    // Append the new <Color> elements to <UserColors>
                    newColors.forEach((colorElement) => {
                        userColorsElement.appendChild(colorElement);
                    });
                    
                    const templateColors = [
                        {Name : "SeeThrough" , Value: "00000000"},
                        {Name : "OK" , Value: "ff0fcc80"},
                        {Name : "Symbol_Active" , Value: "ff0fcc80"},
                        {Name : "Symbol_Alarm" , Value: "fffa3232"},
                        {Name : "Symbol_Default" , Value: "ff444444"},
                        {Name : "Symbol_Error" , Value: "fffa3232"},
                        {Name : "Symbol_Service" , Value: "ff6d319f"},
                        {Name : "Symbol_Warning" , Value: "ffff9600"},
                        {Name : "Alarm_Severity_0" , Value: "ffaa557f"},
                        {Name : "Alarm_Severity_1" , Value: "ff8b0000"},
                        {Name : "Alarm_Severity_2" , Value: "ffff6f00"},
                        {Name : "Alarm_Severity_3" , Value: "ffffff33"},
                        {Name : "Alarm_Severity_4" , Value: "ff004080"},
                        {Name : "Alarm_Severity_5" , Value: "ff4b006a"}
                    ]
                    // Append the new <Color> elements to <UserColors>
                    templateColors.forEach((templateColor) => {
                        const tempColor = themeDoc.createElement('Color');
                        tempColor.setAttribute('Name', templateColor.Name);
                        tempColor.setAttribute('Value', templateColor.Value);
                        userColorsElement.appendChild(tempColor);
                    });
                    
                    newTheme.appendChild(userColorsElement);
                    themes[0].appendChild(newTheme);
                    
                    // Serialize the merged XML back to a string
                    const serializer = new XMLSerializer();
                    const mergedXmlString = serializer.serializeToString(themeDoc);
                    
                    // Create a downloadable link for the merged XML
                    const blob = new Blob([mergedXmlString], { type: 'text/xml' });
                    const url = URL.createObjectURL(blob);
                    const downloadLink = document.getElementById('downloadLink');
                    downloadLink.href = url;
                    downloadLink.download = 'Themes.kdat';
                    downloadLink.style.display = 'inline';
                    downloadLink.textContent = 'Download Merged XML';
                } catch (error) {
                    alert(error.message);
                }
            };

            reader2.readAsText(themeFile);
        };

        reader1.readAsText(xmlFile);
    } catch (error) {
        alert(error);
    }
});

const wqFileEl = document.getElementById('wqFile');
if (wqFileEl) wqFileEl.addEventListener('change', function () {
    const fileInput = document.getElementById('wqFile');
    const fileNameDisplay = document.getElementById('wqFileNameDisplay');
    
    if (fileInput.files.length > 0) {
        fileNameDisplay.textContent = `Selected file: ${fileInput.files[0].name}`;
    } else {
        fileNameDisplay.textContent = ''; // Clear the text if no file is selected
    }
});
// Cross-area link badges + return banner
document.addEventListener('DOMContentLoaded', function () {
    const areas = ['mod', 'bms', 'wwt'];
    const labels = { mod: 'Modular Framework', bms: 'Building Management System', wwt: 'Water & Wastewater Treatment' };
    const short  = { mod: 'MOD', bms: 'BMS', wwt: 'WWT' };
    const path = window.location.pathname;
    const currentArea = areas.find(a => path.includes('/' + a + '/'));

    // Show return banner if we arrived via a cross-area link
    const fromUrl   = sessionStorage.getItem('xref-from-url');
    const fromArea  = sessionStorage.getItem('xref-from-area');
    const fromTitle = sessionStorage.getItem('xref-from-title');

    if (fromUrl && fromArea && currentArea && currentArea !== fromArea) {
        const banner = document.createElement('div');
        banner.className = 'xref-return-banner xref-return-' + fromArea;
        banner.innerHTML =
            '&#8592; Back to <a href="' + fromUrl + '" class="xref-return-link">' + fromTitle + '</a>' +
            ' <span class="xref-return-area">(' + labels[fromArea] + ')</span>';
        const content = document.querySelector('.md-content__inner');
        if (content) content.insertBefore(banner, content.firstChild);

        banner.querySelector('.xref-return-link').addEventListener('click', function () {
            const scroll = sessionStorage.getItem('xref-from-scroll');
            if (scroll) sessionStorage.setItem('xref-restore-scroll', scroll);
            sessionStorage.removeItem('xref-from-url');
            sessionStorage.removeItem('xref-from-area');
            sessionStorage.removeItem('xref-from-title');
            sessionStorage.removeItem('xref-from-scroll');
        });
    }

    // Restore scroll position on return
    const restoreScroll = sessionStorage.getItem('xref-restore-scroll');
    if (restoreScroll) {
        sessionStorage.removeItem('xref-restore-scroll');
        requestAnimationFrame(function () {
            window.scrollTo({ top: parseInt(restoreScroll), behavior: 'instant' });
        });
    }

    // If we're back in the source area, clear stored referrer
    if (currentArea && currentArea === fromArea) {
        sessionStorage.removeItem('xref-from-url');
        sessionStorage.removeItem('xref-from-area');
        sessionStorage.removeItem('xref-from-title');
    }

    if (!currentArea) return;

    // Badge injection + store referrer on click
    document.querySelectorAll('.md-content a[href]').forEach(function (link) {
        if (link.classList.contains('xref-return-link')) return;
        if (link.classList.contains('arch-concept')) return;
        // Skip if a badge already exists (e.g. injected server-side by the hook)
        if (link.querySelector('.xref-badge')) return;
        const href = link.getAttribute('href');
        for (const area of areas) {
            if (area !== currentArea && href.includes('/' + area + '/')) {
                const badge = document.createElement('span');
                badge.className = 'xref-badge xref-' + area;
                badge.textContent = short[area] + ' →';
                link.appendChild(badge);

                link.addEventListener('click', function () {
                    sessionStorage.setItem('xref-from-url',    window.location.href);
                    sessionStorage.setItem('xref-from-area',   currentArea);
                    sessionStorage.setItem('xref-from-title',  document.title);
                    sessionStorage.setItem('xref-from-scroll', window.scrollY);
                });
                break;
            }
        }
    });
});

// Search shortcut hint badge
(function () {
    function injectSearchHint() {
        const form = document.querySelector('.md-search__form');
        if (!form || form.querySelector('.search-kbd-hint')) return;
        const hint = document.createElement('span');
        hint.className = 'search-kbd-hint';
        hint.innerHTML = 'press <kbd>S</kbd> to search';
        form.appendChild(hint);
        const input = form.querySelector('.md-search__input');
        if (input) {
            input.addEventListener('focus', () => hint.style.opacity = '0');
            input.addEventListener('blur', () => hint.style.opacity = '1');
        }
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectSearchHint);
    } else {
        injectSearchHint();
    }
})();

const themeFileEl = document.getElementById('themeFile');
if (themeFileEl) themeFileEl.addEventListener('change', function () {
    const fileInput = document.getElementById('themeFile');
    const fileNameDisplay = document.getElementById('themeFileNameDisplay');

    if (fileInput.files.length > 0) {
        fileNameDisplay.textContent = `Selected file: ${fileInput.files[0].name}`;
    } else {
        fileNameDisplay.textContent = ''; // Clear the text if no file is selected
    }
});

// Convert specific nav section headers into collapsible items, starting collapsed
(function () {
    const COLLAPSED = ['Guides', 'Reference'];

    function collapseNavSections() {
        document.querySelectorAll('.md-nav__item--section').forEach(function (item) {
            const ellipsis = item.querySelector('.md-nav__link .md-ellipsis');
            if (!ellipsis || !COLLAPSED.includes(ellipsis.textContent.trim())) return;

            item.classList.remove('md-nav__item--section');
            if (!item.classList.contains('md-nav__item--nested')) {
                item.classList.add('md-nav__item--nested');
            }
            item.classList.add('nav-item--collapsible-section');

            if (item.querySelector('.md-nav__link--active')) return;

            const toggle = item.querySelector(':scope > input.md-nav__toggle');
            if (toggle) toggle.checked = false;
        });
    }

    document.addEventListener('DOMContentLoaded', collapseNavSections);

    if (typeof document$ !== 'undefined') {
        document$.subscribe(collapseNavSections);
    }
})();
