
"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import en from './locales/en.json';
import es from './locales/es.json';

type Locale = 'en' | 'es';

type TranslationVariables = { [key: string]: string | number };

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, variables?: TranslationVariables) => string;
}

const translations = { en, es };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'es') {
      setLocale('es');
    }
  }, []);

  const t = (key: string, variables?: TranslationVariables): string => {
    const getTranslation = (lang: Locale, transKey: string): string | undefined => {
      const keys = transKey.split('.');
      let result: any = translations[lang];
      for (const k of keys) {
        result = result?.[k];
        if (typeof result !== 'string' && typeof result !== 'object') {
            return undefined;
        }
      }
      return typeof result === 'string' ? result : undefined;
    }

    let translation = getTranslation(locale, key) || getTranslation('en', key) || key;

    if (variables) {
      Object.keys(variables).forEach((varKey) => {
        const regex = new RegExp(`{${varKey}}`, 'g');
        translation = translation.replace(regex, String(variables[varKey]));
      });
    }

    return translation;
  };
  

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
