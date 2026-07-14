import { translations } from './translation.js';

const supportedLanguages = ['en', 'ms', 'bn', 'ne'];

function normalizeLanguage(lang) {
    if (!lang) return 'en';

    const cleanLang = String(lang).trim();
    if (supportedLanguages.includes(cleanLang)) return cleanLang;

    const shortLang = cleanLang.split('-')[0];
    return supportedLanguages.includes(shortLang) ? shortLang : 'en';
}

function updateActiveLanguageButton(lang) {
    document.querySelectorAll('[data-lang]').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}

function updateTypewriterText(lang) {
    const typedTextElement = document.getElementById('typed-text');
    if (!typedTextElement) return;

    const text =
        (translations[lang] && translations[lang].welcomeBack) ||
        (translations.en && translations.en.welcomeBack) ||
        'Welcome Back!';

    let i = 0;
    typedTextElement.textContent = '';

    function typeWriter() {
        if (i < text.length) {
            typedTextElement.textContent = text.substring(0, i + 1);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    setTimeout(typeWriter, 300);
}

// Change all text and placeholders
export function changeLanguage(lang) {
    lang = normalizeLanguage(lang);

    localStorage.setItem('selectedLanguage', lang);
    localStorage.setItem('preferredLanguage', lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-translate]").forEach(el => {
        const key = el.getAttribute("data-translate");
        el.textContent = (translations[lang] && translations[lang][key]) || key;
    });

    document.querySelectorAll("[data-translate-placeholder]").forEach(el => {
        const key = el.getAttribute("data-translate-placeholder");
        if (translations[lang] && translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    const dropdown = document.getElementById('languageDropdown');
    if (dropdown) dropdown.classList.remove('active');

    updateActiveLanguageButton(lang);
    updateTypewriterText(lang);

    return lang;
}

// Load saved or default language
export function loadLanguage() {
    const savedLang =
        localStorage.getItem('selectedLanguage') ||
        localStorage.getItem('preferredLanguage') ||
        localStorage.getItem('language') ||
        'en';
    
    return changeLanguage(savedLang);
}

// Called when clicking a language button
export function selectLanguage(lang) {
    changeLanguage(lang);
}

// Close dropdown when clicking outside
export function setupDropdownClickOutside() {
    document.addEventListener('click', function(event) {
        const dropdown = document.getElementById('languageDropdown');
        const menuIcon = document.querySelector('.menu-icon');

        if (
            dropdown &&
            !dropdown.contains(event.target) &&
            (!menuIcon || !menuIcon.contains(event.target))
        ) {
            dropdown.classList.remove('active');
        }
    });
}

// Update welcome text animation
/*function updateTypewriterText(lang) {
    const typedTextElement = document.getElementById('typed-text');
    if (typedTextElement && translations[lang] && translations[lang].welcomeBack) {
        const text = translations[lang].welcomeBack;
        let i = 0;
        typedTextElement.textContent = '';
        function typeWriter() {
            if (i < text.length) {
                typedTextElement.textContent = text.substring(0, i + 1);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        setTimeout(typeWriter, 300);
    }
}*/

// Detect browser language
export function detectBrowserLanguage() {
    const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || 'en';
    const langMap = {
        'en': 'en', 
        'en-US': 'en', 
        'en-GB': 'en',

        'bn': 'bn', 
        'bn-BD': 'bn', 
        'bn-IN': 'bn',

        'ne': 'ne', 
        'ne-NP': 'ne',
    };
    return langMap[browserLang] || langMap[browserLang.split('-')[0]] || 'en';
}

// Init with browser detection or saved language
export function initializeWithDetection() {
    let selectedLang =
        localStorage.getItem('selectedLanguage') ||
        localStorage.getItem('preferredLanguage') ||
        localStorage.getItem('language') ||
        detectBrowserLanguage();

    selectedLang = normalizeLanguage(selectedLang);
    setupDropdownClickOutside();

    return changeLanguage(selectedLang);
}

// Optional: expose to HTML onclick
// Remove this if you use only addEventListener in JS

export function translateElement(element) {
    const lang = normalizeLanguage(
        localStorage.getItem('selectedLanguage') ||
        localStorage.getItem('preferredLanguage') ||
        localStorage.getItem('language') ||
        'en'
    );

    if (!element) return;

    element.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        const translated =
            (translations[lang] && translations[lang][key]) ||
            (translations.en && translations.en[key]);

        if (translated) {
            el.textContent = translated;
        }
    });

    element.querySelectorAll('[data-translate-placeholder]').forEach(el => {
        const key = el.getAttribute('data-translate-placeholder');
        const translated =
            (translations[lang] && translations[lang][key]) ||
            (translations.en && translations.en[key]);

        if (translated) {
            el.placeholder = translated;
        }
    });
}

// Expose functions for HTML onclick usage.
window.selectLanguage = selectLanguage;
window.switchLang = selectLanguage;
