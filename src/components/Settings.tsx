import { useState, useEffect } from 'react';
import { useTonConnectUI, Locales, THEME } from '@tonconnect/ui-react';

export const Settings = () => {
  const [lang, setLang] = useState('en');
  const [theme, setTheme] = useState(THEME.DARK);
  const [tonConnectUI , setOptions] = useTonConnectUI()

  useEffect(() => {
    tonConnectUI.uiOptions = {
      language: lang as Locales
    }

    setOptions({
      language: lang as Locales
    })
  }, [setOptions, lang]);

  useEffect(() => {
    setOptions({
      uiPreferences: {
        theme
      }
    })
  }, [setOptions, theme]);

  return (
    <div>
      <select value={ lang } onChange={ e => setLang(e.target.value)}>
        <option value='ru'>ru</option>
        <option value='en'>en</option>
      </select>

      <select 
        value={theme} 
        onChange={e => setTheme(e.target.value as THEME)}
      >
        <option value={THEME.DARK}>Тёмная</option>
        <option value={THEME.LIGHT}>Светлая</option>
      </select>
    </div>
  )
}