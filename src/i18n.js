/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
import { addLocaleData } from 'react-intl';
import defaultMessages from './translations/en.json';
import { DEFAULT_LOCALE } from './containers/App/constants';

const translationMessages = {};
const { LANGUAGES = '' } = process.env;
const appLocales = LANGUAGES.split(',').map((lang) => lang.trim());

const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, defaultMessages)
      : {};

  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];

    return Object.assign(formattedMessages, { [key]: formattedMessage });
  }, {});
};

appLocales.forEach((lang) => {
  try {
    /* eslint-disable global-require */
    const langData = require(`react-intl/locale-data/${lang}`);
    addLocaleData(langData);

    const messages = require(`./translations/${lang}.json`);
    translationMessages[lang] = formatTranslationMessages.call(this, lang, messages);

    /* eslint-enable */
  } catch (e) {
    // probably a missing translation file
  }
});

export { formatTranslationMessages, appLocales, translationMessages };
