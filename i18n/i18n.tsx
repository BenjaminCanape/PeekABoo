import I18n from "react-native-i18n";
import en from "./Locales/en";
import fr from "./Locales/fr";

I18n.fallbacks = true;

I18n.translations = {
  en,
  fr,
};

export default I18n;
