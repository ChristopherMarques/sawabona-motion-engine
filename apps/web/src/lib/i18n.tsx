"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import en from "../../messages/en.json";
import ptBR from "../../messages/pt-BR.json";

type Locale = "en" | "pt-BR";
type Dictionary = Record<string, any>;

const dictionaries: Record<Locale, Dictionary> = {
    "en": en,
    "pt-BR": ptBR
};

interface I18nContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string, namespace?: string) => string;
    getDictionary: (namespace: string) => Record<string, string>;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
    const [locale, setLocale] = useState<Locale>("pt-BR");

    useEffect(() => {
        const saved = localStorage.getItem("locale") as Locale;
        if (saved && (saved === "en" || saved === "pt-BR")) {
            setLocale(saved);
        } else {
            const browserLang = navigator.language;
            if (browserLang.includes("pt")) setLocale("pt-BR");
            else setLocale("en");
        }
    }, []);

    const changeLocale = (newLocale: Locale) => {
        setLocale(newLocale);
        localStorage.setItem("locale", newLocale);
    };

    const getDictionary = (namespace: string) => {
        return dictionaries[locale][namespace] || dictionaries["en"][namespace] || {};
    };

    const t = (key: string, namespace?: string) => {
        // If a key contains a dot, assume it's namespace.childKey
        let ns = namespace;
        let finalKey = key;

        if (!ns && key.includes(".")) {
            const parts = key.split(".");
            ns = parts[0];
            finalKey = parts.slice(1).join(".");
        }

        if (ns) {
            const dict = dictionaries[locale][ns] || dictionaries["en"][ns];
            return dict ? dict[finalKey] || finalKey : finalKey;
        }

        // Flat fallback search (if no namespace provided)
        for (const dictKey in dictionaries[locale]) {
            if (dictionaries[locale][dictKey][finalKey]) {
                return dictionaries[locale][dictKey][finalKey];
            }
        }

        return finalKey;
    };

    return (
        <I18nContext.Provider value={{ locale, setLocale: changeLocale, t, getDictionary }}>
            {children}
        </I18nContext.Provider>
    );
};

export const useI18n = () => {
    const context = useContext(I18nContext);
    if (context === undefined) {
        throw new Error("useI18n must be used within an I18nProvider");
    }
    return context;
};
