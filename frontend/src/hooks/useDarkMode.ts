import { useState, useEffect } from 'react';

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('theme');
    return stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');

      const darkStyles = `
        .ant-card { background-color: transparent !important; border-color: rgb(60, 60, 60) !important; }
        .ant-card-body { background-color: transparent !important; color: rgb(240, 240, 240) !important; }
        .ant-layout { background-color: transparent !important; }
        .ant-layout-header { background-color: rgba(0, 0, 0, 0.5) !important; }
        .ant-layout-content { background-color: transparent !important; }
        .ant-card-head { background-color: rgba(0, 0, 0, 0.3) !important; border-color: rgb(60, 60, 60) !important; }
        .ant-card-head-title { color: rgb(240, 240, 240) !important; }
        .ant-card-extra { color: rgb(240, 240, 240) !important; }
        .ant-input { background-color: rgba(0, 0, 0, 0.3) !important; border-color: rgb(60, 60, 60) !important; color: rgb(240, 240, 240) !important; }
        .ant-input::placeholder { color: rgb(180, 180, 180) !important; }
        .ant-input:hover, .ant-input:focus { border-color: rgb(100, 100, 100) !important; }
        .ant-input-search .ant-input-group-addon { background-color: rgba(0, 0, 0, 0.3) !important; }
        .ant-input-search .ant-input { background-color: rgba(0, 0, 0, 0.3) !important; }
        .ant-input-affix-wrapper { background-color: #0000004d !important; border-color: rgb(60, 60, 60) !important; }
        .ant-input-affix-wrapper:hover, .ant-input-affix-wrapper:focus, .ant-input-affix-wrapper-focused { border-color: rgb(100, 100, 100) !important; }
        .ant-input-search-button { background-color: #0000004d !important; border-color: rgb(60, 60, 60) !important; }
        .ant-input-search-button:hover { background-color: rgba(0, 0, 0, 0.5) !important; }
        .ant-select-selector { background-color: rgba(0, 0, 0, 0.3) !important; border-color: rgb(60, 60, 60) !important; color: rgb(240, 240, 240) !important; }
        .ant-select-dropdown { background-color: rgb(45, 45, 45) !important; }
        .ant-select-item { color: rgb(240, 240, 240) !important; }
        .ant-select-item-option-active:not(.ant-select-item-option-disabled) { background-color: rgb(60, 60, 60) !important; }
        .ant-select-item-option-selected { background-color: rgb(55, 55, 55) !important; }
        .ant-picker { background-color: rgba(0, 0, 0, 0.3) !important; border-color: rgb(60, 60, 60) !important; }
        .ant-picker-input > input { color: rgb(240, 240, 240) !important; }
        .ant-picker-suffix, .ant-picker-clear, .ant-picker-separator { color: rgb(180, 180, 180) !important; }
        .ant-picker-dropdown { background-color: rgb(45, 45, 45) !important; }
        .ant-picker-panel-container { background-color: rgb(45, 45, 45) !important; }
        .ant-picker-header, .ant-picker-content th, .ant-picker-cell { color: rgb(240, 240, 240) !important; }
        .ant-picker-header button { color: rgb(180, 180, 180) !important; }
        .ant-btn { border-color: rgb(60, 60, 60) !important; }
        .ant-btn-default { background-color: rgba(0, 0, 0, 0.3) !important; color: rgb(240, 240, 240) !important; border-color: rgb(60, 60, 60) !important; }
        .ant-btn-default:hover { border-color: rgb(100, 100, 100) !important; }
        .ant-checkbox-wrapper { color: rgb(240, 240, 240) !important; }
        .ant-checkbox-inner { background-color: rgba(0, 0, 0, 0.3) !important; border-color: rgb(100, 100, 100) !important; }
        .ant-tag { background-color: rgba(0, 0, 0, 0.3) !important; color: rgb(240, 240, 240) !important; border-color: rgb(80, 80, 80) !important; }
        .ant-empty-description { color: rgb(180, 180, 180) !important; }
        .ant-progress-text { color: rgb(240, 240, 240) !important; }
        .ant-form-item-label > label { color: rgb(240, 240, 240) !important; }
        h1, h2, h3, h4, h5, h6 { color: rgb(240, 240, 240) !important; }
        p { color: rgb(240, 240, 240) !important; }
        span { color: rgb(240, 240, 240) !important; }
      `;

      const styleEl = document.getElementById('dark-mode-styles');
      if (styleEl) {
        styleEl.textContent = darkStyles;
      } else {
        const el = document.createElement('style');
        el.id = 'dark-mode-styles';
        el.textContent = darkStyles;
        document.head.appendChild(el);
      }
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      const styleEl = document.getElementById('dark-mode-styles');
      if (styleEl) {
        styleEl.textContent = '';
      }
    }
  }, [isDark]);

  const toggle = () => setIsDark(!isDark);

  return { isDark, toggle };
}
