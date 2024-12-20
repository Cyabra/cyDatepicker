import require$$0$1, { createContext, useEffect, useContext, useCallback, useMemo, useState, forwardRef, useRef, memo, createRef } from 'react';
import require$$0 from 'dayjs';

const COLORS = ['blue', 'orange', 'yellow', 'red', 'purple', 'amber', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];
const DEFAULT_COLOR = 'blue';
const DEFAULT_SEPARATOR = '~';
const LANGUAGE = 'en';
const DATE_FORMAT = 'YYYY-MM-DD';
const START_WEEK = 'sun';
const DEFAULT_DATE_LOOKING = 'forward';
const DAYS = [0, 1, 2, 3, 4, 5, 6];
const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// Beware, these maps of colors cannot be replaced with functions using string interpolation such as `bg-${color}-100`
// as described in Tailwind documentation https://tailwindcss.com/docs/content-configuration#dynamic-class-names
const BG_COLOR = {
  100: {
    blue: 'bg-blue-100',
    orange: 'bg-orange-100',
    yellow: 'bg-yellow-100',
    red: 'bg-red-100',
    purple: 'bg-purple-100',
    amber: 'bg-amber-100',
    lime: 'bg-lime-100',
    green: 'bg-green-100',
    emerald: 'bg-emerald-100',
    teal: 'bg-teal-100',
    cyan: 'bg-cyan-100',
    sky: 'bg-sky-100',
    indigo: 'bg-indigo-100',
    violet: 'bg-violet-100',
    fuchsia: 'bg-fuchsia-100',
    pink: 'bg-pink-100',
    rose: 'bg-rose-100'
  },
  200: {
    blue: 'bg-blue-200',
    orange: 'bg-orange-200',
    yellow: 'bg-yellow-200',
    red: 'bg-red-200',
    purple: 'bg-purple-200',
    amber: 'bg-amber-200',
    lime: 'bg-lime-200',
    green: 'bg-green-200',
    emerald: 'bg-emerald-200',
    teal: 'bg-teal-200',
    cyan: 'bg-cyan-200',
    sky: 'bg-sky-200',
    indigo: 'bg-indigo-200',
    violet: 'bg-violet-200',
    fuchsia: 'bg-fuchsia-200',
    pink: 'bg-pink-200',
    rose: 'bg-rose-200'
  },
  500: {
    blue: 'bg-blue-500',
    orange: 'bg-orange-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
    amber: 'bg-amber-500',
    lime: 'bg-lime-500',
    green: 'bg-green-500',
    emerald: 'bg-emerald-500',
    teal: 'bg-teal-500',
    cyan: 'bg-cyan-500',
    sky: 'bg-sky-500',
    indigo: 'bg-indigo-500',
    violet: 'bg-violet-500',
    fuchsia: 'bg-fuchsia-500',
    pink: 'bg-pink-500',
    rose: 'bg-rose-500'
  },
  hover: {
    blue: 'hover:bg-blue-600',
    orange: 'hover:bg-orange-600',
    yellow: 'hover:bg-yellow-600',
    red: 'hover:bg-red-600',
    purple: 'hover:bg-purple-600',
    amber: 'hover:bg-amber-600',
    lime: 'hover:bg-lime-600',
    green: 'hover:bg-green-600',
    emerald: 'hover:bg-emerald-600',
    teal: 'hover:bg-teal-600',
    cyan: 'hover:bg-cyan-600',
    sky: 'hover:bg-sky-600',
    indigo: 'hover:bg-indigo-600',
    violet: 'hover:bg-violet-600',
    fuchsia: 'hover:bg-fuchsia-600',
    pink: 'hover:bg-pink-600',
    rose: 'hover:bg-rose-600'
  }
};
const TEXT_COLOR = {
  500: {
    blue: 'text-blue-500',
    orange: 'text-orange-500',
    yellow: 'text-yellow-500',
    red: 'text-red-500',
    purple: 'text-purple-500',
    amber: 'text-amber-500',
    lime: 'text-lime-500',
    green: 'text-green-500',
    emerald: 'text-emerald-500',
    teal: 'text-teal-500',
    cyan: 'text-cyan-500',
    sky: 'text-sky-500',
    indigo: 'text-indigo-500',
    violet: 'text-violet-500',
    fuchsia: 'text-fuchsia-500',
    pink: 'text-pink-500',
    rose: 'text-rose-500'
  },
  600: {
    blue: 'text-blue-600 dark:text-blue-400 dark:hover:text-blue-400',
    orange: 'text-orange-600 dark:text-orange-400 dark:hover:text-orange-400',
    yellow: 'text-yellow-600 dark:text-yellow-400 dark:hover:text-yellow-400',
    red: 'text-red-600 dark:text-red-400 dark:hover:text-red-400',
    purple: 'text-purple-600 dark:text-purple-400 dark:hover:text-purple-400',
    amber: 'text-amber-600 dark:text-amber-400 dark:hover:text-amber-400',
    lime: 'text-lime-600 dark:text-lime-400 dark:hover:text-lime-400',
    green: 'text-green-600 dark:text-green-400 dark:hover:text-green-400',
    emerald: 'text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-400',
    teal: 'text-teal-600 dark:text-teal-400 dark:hover:text-teal-400',
    cyan: 'text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-400',
    sky: 'text-sky-600 dark:text-sky-400 dark:hover:text-sky-400',
    indigo: 'text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-400',
    violet: 'text-violet-600 dark:text-violet-400 dark:hover:text-violet-400',
    fuchsia: 'text-fuchsia-600 dark:text-fuchsia-400 dark:hover:text-fuchsia-400',
    pink: 'text-pink-600 dark:text-pink-400 dark:hover:text-pink-400',
    rose: 'text-rose-600 dark:text-rose-400 dark:hover:text-rose-400'
  },
  hover: {
    blue: 'hover:text-blue-700',
    orange: 'hover:text-orange-700',
    yellow: 'hover:text-yellow-700',
    red: 'hover:text-red-700',
    purple: 'hover:text-purple-700',
    amber: 'hover:text-amber-700',
    lime: 'hover:text-lime-700',
    green: 'hover:text-green-700',
    emerald: 'hover:text-emerald-700',
    teal: 'hover:text-teal-700',
    cyan: 'hover:text-cyan-700',
    sky: 'hover:text-sky-700',
    indigo: 'hover:text-indigo-700',
    violet: 'hover:text-violet-700',
    fuchsia: 'hover:text-fuchsia-700',
    pink: 'hover:text-pink-700',
    rose: 'hover:text-rose-700'
  }
};
const BORDER_COLOR = {
  500: {
    blue: 'border-blue-500',
    orange: 'border-orange-500',
    yellow: 'border-yellow-500',
    red: 'border-red-500',
    purple: 'border-purple-500',
    amber: 'border-amber-500',
    lime: 'border-lime-500',
    green: 'border-green-500',
    emerald: 'border-emerald-500',
    teal: 'border-teal-500',
    cyan: 'border-cyan-500',
    sky: 'border-sky-500',
    indigo: 'border-indigo-500',
    violet: 'border-violet-500',
    fuchsia: 'border-fuchsia-500',
    pink: 'border-pink-500',
    rose: 'border-rose-500'
  },
  focus: {
    blue: 'focus:border-blue-500',
    orange: 'focus:border-orange-500',
    yellow: 'focus:border-yellow-500',
    red: 'focus:border-red-500',
    purple: 'focus:border-purple-500',
    amber: 'focus:border-amber-500',
    lime: 'focus:border-lime-500',
    green: 'focus:border-green-500',
    emerald: 'focus:border-emerald-500',
    teal: 'focus:border-teal-500',
    cyan: 'focus:border-cyan-500',
    sky: 'focus:border-sky-500',
    indigo: 'focus:border-indigo-500',
    violet: 'focus:border-violet-500',
    fuchsia: 'focus:border-fuchsia-500',
    pink: 'focus:border-pink-500',
    rose: 'focus:border-rose-500'
  }
};
const RING_COLOR = {
  focus: {
    blue: 'focus:ring-blue-500',
    orange: 'focus:ring-orange-500',
    yellow: 'focus:ring-yellow-500',
    red: 'focus:ring-red-500',
    purple: 'focus:ring-purple-500',
    amber: 'focus:ring-amber-500',
    lime: 'focus:ring-lime-500',
    green: 'focus:ring-green-500',
    emerald: 'focus:ring-emerald-500',
    teal: 'focus:ring-teal-500',
    cyan: 'focus:ring-cyan-500',
    sky: 'focus:ring-sky-500',
    indigo: 'focus:ring-indigo-500',
    violet: 'focus:ring-violet-500',
    fuchsia: 'focus:ring-fuchsia-500',
    pink: 'focus:ring-pink-500',
    rose: 'focus:ring-rose-500'
  },
  'second-focus': {
    blue: 'focus:ring-blue-500/20',
    orange: 'focus:ring-orange-500/20',
    yellow: 'focus:ring-yellow-500/20',
    red: 'focus:ring-red-500/20',
    purple: 'focus:ring-purple-500/20',
    amber: 'focus:ring-amber-500/20',
    lime: 'focus:ring-lime-500/20',
    green: 'focus:ring-green-500/20',
    emerald: 'focus:ring-emerald-500/20',
    teal: 'focus:ring-teal-500/20',
    cyan: 'focus:ring-cyan-500/20',
    sky: 'focus:ring-sky-500/20',
    indigo: 'focus:ring-indigo-500/20',
    violet: 'focus:ring-violet-500/20',
    fuchsia: 'focus:ring-fuchsia-500/20',
    pink: 'focus:ring-pink-500/20',
    rose: 'focus:ring-rose-500/20'
  }
};
const BUTTON_COLOR = {
  focus: {
    blue: 'focus:ring-blue-500/50 focus:bg-blue-100/50',
    orange: 'focus:ring-orange-500/50 focus:bg-orange-100/50',
    yellow: 'focus:ring-yellow-500/50 focus:bg-yellow-100/50',
    red: 'focus:ring-red-500/50 focus:bg-red-100/50',
    purple: 'focus:ring-purple-500/50 focus:bg-purple-100/50',
    amber: 'focus:ring-amber-500/50 focus:bg-amber-100/50',
    lime: 'focus:ring-lime-500/50 focus:bg-lime-100/50',
    green: 'focus:ring-green-500/50 focus:bg-green-100/50',
    emerald: 'focus:ring-emerald-500/50 focus:bg-emerald-100/50',
    teal: 'focus:ring-teal-500/50 focus:bg-teal-100/50',
    cyan: 'focus:ring-cyan-500/50 focus:bg-cyan-100/50',
    sky: 'focus:ring-sky-500/50 focus:bg-sky-100/50',
    indigo: 'focus:ring-indigo-500/50 focus:bg-indigo-100/50',
    violet: 'focus:ring-violet-500/50 focus:bg-violet-100/50',
    fuchsia: 'focus:ring-fuchsia-500/50 focus:bg-fuchsia-100/50',
    pink: 'focus:ring-pink-500/50 focus:bg-pink-100/50',
    rose: 'focus:ring-rose-500/50 focus:bg-rose-100/50'
  }
};

const DatepickerContext = /*#__PURE__*/createContext({
  arrowContainer: null,
  asSingle: false,
  calendarContainer: null,
  changeDatepickerValue: () => {},
  changeDayHover: () => {},
  changeInputText: () => {},
  changePeriod: () => {},
  classNames: undefined,
  configs: undefined,
  containerClassName: '',
  dateLooking: DEFAULT_DATE_LOOKING,
  dayHover: null,
  disabled: false,
  disabledDates: null,
  displayFormat: DATE_FORMAT,
  hideDatepicker: () => {},
  i18n: LANGUAGE,
  input: undefined,
  inputClassName: '',
  inputId: undefined,
  inputName: undefined,
  inputText: '',
  maxDate: null,
  minDate: null,
  period: {
    start: null,
    end: null
  },
  popoverDirection: undefined,
  primaryColor: DEFAULT_COLOR,
  readOnly: false,
  required: false,
  separator: DEFAULT_SEPARATOR,
  showFooter: false,
  startWeekOn: START_WEEK,
  toggleClassName: '',
  toggleIcon: undefined,
  updateFirstDate: () => {},
  value: null
});

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var isBetween$1 = {exports: {}};

(function (module, exports) {
  !function (e, i) {
    module.exports = i() ;
  }(commonjsGlobal, function () {

    return function (e, i, t) {
      i.prototype.isBetween = function (e, i, s, f) {
        var n = t(e),
          o = t(i),
          r = "(" === (f = f || "()")[0],
          u = ")" === f[1];
        return (r ? this.isAfter(n, s) : !this.isBefore(n, s)) && (u ? this.isBefore(o, s) : !this.isAfter(o, s)) || (r ? this.isBefore(n, s) : !this.isAfter(n, s)) && (u ? this.isAfter(o, s) : !this.isBefore(o, s));
      };
    };
  });
})(isBetween$1);
var isBetweenExports = isBetween$1.exports;
var isBetween = /*@__PURE__*/getDefaultExportFromCjs(isBetweenExports);

var isSameOrAfter$1 = {exports: {}};

(function (module, exports) {
  !function (e, t) {
    module.exports = t() ;
  }(commonjsGlobal, function () {

    return function (e, t) {
      t.prototype.isSameOrAfter = function (e, t) {
        return this.isSame(e, t) || this.isAfter(e, t);
      };
    };
  });
})(isSameOrAfter$1);
var isSameOrAfterExports = isSameOrAfter$1.exports;
var isSameOrAfter = /*@__PURE__*/getDefaultExportFromCjs(isSameOrAfterExports);

var isSameOrBefore$1 = {exports: {}};

(function (module, exports) {
  !function (e, i) {
    module.exports = i() ;
  }(commonjsGlobal, function () {

    return function (e, i) {
      i.prototype.isSameOrBefore = function (e, i) {
        return this.isSame(e, i) || this.isBefore(e, i);
      };
    };
  });
})(isSameOrBefore$1);
var isSameOrBeforeExports = isSameOrBefore$1.exports;
var isSameOrBefore = /*@__PURE__*/getDefaultExportFromCjs(isSameOrBeforeExports);

var isToday$1 = {exports: {}};

(function (module, exports) {
  !function (e, o) {
    module.exports = o() ;
  }(commonjsGlobal, function () {

    return function (e, o, t) {
      o.prototype.isToday = function () {
        var e = "YYYY-MM-DD",
          o = t();
        return this.format(e) === o.format(e);
      };
    };
  });
})(isToday$1);
var isTodayExports = isToday$1.exports;
var isToday = /*@__PURE__*/getDefaultExportFromCjs(isTodayExports);

require$$0.extend(isBetween);
require$$0.extend(isSameOrAfter);
require$$0.extend(isSameOrBefore);
require$$0.extend(isToday);
function loadLanguageModule(language = LANGUAGE) {
  switch (language) {
    case 'af':
      Promise.resolve().then(function () { return af; });
      break;
    case 'am':
      Promise.resolve().then(function () { return am; });
      break;
    case 'ar-dz':
      Promise.resolve().then(function () { return arDz; });
      break;
    case 'ar-iq':
      Promise.resolve().then(function () { return arIq; });
      break;
    case 'ar-kw':
      Promise.resolve().then(function () { return arKw; });
      break;
    case 'ar-ly':
      Promise.resolve().then(function () { return arLy; });
      break;
    case 'ar-ma':
      Promise.resolve().then(function () { return arMa; });
      break;
    case 'ar-sa':
      Promise.resolve().then(function () { return arSa; });
      break;
    case 'ar-tn':
      Promise.resolve().then(function () { return arTn; });
      break;
    case 'ar':
      Promise.resolve().then(function () { return ar; });
      break;
    case 'az':
      Promise.resolve().then(function () { return az; });
      break;
    case 'bg':
      Promise.resolve().then(function () { return bg; });
      break;
    case 'bi':
      Promise.resolve().then(function () { return bi; });
      break;
    case 'bm':
      Promise.resolve().then(function () { return bm; });
      break;
    case 'bn-bd':
      Promise.resolve().then(function () { return bnBd; });
      break;
    case 'bn':
      Promise.resolve().then(function () { return bn; });
      break;
    case 'bo':
      Promise.resolve().then(function () { return bo; });
      break;
    case 'br':
      Promise.resolve().then(function () { return br; });
      break;
    case 'ca':
      Promise.resolve().then(function () { return ca; });
      break;
    case 'cs':
      Promise.resolve().then(function () { return cs; });
      break;
    case 'cv':
      Promise.resolve().then(function () { return cv; });
      break;
    case 'cy':
      Promise.resolve().then(function () { return cy; });
      break;
    case 'da':
      Promise.resolve().then(function () { return da; });
      break;
    case 'de-at':
      Promise.resolve().then(function () { return deAt; });
      break;
    case 'de-ch':
      Promise.resolve().then(function () { return deCh; });
      break;
    case 'de':
      Promise.resolve().then(function () { return de; });
      break;
    case 'dv':
      Promise.resolve().then(function () { return dv; });
      break;
    case 'el':
      Promise.resolve().then(function () { return el; });
      break;
    case 'en-au':
      Promise.resolve().then(function () { return enAu; });
      break;
    case 'en-gb':
      Promise.resolve().then(function () { return enGb; });
      break;
    case 'en-ie':
      Promise.resolve().then(function () { return enIe; });
      break;
    case 'en-il':
      Promise.resolve().then(function () { return enIl; });
      break;
    case 'en-in':
      Promise.resolve().then(function () { return enIn; });
      break;
    case 'en-nz':
      Promise.resolve().then(function () { return enNz; });
      break;
    case 'en-sg':
      Promise.resolve().then(function () { return enSg; });
      break;
    case 'en-tt':
      Promise.resolve().then(function () { return enTt; });
      break;
    case 'en':
      Promise.resolve().then(function () { return en; });
      break;
    case 'eo':
      Promise.resolve().then(function () { return eo; });
      break;
    case 'es-do':
      Promise.resolve().then(function () { return esDo; });
      break;
    case 'es-mx':
      Promise.resolve().then(function () { return esMx; });
      break;
    case 'es-pr':
      Promise.resolve().then(function () { return esPr; });
      break;
    case 'es-us':
      Promise.resolve().then(function () { return esUs; });
      break;
    case 'es':
      Promise.resolve().then(function () { return es; });
      break;
    case 'et':
      Promise.resolve().then(function () { return et; });
      break;
    case 'eu':
      Promise.resolve().then(function () { return eu; });
      break;
    case 'fa':
      Promise.resolve().then(function () { return fa; });
      break;
    case 'fi':
      Promise.resolve().then(function () { return fi; });
      break;
    case 'fo':
      Promise.resolve().then(function () { return fo; });
      break;
    case 'fr-ch':
      Promise.resolve().then(function () { return frCh; });
      break;
    case 'fr':
      Promise.resolve().then(function () { return fr; });
      break;
    case 'fy':
      Promise.resolve().then(function () { return fy; });
      break;
    case 'ga':
      Promise.resolve().then(function () { return ga; });
      break;
    case 'gd':
      Promise.resolve().then(function () { return gd; });
      break;
    case 'gl':
      Promise.resolve().then(function () { return gl; });
      break;
    case 'gom-latn':
      Promise.resolve().then(function () { return gomLatn; });
      break;
    case 'gu':
      Promise.resolve().then(function () { return gu; });
      break;
    case 'he':
      Promise.resolve().then(function () { return he; });
      break;
    case 'hi':
      Promise.resolve().then(function () { return hi; });
      break;
    case 'hr':
      Promise.resolve().then(function () { return hr; });
      break;
    case 'ht':
      Promise.resolve().then(function () { return ht; });
      break;
    case 'hu':
      Promise.resolve().then(function () { return hu; });
      break;
    case 'hy-am':
      Promise.resolve().then(function () { return hyAm; });
      break;
    case 'id':
      Promise.resolve().then(function () { return id; });
      break;
    case 'is':
      Promise.resolve().then(function () { return is; });
      break;
    case 'it-ch':
      Promise.resolve().then(function () { return itCh; });
      break;
    case 'it':
      Promise.resolve().then(function () { return it; });
      break;
    case 'ja':
      Promise.resolve().then(function () { return ja; });
      break;
    case 'jv':
      Promise.resolve().then(function () { return jv; });
      break;
    case 'ka':
      Promise.resolve().then(function () { return ka; });
      break;
    case 'kk':
      Promise.resolve().then(function () { return kk; });
      break;
    case 'ko':
      Promise.resolve().then(function () { return ko; });
      break;
    case 'ku':
      Promise.resolve().then(function () { return ku; });
      break;
    case 'ky':
      Promise.resolve().then(function () { return ky; });
      break;
    case 'lb':
      Promise.resolve().then(function () { return lb; });
      break;
    case 'lo':
      Promise.resolve().then(function () { return lo; });
      break;
    case 'lt':
      Promise.resolve().then(function () { return lt; });
      break;
    case 'lv':
      Promise.resolve().then(function () { return lv; });
      break;
    case 'me':
      Promise.resolve().then(function () { return me; });
      break;
    case 'mi':
      Promise.resolve().then(function () { return mi; });
      break;
    case 'mk':
      Promise.resolve().then(function () { return mk; });
      break;
    case 'ml':
      Promise.resolve().then(function () { return ml; });
      break;
    case 'mn':
      Promise.resolve().then(function () { return mn; });
      break;
    case 'ms-my':
      Promise.resolve().then(function () { return msMy; });
      break;
    case 'ms':
      Promise.resolve().then(function () { return ms; });
      break;
    case 'mt':
      Promise.resolve().then(function () { return mt; });
      break;
    case 'my':
      Promise.resolve().then(function () { return my; });
      break;
    case 'nb':
      Promise.resolve().then(function () { return nb; });
      break;
    case 'ne':
      Promise.resolve().then(function () { return ne; });
      break;
    case 'nl-be':
      Promise.resolve().then(function () { return nlBe; });
      break;
    case 'nl':
      Promise.resolve().then(function () { return nl; });
      break;
    case 'nn':
      Promise.resolve().then(function () { return nn; });
      break;
    case 'oc-lnc':
      Promise.resolve().then(function () { return ocLnc; });
      break;
    case 'pa-in':
      Promise.resolve().then(function () { return paIn; });
      break;
    case 'pl':
      Promise.resolve().then(function () { return pl; });
      break;
    case 'pt-br':
      Promise.resolve().then(function () { return ptBr; });
      break;
    case 'pt':
      Promise.resolve().then(function () { return pt; });
      break;
    case 'rn':
      Promise.resolve().then(function () { return rn; });
      break;
    case 'ro':
      Promise.resolve().then(function () { return ro; });
      break;
    case 'ru':
      Promise.resolve().then(function () { return ru; });
      break;
    case 'rw':
      Promise.resolve().then(function () { return rw; });
      break;
    case 'sd':
      Promise.resolve().then(function () { return sd; });
      break;
    case 'se':
      Promise.resolve().then(function () { return se; });
      break;
    case 'si':
      Promise.resolve().then(function () { return si; });
      break;
    case 'sk':
      Promise.resolve().then(function () { return sk; });
      break;
    case 'sl':
      Promise.resolve().then(function () { return sl; });
      break;
    case 'sq':
      Promise.resolve().then(function () { return sq; });
      break;
    case 'sr':
      Promise.resolve().then(function () { return sr; });
      break;
    case 'sr-cyrl':
      Promise.resolve().then(function () { return srCyrl; });
      break;
    case 'ss':
      Promise.resolve().then(function () { return ss; });
      break;
    case 'sv-fi':
      Promise.resolve().then(function () { return svFi; });
      break;
    case 'sv':
      Promise.resolve().then(function () { return sv; });
      break;
    case 'sw':
      Promise.resolve().then(function () { return sw; });
      break;
    case 'ta':
      Promise.resolve().then(function () { return ta; });
      break;
    case 'te':
      Promise.resolve().then(function () { return te; });
      break;
    case 'tg':
      Promise.resolve().then(function () { return tg; });
      break;
    case 'th':
      Promise.resolve().then(function () { return th; });
      break;
    case 'tk':
      Promise.resolve().then(function () { return tk; });
      break;
    case 'tl-ph':
      Promise.resolve().then(function () { return tlPh; });
      break;
    case 'tlh':
      Promise.resolve().then(function () { return tlh; });
      break;
    case 'tr':
      Promise.resolve().then(function () { return tr; });
      break;
    case 'tzl':
      Promise.resolve().then(function () { return tzl; });
      break;
    case 'tzm-latn':
      Promise.resolve().then(function () { return tzmLatn; });
      break;
    case 'tzm':
      Promise.resolve().then(function () { return tzm; });
      break;
    case 'ug-cn':
      Promise.resolve().then(function () { return ugCn; });
      break;
    case 'uk':
      Promise.resolve().then(function () { return uk; });
      break;
    case 'ur':
      Promise.resolve().then(function () { return ur; });
      break;
    case 'uz-latn':
      Promise.resolve().then(function () { return uzLatn; });
      break;
    case 'uz':
      Promise.resolve().then(function () { return uz; });
      break;
    case 'vi':
      Promise.resolve().then(function () { return vi; });
      break;
    case 'x-pseudo':
      Promise.resolve().then(function () { return xPseudo; });
      break;
    case 'yo':
      Promise.resolve().then(function () { return yo; });
      break;
    case 'zh-cn':
      Promise.resolve().then(function () { return zhCn; });
      break;
    case 'zh-hk':
      Promise.resolve().then(function () { return zhHk; });
      break;
    case 'zh-tw':
      Promise.resolve().then(function () { return zhTw; });
      break;
    case 'zh':
      Promise.resolve().then(function () { return zh; });
      break;
    default:
      Promise.resolve().then(function () { return en; });
      break;
  }
}
function dateIsValid(date) {
  return require$$0(date).isValid();
}
function isCurrentDay(date) {
  if (!dateIsValid(date)) return false;
  return require$$0(date).isToday();
}
function dateIsSame(a, b, unit) {
  if (!dateIsValid(a) || !dateIsValid(b)) return false;
  return require$$0(a).isSame(require$$0(b), unit);
}
function dateIsBefore(a, b, unit) {
  if (!dateIsValid(a) || !dateIsValid(b)) return false;
  return require$$0(a).isBefore(require$$0(b), unit);
}
function dateIsAfter(a, b, unit) {
  if (!dateIsValid(a) || !dateIsValid(b)) return false;
  return require$$0(a).isAfter(require$$0(b), unit);
}
function dateIsSameOrBefore(a, b, unit) {
  if (!dateIsValid(a) || !dateIsValid(b)) return false;
  return require$$0(a).isSameOrBefore(require$$0(b), unit);
}
function dateIsSameOrAfter(a, b, unit) {
  if (!dateIsValid(a) || !dateIsValid(b)) return false;
  return require$$0(a).isSameOrAfter(require$$0(b), unit);
}
function dateIsBetween(whoIsBetween, start, end, unit, include) {
  if (!dateIsValid(whoIsBetween) || !dateIsValid(start) || !dateIsValid(end)) {
    return false;
  }
  return require$$0(whoIsBetween).isBetween(require$$0(start), require$$0(end), unit, `${include?.start ? '[' : '('}${include?.end ? ']' : ')'}`);
}
function dateFormat(date, format, local = 'en') {
  if (!dateIsValid(date)) return null;
  return require$$0(date).locale(local).format(format);
}
function dateStringToDate(dateString) {
  const parseDate = require$$0(dateString);
  if (!parseDate.isValid()) return null;
  return parseDate.toDate();
}
function previousMonthBy(date) {
  if (!dateIsValid(date)) return require$$0().toDate();
  const parseDate = require$$0(date);
  return parseDate.date(1).hour(0).minute(0).second(0).month(parseDate.month() - 1).toDate();
}
function nextMonthBy(date) {
  if (!dateIsValid(date)) return require$$0().toDate();
  const parseDate = require$$0(date);
  return parseDate.date(1).hour(0).minute(0).second(0).month(parseDate.month() + 1).toDate();
}
function dateUpdateMonth(date, value) {
  if (!dateIsValid(date)) return require$$0().toDate();
  return require$$0(date).month(value).toDate();
}
function dateUpdateYear(date, value) {
  if (!dateIsValid(date)) return require$$0().toDate();
  return require$$0(date).year(value).toDate();
}
function firstDayOfMonth(date) {
  return require$$0(date || require$$0()).startOf('month').toDate();
}
function endDayOfMonth(date) {
  return require$$0(date || require$$0()).endOf('month').toDate();
}
function dayIndexInWeek(date) {
  return require$$0(date || require$$0()).day();
}
function previousDaysInWeek(date, weekStartDayIndex = 0) {
  if (!dateIsValid(date)) return [];
  const previousDays = [];
  let i = 1;
  let previousDay = dateAdd(date, -i, 'day');
  while (dayIndexInWeek(previousDay) !== weekStartDayIndex) {
    previousDays.push(previousDay);
    i++;
    previousDay = dateAdd(date, -i, 'day');
  }
  return previousDays.sort((a, b) => {
    if (dateIsAfter(a, b, 'date')) return 1;
    return -1;
  });
}
function nextDaysInWeek(date, weekStartDayIndex = 0) {
  if (!dateIsValid(date)) return [];
  const nextDays = [];
  let i = 1;
  let nextDay = dateAdd(date, i, 'day');
  while (dayIndexInWeek(nextDay) !== weekStartDayIndex) {
    nextDays.push(nextDay);
    i++;
    nextDay = dateAdd(date, i, 'day');
  }
  return nextDays;
}
function daysInMonth(date) {
  const daysNumber = require$$0(date || require$$0()).daysInMonth();
  if (!daysNumber) return 0;
  return daysNumber;
}
function allDaysInMonth(date) {
  if (!dateIsValid(date || new Date())) return [];
  const maxDaysInMonth = daysInMonth(date);
  const days = [];
  for (let i = 1; i <= maxDaysInMonth; i++) {
    days.push(require$$0(date).date(i).toDate());
  }
  return days;
}
function weekDayStringToIndex(dayString) {
  switch (dayString) {
    case 'mon':
      return 0;
    case 'tue':
      return 1;
    case 'wed':
      return 2;
    case 'thu':
      return 3;
    case 'fri':
      return 4;
    case 'sat':
      return 5;
    case 'sun':
      return 6;
    default:
      return 0;
  }
}
function dateAdd(date, value, unit) {
  if (!dateIsValid(date)) return date;
  return require$$0(date).add(value, unit).toDate();
}
function getNextDates(date, limit) {
  if (!dateIsValid(date)) return [];
  const nexDates = [];
  for (let i = 1; i <= limit; i++) {
    nexDates.push(dateAdd(date, i, 'day'));
  }
  return nexDates;
}

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_production_min;
function requireReactJsxRuntime_production_min() {
  if (hasRequiredReactJsxRuntime_production_min) return reactJsxRuntime_production_min;
  hasRequiredReactJsxRuntime_production_min = 1;
  var f = require$$0$1,
    k = Symbol.for("react.element"),
    l = Symbol.for("react.fragment"),
    m = Object.prototype.hasOwnProperty,
    n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    p = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    };
  function q(c, a, g) {
    var b,
      d = {},
      e = null,
      h = null;
    void 0 !== g && (e = "" + g);
    void 0 !== a.key && (e = "" + a.key);
    void 0 !== a.ref && (h = a.ref);
    for (b in a) m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
    if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
    return {
      $$typeof: k,
      type: c,
      key: e,
      ref: h,
      props: d,
      _owner: n.current
    };
  }
  reactJsxRuntime_production_min.Fragment = l;
  reactJsxRuntime_production_min.jsx = q;
  reactJsxRuntime_production_min.jsxs = q;
  return reactJsxRuntime_production_min;
}

var reactJsxRuntime_development = {};

/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_development;
function requireReactJsxRuntime_development() {
  if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
  hasRequiredReactJsxRuntime_development = 1;
  if (process.env.NODE_ENV !== "production") {
    (function () {

      var React = require$$0$1;

      // ATTENTION
      // When adding new symbols to this file,
      // Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
      // The Symbol used to tag the ReactElement-like types.
      var REACT_ELEMENT_TYPE = Symbol.for('react.element');
      var REACT_PORTAL_TYPE = Symbol.for('react.portal');
      var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
      var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
      var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
      var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
      var REACT_CONTEXT_TYPE = Symbol.for('react.context');
      var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
      var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
      var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
      var REACT_MEMO_TYPE = Symbol.for('react.memo');
      var REACT_LAZY_TYPE = Symbol.for('react.lazy');
      var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
      var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = '@@iterator';
      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable !== 'object') {
          return null;
        }
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        if (typeof maybeIterator === 'function') {
          return maybeIterator;
        }
        return null;
      }
      var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function error(format) {
        {
          {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            printWarning('error', format, args);
          }
        }
      }
      function printWarning(level, format, args) {
        // When changing this logic, you might want to also
        // update consoleWithStackDev.www.js as well.
        {
          var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
          var stack = ReactDebugCurrentFrame.getStackAddendum();
          if (stack !== '') {
            format += '%s';
            args = args.concat([stack]);
          } // eslint-disable-next-line react-internal/safe-string-coercion

          var argsWithFormat = args.map(function (item) {
            return String(item);
          }); // Careful: RN currently depends on this prefix

          argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
          // breaks IE9: https://github.com/facebook/react/issues/13610
          // eslint-disable-next-line react-internal/no-production-logging

          Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }

      // -----------------------------------------------------------------------------

      var enableScopeAPI = false; // Experimental Create Event Handle API.
      var enableCacheElement = false;
      var enableTransitionTracing = false; // No known bugs, but needs performance testing

      var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
      // stuff. Intended to enable React core members to more easily debug scheduling
      // issues in DEV builds.

      var enableDebugTracing = false; // Track which Fiber(s) schedule render work.

      var REACT_MODULE_REFERENCE;
      {
        REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
      }
      function isValidElementType(type) {
        if (typeof type === 'string' || typeof type === 'function') {
          return true;
        } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).

        if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
          return true;
        }
        if (typeof type === 'object' && type !== null) {
          if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE ||
          // This needs to include all possible module reference object
          // types supported by any Flight configuration anywhere since
          // we don't know which Flight build this will end up being used
          // with.
          type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
            return true;
          }
        }
        return false;
      }
      function getWrappedName(outerType, innerType, wrapperName) {
        var displayName = outerType.displayName;
        if (displayName) {
          return displayName;
        }
        var functionName = innerType.displayName || innerType.name || '';
        return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
      } // Keep in sync with react-reconciler/getComponentNameFromFiber

      function getContextName(type) {
        return type.displayName || 'Context';
      } // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.

      function getComponentNameFromType(type) {
        if (type == null) {
          // Host root, text node or just invalid type.
          return null;
        }
        {
          if (typeof type.tag === 'number') {
            error('Received an unexpected object in getComponentNameFromType(). ' + 'This is likely a bug in React. Please file an issue.');
          }
        }
        if (typeof type === 'function') {
          return type.displayName || type.name || null;
        }
        if (typeof type === 'string') {
          return type;
        }
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return 'Fragment';
          case REACT_PORTAL_TYPE:
            return 'Portal';
          case REACT_PROFILER_TYPE:
            return 'Profiler';
          case REACT_STRICT_MODE_TYPE:
            return 'StrictMode';
          case REACT_SUSPENSE_TYPE:
            return 'Suspense';
          case REACT_SUSPENSE_LIST_TYPE:
            return 'SuspenseList';
        }
        if (typeof type === 'object') {
          switch (type.$$typeof) {
            case REACT_CONTEXT_TYPE:
              var context = type;
              return getContextName(context) + '.Consumer';
            case REACT_PROVIDER_TYPE:
              var provider = type;
              return getContextName(provider._context) + '.Provider';
            case REACT_FORWARD_REF_TYPE:
              return getWrappedName(type, type.render, 'ForwardRef');
            case REACT_MEMO_TYPE:
              var outerName = type.displayName || null;
              if (outerName !== null) {
                return outerName;
              }
              return getComponentNameFromType(type.type) || 'Memo';
            case REACT_LAZY_TYPE:
              {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return getComponentNameFromType(init(payload));
                } catch (x) {
                  return null;
                }
              }

            // eslint-disable-next-line no-fallthrough
          }
        }
        return null;
      }
      var assign = Object.assign;

      // Helpers to patch console.logs to avoid logging during side-effect free
      // replaying on render function. This currently only patches the object
      // lazily which won't cover if the log function was extracted eagerly.
      // We could also eagerly patch the method.
      var disabledDepth = 0;
      var prevLog;
      var prevInfo;
      var prevWarn;
      var prevError;
      var prevGroup;
      var prevGroupCollapsed;
      var prevGroupEnd;
      function disabledLog() {}
      disabledLog.__reactDisabledLog = true;
      function disableLogs() {
        {
          if (disabledDepth === 0) {
            /* eslint-disable react-internal/no-production-logging */
            prevLog = console.log;
            prevInfo = console.info;
            prevWarn = console.warn;
            prevError = console.error;
            prevGroup = console.group;
            prevGroupCollapsed = console.groupCollapsed;
            prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

            var props = {
              configurable: true,
              enumerable: true,
              value: disabledLog,
              writable: true
            }; // $FlowFixMe Flow thinks console is immutable.

            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
            /* eslint-enable react-internal/no-production-logging */
          }
          disabledDepth++;
        }
      }
      function reenableLogs() {
        {
          disabledDepth--;
          if (disabledDepth === 0) {
            /* eslint-disable react-internal/no-production-logging */
            var props = {
              configurable: true,
              enumerable: true,
              writable: true
            }; // $FlowFixMe Flow thinks console is immutable.

            Object.defineProperties(console, {
              log: assign({}, props, {
                value: prevLog
              }),
              info: assign({}, props, {
                value: prevInfo
              }),
              warn: assign({}, props, {
                value: prevWarn
              }),
              error: assign({}, props, {
                value: prevError
              }),
              group: assign({}, props, {
                value: prevGroup
              }),
              groupCollapsed: assign({}, props, {
                value: prevGroupCollapsed
              }),
              groupEnd: assign({}, props, {
                value: prevGroupEnd
              })
            });
            /* eslint-enable react-internal/no-production-logging */
          }
          if (disabledDepth < 0) {
            error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
          }
        }
      }
      var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
      var prefix;
      function describeBuiltInComponentFrame(name, source, ownerFn) {
        {
          if (prefix === undefined) {
            // Extract the VM specific prefix used by each line.
            try {
              throw Error();
            } catch (x) {
              var match = x.stack.trim().match(/\n( *(at )?)/);
              prefix = match && match[1] || '';
            }
          } // We use the prefix to ensure our stacks line up with native stack frames.

          return '\n' + prefix + name;
        }
      }
      var reentry = false;
      var componentFrameCache;
      {
        var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
        componentFrameCache = new PossiblyWeakMap();
      }
      function describeNativeComponentFrame(fn, construct) {
        // If something asked for a stack inside a fake render, it should get ignored.
        if (!fn || reentry) {
          return '';
        }
        {
          var frame = componentFrameCache.get(fn);
          if (frame !== undefined) {
            return frame;
          }
        }
        var control;
        reentry = true;
        var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

        Error.prepareStackTrace = undefined;
        var previousDispatcher;
        {
          previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
          // for warnings.

          ReactCurrentDispatcher.current = null;
          disableLogs();
        }
        try {
          // This should throw.
          if (construct) {
            // Something should be setting the props in the constructor.
            var Fake = function () {
              throw Error();
            }; // $FlowFixMe

            Object.defineProperty(Fake.prototype, 'props', {
              set: function () {
                // We use a throwing setter instead of frozen or non-writable props
                // because that won't throw in a non-strict mode function.
                throw Error();
              }
            });
            if (typeof Reflect === 'object' && Reflect.construct) {
              // We construct a different control for this case to include any extra
              // frames added by the construct call.
              try {
                Reflect.construct(Fake, []);
              } catch (x) {
                control = x;
              }
              Reflect.construct(fn, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x) {
                control = x;
              }
              fn.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x) {
              control = x;
            }
            fn();
          }
        } catch (sample) {
          // This is inlined manually because closure doesn't do it for us.
          if (sample && control && typeof sample.stack === 'string') {
            // This extracts the first frame from the sample that isn't also in the control.
            // Skipping one frame that we assume is the frame that calls the two.
            var sampleLines = sample.stack.split('\n');
            var controlLines = control.stack.split('\n');
            var s = sampleLines.length - 1;
            var c = controlLines.length - 1;
            while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
              // We expect at least one stack frame to be shared.
              // Typically this will be the root most one. However, stack frames may be
              // cut off due to maximum stack limits. In this case, one maybe cut off
              // earlier than the other. We assume that the sample is longer or the same
              // and there for cut off earlier. So we should find the root most frame in
              // the sample somewhere in the control.
              c--;
            }
            for (; s >= 1 && c >= 0; s--, c--) {
              // Next we find the first one that isn't the same which should be the
              // frame that called our sample function and the control.
              if (sampleLines[s] !== controlLines[c]) {
                // In V8, the first line is describing the message but other VMs don't.
                // If we're about to return the first line, and the control is also on the same
                // line, that's a pretty good indicator that our sample threw at same line as
                // the control. I.e. before we entered the sample frame. So we ignore this result.
                // This can happen if you passed a class to function component, or non-function.
                if (s !== 1 || c !== 1) {
                  do {
                    s--;
                    c--; // We may still have similar intermediate frames from the construct call.
                    // The next one that isn't the same should be our match though.

                    if (c < 0 || sampleLines[s] !== controlLines[c]) {
                      // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
                      var _frame = '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
                      // but we have a user-provided "displayName"
                      // splice it in to make the stack more readable.

                      if (fn.displayName && _frame.includes('<anonymous>')) {
                        _frame = _frame.replace('<anonymous>', fn.displayName);
                      }
                      {
                        if (typeof fn === 'function') {
                          componentFrameCache.set(fn, _frame);
                        }
                      } // Return the line we found.

                      return _frame;
                    }
                  } while (s >= 1 && c >= 0);
                }
                break;
              }
            }
          }
        } finally {
          reentry = false;
          {
            ReactCurrentDispatcher.current = previousDispatcher;
            reenableLogs();
          }
          Error.prepareStackTrace = previousPrepareStackTrace;
        } // Fallback to just using the name if we couldn't make it throw.

        var name = fn ? fn.displayName || fn.name : '';
        var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';
        {
          if (typeof fn === 'function') {
            componentFrameCache.set(fn, syntheticFrame);
          }
        }
        return syntheticFrame;
      }
      function describeFunctionComponentFrame(fn, source, ownerFn) {
        {
          return describeNativeComponentFrame(fn, false);
        }
      }
      function shouldConstruct(Component) {
        var prototype = Component.prototype;
        return !!(prototype && prototype.isReactComponent);
      }
      function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
        if (type == null) {
          return '';
        }
        if (typeof type === 'function') {
          {
            return describeNativeComponentFrame(type, shouldConstruct(type));
          }
        }
        if (typeof type === 'string') {
          return describeBuiltInComponentFrame(type);
        }
        switch (type) {
          case REACT_SUSPENSE_TYPE:
            return describeBuiltInComponentFrame('Suspense');
          case REACT_SUSPENSE_LIST_TYPE:
            return describeBuiltInComponentFrame('SuspenseList');
        }
        if (typeof type === 'object') {
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeFunctionComponentFrame(type.render);
            case REACT_MEMO_TYPE:
              // Memo may contain any component type so we recursively resolve it.
              return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
            case REACT_LAZY_TYPE:
              {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  // Lazy may contain any component type so we recursively resolve it.
                  return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                } catch (x) {}
              }
          }
        }
        return '';
      }
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var loggedTypeFailures = {};
      var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement(element) {
        {
          if (element) {
            var owner = element._owner;
            var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
            ReactDebugCurrentFrame.setExtraStackFrame(stack);
          } else {
            ReactDebugCurrentFrame.setExtraStackFrame(null);
          }
        }
      }
      function checkPropTypes(typeSpecs, values, location, componentName, element) {
        {
          // $FlowFixMe This is okay but Flow doesn't know it.
          var has = Function.call.bind(hasOwnProperty);
          for (var typeSpecName in typeSpecs) {
            if (has(typeSpecs, typeSpecName)) {
              var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
              // fail the render phase where it didn't fail before. So we log it.
              // After these have been cleaned up, we'll let them throw.

              try {
                // This is intentionally an invariant that gets caught. It's the same
                // behavior as without this statement except with a better message.
                if (typeof typeSpecs[typeSpecName] !== 'function') {
                  // eslint-disable-next-line react-internal/prod-error-codes
                  var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
                  err.name = 'Invariant Violation';
                  throw err;
                }
                error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
              } catch (ex) {
                error$1 = ex;
              }
              if (error$1 && !(error$1 instanceof Error)) {
                setCurrentlyValidatingElement(element);
                error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);
                setCurrentlyValidatingElement(null);
              }
              if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                // Only monitor this failure once because there tends to be a lot of the
                // same error.
                loggedTypeFailures[error$1.message] = true;
                setCurrentlyValidatingElement(element);
                error('Failed %s type: %s', location, error$1.message);
                setCurrentlyValidatingElement(null);
              }
            }
          }
        }
      }
      var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

      function isArray(a) {
        return isArrayImpl(a);
      }

      /*
       * The `'' + value` pattern (used in in perf-sensitive code) throws for Symbol
       * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
       *
       * The functions in this module will throw an easier-to-understand,
       * easier-to-debug exception with a clear errors message message explaining the
       * problem. (Instead of a confusing exception thrown inside the implementation
       * of the `value` object).
       */
      // $FlowFixMe only called in DEV, so void return is not possible.
      function typeName(value) {
        {
          // toStringTag is needed for namespaced types like Temporal.Instant
          var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
          var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || 'Object';
          return type;
        }
      } // $FlowFixMe only called in DEV, so void return is not possible.

      function willCoercionThrow(value) {
        {
          try {
            testStringCoercion(value);
            return false;
          } catch (e) {
            return true;
          }
        }
      }
      function testStringCoercion(value) {
        // If you ended up here by following an exception call stack, here's what's
        // happened: you supplied an object or symbol value to React (as a prop, key,
        // DOM attribute, CSS property, string ref, etc.) and when React tried to
        // coerce it to a string using `'' + value`, an exception was thrown.
        //
        // The most common types that will cause this exception are `Symbol` instances
        // and Temporal objects like `Temporal.Instant`. But any object that has a
        // `valueOf` or `[Symbol.toPrimitive]` method that throws will also cause this
        // exception. (Library authors do this to prevent users from using built-in
        // numeric operators like `+` or comparison operators like `>=` because custom
        // methods are needed to perform accurate arithmetic or comparison.)
        //
        // To fix the problem, coerce this object or symbol value to a string before
        // passing it to React. The most reliable way is usually `String(value)`.
        //
        // To find which value is throwing, check the browser or debugger console.
        // Before this exception was thrown, there should be `console.error` output
        // that shows the type (Symbol, Temporal.PlainDate, etc.) that caused the
        // problem and how that type was used: key, atrribute, input value prop, etc.
        // In most cases, this console output also shows the component and its
        // ancestor components where the exception happened.
        //
        // eslint-disable-next-line react-internal/safe-string-coercion
        return '' + value;
      }
      function checkKeyStringCoercion(value) {
        {
          if (willCoercionThrow(value)) {
            error('The provided key is an unsupported type %s.' + ' This value must be coerced to a string before before using it here.', typeName(value));
            return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
          }
        }
      }
      var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
      var RESERVED_PROPS = {
        key: true,
        ref: true,
        __self: true,
        __source: true
      };
      var specialPropKeyWarningShown;
      var specialPropRefWarningShown;
      var didWarnAboutStringRefs;
      {
        didWarnAboutStringRefs = {};
      }
      function hasValidRef(config) {
        {
          if (hasOwnProperty.call(config, 'ref')) {
            var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.ref !== undefined;
      }
      function hasValidKey(config) {
        {
          if (hasOwnProperty.call(config, 'key')) {
            var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.key !== undefined;
      }
      function warnIfStringRefCannotBeAutoConverted(config, self) {
        {
          if (typeof config.ref === 'string' && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
            var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
            if (!didWarnAboutStringRefs[componentName]) {
              error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);
              didWarnAboutStringRefs[componentName] = true;
            }
          }
        }
      }
      function defineKeyPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingKey = function () {
            if (!specialPropKeyWarningShown) {
              specialPropKeyWarningShown = true;
              error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
            }
          };
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, 'key', {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
      }
      function defineRefPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingRef = function () {
            if (!specialPropRefWarningShown) {
              specialPropRefWarningShown = true;
              error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
            }
          };
          warnAboutAccessingRef.isReactWarning = true;
          Object.defineProperty(props, 'ref', {
            get: warnAboutAccessingRef,
            configurable: true
          });
        }
      }
      /**
       * Factory method to create a new React element. This no longer adheres to
       * the class pattern, so do not use new to call it. Also, instanceof check
       * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
       * if something is a React Element.
       *
       * @param {*} type
       * @param {*} props
       * @param {*} key
       * @param {string|object} ref
       * @param {*} owner
       * @param {*} self A *temporary* helper to detect places where `this` is
       * different from the `owner` when React.createElement is called, so that we
       * can warn. We want to get rid of owner and replace string `ref`s with arrow
       * functions, and as long as `this` and owner are the same, there will be no
       * change in behavior.
       * @param {*} source An annotation object (added by a transpiler or otherwise)
       * indicating filename, line number, and/or other information.
       * @internal
       */

      var ReactElement = function (type, key, ref, self, source, owner, props) {
        var element = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: REACT_ELEMENT_TYPE,
          // Built-in properties that belong on the element
          type: type,
          key: key,
          ref: ref,
          props: props,
          // Record the component responsible for creating this element.
          _owner: owner
        };
        {
          // The validation flag is currently mutative. We put it on
          // an external backing store so that we can freeze the whole object.
          // This can be replaced with a WeakMap once they are implemented in
          // commonly used development environments.
          element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
          // the validation flag non-enumerable (where possible, which should
          // include every environment we run tests in), so the test framework
          // ignores it.

          Object.defineProperty(element._store, 'validated', {
            configurable: false,
            enumerable: false,
            writable: true,
            value: false
          }); // self and source are DEV only properties.

          Object.defineProperty(element, '_self', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: self
          }); // Two elements created in two different places should be considered
          // equal for testing purposes and therefore we hide it from enumeration.

          Object.defineProperty(element, '_source', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: source
          });
          if (Object.freeze) {
            Object.freeze(element.props);
            Object.freeze(element);
          }
        }
        return element;
      };
      /**
       * https://github.com/reactjs/rfcs/pull/107
       * @param {*} type
       * @param {object} props
       * @param {string} key
       */

      function jsxDEV(type, config, maybeKey, source, self) {
        {
          var propName; // Reserved names are extracted

          var props = {};
          var key = null;
          var ref = null; // Currently, key can be spread in as a prop. This causes a potential
          // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
          // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
          // but as an intermediary step, we will use jsxDEV for everything except
          // <div {...props} key="Hi" />, because we aren't currently able to tell if
          // key is explicitly declared to be undefined or not.

          if (maybeKey !== undefined) {
            {
              checkKeyStringCoercion(maybeKey);
            }
            key = '' + maybeKey;
          }
          if (hasValidKey(config)) {
            {
              checkKeyStringCoercion(config.key);
            }
            key = '' + config.key;
          }
          if (hasValidRef(config)) {
            ref = config.ref;
            warnIfStringRefCannotBeAutoConverted(config, self);
          } // Remaining properties are added to a new props object

          for (propName in config) {
            if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
              props[propName] = config[propName];
            }
          } // Resolve default props

          if (type && type.defaultProps) {
            var defaultProps = type.defaultProps;
            for (propName in defaultProps) {
              if (props[propName] === undefined) {
                props[propName] = defaultProps[propName];
              }
            }
          }
          if (key || ref) {
            var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
            if (key) {
              defineKeyPropWarningGetter(props, displayName);
            }
            if (ref) {
              defineRefPropWarningGetter(props, displayName);
            }
          }
          return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
        }
      }
      var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
      var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement$1(element) {
        {
          if (element) {
            var owner = element._owner;
            var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
            ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
          } else {
            ReactDebugCurrentFrame$1.setExtraStackFrame(null);
          }
        }
      }
      var propTypesMisspellWarningShown;
      {
        propTypesMisspellWarningShown = false;
      }
      /**
       * Verifies the object is a ReactElement.
       * See https://reactjs.org/docs/react-api.html#isvalidelement
       * @param {?object} object
       * @return {boolean} True if `object` is a ReactElement.
       * @final
       */

      function isValidElement(object) {
        {
          return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
      }
      function getDeclarationErrorAddendum() {
        {
          if (ReactCurrentOwner$1.current) {
            var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);
            if (name) {
              return '\n\nCheck the render method of `' + name + '`.';
            }
          }
          return '';
        }
      }
      function getSourceInfoErrorAddendum(source) {
        {
          return '';
        }
      }
      /**
       * Warn if there's no key explicitly set on dynamic arrays of children or
       * object keys are not valid. This allows us to keep track of children between
       * updates.
       */

      var ownerHasKeyUseWarning = {};
      function getCurrentComponentErrorInfo(parentType) {
        {
          var info = getDeclarationErrorAddendum();
          if (!info) {
            var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
            if (parentName) {
              info = "\n\nCheck the top-level render call using <" + parentName + ">.";
            }
          }
          return info;
        }
      }
      /**
       * Warn if the element doesn't have an explicit key assigned to it.
       * This element is in an array. The array could grow and shrink or be
       * reordered. All children that haven't already been validated are required to
       * have a "key" property assigned to it. Error statuses are cached so a warning
       * will only be shown once.
       *
       * @internal
       * @param {ReactElement} element Element that requires a key.
       * @param {*} parentType element's parent's type.
       */

      function validateExplicitKey(element, parentType) {
        {
          if (!element._store || element._store.validated || element.key != null) {
            return;
          }
          element._store.validated = true;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
            return;
          }
          ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
          // property, it may be the creator of the child that's responsible for
          // assigning it a key.

          var childOwner = '';
          if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
            // Give the component that originally created this child.
            childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
          }
          setCurrentlyValidatingElement$1(element);
          error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
          setCurrentlyValidatingElement$1(null);
        }
      }
      /**
       * Ensure that every element either is passed in a static location, in an
       * array with an explicit keys property defined, or in an object literal
       * with valid key property.
       *
       * @internal
       * @param {ReactNode} node Statically passed child of any type.
       * @param {*} parentType node's parent's type.
       */

      function validateChildKeys(node, parentType) {
        {
          if (typeof node !== 'object') {
            return;
          }
          if (isArray(node)) {
            for (var i = 0; i < node.length; i++) {
              var child = node[i];
              if (isValidElement(child)) {
                validateExplicitKey(child, parentType);
              }
            }
          } else if (isValidElement(node)) {
            // This element was passed in a valid location.
            if (node._store) {
              node._store.validated = true;
            }
          } else if (node) {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn === 'function') {
              // Entry iterators used to provide implicit keys,
              // but now we print a separate warning for them later.
              if (iteratorFn !== node.entries) {
                var iterator = iteratorFn.call(node);
                var step;
                while (!(step = iterator.next()).done) {
                  if (isValidElement(step.value)) {
                    validateExplicitKey(step.value, parentType);
                  }
                }
              }
            }
          }
        }
      }
      /**
       * Given an element, validate that its props follow the propTypes definition,
       * provided by the type.
       *
       * @param {ReactElement} element
       */

      function validatePropTypes(element) {
        {
          var type = element.type;
          if (type === null || type === undefined || typeof type === 'string') {
            return;
          }
          var propTypes;
          if (typeof type === 'function') {
            propTypes = type.propTypes;
          } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE ||
          // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          type.$$typeof === REACT_MEMO_TYPE)) {
            propTypes = type.propTypes;
          } else {
            return;
          }
          if (propTypes) {
            // Intentionally inside to avoid triggering lazy initializers:
            var name = getComponentNameFromType(type);
            checkPropTypes(propTypes, element.props, 'prop', name, element);
          } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
            propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

            var _name = getComponentNameFromType(type);
            error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
          }
          if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
            error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
          }
        }
      }
      /**
       * Given a fragment, validate that it can only be provided with fragment props
       * @param {ReactElement} fragment
       */

      function validateFragmentProps(fragment) {
        {
          var keys = Object.keys(fragment.props);
          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (key !== 'children' && key !== 'key') {
              setCurrentlyValidatingElement$1(fragment);
              error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);
              setCurrentlyValidatingElement$1(null);
              break;
            }
          }
          if (fragment.ref !== null) {
            setCurrentlyValidatingElement$1(fragment);
            error('Invalid attribute `ref` supplied to `React.Fragment`.');
            setCurrentlyValidatingElement$1(null);
          }
        }
      }
      var didWarnAboutKeySpread = {};
      function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
        {
          var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
          // succeed and there will likely be errors in render.

          if (!validType) {
            var info = '';
            if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
              info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
            }
            var sourceInfo = getSourceInfoErrorAddendum();
            if (sourceInfo) {
              info += sourceInfo;
            } else {
              info += getDeclarationErrorAddendum();
            }
            var typeString;
            if (type === null) {
              typeString = 'null';
            } else if (isArray(type)) {
              typeString = 'array';
            } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
              typeString = "<" + (getComponentNameFromType(type.type) || 'Unknown') + " />";
              info = ' Did you accidentally export a JSX literal instead of a component?';
            } else {
              typeString = typeof type;
            }
            error('React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
          }
          var element = jsxDEV(type, props, key, source, self); // The result can be nullish if a mock or a custom function is used.
          // TODO: Drop this when these are no longer allowed as the type argument.

          if (element == null) {
            return element;
          } // Skip key warning if the type isn't valid since our key validation logic
          // doesn't expect a non-string/function type and can throw confusing errors.
          // We don't want exception behavior to differ between dev and prod.
          // (Rendering will throw with a helpful message and as soon as the type is
          // fixed, the key warnings will appear.)

          if (validType) {
            var children = props.children;
            if (children !== undefined) {
              if (isStaticChildren) {
                if (isArray(children)) {
                  for (var i = 0; i < children.length; i++) {
                    validateChildKeys(children[i], type);
                  }
                  if (Object.freeze) {
                    Object.freeze(children);
                  }
                } else {
                  error('React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');
                }
              } else {
                validateChildKeys(children, type);
              }
            }
          }
          {
            if (hasOwnProperty.call(props, 'key')) {
              var componentName = getComponentNameFromType(type);
              var keys = Object.keys(props).filter(function (k) {
                return k !== 'key';
              });
              var beforeExample = keys.length > 0 ? '{key: someKey, ' + keys.join(': ..., ') + ': ...}' : '{key: someKey}';
              if (!didWarnAboutKeySpread[componentName + beforeExample]) {
                var afterExample = keys.length > 0 ? '{' + keys.join(': ..., ') + ': ...}' : '{}';
                error('A props object containing a "key" prop is being spread into JSX:\n' + '  let props = %s;\n' + '  <%s {...props} />\n' + 'React keys must be passed directly to JSX without using spread:\n' + '  let props = %s;\n' + '  <%s key={someKey} {...props} />', beforeExample, componentName, afterExample, componentName);
                didWarnAboutKeySpread[componentName + beforeExample] = true;
              }
            }
          }
          if (type === REACT_FRAGMENT_TYPE) {
            validateFragmentProps(element);
          } else {
            validatePropTypes(element);
          }
          return element;
        }
      } // These two functions exist to still get child warnings in dev
      // even with the prod transform. This means that jsxDEV is purely
      // opt-in behavior for better messages but that we won't stop
      // giving you warnings if you use production apis.

      function jsxWithValidationStatic(type, props, key) {
        {
          return jsxWithValidation(type, props, key, true);
        }
      }
      function jsxWithValidationDynamic(type, props, key) {
        {
          return jsxWithValidation(type, props, key, false);
        }
      }
      var jsx = jsxWithValidationDynamic; // we may want to special case jsxs internally to take advantage of static children.
      // for now we can ship identical prod functions

      var jsxs = jsxWithValidationStatic;
      reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
      reactJsxRuntime_development.jsx = jsx;
      reactJsxRuntime_development.jsxs = jsxs;
    })();
  }
  return reactJsxRuntime_development;
}

if (process.env.NODE_ENV === 'production') {
  jsxRuntime.exports = requireReactJsxRuntime_production_min();
} else {
  jsxRuntime.exports = requireReactJsxRuntime_development();
}
var jsxRuntimeExports = jsxRuntime.exports;

const ChevronLeftIcon = props => {
  const {
    className = 'w-6 h-6'
  } = props;
  return /*#__PURE__*/jsxRuntimeExports.jsx("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    children: /*#__PURE__*/jsxRuntimeExports.jsx("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M15.75 19.5L8.25 12l7.5-7.5"
    })
  });
};

const ChevronRightIcon = props => {
  const {
    className = 'w-6 h-6'
  } = props;
  return /*#__PURE__*/jsxRuntimeExports.jsx("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    children: /*#__PURE__*/jsxRuntimeExports.jsx("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M8.25 4.5l7.5 7.5-7.5 7.5"
    })
  });
};

const DoubleChevronLeftIcon = props => {
  const {
    className = 'w-6 h-6'
  } = props;
  return /*#__PURE__*/jsxRuntimeExports.jsx("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    children: /*#__PURE__*/jsxRuntimeExports.jsx("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
    })
  });
};

const DoubleChevronRightIcon = props => {
  const {
    className = 'w-6 h-6'
  } = props;
  return /*#__PURE__*/jsxRuntimeExports.jsx("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    children: /*#__PURE__*/jsxRuntimeExports.jsx("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
    })
  });
};

const RoundedButton = props => {
  const {
    children,
    onClick,
    disabled,
    roundedFull = false,
    padding = 'py-[0.55rem]',
    active = false
  } = props;
  // Contexts
  const {
    primaryColor
  } = useContext(DatepickerContext);
  // Functions
  const getClassName = useCallback(() => {
    const darkClass = 'dark:text-white/70 dark:hover:bg-white/10 dark:focus:bg-white/10';
    const activeClass = active ? 'font-semibold bg-gray-50 dark:bg-white/5' : '';
    const defaultClass = !roundedFull ? `w-full tracking-wide ${darkClass} ${activeClass} transition-all duration-300 px-3 ${padding} uppercase hover:bg-gray-100 rounded-md focus:ring-1` : `${darkClass} ${activeClass} transition-all duration-300 hover:bg-gray-100 rounded-full p-[0.45rem] focus:ring-1`;
    const buttonFocusColor = BUTTON_COLOR.focus[primaryColor];
    const disabledClass = disabled ? 'line-through' : '';
    return `${defaultClass} ${buttonFocusColor} ${disabledClass}`;
  }, [disabled, padding, primaryColor, roundedFull, active]);
  return /*#__PURE__*/jsxRuntimeExports.jsx("button", {
    type: "button",
    className: getClassName(),
    onClick: onClick,
    disabled: disabled,
    children: children
  });
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
function generateArrayNumber(start = 0, end = 0) {
  const array = [];
  for (let i = start; i <= end; i++) {
    array.push(i);
  }
  return array;
}
function shortString(value, limit = 3) {
  return value.slice(0, limit);
}
function ucFirst(value) {
  return `${(value[0] || '')?.toUpperCase()}${(value || '')?.slice(1, value.length)}`;
}

const Days = props => {
  // Props
  const {
    days,
    onClickPreviousDays,
    onClickDay,
    onClickNextDays
  } = props;
  // Contexts
  const {
    primaryColor,
    period,
    changePeriod,
    dayHover,
    changeDayHover,
    minDate,
    maxDate,
    disabledDates
  } = useContext(DatepickerContext);
  // Functions
  const currentDateClass = useCallback(day => {
    if (isCurrentDay(day)) return TEXT_COLOR['500'][primaryColor];
    return '';
  }, [primaryColor]);
  const activeDateData = useCallback(day => {
    let className = '';
    const dayIsSameStart = period.start && dateIsSame(day, period.start, 'date');
    const dayIsSameEnd = period.end && dateIsSame(day, period.end, 'date');
    const dayIsSameHoverDay = dayHover && dateIsSame(day, dayHover, 'date');
    if (dayIsSameStart && dayIsSameEnd) {
      className = ` ${BG_COLOR['500'][primaryColor]} text-white font-medium rounded-full day-selected`;
    } else if (dayIsSameStart) {
      className = ` ${BG_COLOR['500'][primaryColor]} text-white font-medium ${dayIsSameHoverDay && !period.end ? 'rounded-full' : 'rounded-l-full'} day-selected start`;
    } else if (dayIsSameEnd) {
      className = ` ${BG_COLOR['500'][primaryColor]} text-white font-medium ${dayIsSameHoverDay && !period.start ? 'rounded-full' : 'rounded-r-full'} day-selected end`;
    }
    return {
      active: dayIsSameStart || dayIsSameEnd,
      className: className
    };
  }, [dayHover, period.end, period.start, primaryColor]);
  const hoverClassByDay = useCallback(day => {
    let className = currentDateClass(day);
    if (period.start && period.end) {
      if (dateIsBetween(day, period.start, period.end, 'day', {
        start: true,
        end: false
      })) {
        return ` ${BG_COLOR['100'][primaryColor]} ${currentDateClass(day)} dark:bg-white/10 day-between`;
      }
    }
    if (!dayHover) {
      return className;
    }
    if (period.start && dateIsBetween(day, period.start, dayHover, 'day', {
      start: true,
      end: false
    })) {
      className = ` ${BG_COLOR['100'][primaryColor]} ${currentDateClass(day)} dark:bg-white/10`;
    }
    if (period.end && dateIsBetween(day, dayHover, period.end, 'day', {
      start: true,
      end: false
    })) {
      className = ` ${BG_COLOR['100'][primaryColor]} ${currentDateClass(day)} dark:bg-white/10`;
    }
    if (dateIsSame(dayHover, day, 'date')) {
      const bgColor = BG_COLOR['500'][primaryColor];
      className = ` transition-all duration-500 text-white font-medium ${bgColor} ${period.start ? 'rounded-r-full' : 'rounded-l-full'} day`;
    }
    return className;
  }, [currentDateClass, dayHover, period.end, period.start, primaryColor]);
  const isDateTooEarly = useCallback(day => {
    if (!minDate) return false;
    return dateIsBefore(day, minDate, 'date');
  }, [minDate]);
  const isDateTooLate = useCallback(day => {
    if (!maxDate) return false;
    return dateIsAfter(day, maxDate, 'date');
  }, [maxDate]);
  const isDateDisabled = useCallback(day => {
    if (isDateTooEarly(day) || isDateTooLate(day)) {
      return true;
    }
    if (!disabledDates || Array.isArray(disabledDates) && !disabledDates.length) {
      return false;
    }
    let matchingCount = 0;
    disabledDates?.forEach(dateRange => {
      if (dateRange.startDate && dateRange.endDate && dateIsBetween(day, dateRange.startDate, dateRange.endDate, 'date', {
        start: true,
        end: true
      })) {
        matchingCount++;
      }
    });
    return matchingCount > 0;
  }, [isDateTooEarly, isDateTooLate, disabledDates]);
  const buttonClass = useCallback((day, type) => {
    const baseClass = 'flex items-center justify-center w-12 h-12 lg:w-10 lg:h-10';
    if (type === 'current') {
      return classNames(baseClass, !activeDateData(day).active ? hoverClassByDay(day) : activeDateData(day).className, isDateDisabled(day) && 'line-through');
    }
    return classNames(baseClass, isDateDisabled(day) && 'line-through', 'text-gray-400');
  }, [activeDateData, hoverClassByDay, isDateDisabled]);
  const checkIfHoverPeriodContainsDisabledPeriod = useCallback(hoverPeriod => {
    if (!Array.isArray(disabledDates)) {
      return false;
    }
    for (let i = 0; i < disabledDates.length; i++) {
      if (dateIsSameOrBefore(hoverPeriod.start, disabledDates[i].startDate, 'date') && dateIsSameOrAfter(hoverPeriod.end, disabledDates[i].endDate, 'date')) {
        return true;
      }
    }
    return false;
  }, [disabledDates]);
  const hoverDay = useCallback(day => {
    if (period.start && !period.end) {
      const hoverPeriod = {
        ...period,
        end: day
      };
      if (dateIsBefore(day, period.start, 'date')) {
        hoverPeriod.start = day;
        hoverPeriod.end = period.start;
        if (!checkIfHoverPeriodContainsDisabledPeriod(hoverPeriod)) {
          changePeriod({
            start: null,
            end: period.start
          });
        }
      }
      if (!checkIfHoverPeriodContainsDisabledPeriod(hoverPeriod)) {
        changeDayHover(day);
      }
    }
    if (!period.start && period.end) {
      const hoverPeriod = {
        ...period,
        start: day
      };
      if (dateIsAfter(day, period.end, 'date')) {
        hoverPeriod.start = period.end;
        hoverPeriod.end = day;
        if (!checkIfHoverPeriodContainsDisabledPeriod(hoverPeriod)) {
          changePeriod({
            start: period.end,
            end: null
          });
        }
      }
      if (!checkIfHoverPeriodContainsDisabledPeriod(hoverPeriod)) {
        changeDayHover(day);
      }
    }
  }, [changeDayHover, changePeriod, checkIfHoverPeriodContainsDisabledPeriod, period]);
  const handleClickDay = useCallback((day, type) => {
    function continueClick() {
      if (type === 'previous') {
        onClickPreviousDays(day);
      }
      if (type === 'current') {
        onClickDay(day);
      }
      if (type === 'next') {
        onClickNextDays(day);
      }
    }
    if (disabledDates?.length) {
      const daySelectedIsSameHoverDay = dayHover && dateIsSame(day, dayHover, 'date');
      if (period.start && !period.end && daySelectedIsSameHoverDay) {
        continueClick();
      } else if (!period.start && period.end && daySelectedIsSameHoverDay) {
        continueClick();
      } else {
        continueClick();
      }
    } else {
      continueClick();
    }
  }, [dayHover, disabledDates?.length, onClickDay, onClickNextDays, onClickPreviousDays, period.end, period.start]);
  return /*#__PURE__*/jsxRuntimeExports.jsxs("div", {
    className: "date-picker-calendar-days-in-month-selector-wrapper my-1 grid grid-cols-7 gap-y-0.5",
    children: [days.previous.map((item, index) => /*#__PURE__*/jsxRuntimeExports.jsx("div", {
      className: "day-btn-wrapper",
      children: /*#__PURE__*/jsxRuntimeExports.jsx("button", {
        "data-date": new Date(item).setHours(0, 0, 0, 0),
        type: "button",
        disabled: isDateDisabled(item),
        className: `${buttonClass(item, 'previous')}`,
        onClick: () => handleClickDay(item, 'previous'),
        onMouseOver: () => {
          hoverDay(item);
        },
        children: item.getDate()
      }, index)
    }, index)), days.current.map((item, index) => /*#__PURE__*/jsxRuntimeExports.jsx("div", {
      className: "day-btn-wrapper",
      children: /*#__PURE__*/jsxRuntimeExports.jsx("button", {
        "data-date": new Date(item).setHours(0, 0, 0, 0),
        type: "button",
        disabled: isDateDisabled(item),
        className: `${buttonClass(item, 'current')}`,
        onClick: () => handleClickDay(item, 'current'),
        onMouseOver: () => {
          hoverDay(item);
        },
        children: item.getDate()
      }, index)
    }, index)), days.next.map((item, index) => /*#__PURE__*/jsxRuntimeExports.jsx("div", {
      className: "day-btn-wrapper",
      children: /*#__PURE__*/jsxRuntimeExports.jsx("button", {
        "data-date": new Date(item).setHours(0, 0, 0, 0),
        type: "button",
        disabled: isDateDisabled(item),
        className: `${buttonClass(item, 'next')}`,
        onClick: () => handleClickDay(item, 'next'),
        onMouseOver: () => {
          hoverDay(item);
        },
        children: item.getDate()
      }, index)
    }, index))]
  });
};

const Months = props => {
  const {
    currentMonth,
    clickMonth
  } = props;
  const {
    i18n
  } = useContext(DatepickerContext);
  useEffect(() => {
    loadLanguageModule(i18n);
  }, [i18n]);
  return /*#__PURE__*/jsxRuntimeExports.jsx("div", {
    className: "mt-2 grid w-full grid-cols-2 gap-2",
    children: MONTHS.map(item => /*#__PURE__*/jsxRuntimeExports.jsx(RoundedButton, {
      padding: "py-3",
      onClick: () => {
        clickMonth(item);
      },
      active: currentMonth === item,
      children: dateFormat(new Date(2022, item - 1, 1), 'MMM', i18n)
    }, item))
  });
};

const Week = () => {
  const {
    i18n,
    startWeekOn
  } = useContext(DatepickerContext);
  useEffect(() => {
    loadLanguageModule(i18n);
  }, [i18n]);
  const startDateModifier = useMemo(() => {
    if (startWeekOn) {
      switch (startWeekOn) {
        case 'mon':
          return 1;
        case 'tue':
          return 2;
        case 'wed':
          return 3;
        case 'thu':
          return 4;
        case 'fri':
          return 5;
        case 'sat':
          return 6;
        case 'sun':
          return 0;
        default:
          return 0;
      }
    }
    return 0;
  }, [startWeekOn]);
  return /*#__PURE__*/jsxRuntimeExports.jsx("div", {
    className: "date-picker-calendar-days-selector-week-wrapper grid grid-cols-7 border-b border-gray-300 py-2 dark:border-gray-700",
    children: DAYS.map(item => /*#__PURE__*/jsxRuntimeExports.jsx("div", {
      className: "text-center tracking-wide text-gray-500",
      children: ucFirst(shortString(dateFormat(new Date(`2022-11-${6 + item + startDateModifier}`), 'ddd', i18n) || ''))
    }, item))
  });
};

const Years = props => {
  const {
    year,
    currentYear,
    minYear,
    maxYear,
    clickYear
  } = props;
  const {
    dateLooking
  } = useContext(DatepickerContext);
  const date = useMemo(() => {
    let start;
    let end;
    switch (dateLooking) {
      case 'backward':
        start = year - 11;
        end = year;
        break;
      case 'middle':
        start = year - 4;
        end = year + 7;
        break;
      case 'forward':
      default:
        start = year;
        end = year + 11;
        break;
    }
    return {
      start,
      end
    };
  }, [dateLooking, year]);
  return /*#__PURE__*/jsxRuntimeExports.jsx("div", {
    className: "mt-2 grid w-full grid-cols-2 gap-2",
    children: generateArrayNumber(date.start, date.end).map((item, index) => /*#__PURE__*/jsxRuntimeExports.jsx(RoundedButton, {
      padding: "py-3",
      onClick: () => {
        clickYear(item);
      },
      active: currentYear === item,
      disabled: maxYear !== null && item > maxYear || minYear !== null && item < minYear,
      children: /*#__PURE__*/jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
        children: item
      })
    }, index))
  });
};

const NUMBER_YEARS_SHOW = 12;
const CALENDAR_SIZE = 42;
const Calendar = props => {
  // Props
  const {
    date,
    minDate,
    maxDate,
    onClickPrevious,
    onClickNext,
    changeMonth,
    changeYear
  } = props;
  // Contexts
  const {
    period,
    changePeriod,
    changeDayHover,
    showFooter,
    changeDatepickerValue,
    hideDatepicker,
    asSingle,
    i18n,
    startWeekOn,
    input
  } = useContext(DatepickerContext);
  loadLanguageModule(i18n);
  // States
  const [showMonths, setShowMonths] = useState(false);
  const [showYears, setShowYears] = useState(false);
  const [year, setYear] = useState(date.getFullYear());
  // Functions
  const hideMonths = useCallback(() => {
    if (showMonths) setShowMonths(false);
  }, [showMonths]);
  const hideYears = useCallback(() => {
    if (showYears) setShowYears(false);
  }, [showYears]);
  const clickMonth = useCallback(month => {
    setTimeout(() => {
      changeMonth(month);
      setShowMonths(!showMonths);
    }, 250);
  }, [changeMonth, showMonths]);
  const clickYear = useCallback(year => {
    setTimeout(() => {
      changeYear(year);
      setShowYears(!showYears);
    }, 250);
  }, [changeYear, showYears]);
  const clickDay = useCallback((day, after) => {
    let newStart;
    let newEnd = null;
    function chosePeriod(start, end) {
      const ipt = input?.current;
      changeDatepickerValue({
        startDate: start,
        endDate: end
      }, ipt);
      hideDatepicker();
    }
    if (period.start && period.end) {
      changeDayHover(null);
      changePeriod({
        start: null,
        end: null
      });
    }
    if (!period.start && !period.end || period.start && period.end) {
      if (!period.start && !period.end) {
        changeDayHover(day);
      }
      newStart = day;
      if (asSingle) {
        newEnd = day;
        if (!showFooter) {
          chosePeriod(day, day);
        }
      }
    } else {
      if (period.start && !period.end) {
        // start not null
        // end null
        const condition = dateIsSameOrAfter(day, period.start, 'date');
        newStart = condition ? period.start : day;
        newEnd = condition ? day : period.start;
      } else {
        // Start null
        // End not null
        const condition = dateIsSameOrBefore(day, period.end, 'date');
        newStart = condition ? day : period.start;
        newEnd = condition ? period.end : day;
      }
      if (!showFooter) {
        if (newStart && newEnd) {
          chosePeriod(newStart, newEnd);
        }
      }
    }
    if (!(newEnd && newStart) || showFooter) {
      changePeriod({
        start: newStart,
        end: newEnd
      });
    }
    if (after) {
      setTimeout(() => {
        after();
      }, 50);
    }
  }, [asSingle, changeDatepickerValue, changeDayHover, changePeriod, hideDatepicker, period.end, period.start, showFooter, input]);
  const clickPreviousDays = useCallback(day => {
    clickDay(day, () => {
      onClickPrevious();
    });
  }, [clickDay, onClickPrevious]);
  const clickNextDays = useCallback(day => {
    clickDay(day, () => {
      onClickNext();
    });
  }, [clickDay, onClickNext]);
  // UseEffects & UseLayoutEffect
  useEffect(() => {
    setYear(date.getFullYear());
  }, [date]);
  // Variables
  const calendarData = useMemo(() => {
    const firstDateCurrentMonth = firstDayOfMonth(date);
    const lastDateCurrentMonth = endDayOfMonth(date);
    const startWeekOnIndex = weekDayStringToIndex(startWeekOn || START_WEEK);
    const previous = previousDaysInWeek(firstDateCurrentMonth, startWeekOnIndex);
    const current = allDaysInMonth(date);
    const next = nextDaysInWeek(lastDateCurrentMonth, startWeekOnIndex);
    const remainingDaysLength = CALENDAR_SIZE - (previous.length + current.length + next.length);
    if (remainingDaysLength > 0) {
      const lastNextDate = next[next.length - 1] || current[current.length - 1];
      next.push(...getNextDates(lastNextDate, remainingDaysLength));
    }
    return {
      previous: previous,
      current: current,
      next: next
    };
  }, [date, startWeekOn]);
  const years = useMemo(() => {
    return {
      min: minDate && dateIsValid(minDate) ? minDate.getFullYear() : null,
      max: maxDate && dateIsValid(maxDate) ? maxDate.getFullYear() : null
    };
  }, [maxDate, minDate]);
  return /*#__PURE__*/jsxRuntimeExports.jsxs("div", {
    className: "date-picker-calendar-section w-full md:w-[296px] md:min-w-[296px]",
    children: [/*#__PURE__*/jsxRuntimeExports.jsxs("div", {
      className: "date-picker-calendar-pagination flex items-center space-x-1.5 rounded-md border border-gray-300 px-2 py-1.5 dark:border-gray-700",
      children: [!showMonths && !showYears && /*#__PURE__*/jsxRuntimeExports.jsx("div", {
        className: "date-picker-calendar-pagination-chevron-left flex-none",
        children: /*#__PURE__*/jsxRuntimeExports.jsx(RoundedButton, {
          roundedFull: true,
          onClick: onClickPrevious,
          children: /*#__PURE__*/jsxRuntimeExports.jsx(ChevronLeftIcon, {
            className: "h-5 w-5"
          })
        })
      }), showYears && /*#__PURE__*/jsxRuntimeExports.jsx("div", {
        className: "date-picker-calendar-pagination-chevron-double-left flex-none",
        children: /*#__PURE__*/jsxRuntimeExports.jsx(RoundedButton, {
          roundedFull: true,
          onClick: () => {
            setYear(year - NUMBER_YEARS_SHOW);
          },
          children: /*#__PURE__*/jsxRuntimeExports.jsx(DoubleChevronLeftIcon, {
            className: "h-5 w-5"
          })
        })
      }), /*#__PURE__*/jsxRuntimeExports.jsxs("div", {
        className: "date-picker-calendar-pagination-date-wrapper flex flex-1 items-center space-x-1.5",
        children: [/*#__PURE__*/jsxRuntimeExports.jsx("div", {
          className: "date-picker-calendar-pagination-date-month w-1/2",
          children: /*#__PURE__*/jsxRuntimeExports.jsx(RoundedButton, {
            onClick: () => {
              setShowMonths(!showMonths);
              hideYears();
            },
            children: dateFormat(date, 'MMM', i18n)
          })
        }), /*#__PURE__*/jsxRuntimeExports.jsx("div", {
          className: "date-picker-calendar-pagination-date-year w-1/2",
          children: /*#__PURE__*/jsxRuntimeExports.jsx(RoundedButton, {
            onClick: () => {
              setShowYears(!showYears);
              hideMonths();
            },
            children: /*#__PURE__*/jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
              children: date.getFullYear()
            })
          })
        })]
      }), showYears && /*#__PURE__*/jsxRuntimeExports.jsx("div", {
        className: "date-picker-calendar-pagination-chevron-double-right flex-none",
        children: /*#__PURE__*/jsxRuntimeExports.jsx(RoundedButton, {
          roundedFull: true,
          onClick: () => {
            setYear(year + NUMBER_YEARS_SHOW);
          },
          children: /*#__PURE__*/jsxRuntimeExports.jsx(DoubleChevronRightIcon, {
            className: "h-5 w-5"
          })
        })
      }), !showMonths && !showYears && /*#__PURE__*/jsxRuntimeExports.jsx("div", {
        className: "date-picker-calendar-pagination-chevron-right flex-none",
        children: /*#__PURE__*/jsxRuntimeExports.jsx(RoundedButton, {
          roundedFull: true,
          onClick: onClickNext,
          children: /*#__PURE__*/jsxRuntimeExports.jsx(ChevronRightIcon, {
            className: "h-5 w-5"
          })
        })
      })]
    }), /*#__PURE__*/jsxRuntimeExports.jsxs("div", {
      className: "date-picker-calendar-days-selector-wrapper mt-0.5 min-h-[285px] px-0.5 sm:px-2",
      children: [showMonths && /*#__PURE__*/jsxRuntimeExports.jsx(Months, {
        currentMonth: date.getMonth() + 1,
        clickMonth: clickMonth
      }), showYears && /*#__PURE__*/jsxRuntimeExports.jsx(Years, {
        year: year,
        minYear: years.min,
        maxYear: years.max,
        currentYear: date.getFullYear(),
        clickYear: clickYear
      }), !showMonths && !showYears && /*#__PURE__*/jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
        children: [/*#__PURE__*/jsxRuntimeExports.jsx(Week, {}), /*#__PURE__*/jsxRuntimeExports.jsx(Days, {
          days: calendarData,
          onClickPreviousDays: clickPreviousDays,
          onClickDay: clickDay,
          onClickNextDays: clickNextDays
        })]
      })]
    })]
  });
};

const PrimaryButton = props => {
  const {
    children,
    onClick,
    disabled = false
  } = props;
  // Contexts
  const {
    primaryColor
  } = useContext(DatepickerContext);
  const bgColor = BG_COLOR['500'][primaryColor];
  const borderColor = BORDER_COLOR['500'][primaryColor];
  const bgColorHover = BG_COLOR.hover[primaryColor];
  const ringColor = RING_COLOR.focus[primaryColor];
  // Functions
  const getClassName = useCallback(() => {
    return `w-full transition-all duration-300 ${bgColor} ${borderColor} text-white  apply-btn font-medium border px-4 py-2 text-sm rounded-md focus:ring-2 focus:ring-offset-2 ${bgColorHover} ${ringColor} ${disabled ? ' cursor-no-drop' : ''}`;
  }, [bgColor, bgColorHover, borderColor, disabled, ringColor]);
  return /*#__PURE__*/jsxRuntimeExports.jsx("button", {
    type: "button",
    className: getClassName(),
    onClick: onClick,
    disabled: disabled,
    children: children
  });
};

const SecondaryButton = props => {
  const {
    children,
    onClick,
    disabled = false
  } = props;
  // Contexts
  const {
    primaryColor
  } = useContext(DatepickerContext);
  // Functions
  const getClassName = useCallback(() => {
    const ringColor = RING_COLOR.focus[primaryColor];
    return `w-full transition-all duration-300 bg-white dark:text-gray-700 font-medium border border-gray-300 px-4 py-2 text-sm rounded-md focus:ring-2 focus:ring-offset-2 hover:bg-gray-50 ${ringColor} cancel-btn`;
  }, [primaryColor]);
  return /*#__PURE__*/jsxRuntimeExports.jsx("button", {
    type: "button",
    className: getClassName(),
    onClick: onClick,
    disabled: disabled,
    children: children
  });
};

const Footer = () => {
  // Contexts
  const {
    hideDatepicker,
    period,
    changeDatepickerValue,
    configs,
    classNames
  } = useContext(DatepickerContext);
  // Functions
  const getClassName = useCallback(() => {
    if (typeof classNames !== 'undefined' && typeof classNames?.footer === 'function') {
      return classNames.footer();
    }
    return 'date-picker-calendar-footer-wrapper flex items-center justify-end pb-2.5 pt-3 border-t border-gray-300 dark:border-gray-700';
  }, [classNames]);
  return /*#__PURE__*/jsxRuntimeExports.jsx("div", {
    className: getClassName(),
    children: /*#__PURE__*/jsxRuntimeExports.jsxs("div", {
      className: "date-picker-calendar-footer-controllers flex w-full items-center justify-center space-x-3 md:w-auto",
      children: [/*#__PURE__*/jsxRuntimeExports.jsx(SecondaryButton, {
        onClick: () => {
          hideDatepicker();
        },
        children: /*#__PURE__*/jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
          children: configs?.footer?.cancel ? configs.footer.cancel : 'Cancel'
        })
      }), /*#__PURE__*/jsxRuntimeExports.jsx(PrimaryButton, {
        onClick: () => {
          if (period.start && period.end) {
            changeDatepickerValue({
              startDate: period.start,
              endDate: period.end
            });
            hideDatepicker();
          }
        },
        disabled: !(period.start && period.end),
        children: /*#__PURE__*/jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
          children: configs?.footer?.apply ? configs.footer.apply : 'Apply'
        })
      })]
    })
  });
};

const Arrow = /*#__PURE__*/forwardRef((props, ref) => {
  return /*#__PURE__*/jsxRuntimeExports.jsx("div", {
    ...props,
    ref: ref,
    className: "date-picker-arrow-marker absolute z-20 ml-[1.2rem] mt-0.5 h-4 w-4 rotate-45 border-l border-t border-gray-300 bg-white dark:border-slate-600 dark:bg-slate-800"
  });
});
Arrow.displayName = 'Arrow';

const CloseIcon = props => {
  const {
    className = 'w-6 h-6'
  } = props;
  return /*#__PURE__*/jsxRuntimeExports.jsx("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    children: /*#__PURE__*/jsxRuntimeExports.jsx("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M6 18L18 6M6 6l12 12"
    })
  });
};

const DateIcon = props => {
  const {
    className = 'w-6 h-6'
  } = props;
  return /*#__PURE__*/jsxRuntimeExports.jsx("svg", {
    className: className,
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    strokeWidth: 1.5,
    stroke: "currentColor",
    children: /*#__PURE__*/jsxRuntimeExports.jsx("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
    })
  });
};

const ToggleButton = e => {
  return e.isEmpty ? /*#__PURE__*/jsxRuntimeExports.jsx(DateIcon, {
    className: "h-5 w-5"
  }) : /*#__PURE__*/jsxRuntimeExports.jsx(CloseIcon, {
    className: "h-5 w-5"
  });
};

const Input = e => {
  // Context
  const {
    primaryColor,
    period,
    dayHover,
    changeDayHover,
    calendarContainer,
    arrowContainer,
    inputText,
    changeInputText,
    hideDatepicker,
    changeDatepickerValue,
    asSingle,
    placeholder,
    separator,
    disabled,
    inputClassName,
    toggleClassName,
    toggleIcon,
    readOnly,
    displayFormat,
    inputId,
    inputName,
    classNames,
    popoverDirection,
    required
  } = useContext(DatepickerContext);
  // UseRefs
  const buttonRef = useRef(null);
  const inputRef = useRef(null);
  // Functions
  const getClassName = useCallback(() => {
    const input = inputRef.current;
    if (input && typeof classNames !== 'undefined' && typeof classNames?.input === 'function') {
      return classNames.input(input);
    }
    const border = BORDER_COLOR.focus[primaryColor];
    const ring = RING_COLOR['second-focus'][primaryColor];
    const defaultInputClassName = `date-picker-input relative transition-all duration-300 py-2.5 pl-4 pr-14 w-full border-gray-300 dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 rounded-lg tracking-wide font-light text-sm placeholder-gray-400 bg-white focus:ring disabled:opacity-40 disabled:cursor-not-allowed ${border} ${ring}`;
    return typeof inputClassName === 'function' ? inputClassName(defaultInputClassName) : typeof inputClassName === 'string' && inputClassName !== '' ? inputClassName : defaultInputClassName;
  }, [inputRef, classNames, primaryColor, inputClassName]);
  const handleInputChange = useCallback(e => {
    const inputValue = e.target.value;
    const dates = [];
    if (asSingle) {
      // const date = parseFormattedDate(inputValue, displayFormat);
      const date = dateStringToDate(inputValue);
      if (date) {
        dates.push(date);
      }
    } else {
      const parsed = inputValue.split(separator);
      let startDate;
      let endDate;
      if (parsed.length === 2) {
        dateStringToDate(parsed[0]);
        startDate = dateStringToDate(parsed[0]);
        endDate = dateStringToDate(parsed[1]);
      } else {
        const middle = Math.floor(inputValue.length / 2);
        startDate = dateStringToDate(inputValue.slice(0, middle));
        endDate = dateStringToDate(inputValue.slice(middle));
      }
      if (startDate && endDate && dateIsBefore(startDate, endDate, 'date')) {
        dates.push(startDate);
        dates.push(endDate);
      }
    }
    if (dates[0]) {
      changeDatepickerValue({
        startDate: dates[0],
        endDate: dates[1] || dates[0]
      }, e.target);
      if (dates[1]) {
        changeDayHover(dateAdd(dates[1], -1, 'day'));
      } else {
        changeDayHover(dates[0]);
      }
    }
    changeInputText(e.target.value);
  }, [asSingle, separator, changeDatepickerValue, changeDayHover, changeInputText]);
  const handleInputKeyDown = useCallback(e => {
    if (e.key === 'Enter') {
      const input = inputRef.current;
      if (input) {
        input.blur();
      }
      hideDatepicker();
    }
  }, [hideDatepicker]);
  const renderToggleIcon = useCallback(isEmpty => {
    return typeof toggleIcon === 'undefined' ? /*#__PURE__*/jsxRuntimeExports.jsx(ToggleButton, {
      isEmpty: isEmpty
    }) : toggleIcon(isEmpty);
  }, [toggleIcon]);
  const getToggleClassName = useCallback(() => {
    const button = buttonRef.current;
    if (button && typeof classNames !== 'undefined' && typeof classNames?.toggleButton === 'function') {
      return classNames.toggleButton(button);
    }
    const defaultToggleClassName = 'date-pciker-select-btn absolute right-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed';
    return typeof toggleClassName === 'function' ? toggleClassName(defaultToggleClassName) : typeof toggleClassName === 'string' && toggleClassName !== '' ? toggleClassName : defaultToggleClassName;
  }, [toggleClassName, buttonRef, classNames]);
  // UseEffects && UseLayoutEffect
  useEffect(() => {
    if (inputRef && e.setContextRef && typeof e.setContextRef === 'function') {
      e.setContextRef(inputRef);
    }
  }, [e, inputRef]);
  useEffect(() => {
    const button = buttonRef?.current;
    function focusInput(e) {
      e.stopPropagation();
      const input = inputRef.current;
      if (input) {
        input.focus();
        if (inputText) {
          changeInputText('');
          if (dayHover) {
            changeDayHover(null);
          }
          if (period.start && period.end) {
            changeDatepickerValue({
              startDate: null,
              endDate: null
            }, input);
          }
        }
      }
    }
    if (button) {
      button.addEventListener('click', focusInput);
    }
    return () => {
      if (button) {
        button.removeEventListener('click', focusInput);
      }
    };
  }, [changeDatepickerValue, changeDayHover, changeInputText, dayHover, inputText, period.end, period.start, inputRef]);
  useEffect(() => {
    const div = calendarContainer?.current;
    const input = inputRef.current;
    const arrow = arrowContainer?.current;
    function showCalendarContainer() {
      if (arrow && div && div.classList.contains('hidden')) {
        div.classList.remove('hidden');
        div.classList.add('block');
        // window.innerWidth === 767
        const popoverOnUp = popoverDirection == 'up';
        const popoverOnDown = popoverDirection === 'down';
        if (popoverOnUp || window.innerWidth > 767 && window.screen.height - 100 < div.getBoundingClientRect().bottom && !popoverOnDown) {
          div.classList.add('bottom-full');
          div.classList.add('mb-2.5');
          div.classList.remove('mt-2.5');
          arrow.classList.add('-bottom-2');
          arrow.classList.add('border-r');
          arrow.classList.add('border-b');
          arrow.classList.remove('border-l');
          arrow.classList.remove('border-t');
        }
        setTimeout(() => {
          div.classList.remove('translate-y-4');
          div.classList.remove('opacity-0');
          div.classList.add('translate-y-0');
          div.classList.add('opacity-1');
        }, 1);
      }
    }
    if (div && input) {
      input.addEventListener('focus', showCalendarContainer);
    }
    return () => {
      if (input) {
        input.removeEventListener('focus', showCalendarContainer);
      }
    };
  }, [calendarContainer, arrowContainer, popoverDirection]);
  return /*#__PURE__*/jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
    children: [/*#__PURE__*/jsxRuntimeExports.jsx("input", {
      ref: inputRef,
      type: "text",
      className: getClassName(),
      disabled: disabled,
      readOnly: readOnly,
      required: required,
      placeholder: placeholder ? placeholder : `${displayFormat}${asSingle ? '' : ` ${separator} ${displayFormat}`}`,
      value: inputText,
      id: inputId,
      name: inputName,
      autoComplete: "off",
      role: "presentation",
      onChange: handleInputChange,
      onKeyDown: handleInputKeyDown
    }), /*#__PURE__*/jsxRuntimeExports.jsx("button", {
      type: "button",
      ref: buttonRef,
      disabled: disabled,
      className: getToggleClassName(),
      children: renderToggleIcon(inputText == null || !inputText?.length)
    })]
  });
};

const CURRENT_DATE = new Date();
const DEFAULT_SHORTCUTS = {
  today: {
    text: 'Today',
    period: {
      start: CURRENT_DATE,
      end: CURRENT_DATE
    }
  },
  yesterday: {
    text: 'Yesterday',
    period: {
      start: dateAdd(CURRENT_DATE, -1, 'day'),
      end: dateAdd(CURRENT_DATE, -1, 'day')
    }
  },
  past: [{
    daysNumber: 7,
    text: 'Last 7 days',
    period: {
      start: dateAdd(CURRENT_DATE, -7, 'day'),
      end: CURRENT_DATE
    }
  }, {
    daysNumber: 30,
    text: 'Last 30 days',
    period: {
      start: dateAdd(CURRENT_DATE, -30, 'day'),
      end: CURRENT_DATE
    }
  }],
  currentMonth: {
    text: 'This month',
    period: {
      start: firstDayOfMonth(CURRENT_DATE),
      end: endDayOfMonth(CURRENT_DATE)
    }
  },
  pastMonth: {
    text: 'Last month',
    period: {
      start: firstDayOfMonth(previousMonthBy(CURRENT_DATE)),
      end: endDayOfMonth(previousMonthBy(CURRENT_DATE))
    }
  }
};

const ItemTemplate = /*#__PURE__*/memo(props => {
  const {
    primaryColor,
    period,
    changePeriod,
    updateFirstDate,
    dayHover,
    changeDayHover,
    hideDatepicker,
    changeDatepickerValue
  } = useContext(DatepickerContext);
  // Functions
  const getClassName = useCallback(() => {
    const textColor = TEXT_COLOR['600'][primaryColor];
    const textColorHover = TEXT_COLOR.hover[primaryColor];
    return `whitespace-nowrap w-1/2 md:w-1/3 lg:w-auto transition-all duration-300 hover:bg-gray-100 dark:hover:bg-white/10 p-2 rounded cursor-pointer ${textColor} ${textColorHover}`;
  }, [primaryColor]);
  const chosePeriod = useCallback(item => {
    if (dayHover) {
      changeDayHover(null);
    }
    if (period.start || period.end) {
      changePeriod({
        start: null,
        end: null
      });
    }
    changePeriod(item);
    changeDatepickerValue({
      startDate: item.start,
      endDate: item.end
    });
    if (item.start) updateFirstDate(item.start);
    hideDatepicker();
  }, [changeDatepickerValue, changeDayHover, changePeriod, dayHover, hideDatepicker, period.end, period.start, updateFirstDate]);
  const children = props?.children;
  return /*#__PURE__*/jsxRuntimeExports.jsx("li", {
    className: getClassName(),
    onClick: () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      chosePeriod(props?.item.period);
    },
    children: children
  });
});
ItemTemplate.displayName = 'ItemTemplate';
const Shortcuts = () => {
  // Contexts
  const {
    configs
  } = useContext(DatepickerContext);
  const callPastFunction = useCallback((data, numberValue) => {
    return typeof data === 'function' ? data(numberValue) : null;
  }, []);
  const shortcutOptions = useMemo(() => {
    if (!configs?.shortcuts) {
      return Object.entries(DEFAULT_SHORTCUTS);
    }
    return Object.entries(configs.shortcuts).flatMap(([key, customConfig]) => {
      if (Object.prototype.hasOwnProperty.call(DEFAULT_SHORTCUTS, key)) {
        return [[key, DEFAULT_SHORTCUTS[key]]];
      }
      const {
        text,
        period
      } = customConfig;
      if (!text || !period) {
        return [];
      }
      const {
        start,
        end
      } = period;
      if (dateIsSameOrBefore(start, end, 'date')) {
        return [[text, {
          text,
          period: {
            start: start,
            end: end
          }
        }]];
      }
      return [];
    });
  }, [configs]);
  const printItemText = useCallback(item => {
    return item?.text ?? null;
  }, []);
  return shortcutOptions?.length ? /*#__PURE__*/jsxRuntimeExports.jsx("div", {
    className: "date-picker-calendar-shortcuts-wrapper mb-3 border-gray-300 pr-1 md:border-b lg:mb-0 lg:border-b-0 lg:border-r dark:border-gray-700",
    children: /*#__PURE__*/jsxRuntimeExports.jsx("ul", {
      className: "flex w-full flex-wrap pb-1 tracking-wide lg:flex-col lg:pb-0",
      children: shortcutOptions.map(([key, item], index) => Array.isArray(item) ? item.map((item, index) => /*#__PURE__*/jsxRuntimeExports.jsx(ItemTemplate, {
        item: item,
        children: /*#__PURE__*/jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
          children: key === 'past' && configs?.shortcuts && key in configs.shortcuts && item.daysNumber ? callPastFunction(configs.shortcuts[key], item.daysNumber) : item.text
        })
      }, index)) : /*#__PURE__*/jsxRuntimeExports.jsx(ItemTemplate, {
        item: item,
        children: /*#__PURE__*/jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
          children: configs?.shortcuts && key in configs.shortcuts ? typeof configs.shortcuts[key] === 'object' ? printItemText(item) : configs.shortcuts[key] : printItemText(item)
        })
      }, index))
    })
  }) : null;
};

const VerticalDash = () => {
  // Contexts
  const {
    primaryColor
  } = useContext(DatepickerContext);
  const bgColor = BG_COLOR['500'][primaryColor];
  return /*#__PURE__*/jsxRuntimeExports.jsx("div", {
    className: `date-picker-calendar-sections-seperator hidden h-7 w-1 rounded-full md:block ${bgColor || 'bg-blue-500'}`
  });
};

const Datepicker = props => {
  // Props
  const {
    asSingle = false,
    classNames = undefined,
    configs = undefined,
    containerClassName = null,
    dateLooking = DEFAULT_DATE_LOOKING,
    disabledDates = null,
    disabled = false,
    displayFormat = DATE_FORMAT,
    i18n = LANGUAGE,
    inputClassName = null,
    inputId,
    inputName,
    minDate = undefined,
    maxDate = undefined,
    onChange,
    placeholder = null,
    popupClassName = null,
    popoverDirection = undefined,
    primaryColor = DEFAULT_COLOR,
    separator = DEFAULT_SEPARATOR,
    showFooter = false,
    showShortcuts = false,
    startFrom = null,
    startWeekOn = START_WEEK,
    readOnly = false,
    required = false,
    toggleClassName = null,
    toggleIcon = undefined,
    useRange = true,
    value = null
  } = props;
  // Refs
  const containerRef = useRef(null);
  const calendarContainerRef = useRef(null);
  const arrowRef = useRef(null);
  // States
  const [firstDate, setFirstDate] = useState(startFrom && dateIsValid(startFrom) ? startFrom : new Date());
  const [secondDate, setSecondDate] = useState(nextMonthBy(firstDate));
  const [period, setPeriod] = useState({
    start: null,
    end: null
  });
  const [dayHover, setDayHover] = useState(null);
  const [inputText, setInputText] = useState('');
  const [inputRef, setInputRef] = useState(/*#__PURE__*/createRef());
  // Custom Hooks use
  useOnClickOutside(containerRef, () => {
    const container = containerRef.current;
    if (container) {
      hideDatepicker();
    }
  });
  // Functions
  const hideDatepicker = useCallback(() => {
    const div = calendarContainerRef.current;
    const arrow = arrowRef.current;
    if (arrow && div && div.classList.contains('block')) {
      div.classList.remove('block');
      div.classList.remove('translate-y-0');
      div.classList.remove('opacity-1');
      div.classList.add('translate-y-4');
      div.classList.add('opacity-0');
      setTimeout(() => {
        div.classList.remove('bottom-full');
        div.classList.add('hidden');
        div.classList.add('mb-2.5');
        div.classList.add('mt-2.5');
        arrow.classList.remove('-bottom-2');
        arrow.classList.remove('border-r');
        arrow.classList.remove('border-b');
        arrow.classList.add('border-l');
        arrow.classList.add('border-t');
      }, 300);
    }
  }, []);
  /* Start First */
  const firstGotoDate = useCallback(date => {
    if (dateIsSameOrAfter(date, secondDate, 'date')) {
      setSecondDate(nextMonthBy(date));
    }
    setFirstDate(date);
  }, [secondDate]);
  const previousMonthFirst = useCallback(() => {
    setFirstDate(previousMonthBy(firstDate));
  }, [firstDate]);
  const nextMonthFirst = useCallback(() => {
    firstGotoDate(nextMonthBy(firstDate));
  }, [firstDate, firstGotoDate]);
  const changeFirstMonth = useCallback(month => {
    firstGotoDate(dateUpdateMonth(firstDate, month - 1));
  }, [firstDate, firstGotoDate]);
  const changeFirstYear = useCallback(year => {
    firstGotoDate(dateUpdateYear(firstDate, year));
  }, [firstDate, firstGotoDate]);
  /* End First */
  /* Start Second */
  const secondGotoDate = useCallback(date => {
    dateIsSameOrBefore(date, firstDate, 'date');
    if (dateIsSameOrBefore(date, firstDate, 'date')) {
      setFirstDate(previousMonthBy(date));
    }
    setSecondDate(date);
  }, [firstDate]);
  const previousMonthSecond = useCallback(() => {
    secondGotoDate(previousMonthBy(secondDate));
  }, [secondDate, secondGotoDate]);
  const nextMonthSecond = useCallback(() => {
    setSecondDate(nextMonthBy(secondDate));
  }, [secondDate]);
  const changeSecondMonth = useCallback(month => {
    secondGotoDate(dateUpdateMonth(secondDate, month - 1));
  }, [secondDate, secondGotoDate]);
  const changeSecondYear = useCallback(year => {
    secondGotoDate(dateUpdateYear(secondDate, year));
  }, [secondDate, secondGotoDate]);
  /* End Second */
  // UseEffects & UseLayoutEffect
  useEffect(() => {
    const container = containerRef.current;
    const calendarContainer = calendarContainerRef.current;
    const arrow = arrowRef.current;
    if (container && calendarContainer && arrow) {
      const detail = container.getBoundingClientRect();
      const screenCenter = window.innerWidth / 2;
      const containerCenter = (detail.right - detail.x) / 2 + detail.x;
      if (containerCenter > screenCenter) {
        arrow.classList.add('right-0');
        arrow.classList.add('mr-3.5');
        calendarContainer.classList.add('right-0');
      }
    }
  }, []);
  useEffect(() => {
    if (value && value.startDate && value.endDate) {
      if (dateIsSameOrBefore(value.startDate, value.endDate, 'date')) {
        setPeriod({
          start: value.startDate,
          end: value.endDate
        });
        setInputText(`${dateFormat(value.startDate, displayFormat, i18n)}${asSingle ? '' : ` ${separator} ${dateFormat(value.endDate, displayFormat, i18n)}`}`);
      }
    }
    if (value && value.startDate === null && value.endDate === null) {
      setPeriod({
        start: null,
        end: null
      });
      setInputText('');
    }
  }, [asSingle, value, displayFormat, separator, i18n]);
  useEffect(() => {
    if (startFrom && dateIsValid(startFrom)) {
      const startDate = value?.startDate;
      const endDate = value?.endDate;
      if (startDate && dateIsValid(startDate)) {
        setFirstDate(startDate);
        if (!asSingle) {
          if (endDate && dateIsValid(endDate) && dateIsAfter(firstDayOfMonth(endDate), startDate, 'date')) {
            setSecondDate(endDate);
          } else {
            setSecondDate(nextMonthBy(startDate));
          }
        }
      } else {
        setFirstDate(startFrom);
        setSecondDate(nextMonthBy(startFrom));
      }
    }
  }, [asSingle, startFrom, value]);
  // Variables
  const safePrimaryColor = useMemo(() => {
    if (COLORS.includes(primaryColor)) {
      return primaryColor;
    }
    return DEFAULT_COLOR;
  }, [primaryColor]);
  const contextValues = useMemo(() => {
    if (minDate && !dateIsValid(minDate)) {
      /* eslint-disable */
      console.error(`minDate (${minDate}) is invalid date`);
      /* eslint-enable */
    }
    if (maxDate && !dateIsValid(maxDate)) {
      /* eslint-disable */
      console.error(`minDate (${maxDate}) is invalid date`);
      /* eslint-enable */
    }
    if (!i18n || i18n.length === 0) {
      /* eslint-disable */
      console.error(`i18n (${i18n}) is invalid`);
      /* eslint-enable */
    }
    return {
      arrowContainer: arrowRef,
      asSingle,
      calendarContainer: calendarContainerRef,
      changeDatepickerValue: onChange,
      changeDayHover: newDay => setDayHover(newDay),
      changeInputText: newText => setInputText(newText),
      changePeriod: newPeriod => setPeriod(newPeriod),
      classNames,
      configs,
      containerClassName,
      dateLooking,
      dayHover,
      disabled,
      disabledDates,
      displayFormat,
      hideDatepicker,
      i18n: i18n && i18n.length > 0 ? i18n : LANGUAGE,
      input: inputRef,
      inputClassName,
      inputId,
      inputName,
      inputText,
      maxDate,
      minDate,
      onChange,
      period,
      placeholder,
      popoverDirection,
      primaryColor: safePrimaryColor,
      readOnly,
      required,
      separator,
      showFooter,
      startWeekOn: startWeekOn || START_WEEK,
      toggleClassName,
      toggleIcon,
      updateFirstDate: newDate => firstGotoDate(newDate),
      value
    };
  }, [asSingle, safePrimaryColor, configs, hideDatepicker, period, dayHover, inputText, onChange, showFooter, placeholder, separator, i18n, value, disabled, inputClassName, containerClassName, toggleClassName, toggleIcon, readOnly, displayFormat, minDate, maxDate, dateLooking, disabledDates, inputId, inputName, startWeekOn, classNames, inputRef, popoverDirection, required, firstGotoDate]);
  const containerClassNameOverload = useMemo(() => {
    const defaultContainerClassName = 'date-picker-wrapper relative w-full text-gray-700';
    return typeof containerClassName === 'function' ? containerClassName(defaultContainerClassName) : typeof containerClassName === 'string' && containerClassName !== '' ? containerClassName : defaultContainerClassName;
  }, [containerClassName]);
  const popupClassNameOverload = useMemo(() => {
    const defaultPopupClassName = 'date-picker-calendar-wrapper transition-all ease-out duration-300 absolute z-10 mt-[1px] text-sm lg:text-xs 2xl:text-sm translate-y-4 opacity-0 hidden';
    return typeof popupClassName === 'function' ? popupClassName(defaultPopupClassName) : typeof popupClassName === 'string' && popupClassName !== '' ? popupClassName : defaultPopupClassName;
  }, [popupClassName]);
  return /*#__PURE__*/jsxRuntimeExports.jsx(DatepickerContext.Provider, {
    value: contextValues,
    children: /*#__PURE__*/jsxRuntimeExports.jsxs("div", {
      className: containerClassNameOverload,
      ref: containerRef,
      children: [/*#__PURE__*/jsxRuntimeExports.jsx(Input, {
        setContextRef: setInputRef
      }), /*#__PURE__*/jsxRuntimeExports.jsxs("div", {
        className: popupClassNameOverload,
        ref: calendarContainerRef,
        children: [/*#__PURE__*/jsxRuntimeExports.jsx(Arrow, {
          ref: arrowRef
        }), /*#__PURE__*/jsxRuntimeExports.jsxs("div", {
          className: "date-picker-calendar-outer mt-2.5 rounded-lg border border-gray-300 bg-white px-1 py-0.5 shadow-sm dark:border-slate-600 dark:bg-slate-800 dark:text-white",
          children: [/*#__PURE__*/jsxRuntimeExports.jsxs("div", {
            className: "date-picker-calendar-inner flex flex-col py-2 lg:flex-row",
            children: [showShortcuts && /*#__PURE__*/jsxRuntimeExports.jsx(Shortcuts, {}), /*#__PURE__*/jsxRuntimeExports.jsxs("div", {
              className: `date-picker-calendar-sections-wrapper flex flex-col items-stretch space-y-4 md:flex-row md:space-x-1.5 md:space-y-0 ${showShortcuts ? 'md:pl-2' : 'md:pl-1'} pr-2 lg:pr-1`,
              children: [/*#__PURE__*/jsxRuntimeExports.jsx(Calendar, {
                date: firstDate,
                onClickPrevious: previousMonthFirst,
                onClickNext: nextMonthFirst,
                changeMonth: changeFirstMonth,
                changeYear: changeFirstYear,
                minDate: minDate,
                maxDate: maxDate
              }), useRange && /*#__PURE__*/jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
                children: [/*#__PURE__*/jsxRuntimeExports.jsx("div", {
                  className: "date-picker-calendar-sections-seperator-wrapper flex items-center",
                  children: /*#__PURE__*/jsxRuntimeExports.jsx(VerticalDash, {})
                }), /*#__PURE__*/jsxRuntimeExports.jsx(Calendar, {
                  date: secondDate,
                  onClickPrevious: previousMonthSecond,
                  onClickNext: nextMonthSecond,
                  changeMonth: changeSecondMonth,
                  changeYear: changeSecondYear,
                  minDate: minDate,
                  maxDate: maxDate
                })]
              })]
            })]
          }), showFooter && /*#__PURE__*/jsxRuntimeExports.jsx(Footer, {})]
        })]
      })]
    })
  });
};

var af$1 = {exports: {}};

(function (module, exports) {
  !function (e, a) {
    module.exports = a(require$$0) ;
  }(commonjsGlobal, function (e) {

    function a(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var n = a(e),
      t = {
        name: "af",
        weekdays: "Sondag_Maandag_Dinsdag_Woensdag_Donderdag_Vrydag_Saterdag".split("_"),
        months: "Januarie_Februarie_Maart_April_Mei_Junie_Julie_Augustus_September_Oktober_November_Desember".split("_"),
        weekStart: 1,
        weekdaysShort: "Son_Maa_Din_Woe_Don_Vry_Sat".split("_"),
        monthsShort: "Jan_Feb_Mrt_Apr_Mei_Jun_Jul_Aug_Sep_Okt_Nov_Des".split("_"),
        weekdaysMin: "So_Ma_Di_Wo_Do_Vr_Sa".split("_"),
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        relativeTime: {
          future: "oor %s",
          past: "%s gelede",
          s: "'n paar sekondes",
          m: "'n minuut",
          mm: "%d minute",
          h: "'n uur",
          hh: "%d ure",
          d: "'n dag",
          dd: "%d dae",
          M: "'n maand",
          MM: "%d maande",
          y: "'n jaar",
          yy: "%d jaar"
        }
      };
    return n.default.locale(t, null, !0), t;
  });
})(af$1);

var af = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var am$1 = {exports: {}};

(function (module, exports) {
  !function (e, _) {
    module.exports = _(require$$0) ;
  }(commonjsGlobal, function (e) {

    function _(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = _(e),
      d = {
        name: "am",
        weekdays: "እሑድ_ሰኞ_ማክሰኞ_ረቡዕ_ሐሙስ_አርብ_ቅዳሜ".split("_"),
        weekdaysShort: "እሑድ_ሰኞ_ማክሰ_ረቡዕ_ሐሙስ_አርብ_ቅዳሜ".split("_"),
        weekdaysMin: "እሑ_ሰኞ_ማክ_ረቡ_ሐሙ_አር_ቅዳ".split("_"),
        months: "ጃንዋሪ_ፌብሯሪ_ማርች_ኤፕሪል_ሜይ_ጁን_ጁላይ_ኦገስት_ሴፕቴምበር_ኦክቶበር_ኖቬምበር_ዲሴምበር".split("_"),
        monthsShort: "ጃንዋ_ፌብሯ_ማርች_ኤፕሪ_ሜይ_ጁን_ጁላይ_ኦገስ_ሴፕቴ_ኦክቶ_ኖቬም_ዲሴም".split("_"),
        weekStart: 1,
        yearStart: 4,
        relativeTime: {
          future: "በ%s",
          past: "%s በፊት",
          s: "ጥቂት ሰከንዶች",
          m: "አንድ ደቂቃ",
          mm: "%d ደቂቃዎች",
          h: "አንድ ሰዓት",
          hh: "%d ሰዓታት",
          d: "አንድ ቀን",
          dd: "%d ቀናት",
          M: "አንድ ወር",
          MM: "%d ወራት",
          y: "አንድ ዓመት",
          yy: "%d ዓመታት"
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "MMMM D ፣ YYYY",
          LLL: "MMMM D ፣ YYYY HH:mm",
          LLLL: "dddd ፣ MMMM D ፣ YYYY HH:mm"
        },
        ordinal: function (e) {
          return e + "ኛ";
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(am$1);

var am = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var arDz$1 = {exports: {}};

(function (module, exports) {
  !function (_, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (_) {

    function e(_) {
      return _ && "object" == typeof _ && "default" in _ ? _ : {
        default: _
      };
    }
    var t = e(_),
      d = {
        name: "ar-dz",
        weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
        months: "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),
        weekdaysShort: "احد_اثنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"),
        monthsShort: "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),
        weekdaysMin: "أح_إث_ثلا_أر_خم_جم_سب".split("_"),
        ordinal: function (_) {
          return _;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd D MMMM YYYY HH:mm"
        },
        meridiem: function (_) {
          return _ > 12 ? "م" : "ص";
        },
        relativeTime: {
          future: "في %s",
          past: "منذ %s",
          s: "ثوان",
          m: "دقيقة",
          mm: "%d دقائق",
          h: "ساعة",
          hh: "%d ساعات",
          d: "يوم",
          dd: "%d أيام",
          M: "شهر",
          MM: "%d أشهر",
          y: "سنة",
          yy: "%d سنوات"
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(arDz$1);

var arDz = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var arIq$1 = {exports: {}};

(function (module, exports) {
  !function (e, _) {
    module.exports = _(require$$0) ;
  }(commonjsGlobal, function (e) {

    function _(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = _(e),
      d = {
        name: "ar-iq",
        weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
        months: "كانون الثاني_شباط_آذار_نيسان_أيار_حزيران_تموز_آب_أيلول_تشرين الأول_ تشرين الثاني_كانون الأول".split("_"),
        weekStart: 1,
        weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
        monthsShort: "كانون الثاني_شباط_آذار_نيسان_أيار_حزيران_تموز_آب_أيلول_تشرين الأول_ تشرين الثاني_كانون الأول".split("_"),
        weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd D MMMM YYYY HH:mm"
        },
        meridiem: function (e) {
          return e > 12 ? "م" : "ص";
        },
        relativeTime: {
          future: "في %s",
          past: "منذ %s",
          s: "ثوان",
          m: "دقيقة",
          mm: "%d دقائق",
          h: "ساعة",
          hh: "%d ساعات",
          d: "يوم",
          dd: "%d أيام",
          M: "شهر",
          MM: "%d أشهر",
          y: "سنة",
          yy: "%d سنوات"
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(arIq$1);

var arIq = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var arKw$1 = {exports: {}};

(function (module, exports) {
  !function (_, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (_) {

    function e(_) {
      return _ && "object" == typeof _ && "default" in _ ? _ : {
        default: _
      };
    }
    var t = e(_),
      d = {
        name: "ar-kw",
        weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
        months: "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),
        weekdaysShort: "احد_اثنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"),
        monthsShort: "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),
        weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
        ordinal: function (_) {
          return _;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd D MMMM YYYY HH:mm"
        },
        meridiem: function (_) {
          return _ > 12 ? "م" : "ص";
        },
        relativeTime: {
          future: "في %s",
          past: "منذ %s",
          s: "ثوان",
          m: "دقيقة",
          mm: "%d دقائق",
          h: "ساعة",
          hh: "%d ساعات",
          d: "يوم",
          dd: "%d أيام",
          M: "شهر",
          MM: "%d أشهر",
          y: "سنة",
          yy: "%d سنوات"
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(arKw$1);

var arKw = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var arLy$1 = {exports: {}};

(function (module, exports) {
  !function (_, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (_) {

    function e(_) {
      return _ && "object" == typeof _ && "default" in _ ? _ : {
        default: _
      };
    }
    var t = e(_),
      n = {
        name: "ar-ly",
        weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
        months: "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),
        weekStart: 6,
        weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
        monthsShort: "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),
        weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
        ordinal: function (_) {
          return _;
        },
        meridiem: function (_) {
          return _ > 12 ? "م" : "ص";
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "D/‏M/‏YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd D MMMM YYYY HH:mm"
        }
      };
    return t.default.locale(n, null, !0), n;
  });
})(arLy$1);

var arLy = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var arMa$1 = {exports: {}};

(function (module, exports) {
  !function (e, _) {
    module.exports = _(require$$0) ;
  }(commonjsGlobal, function (e) {

    function _(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = _(e),
      d = {
        name: "ar-ma",
        weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
        months: "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),
        weekStart: 6,
        weekdaysShort: "احد_إثنين_ثلاثاء_اربعاء_خميس_جمعة_سبت".split("_"),
        monthsShort: "يناير_فبراير_مارس_أبريل_ماي_يونيو_يوليوز_غشت_شتنبر_أكتوبر_نونبر_دجنبر".split("_"),
        weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd D MMMM YYYY HH:mm"
        },
        meridiem: function (e) {
          return e > 12 ? "م" : "ص";
        },
        relativeTime: {
          future: "في %s",
          past: "منذ %s",
          s: "ثوان",
          m: "دقيقة",
          mm: "%d دقائق",
          h: "ساعة",
          hh: "%d ساعات",
          d: "يوم",
          dd: "%d أيام",
          M: "شهر",
          MM: "%d أشهر",
          y: "سنة",
          yy: "%d سنوات"
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(arMa$1);

var arMa = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var arSa$1 = {exports: {}};

(function (module, exports) {
  !function (_, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (_) {

    function e(_) {
      return _ && "object" == typeof _ && "default" in _ ? _ : {
        default: _
      };
    }
    var t = e(_),
      d = {
        name: "ar-sa",
        weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
        months: "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),
        weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
        monthsShort: "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),
        weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
        ordinal: function (_) {
          return _;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd D MMMM YYYY HH:mm"
        },
        meridiem: function (_) {
          return _ > 12 ? "م" : "ص";
        },
        relativeTime: {
          future: "في %s",
          past: "منذ %s",
          s: "ثوان",
          m: "دقيقة",
          mm: "%d دقائق",
          h: "ساعة",
          hh: "%d ساعات",
          d: "يوم",
          dd: "%d أيام",
          M: "شهر",
          MM: "%d أشهر",
          y: "سنة",
          yy: "%d سنوات"
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(arSa$1);

var arSa = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var arTn$1 = {exports: {}};

(function (module, exports) {
  !function (e, _) {
    module.exports = _(require$$0) ;
  }(commonjsGlobal, function (e) {

    function _(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = _(e),
      d = {
        name: "ar-tn",
        weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
        months: "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),
        weekStart: 1,
        weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
        monthsShort: "جانفي_فيفري_مارس_أفريل_ماي_جوان_جويلية_أوت_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),
        weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd D MMMM YYYY HH:mm"
        },
        meridiem: function (e) {
          return e > 12 ? "م" : "ص";
        },
        relativeTime: {
          future: "في %s",
          past: "منذ %s",
          s: "ثوان",
          m: "دقيقة",
          mm: "%d دقائق",
          h: "ساعة",
          hh: "%d ساعات",
          d: "يوم",
          dd: "%d أيام",
          M: "شهر",
          MM: "%d أشهر",
          y: "سنة",
          yy: "%d سنوات"
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(arTn$1);

var arTn = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var ar$1 = {exports: {}};

(function (module, exports) {
  !function (e, t) {
    module.exports = t(require$$0) ;
  }(commonjsGlobal, function (e) {

    function t(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var n = t(e),
      r = "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split("_"),
      d = {
        1: "١",
        2: "٢",
        3: "٣",
        4: "٤",
        5: "٥",
        6: "٦",
        7: "٧",
        8: "٨",
        9: "٩",
        0: "٠"
      },
      _ = {
        "١": "1",
        "٢": "2",
        "٣": "3",
        "٤": "4",
        "٥": "5",
        "٦": "6",
        "٧": "7",
        "٨": "8",
        "٩": "9",
        "٠": "0"
      },
      o = {
        name: "ar",
        weekdays: "الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت".split("_"),
        weekdaysShort: "أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت".split("_"),
        weekdaysMin: "ح_ن_ث_ر_خ_ج_س".split("_"),
        months: r,
        monthsShort: r,
        weekStart: 6,
        meridiem: function (e) {
          return e > 12 ? "م" : "ص";
        },
        relativeTime: {
          future: "بعد %s",
          past: "منذ %s",
          s: "ثانية واحدة",
          m: "دقيقة واحدة",
          mm: "%d دقائق",
          h: "ساعة واحدة",
          hh: "%d ساعات",
          d: "يوم واحد",
          dd: "%d أيام",
          M: "شهر واحد",
          MM: "%d أشهر",
          y: "عام واحد",
          yy: "%d أعوام"
        },
        preparse: function (e) {
          return e.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (e) {
            return _[e];
          }).replace(/،/g, ",");
        },
        postformat: function (e) {
          return e.replace(/\d/g, function (e) {
            return d[e];
          }).replace(/,/g, "،");
        },
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "D/‏M/‏YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd D MMMM YYYY HH:mm"
        }
      };
    return n.default.locale(o, null, !0), o;
  });
})(ar$1);

var ar = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var az$1 = {exports: {}};

(function (module, exports) {
  !function (a, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (a) {

    function e(a) {
      return a && "object" == typeof a && "default" in a ? a : {
        default: a
      };
    }
    var _ = e(a),
      t = {
        name: "az",
        weekdays: "Bazar_Bazar ertəsi_Çərşənbə axşamı_Çərşənbə_Cümə axşamı_Cümə_Şənbə".split("_"),
        weekdaysShort: "Baz_BzE_ÇAx_Çər_CAx_Cüm_Şən".split("_"),
        weekdaysMin: "Bz_BE_ÇA_Çə_CA_Cü_Şə".split("_"),
        months: "yanvar_fevral_mart_aprel_may_iyun_iyul_avqust_sentyabr_oktyabr_noyabr_dekabr".split("_"),
        monthsShort: "yan_fev_mar_apr_may_iyn_iyl_avq_sen_okt_noy_dek".split("_"),
        weekStart: 1,
        formats: {
          LT: "H:mm",
          LTS: "H:mm:ss",
          L: "DD.MM.YYYY",
          LL: "D MMMM YYYY г.",
          LLL: "D MMMM YYYY г., H:mm",
          LLLL: "dddd, D MMMM YYYY г., H:mm"
        },
        relativeTime: {
          future: "%s sonra",
          past: "%s əvvəl",
          s: "bir neçə saniyə",
          m: "bir dəqiqə",
          mm: "%d dəqiqə",
          h: "bir saat",
          hh: "%d saat",
          d: "bir gün",
          dd: "%d gün",
          M: "bir ay",
          MM: "%d ay",
          y: "bir il",
          yy: "%d il"
        },
        ordinal: function (a) {
          return a;
        }
      };
    return _.default.locale(t, null, !0), t;
  });
})(az$1);

var az = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var bg$1 = {exports: {}};

(function (module, exports) {
  !function (e, _) {
    module.exports = _(require$$0) ;
  }(commonjsGlobal, function (e) {

    function _(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = _(e),
      d = {
        name: "bg",
        weekdays: "неделя_понеделник_вторник_сряда_четвъртък_петък_събота".split("_"),
        weekdaysShort: "нед_пон_вто_сря_чет_пет_съб".split("_"),
        weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"),
        months: "януари_февруари_март_април_май_юни_юли_август_септември_октомври_ноември_декември".split("_"),
        monthsShort: "яну_фев_мар_апр_май_юни_юли_авг_сеп_окт_ное_дек".split("_"),
        weekStart: 1,
        ordinal: function (e) {
          var _ = e % 100;
          if (_ > 10 && _ < 20) return e + "-ти";
          var t = e % 10;
          return 1 === t ? e + "-ви" : 2 === t ? e + "-ри" : 7 === t || 8 === t ? e + "-ми" : e + "-ти";
        },
        formats: {
          LT: "H:mm",
          LTS: "H:mm:ss",
          L: "D.MM.YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY H:mm",
          LLLL: "dddd, D MMMM YYYY H:mm"
        },
        relativeTime: {
          future: "след %s",
          past: "преди %s",
          s: "няколко секунди",
          m: "минута",
          mm: "%d минути",
          h: "час",
          hh: "%d часа",
          d: "ден",
          dd: "%d дена",
          M: "месец",
          MM: "%d месеца",
          y: "година",
          yy: "%d години"
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(bg$1);

var bg = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var bi$1 = {exports: {}};

(function (module, exports) {
  !function (e, a) {
    module.exports = a(require$$0) ;
  }(commonjsGlobal, function (e) {

    function a(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var n = a(e),
      _ = {
        name: "bi",
        weekdays: "Sande_Mande_Tusde_Wenesde_Tosde_Fraede_Sarade".split("_"),
        months: "Januari_Februari_Maj_Eprel_Mei_Jun_Julae_Okis_Septemba_Oktoba_Novemba_Disemba".split("_"),
        weekStart: 1,
        weekdaysShort: "San_Man_Tus_Wen_Tos_Frae_Sar".split("_"),
        monthsShort: "Jan_Feb_Maj_Epr_Mai_Jun_Jul_Oki_Sep_Okt_Nov_Dis".split("_"),
        weekdaysMin: "San_Ma_Tu_We_To_Fr_Sar".split("_"),
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "h:mm A",
          LTS: "h:mm:ss A",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY h:mm A",
          LLLL: "dddd, D MMMM YYYY h:mm A"
        },
        relativeTime: {
          future: "lo %s",
          past: "%s bifo",
          s: "sam seken",
          m: "wan minit",
          mm: "%d minit",
          h: "wan haoa",
          hh: "%d haoa",
          d: "wan dei",
          dd: "%d dei",
          M: "wan manis",
          MM: "%d manis",
          y: "wan yia",
          yy: "%d yia"
        }
      };
    return n.default.locale(_, null, !0), _;
  });
})(bi$1);

var bi = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var bm$1 = {exports: {}};

(function (module, exports) {
  !function (a, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (a) {

    function e(a) {
      return a && "object" == typeof a && "default" in a ? a : {
        default: a
      };
    }
    var l = e(a),
      t = {
        name: "bm",
        weekdays: "Kari_Ntɛnɛn_Tarata_Araba_Alamisa_Juma_Sibiri".split("_"),
        months: "Zanwuyekalo_Fewuruyekalo_Marisikalo_Awirilikalo_Mɛkalo_Zuwɛnkalo_Zuluyekalo_Utikalo_Sɛtanburukalo_ɔkutɔburukalo_Nowanburukalo_Desanburukalo".split("_"),
        weekStart: 1,
        weekdaysShort: "Kar_Ntɛ_Tar_Ara_Ala_Jum_Sib".split("_"),
        monthsShort: "Zan_Few_Mar_Awi_Mɛ_Zuw_Zul_Uti_Sɛt_ɔku_Now_Des".split("_"),
        weekdaysMin: "Ka_Nt_Ta_Ar_Al_Ju_Si".split("_"),
        ordinal: function (a) {
          return a;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "MMMM [tile] D [san] YYYY",
          LLL: "MMMM [tile] D [san] YYYY [lɛrɛ] HH:mm",
          LLLL: "dddd MMMM [tile] D [san] YYYY [lɛrɛ] HH:mm"
        },
        relativeTime: {
          future: "%s kɔnɔ",
          past: "a bɛ %s bɔ",
          s: "sanga dama dama",
          m: "miniti kelen",
          mm: "miniti %d",
          h: "lɛrɛ kelen",
          hh: "lɛrɛ %d",
          d: "tile kelen",
          dd: "tile %d",
          M: "kalo kelen",
          MM: "kalo %d",
          y: "san kelen",
          yy: "san %d"
        }
      };
    return l.default.locale(t, null, !0), t;
  });
})(bm$1);

var bm = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var bnBd$1 = {exports: {}};

(function (module, exports) {
  !function (e, t) {
    module.exports = t(require$$0) ;
  }(commonjsGlobal, function (e) {

    function t(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var _ = t(e),
      n = {
        1: "১",
        2: "২",
        3: "৩",
        4: "৪",
        5: "৫",
        6: "৬",
        7: "৭",
        8: "৮",
        9: "৯",
        0: "০"
      },
      d = {
        "১": "1",
        "২": "2",
        "৩": "3",
        "৪": "4",
        "৫": "5",
        "৬": "6",
        "৭": "7",
        "৮": "8",
        "৯": "9",
        "০": "0"
      },
      r = {
        name: "bn-bd",
        weekdays: "রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পতিবার_শুক্রবার_শনিবার".split("_"),
        months: "জানুয়ারি_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর".split("_"),
        weekdaysShort: "রবি_সোম_মঙ্গল_বুধ_বৃহস্পতি_শুক্র_শনি".split("_"),
        monthsShort: "জানু_ফেব্রু_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্ট_অক্টো_নভে_ডিসে".split("_"),
        weekdaysMin: "রবি_সোম_মঙ্গ_বুধ_বৃহঃ_শুক্র_শনি".split("_"),
        weekStart: 0,
        preparse: function (e) {
          return e.replace(/[১২৩৪৫৬৭৮৯০]/g, function (e) {
            return d[e];
          });
        },
        postformat: function (e) {
          return e.replace(/\d/g, function (e) {
            return n[e];
          });
        },
        ordinal: function (e) {
          var t = ["ই", "লা", "রা", "ঠা", "শে"],
            _ = e % 100;
          return "[" + e + (t[(_ - 20) % 10] || t[_] || t[0]) + "]";
        },
        formats: {
          LT: "A h:mm সময়",
          LTS: "A h:mm:ss সময়",
          L: "DD/MM/YYYY খ্রিস্টাব্দ",
          LL: "D MMMM YYYY খ্রিস্টাব্দ",
          LLL: "D MMMM YYYY খ্রিস্টাব্দ, A h:mm সময়",
          LLLL: "dddd, D MMMM YYYY খ্রিস্টাব্দ, A h:mm সময়"
        },
        meridiem: function (e) {
          return e < 4 ? "রাত" : e < 6 ? "ভোর" : e < 12 ? "সকাল" : e < 15 ? "দুপুর" : e < 18 ? "বিকাল" : e < 20 ? "সন্ধ্যা" : "রাত";
        },
        relativeTime: {
          future: "%s পরে",
          past: "%s আগে",
          s: "কয়েক সেকেন্ড",
          m: "এক মিনিট",
          mm: "%d মিনিট",
          h: "এক ঘন্টা",
          hh: "%d ঘন্টা",
          d: "এক দিন",
          dd: "%d দিন",
          M: "এক মাস",
          MM: "%d মাস",
          y: "এক বছর",
          yy: "%d বছর"
        }
      };
    return _.default.locale(r, null, !0), r;
  });
})(bnBd$1);

var bnBd = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var bn$1 = {exports: {}};

(function (module, exports) {
  !function (e, _) {
    module.exports = _(require$$0) ;
  }(commonjsGlobal, function (e) {

    function _(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = _(e),
      n = {
        1: "১",
        2: "২",
        3: "৩",
        4: "৪",
        5: "৫",
        6: "৬",
        7: "৭",
        8: "৮",
        9: "৯",
        0: "০"
      },
      d = {
        "১": "1",
        "২": "2",
        "৩": "3",
        "৪": "4",
        "৫": "5",
        "৬": "6",
        "৭": "7",
        "৮": "8",
        "৯": "9",
        "০": "0"
      },
      o = {
        name: "bn",
        weekdays: "রবিবার_সোমবার_মঙ্গলবার_বুধবার_বৃহস্পতিবার_শুক্রবার_শনিবার".split("_"),
        months: "জানুয়ারি_ফেব্রুয়ারি_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্টেম্বর_অক্টোবর_নভেম্বর_ডিসেম্বর".split("_"),
        weekdaysShort: "রবি_সোম_মঙ্গল_বুধ_বৃহস্পতি_শুক্র_শনি".split("_"),
        monthsShort: "জানু_ফেব্রু_মার্চ_এপ্রিল_মে_জুন_জুলাই_আগস্ট_সেপ্ট_অক্টো_নভে_ডিসে".split("_"),
        weekdaysMin: "রবি_সোম_মঙ্গ_বুধ_বৃহঃ_শুক্র_শনি".split("_"),
        preparse: function (e) {
          return e.replace(/[১২৩৪৫৬৭৮৯০]/g, function (e) {
            return d[e];
          });
        },
        postformat: function (e) {
          return e.replace(/\d/g, function (e) {
            return n[e];
          });
        },
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "A h:mm সময়",
          LTS: "A h:mm:ss সময়",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY, A h:mm সময়",
          LLLL: "dddd, D MMMM YYYY, A h:mm সময়"
        },
        relativeTime: {
          future: "%s পরে",
          past: "%s আগে",
          s: "কয়েক সেকেন্ড",
          m: "এক মিনিট",
          mm: "%d মিনিট",
          h: "এক ঘন্টা",
          hh: "%d ঘন্টা",
          d: "এক দিন",
          dd: "%d দিন",
          M: "এক মাস",
          MM: "%d মাস",
          y: "এক বছর",
          yy: "%d বছর"
        }
      };
    return t.default.locale(o, null, !0), o;
  });
})(bn$1);

var bn = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var bo$1 = {exports: {}};

(function (module, exports) {
  !function (_, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (_) {

    function e(_) {
      return _ && "object" == typeof _ && "default" in _ ? _ : {
        default: _
      };
    }
    var t = e(_),
      d = {
        name: "bo",
        weekdays: "གཟའ་ཉི་མ་_གཟའ་ཟླ་བ་_གཟའ་མིག་དམར་_གཟའ་ལྷག་པ་_གཟའ་ཕུར་བུ_གཟའ་པ་སངས་_གཟའ་སྤེན་པ་".split("_"),
        weekdaysShort: "ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་".split("_"),
        weekdaysMin: "ཉི་མ་_ཟླ་བ་_མིག་དམར་_ལྷག་པ་_ཕུར་བུ_པ་སངས་_སྤེན་པ་".split("_"),
        months: "ཟླ་བ་དང་པོ_ཟླ་བ་གཉིས་པ_ཟླ་བ་གསུམ་པ_ཟླ་བ་བཞི་པ_ཟླ་བ་ལྔ་པ_ཟླ་བ་དྲུག་པ_ཟླ་བ་བདུན་པ_ཟླ་བ་བརྒྱད་པ_ཟླ་བ་དགུ་པ_ཟླ་བ་བཅུ་པ_ཟླ་བ་བཅུ་གཅིག་པ_ཟླ་བ་བཅུ་གཉིས་པ".split("_"),
        monthsShort: "ཟླ་དང་པོ_ཟླ་གཉིས་པ_ཟླ་གསུམ་པ_ཟླ་བཞི་པ_ཟླ་ལྔ་པ_ཟླ་དྲུག་པ_ཟླ་བདུན་པ_ཟླ་བརྒྱད་པ_ཟླ་དགུ་པ_ཟླ་བཅུ་པ_ཟླ་བཅུ་གཅིག་པ_ཟླ་བཅུ་གཉིས་པ".split("_"),
        ordinal: function (_) {
          return _;
        },
        formats: {
          LT: "A h:mm",
          LTS: "A h:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY, A h:mm",
          LLLL: "dddd, D MMMM YYYY, A h:mm"
        },
        relativeTime: {
          future: "%s ལ་",
          past: "%s སྔོན་ལ་",
          s: "ཏོག་ཙམ་",
          m: "སྐར་མ་གཅིག་",
          mm: "སྐར་མ་ %d",
          h: "ཆུ་ཚོད་གཅིག་",
          hh: "ཆུ་ཚོད་ %d",
          d: "ཉིན་གཅིག་",
          dd: "ཉིན་ %d",
          M: "ཟླ་བ་གཅིག་",
          MM: "ཟླ་བ་ %d",
          y: "ལོ་གཅིག་",
          yy: "ལོ་ %d"
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(bo$1);

var bo = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var br$1 = {exports: {}};

(function (module, exports) {
  !function (e, n) {
    module.exports = n(require$$0) ;
  }(commonjsGlobal, function (e) {

    function n(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var u = n(e);
    function r(e) {
      return e > 9 ? r(e % 10) : e;
    }
    function t(e, n, u) {
      return e + " " + function (e, n) {
        return 2 === n ? function (e) {
          return {
            m: "v",
            b: "v",
            d: "z"
          }[e.charAt(0)] + e.substring(1);
        }(e) : e;
      }({
        mm: "munutenn",
        MM: "miz",
        dd: "devezh"
      }[u], e);
    }
    var o = {
      name: "br",
      weekdays: "Sul_Lun_Meurzh_Mercʼher_Yaou_Gwener_Sadorn".split("_"),
      months: "Genver_Cʼhwevrer_Meurzh_Ebrel_Mae_Mezheven_Gouere_Eost_Gwengolo_Here_Du_Kerzu".split("_"),
      weekStart: 1,
      weekdaysShort: "Sul_Lun_Meu_Mer_Yao_Gwe_Sad".split("_"),
      monthsShort: "Gen_Cʼhwe_Meu_Ebr_Mae_Eve_Gou_Eos_Gwe_Her_Du_Ker".split("_"),
      weekdaysMin: "Su_Lu_Me_Mer_Ya_Gw_Sa".split("_"),
      ordinal: function (e) {
        return e;
      },
      formats: {
        LT: "h[e]mm A",
        LTS: "h[e]mm:ss A",
        L: "DD/MM/YYYY",
        LL: "D [a viz] MMMM YYYY",
        LLL: "D [a viz] MMMM YYYY h[e]mm A",
        LLLL: "dddd, D [a viz] MMMM YYYY h[e]mm A"
      },
      relativeTime: {
        future: "a-benn %s",
        past: "%s ʼzo",
        s: "un nebeud segondennoù",
        m: "ur vunutenn",
        mm: t,
        h: "un eur",
        hh: "%d eur",
        d: "un devezh",
        dd: t,
        M: "ur miz",
        MM: t,
        y: "ur bloaz",
        yy: function (e) {
          switch (r(e)) {
            case 1:
            case 3:
            case 4:
            case 5:
            case 9:
              return e + " bloaz";
            default:
              return e + " vloaz";
          }
        }
      },
      meridiem: function (e) {
        return e < 12 ? "a.m." : "g.m.";
      }
    };
    return u.default.locale(o, null, !0), o;
  });
})(br$1);

var br = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var ca$1 = {exports: {}};

(function (module, exports) {
  !function (e, s) {
    module.exports = s(require$$0) ;
  }(commonjsGlobal, function (e) {

    function s(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = s(e),
      _ = {
        name: "ca",
        weekdays: "Diumenge_Dilluns_Dimarts_Dimecres_Dijous_Divendres_Dissabte".split("_"),
        weekdaysShort: "Dg._Dl._Dt._Dc._Dj._Dv._Ds.".split("_"),
        weekdaysMin: "Dg_Dl_Dt_Dc_Dj_Dv_Ds".split("_"),
        months: "Gener_Febrer_Març_Abril_Maig_Juny_Juliol_Agost_Setembre_Octubre_Novembre_Desembre".split("_"),
        monthsShort: "Gen._Febr._Març_Abr._Maig_Juny_Jul._Ag._Set._Oct._Nov._Des.".split("_"),
        weekStart: 1,
        formats: {
          LT: "H:mm",
          LTS: "H:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM [de] YYYY",
          LLL: "D MMMM [de] YYYY [a les] H:mm",
          LLLL: "dddd D MMMM [de] YYYY [a les] H:mm",
          ll: "D MMM YYYY",
          lll: "D MMM YYYY, H:mm",
          llll: "ddd D MMM YYYY, H:mm"
        },
        relativeTime: {
          future: "d'aquí %s",
          past: "fa %s",
          s: "uns segons",
          m: "un minut",
          mm: "%d minuts",
          h: "una hora",
          hh: "%d hores",
          d: "un dia",
          dd: "%d dies",
          M: "un mes",
          MM: "%d mesos",
          y: "un any",
          yy: "%d anys"
        },
        ordinal: function (e) {
          return "" + e + (1 === e || 3 === e ? "r" : 2 === e ? "n" : 4 === e ? "t" : "è");
        }
      };
    return t.default.locale(_, null, !0), _;
  });
})(ca$1);

var ca = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var cs$1 = {exports: {}};

(function (module, exports) {
  !function (e, n) {
    module.exports = n(require$$0) ;
  }(commonjsGlobal, function (e) {

    function n(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = n(e);
    function s(e) {
      return e > 1 && e < 5 && 1 != ~~(e / 10);
    }
    function r(e, n, t, r) {
      var d = e + " ";
      switch (t) {
        case "s":
          return n || r ? "pár sekund" : "pár sekundami";
        case "m":
          return n ? "minuta" : r ? "minutu" : "minutou";
        case "mm":
          return n || r ? d + (s(e) ? "minuty" : "minut") : d + "minutami";
        case "h":
          return n ? "hodina" : r ? "hodinu" : "hodinou";
        case "hh":
          return n || r ? d + (s(e) ? "hodiny" : "hodin") : d + "hodinami";
        case "d":
          return n || r ? "den" : "dnem";
        case "dd":
          return n || r ? d + (s(e) ? "dny" : "dní") : d + "dny";
        case "M":
          return n || r ? "měsíc" : "měsícem";
        case "MM":
          return n || r ? d + (s(e) ? "měsíce" : "měsíců") : d + "měsíci";
        case "y":
          return n || r ? "rok" : "rokem";
        case "yy":
          return n || r ? d + (s(e) ? "roky" : "let") : d + "lety";
      }
    }
    var d = {
      name: "cs",
      weekdays: "neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota".split("_"),
      weekdaysShort: "ne_po_út_st_čt_pá_so".split("_"),
      weekdaysMin: "ne_po_út_st_čt_pá_so".split("_"),
      months: "leden_únor_březen_duben_květen_červen_červenec_srpen_září_říjen_listopad_prosinec".split("_"),
      monthsShort: "led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro".split("_"),
      weekStart: 1,
      yearStart: 4,
      ordinal: function (e) {
        return e + ".";
      },
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY H:mm",
        LLLL: "dddd D. MMMM YYYY H:mm",
        l: "D. M. YYYY"
      },
      relativeTime: {
        future: "za %s",
        past: "před %s",
        s: r,
        m: r,
        mm: r,
        h: r,
        hh: r,
        d: r,
        dd: r,
        M: r,
        MM: r,
        y: r,
        yy: r
      }
    };
    return t.default.locale(d, null, !0), d;
  });
})(cs$1);

var cs = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var cv$1 = {exports: {}};

(function (module, exports) {
  !function (_, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (_) {

    function e(_) {
      return _ && "object" == typeof _ && "default" in _ ? _ : {
        default: _
      };
    }
    var t = e(_),
      n = {
        name: "cv",
        weekdays: "вырсарникун_тунтикун_ытларикун_юнкун_кӗҫнерникун_эрнекун_шӑматкун".split("_"),
        months: "кӑрлач_нарӑс_пуш_ака_май_ҫӗртме_утӑ_ҫурла_авӑн_юпа_чӳк_раштав".split("_"),
        weekStart: 1,
        weekdaysShort: "выр_тун_ытл_юн_кӗҫ_эрн_шӑм".split("_"),
        monthsShort: "кӑр_нар_пуш_ака_май_ҫӗр_утӑ_ҫур_авн_юпа_чӳк_раш".split("_"),
        weekdaysMin: "вр_тн_ыт_юн_кҫ_эр_шм".split("_"),
        ordinal: function (_) {
          return _;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD-MM-YYYY",
          LL: "YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ]",
          LLL: "YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm",
          LLLL: "dddd, YYYY [ҫулхи] MMMM [уйӑхӗн] D[-мӗшӗ], HH:mm"
        }
      };
    return t.default.locale(n, null, !0), n;
  });
})(cv$1);

var cv = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var cy$1 = {exports: {}};

(function (module, exports) {
  !function (d, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (d) {

    function e(d) {
      return d && "object" == typeof d && "default" in d ? d : {
        default: d
      };
    }
    var _ = e(d),
      a = {
        name: "cy",
        weekdays: "Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn".split("_"),
        months: "Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr".split("_"),
        weekStart: 1,
        weekdaysShort: "Sul_Llun_Maw_Mer_Iau_Gwe_Sad".split("_"),
        monthsShort: "Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag".split("_"),
        weekdaysMin: "Su_Ll_Ma_Me_Ia_Gw_Sa".split("_"),
        ordinal: function (d) {
          return d;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        relativeTime: {
          future: "mewn %s",
          past: "%s yn ôl",
          s: "ychydig eiliadau",
          m: "munud",
          mm: "%d munud",
          h: "awr",
          hh: "%d awr",
          d: "diwrnod",
          dd: "%d diwrnod",
          M: "mis",
          MM: "%d mis",
          y: "blwyddyn",
          yy: "%d flynedd"
        }
      };
    return _.default.locale(a, null, !0), a;
  });
})(cy$1);

var cy = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var da$1 = {exports: {}};

(function (module, exports) {
  !function (e, t) {
    module.exports = t(require$$0) ;
  }(commonjsGlobal, function (e) {

    function t(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var d = t(e),
      a = {
        name: "da",
        weekdays: "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),
        weekdaysShort: "søn._man._tirs._ons._tors._fre._lør.".split("_"),
        weekdaysMin: "sø._ma._ti._on._to._fr._lø.".split("_"),
        months: "januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split("_"),
        monthsShort: "jan._feb._mar._apr._maj_juni_juli_aug._sept._okt._nov._dec.".split("_"),
        weekStart: 1,
        yearStart: 4,
        ordinal: function (e) {
          return e + ".";
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD.MM.YYYY",
          LL: "D. MMMM YYYY",
          LLL: "D. MMMM YYYY HH:mm",
          LLLL: "dddd [d.] D. MMMM YYYY [kl.] HH:mm"
        },
        relativeTime: {
          future: "om %s",
          past: "%s siden",
          s: "få sekunder",
          m: "et minut",
          mm: "%d minutter",
          h: "en time",
          hh: "%d timer",
          d: "en dag",
          dd: "%d dage",
          M: "en måned",
          MM: "%d måneder",
          y: "et år",
          yy: "%d år"
        }
      };
    return d.default.locale(a, null, !0), a;
  });
})(da$1);

var da = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var deAt$1 = {exports: {}};

(function (module, exports) {
  !function (e, n) {
    module.exports = n(require$$0) ;
  }(commonjsGlobal, function (e) {

    function n(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = n(e),
      i = {
        s: "ein paar Sekunden",
        m: ["eine Minute", "einer Minute"],
        mm: "%d Minuten",
        h: ["eine Stunde", "einer Stunde"],
        hh: "%d Stunden",
        d: ["ein Tag", "einem Tag"],
        dd: ["%d Tage", "%d Tagen"],
        M: ["ein Monat", "einem Monat"],
        MM: ["%d Monate", "%d Monaten"],
        y: ["ein Jahr", "einem Jahr"],
        yy: ["%d Jahre", "%d Jahren"]
      };
    function a(e, n, t) {
      var a = i[t];
      return Array.isArray(a) && (a = a[n ? 0 : 1]), a.replace("%d", e);
    }
    var r = {
      name: "de-at",
      weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
      weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
      weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
      months: "Jänner_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
      monthsShort: "Jän._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"),
      ordinal: function (e) {
        return e + ".";
      },
      weekStart: 1,
      formats: {
        LTS: "HH:mm:ss",
        LT: "HH:mm",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY HH:mm",
        LLLL: "dddd, D. MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "in %s",
        past: "vor %s",
        s: a,
        m: a,
        mm: a,
        h: a,
        hh: a,
        d: a,
        dd: a,
        M: a,
        MM: a,
        y: a,
        yy: a
      }
    };
    return t.default.locale(r, null, !0), r;
  });
})(deAt$1);

var deAt = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var deCh$1 = {exports: {}};

(function (module, exports) {
  !function (e, n) {
    module.exports = n(require$$0) ;
  }(commonjsGlobal, function (e) {

    function n(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = n(e),
      a = {
        s: "ein paar Sekunden",
        m: ["eine Minute", "einer Minute"],
        mm: "%d Minuten",
        h: ["eine Stunde", "einer Stunde"],
        hh: "%d Stunden",
        d: ["ein Tag", "einem Tag"],
        dd: ["%d Tage", "%d Tagen"],
        M: ["ein Monat", "einem Monat"],
        MM: ["%d Monate", "%d Monaten"],
        y: ["ein Jahr", "einem Jahr"],
        yy: ["%d Jahre", "%d Jahren"]
      };
    function i(e, n, t) {
      var i = a[t];
      return Array.isArray(i) && (i = i[n ? 0 : 1]), i.replace("%d", e);
    }
    var r = {
      name: "de-ch",
      weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
      weekdaysShort: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
      weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
      months: "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
      monthsShort: "Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"),
      ordinal: function (e) {
        return e + ".";
      },
      weekStart: 1,
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY HH:mm",
        LLLL: "dddd, D. MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "in %s",
        past: "vor %s",
        s: i,
        m: i,
        mm: i,
        h: i,
        hh: i,
        d: i,
        dd: i,
        M: i,
        MM: i,
        y: i,
        yy: i
      }
    };
    return t.default.locale(r, null, !0), r;
  });
})(deCh$1);

var deCh = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var de$1 = {exports: {}};

(function (module, exports) {
  !function (e, n) {
    module.exports = n(require$$0) ;
  }(commonjsGlobal, function (e) {

    function n(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = n(e),
      a = {
        s: "ein paar Sekunden",
        m: ["eine Minute", "einer Minute"],
        mm: "%d Minuten",
        h: ["eine Stunde", "einer Stunde"],
        hh: "%d Stunden",
        d: ["ein Tag", "einem Tag"],
        dd: ["%d Tage", "%d Tagen"],
        M: ["ein Monat", "einem Monat"],
        MM: ["%d Monate", "%d Monaten"],
        y: ["ein Jahr", "einem Jahr"],
        yy: ["%d Jahre", "%d Jahren"]
      };
    function i(e, n, t) {
      var i = a[t];
      return Array.isArray(i) && (i = i[n ? 0 : 1]), i.replace("%d", e);
    }
    var r = {
      name: "de",
      weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
      weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
      weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
      months: "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
      monthsShort: "Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sept._Okt._Nov._Dez.".split("_"),
      ordinal: function (e) {
        return e + ".";
      },
      weekStart: 1,
      yearStart: 4,
      formats: {
        LTS: "HH:mm:ss",
        LT: "HH:mm",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY HH:mm",
        LLLL: "dddd, D. MMMM YYYY HH:mm"
      },
      relativeTime: {
        future: "in %s",
        past: "vor %s",
        s: i,
        m: i,
        mm: i,
        h: i,
        hh: i,
        d: i,
        dd: i,
        M: i,
        MM: i,
        y: i,
        yy: i
      }
    };
    return t.default.locale(r, null, !0), r;
  });
})(de$1);

var de = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var dv$1 = {exports: {}};

(function (module, exports) {
  !function (_, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (_) {

    function e(_) {
      return _ && "object" == typeof _ && "default" in _ ? _ : {
        default: _
      };
    }
    var t = e(_),
      d = {
        name: "dv",
        weekdays: "އާދިއްތަ_ހޯމަ_އަންގާރަ_ބުދަ_ބުރާސްފަތި_ހުކުރު_ހޮނިހިރު".split("_"),
        months: "ޖެނުއަރީ_ފެބްރުއަރީ_މާރިޗު_އޭޕްރީލު_މޭ_ޖޫން_ޖުލައި_އޯގަސްޓު_ސެޕްޓެމްބަރު_އޮކްޓޯބަރު_ނޮވެމްބަރު_ޑިސެމްބަރު".split("_"),
        weekStart: 7,
        weekdaysShort: "އާދިއްތަ_ހޯމަ_އަންގާރަ_ބުދަ_ބުރާސްފަތި_ހުކުރު_ހޮނިހިރު".split("_"),
        monthsShort: "ޖެނުއަރީ_ފެބްރުއަރީ_މާރިޗު_އޭޕްރީލު_މޭ_ޖޫން_ޖުލައި_އޯގަސްޓު_ސެޕްޓެމްބަރު_އޮކްޓޯބަރު_ނޮވެމްބަރު_ޑިސެމްބަރު".split("_"),
        weekdaysMin: "އާދި_ހޯމަ_އަން_ބުދަ_ބުރާ_ހުކު_ހޮނި".split("_"),
        ordinal: function (_) {
          return _;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "D/M/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd D MMMM YYYY HH:mm"
        },
        relativeTime: {
          future: "ތެރޭގައި %s",
          past: "ކުރިން %s",
          s: "ސިކުންތުކޮޅެއް",
          m: "މިނިޓެއް",
          mm: "މިނިޓު %d",
          h: "ގަޑިއިރެއް",
          hh: "ގަޑިއިރު %d",
          d: "ދުވަހެއް",
          dd: "ދުވަސް %d",
          M: "މަހެއް",
          MM: "މަސް %d",
          y: "އަހަރެއް",
          yy: "އަހަރު %d"
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(dv$1);

var dv = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var el$1 = {exports: {}};

(function (module, exports) {
  !function (e, _) {
    module.exports = _(require$$0) ;
  }(commonjsGlobal, function (e) {

    function _(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = _(e),
      d = {
        name: "el",
        weekdays: "Κυριακή_Δευτέρα_Τρίτη_Τετάρτη_Πέμπτη_Παρασκευή_Σάββατο".split("_"),
        weekdaysShort: "Κυρ_Δευ_Τρι_Τετ_Πεμ_Παρ_Σαβ".split("_"),
        weekdaysMin: "Κυ_Δε_Τρ_Τε_Πε_Πα_Σα".split("_"),
        months: "Ιανουάριος_Φεβρουάριος_Μάρτιος_Απρίλιος_Μάιος_Ιούνιος_Ιούλιος_Αύγουστος_Σεπτέμβριος_Οκτώβριος_Νοέμβριος_Δεκέμβριος".split("_"),
        monthsShort: "Ιαν_Φεβ_Μαρ_Απρ_Μαι_Ιουν_Ιουλ_Αυγ_Σεπτ_Οκτ_Νοε_Δεκ".split("_"),
        ordinal: function (e) {
          return e;
        },
        weekStart: 1,
        relativeTime: {
          future: "σε %s",
          past: "πριν %s",
          s: "μερικά δευτερόλεπτα",
          m: "ένα λεπτό",
          mm: "%d λεπτά",
          h: "μία ώρα",
          hh: "%d ώρες",
          d: "μία μέρα",
          dd: "%d μέρες",
          M: "ένα μήνα",
          MM: "%d μήνες",
          y: "ένα χρόνο",
          yy: "%d χρόνια"
        },
        formats: {
          LT: "h:mm A",
          LTS: "h:mm:ss A",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY h:mm A",
          LLLL: "dddd, D MMMM YYYY h:mm A"
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(el$1);

var el = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var enAu$1 = {exports: {}};

(function (module, exports) {
  !function (e, a) {
    module.exports = a(require$$0) ;
  }(commonjsGlobal, function (e) {

    function a(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = a(e),
      _ = {
        name: "en-au",
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        weekStart: 1,
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "h:mm A",
          LTS: "h:mm:ss A",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY h:mm A",
          LLLL: "dddd, D MMMM YYYY h:mm A"
        },
        relativeTime: {
          future: "in %s",
          past: "%s ago",
          s: "a few seconds",
          m: "a minute",
          mm: "%d minutes",
          h: "an hour",
          hh: "%d hours",
          d: "a day",
          dd: "%d days",
          M: "a month",
          MM: "%d months",
          y: "a year",
          yy: "%d years"
        }
      };
    return t.default.locale(_, null, !0), _;
  });
})(enAu$1);

var enAu = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var enGb$1 = {exports: {}};

(function (module, exports) {
  !function (e, a) {
    module.exports = a(require$$0) ;
  }(commonjsGlobal, function (e) {

    function a(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = a(e),
      _ = {
        name: "en-gb",
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekStart: 1,
        yearStart: 4,
        relativeTime: {
          future: "in %s",
          past: "%s ago",
          s: "a few seconds",
          m: "a minute",
          mm: "%d minutes",
          h: "an hour",
          hh: "%d hours",
          d: "a day",
          dd: "%d days",
          M: "a month",
          MM: "%d months",
          y: "a year",
          yy: "%d years"
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        ordinal: function (e) {
          var a = ["th", "st", "nd", "rd"],
            t = e % 100;
          return "[" + e + (a[(t - 20) % 10] || a[t] || a[0]) + "]";
        }
      };
    return t.default.locale(_, null, !0), _;
  });
})(enGb$1);

var enGb = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var enIe$1 = {exports: {}};

(function (module, exports) {
  !function (e, a) {
    module.exports = a(require$$0) ;
  }(commonjsGlobal, function (e) {

    function a(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = a(e),
      _ = {
        name: "en-ie",
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        weekStart: 1,
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd D MMMM YYYY HH:mm"
        },
        relativeTime: {
          future: "in %s",
          past: "%s ago",
          s: "a few seconds",
          m: "a minute",
          mm: "%d minutes",
          h: "an hour",
          hh: "%d hours",
          d: "a day",
          dd: "%d days",
          M: "a month",
          MM: "%d months",
          y: "a year",
          yy: "%d years"
        }
      };
    return t.default.locale(_, null, !0), _;
  });
})(enIe$1);

var enIe = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var enIl$1 = {exports: {}};

(function (module, exports) {
  !function (e, a) {
    module.exports = a(require$$0) ;
  }(commonjsGlobal, function (e) {

    function a(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var _ = a(e),
      t = {
        name: "en-il",
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        relativeTime: {
          future: "in %s",
          past: "%s ago",
          s: "a few seconds",
          m: "a minute",
          mm: "%d minutes",
          h: "an hour",
          hh: "%d hours",
          d: "a day",
          dd: "%d days",
          M: "a month",
          MM: "%d months",
          y: "a year",
          yy: "%d years"
        }
      };
    return _.default.locale(t, null, !0), t;
  });
})(enIl$1);

var enIl = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var enIn$1 = {exports: {}};

(function (module, exports) {
  !function (e, a) {
    module.exports = a(require$$0) ;
  }(commonjsGlobal, function (e) {

    function a(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = a(e),
      n = {
        name: "en-in",
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekStart: 1,
        yearStart: 4,
        relativeTime: {
          future: "in %s",
          past: "%s ago",
          s: "a few seconds",
          m: "a minute",
          mm: "%d minutes",
          h: "an hour",
          hh: "%d hours",
          d: "a day",
          dd: "%d days",
          M: "a month",
          MM: "%d months",
          y: "a year",
          yy: "%d years"
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        ordinal: function (e) {
          var a = ["th", "st", "nd", "rd"],
            t = e % 100;
          return "[" + e + (a[(t - 20) % 10] || a[t] || a[0]) + "]";
        }
      };
    return t.default.locale(n, null, !0), n;
  });
})(enIn$1);

var enIn = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var enNz$1 = {exports: {}};

(function (module, exports) {
  !function (e, a) {
    module.exports = a(require$$0) ;
  }(commonjsGlobal, function (e) {

    function a(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = a(e),
      n = {
        name: "en-nz",
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        weekStart: 1,
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        ordinal: function (e) {
          var a = ["th", "st", "nd", "rd"],
            t = e % 100;
          return "[" + e + (a[(t - 20) % 10] || a[t] || a[0]) + "]";
        },
        formats: {
          LT: "h:mm A",
          LTS: "h:mm:ss A",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY h:mm A",
          LLLL: "dddd, D MMMM YYYY h:mm A"
        },
        relativeTime: {
          future: "in %s",
          past: "%s ago",
          s: "a few seconds",
          m: "a minute",
          mm: "%d minutes",
          h: "an hour",
          hh: "%d hours",
          d: "a day",
          dd: "%d days",
          M: "a month",
          MM: "%d months",
          y: "a year",
          yy: "%d years"
        }
      };
    return t.default.locale(n, null, !0), n;
  });
})(enNz$1);

var enNz = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var enSg$1 = {exports: {}};

(function (module, exports) {
  !function (e, a) {
    module.exports = a(require$$0) ;
  }(commonjsGlobal, function (e) {

    function a(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = a(e),
      _ = {
        name: "en-sg",
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        weekStart: 1,
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        relativeTime: {
          future: "in %s",
          past: "%s ago",
          s: "a few seconds",
          m: "a minute",
          mm: "%d minutes",
          h: "an hour",
          hh: "%d hours",
          d: "a day",
          dd: "%d days",
          M: "a month",
          MM: "%d months",
          y: "a year",
          yy: "%d years"
        }
      };
    return t.default.locale(_, null, !0), _;
  });
})(enSg$1);

var enSg = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var enTt$1 = {exports: {}};

(function (module, exports) {
  !function (e, t) {
    module.exports = t(require$$0) ;
  }(commonjsGlobal, function (e) {

    function t(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var a = t(e),
      _ = {
        name: "en-tt",
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        weekStart: 1,
        yearStart: 4,
        relativeTime: {
          future: "in %s",
          past: "%s ago",
          s: "a few seconds",
          m: "a minute",
          mm: "%d minutes",
          h: "an hour",
          hh: "%d hours",
          d: "a day",
          dd: "%d days",
          M: "a month",
          MM: "%d months",
          y: "a year",
          yy: "%d years"
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        ordinal: function (e) {
          var t = ["th", "st", "nd", "rd"],
            a = e % 100;
          return "[" + e + (t[(a - 20) % 10] || t[a] || t[0]) + "]";
        }
      };
    return a.default.locale(_, null, !0), _;
  });
})(enTt$1);

var enTt = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var en$1 = {exports: {}};

(function (module, exports) {
  !function (e, n) {
    module.exports = n() ;
  }(commonjsGlobal, function () {

    return {
      name: "en",
      weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
      months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
      ordinal: function (e) {
        var n = ["th", "st", "nd", "rd"],
          t = e % 100;
        return "[" + e + (n[(t - 20) % 10] || n[t] || n[0]) + "]";
      }
    };
  });
})(en$1);

var en = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var eo$1 = {exports: {}};

(function (module, exports) {
  !function (e, o) {
    module.exports = o(require$$0) ;
  }(commonjsGlobal, function (e) {

    function o(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var a = o(e),
      t = {
        name: "eo",
        weekdays: "dimanĉo_lundo_mardo_merkredo_ĵaŭdo_vendredo_sabato".split("_"),
        months: "januaro_februaro_marto_aprilo_majo_junio_julio_aŭgusto_septembro_oktobro_novembro_decembro".split("_"),
        weekStart: 1,
        weekdaysShort: "dim_lun_mard_merk_ĵaŭ_ven_sab".split("_"),
        monthsShort: "jan_feb_mar_apr_maj_jun_jul_aŭg_sep_okt_nov_dec".split("_"),
        weekdaysMin: "di_lu_ma_me_ĵa_ve_sa".split("_"),
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "YYYY-MM-DD",
          LL: "D[-a de] MMMM, YYYY",
          LLL: "D[-a de] MMMM, YYYY HH:mm",
          LLLL: "dddd, [la] D[-a de] MMMM, YYYY HH:mm"
        },
        relativeTime: {
          future: "post %s",
          past: "antaŭ %s",
          s: "sekundoj",
          m: "minuto",
          mm: "%d minutoj",
          h: "horo",
          hh: "%d horoj",
          d: "tago",
          dd: "%d tagoj",
          M: "monato",
          MM: "%d monatoj",
          y: "jaro",
          yy: "%d jaroj"
        }
      };
    return a.default.locale(t, null, !0), t;
  });
})(eo$1);

var eo = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var esDo$1 = {exports: {}};

(function (module, exports) {
  !function (e, o) {
    module.exports = o(require$$0) ;
  }(commonjsGlobal, function (e) {

    function o(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var s = o(e),
      d = {
        name: "es-do",
        weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
        weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
        weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"),
        months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
        monthsShort: "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
        weekStart: 1,
        relativeTime: {
          future: "en %s",
          past: "hace %s",
          s: "unos segundos",
          m: "un minuto",
          mm: "%d minutos",
          h: "una hora",
          hh: "%d horas",
          d: "un día",
          dd: "%d días",
          M: "un mes",
          MM: "%d meses",
          y: "un año",
          yy: "%d años"
        },
        ordinal: function (e) {
          return e + "º";
        },
        formats: {
          LT: "h:mm A",
          LTS: "h:mm:ss A",
          L: "DD/MM/YYYY",
          LL: "D [de] MMMM [de] YYYY",
          LLL: "D [de] MMMM [de] YYYY h:mm A",
          LLLL: "dddd, D [de] MMMM [de] YYYY h:mm A"
        }
      };
    return s.default.locale(d, null, !0), d;
  });
})(esDo$1);

var esDo = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var esMx$1 = {exports: {}};

(function (module, exports) {
  !function (e, o) {
    module.exports = o(require$$0) ;
  }(commonjsGlobal, function (e) {

    function o(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var s = o(e),
      d = {
        name: "es-mx",
        weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
        weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
        weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"),
        months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
        monthsShort: "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
        relativeTime: {
          future: "en %s",
          past: "hace %s",
          s: "unos segundos",
          m: "un minuto",
          mm: "%d minutos",
          h: "una hora",
          hh: "%d horas",
          d: "un día",
          dd: "%d días",
          M: "un mes",
          MM: "%d meses",
          y: "un año",
          yy: "%d años"
        },
        ordinal: function (e) {
          return e + "º";
        },
        formats: {
          LT: "H:mm",
          LTS: "H:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D [de] MMMM [de] YYYY",
          LLL: "D [de] MMMM [de] YYYY H:mm",
          LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
        }
      };
    return s.default.locale(d, null, !0), d;
  });
})(esMx$1);

var esMx = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var esPr$1 = {exports: {}};

(function (module, exports) {
  !function (e, o) {
    module.exports = o(require$$0) ;
  }(commonjsGlobal, function (e) {

    function o(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var s = o(e),
      d = {
        name: "es-pr",
        monthsShort: "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
        weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
        weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
        weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"),
        months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
        weekStart: 1,
        formats: {
          LT: "h:mm A",
          LTS: "h:mm:ss A",
          L: "MM/DD/YYYY",
          LL: "D [de] MMMM [de] YYYY",
          LLL: "D [de] MMMM [de] YYYY h:mm A",
          LLLL: "dddd, D [de] MMMM [de] YYYY h:mm A"
        },
        relativeTime: {
          future: "en %s",
          past: "hace %s",
          s: "unos segundos",
          m: "un minuto",
          mm: "%d minutos",
          h: "una hora",
          hh: "%d horas",
          d: "un día",
          dd: "%d días",
          M: "un mes",
          MM: "%d meses",
          y: "un año",
          yy: "%d años"
        },
        ordinal: function (e) {
          return e + "º";
        }
      };
    return s.default.locale(d, null, !0), d;
  });
})(esPr$1);

var esPr = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var esUs$1 = {exports: {}};

(function (module, exports) {
  !function (e, s) {
    module.exports = s(require$$0) ;
  }(commonjsGlobal, function (e) {

    function s(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var o = s(e),
      d = {
        name: "es-us",
        weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
        weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
        weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"),
        months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
        monthsShort: "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
        relativeTime: {
          future: "en %s",
          past: "hace %s",
          s: "unos segundos",
          m: "un minuto",
          mm: "%d minutos",
          h: "una hora",
          hh: "%d horas",
          d: "un día",
          dd: "%d días",
          M: "un mes",
          MM: "%d meses",
          y: "un año",
          yy: "%d años"
        },
        ordinal: function (e) {
          return e + "º";
        },
        formats: {
          LT: "h:mm A",
          LTS: "h:mm:ss A",
          L: "MM/DD/YYYY",
          LL: "D [de] MMMM [de] YYYY",
          LLL: "D [de] MMMM [de] YYYY h:mm A",
          LLLL: "dddd, D [de] MMMM [de] YYYY h:mm A"
        }
      };
    return o.default.locale(d, null, !0), d;
  });
})(esUs$1);

var esUs = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var es$1 = {exports: {}};

(function (module, exports) {
  !function (e, o) {
    module.exports = o(require$$0) ;
  }(commonjsGlobal, function (e) {

    function o(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var s = o(e),
      d = {
        name: "es",
        monthsShort: "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
        weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
        weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
        weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"),
        months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
        weekStart: 1,
        formats: {
          LT: "H:mm",
          LTS: "H:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D [de] MMMM [de] YYYY",
          LLL: "D [de] MMMM [de] YYYY H:mm",
          LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
        },
        relativeTime: {
          future: "en %s",
          past: "hace %s",
          s: "unos segundos",
          m: "un minuto",
          mm: "%d minutos",
          h: "una hora",
          hh: "%d horas",
          d: "un día",
          dd: "%d días",
          M: "un mes",
          MM: "%d meses",
          y: "un año",
          yy: "%d años"
        },
        ordinal: function (e) {
          return e + "º";
        }
      };
    return s.default.locale(d, null, !0), d;
  });
})(es$1);

var es = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var et$1 = {exports: {}};

(function (module, exports) {
  !function (e, a) {
    module.exports = a(require$$0) ;
  }(commonjsGlobal, function (e) {

    function a(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = a(e);
    function u(e, a, t, u) {
      var s = {
        s: ["mõne sekundi", "mõni sekund", "paar sekundit"],
        m: ["ühe minuti", "üks minut"],
        mm: ["%d minuti", "%d minutit"],
        h: ["ühe tunni", "tund aega", "üks tund"],
        hh: ["%d tunni", "%d tundi"],
        d: ["ühe päeva", "üks päev"],
        M: ["kuu aja", "kuu aega", "üks kuu"],
        MM: ["%d kuu", "%d kuud"],
        y: ["ühe aasta", "aasta", "üks aasta"],
        yy: ["%d aasta", "%d aastat"]
      };
      return a ? (s[t][2] ? s[t][2] : s[t][1]).replace("%d", e) : (u ? s[t][0] : s[t][1]).replace("%d", e);
    }
    var s = {
      name: "et",
      weekdays: "pühapäev_esmaspäev_teisipäev_kolmapäev_neljapäev_reede_laupäev".split("_"),
      weekdaysShort: "P_E_T_K_N_R_L".split("_"),
      weekdaysMin: "P_E_T_K_N_R_L".split("_"),
      months: "jaanuar_veebruar_märts_aprill_mai_juuni_juuli_august_september_oktoober_november_detsember".split("_"),
      monthsShort: "jaan_veebr_märts_apr_mai_juuni_juuli_aug_sept_okt_nov_dets".split("_"),
      ordinal: function (e) {
        return e + ".";
      },
      weekStart: 1,
      relativeTime: {
        future: "%s pärast",
        past: "%s tagasi",
        s: u,
        m: u,
        mm: u,
        h: u,
        hh: u,
        d: u,
        dd: "%d päeva",
        M: u,
        MM: u,
        y: u,
        yy: u
      },
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY H:mm",
        LLLL: "dddd, D. MMMM YYYY H:mm"
      }
    };
    return t.default.locale(s, null, !0), s;
  });
})(et$1);

var et = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var eu$1 = {exports: {}};

(function (module, exports) {
  !function (a, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (a) {

    function e(a) {
      return a && "object" == typeof a && "default" in a ? a : {
        default: a
      };
    }
    var t = e(a),
      l = {
        name: "eu",
        weekdays: "igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata".split("_"),
        months: "urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua".split("_"),
        weekStart: 1,
        weekdaysShort: "ig._al._ar._az._og._ol._lr.".split("_"),
        monthsShort: "urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.".split("_"),
        weekdaysMin: "ig_al_ar_az_og_ol_lr".split("_"),
        ordinal: function (a) {
          return a;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "YYYY-MM-DD",
          LL: "YYYY[ko] MMMM[ren] D[a]",
          LLL: "YYYY[ko] MMMM[ren] D[a] HH:mm",
          LLLL: "dddd, YYYY[ko] MMMM[ren] D[a] HH:mm",
          l: "YYYY-M-D",
          ll: "YYYY[ko] MMM D[a]",
          lll: "YYYY[ko] MMM D[a] HH:mm",
          llll: "ddd, YYYY[ko] MMM D[a] HH:mm"
        },
        relativeTime: {
          future: "%s barru",
          past: "duela %s",
          s: "segundo batzuk",
          m: "minutu bat",
          mm: "%d minutu",
          h: "ordu bat",
          hh: "%d ordu",
          d: "egun bat",
          dd: "%d egun",
          M: "hilabete bat",
          MM: "%d hilabete",
          y: "urte bat",
          yy: "%d urte"
        }
      };
    return t.default.locale(l, null, !0), l;
  });
})(eu$1);

var eu = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var fa$1 = {exports: {}};

(function (module, exports) {
  !function (_, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (_) {

    function e(_) {
      return _ && "object" == typeof _ && "default" in _ ? _ : {
        default: _
      };
    }
    var t = e(_),
      d = {
        name: "fa",
        weekdays: "یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),
        weekdaysShort: "یک‌شنبه_دوشنبه_سه‌شنبه_چهارشنبه_پنج‌شنبه_جمعه_شنبه".split("_"),
        weekdaysMin: "ی_د_س_چ_پ_ج_ش".split("_"),
        weekStart: 6,
        months: "ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"),
        monthsShort: "ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر".split("_"),
        ordinal: function (_) {
          return _;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        relativeTime: {
          future: "در %s",
          past: "%s پیش",
          s: "چند ثانیه",
          m: "یک دقیقه",
          mm: "%d دقیقه",
          h: "یک ساعت",
          hh: "%d ساعت",
          d: "یک روز",
          dd: "%d روز",
          M: "یک ماه",
          MM: "%d ماه",
          y: "یک سال",
          yy: "%d سال"
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(fa$1);

var fa = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var fi$1 = {exports: {}};

(function (module, exports) {
  !function (u, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (u) {

    function e(u) {
      return u && "object" == typeof u && "default" in u ? u : {
        default: u
      };
    }
    var t = e(u);
    function n(u, e, t, n) {
      var i = {
          s: "muutama sekunti",
          m: "minuutti",
          mm: "%d minuuttia",
          h: "tunti",
          hh: "%d tuntia",
          d: "päivä",
          dd: "%d päivää",
          M: "kuukausi",
          MM: "%d kuukautta",
          y: "vuosi",
          yy: "%d vuotta",
          numbers: "nolla_yksi_kaksi_kolme_neljä_viisi_kuusi_seitsemän_kahdeksan_yhdeksän".split("_")
        },
        a = {
          s: "muutaman sekunnin",
          m: "minuutin",
          mm: "%d minuutin",
          h: "tunnin",
          hh: "%d tunnin",
          d: "päivän",
          dd: "%d päivän",
          M: "kuukauden",
          MM: "%d kuukauden",
          y: "vuoden",
          yy: "%d vuoden",
          numbers: "nollan_yhden_kahden_kolmen_neljän_viiden_kuuden_seitsemän_kahdeksan_yhdeksän".split("_")
        },
        s = n && !e ? a : i,
        _ = s[t];
      return u < 10 ? _.replace("%d", s.numbers[u]) : _.replace("%d", u);
    }
    var i = {
      name: "fi",
      weekdays: "sunnuntai_maanantai_tiistai_keskiviikko_torstai_perjantai_lauantai".split("_"),
      weekdaysShort: "su_ma_ti_ke_to_pe_la".split("_"),
      weekdaysMin: "su_ma_ti_ke_to_pe_la".split("_"),
      months: "tammikuu_helmikuu_maaliskuu_huhtikuu_toukokuu_kesäkuu_heinäkuu_elokuu_syyskuu_lokakuu_marraskuu_joulukuu".split("_"),
      monthsShort: "tammi_helmi_maalis_huhti_touko_kesä_heinä_elo_syys_loka_marras_joulu".split("_"),
      ordinal: function (u) {
        return u + ".";
      },
      weekStart: 1,
      yearStart: 4,
      relativeTime: {
        future: "%s päästä",
        past: "%s sitten",
        s: n,
        m: n,
        mm: n,
        h: n,
        hh: n,
        d: n,
        dd: n,
        M: n,
        MM: n,
        y: n,
        yy: n
      },
      formats: {
        LT: "HH.mm",
        LTS: "HH.mm.ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM[ta] YYYY",
        LLL: "D. MMMM[ta] YYYY, [klo] HH.mm",
        LLLL: "dddd, D. MMMM[ta] YYYY, [klo] HH.mm",
        l: "D.M.YYYY",
        ll: "D. MMM YYYY",
        lll: "D. MMM YYYY, [klo] HH.mm",
        llll: "ddd, D. MMM YYYY, [klo] HH.mm"
      }
    };
    return t.default.locale(i, null, !0), i;
  });
})(fi$1);

var fi = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var fo$1 = {exports: {}};

(function (module, exports) {
  !function (e, t) {
    module.exports = t(require$$0) ;
  }(commonjsGlobal, function (e) {

    function t(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var a = t(e),
      r = {
        name: "fo",
        weekdays: "sunnudagur_mánadagur_týsdagur_mikudagur_hósdagur_fríggjadagur_leygardagur".split("_"),
        months: "januar_februar_mars_apríl_mai_juni_juli_august_september_oktober_november_desember".split("_"),
        weekStart: 1,
        weekdaysShort: "sun_mán_týs_mik_hós_frí_ley".split("_"),
        monthsShort: "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
        weekdaysMin: "su_má_tý_mi_hó_fr_le".split("_"),
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd D. MMMM, YYYY HH:mm"
        },
        relativeTime: {
          future: "um %s",
          past: "%s síðani",
          s: "fá sekund",
          m: "ein minuttur",
          mm: "%d minuttir",
          h: "ein tími",
          hh: "%d tímar",
          d: "ein dagur",
          dd: "%d dagar",
          M: "ein mánaður",
          MM: "%d mánaðir",
          y: "eitt ár",
          yy: "%d ár"
        }
      };
    return a.default.locale(r, null, !0), r;
  });
})(fo$1);

var fo = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var frCh$1 = {exports: {}};

(function (module, exports) {
  !function (e, n) {
    module.exports = n(require$$0) ;
  }(commonjsGlobal, function (e) {

    function n(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var i = n(e),
      _ = {
        name: "fr-ch",
        weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
        months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
        weekStart: 1,
        weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
        monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
        weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"),
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD.MM.YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd D MMMM YYYY HH:mm"
        },
        relativeTime: {
          future: "dans %s",
          past: "il y a %s",
          s: "quelques secondes",
          m: "une minute",
          mm: "%d minutes",
          h: "une heure",
          hh: "%d heures",
          d: "un jour",
          dd: "%d jours",
          M: "un mois",
          MM: "%d mois",
          y: "un an",
          yy: "%d ans"
        }
      };
    return i.default.locale(_, null, !0), _;
  });
})(frCh$1);

var frCh = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var fr$1 = {exports: {}};

(function (module, exports) {
  !function (e, n) {
    module.exports = n(require$$0) ;
  }(commonjsGlobal, function (e) {

    function n(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = n(e),
      i = {
        name: "fr",
        weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
        weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
        weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"),
        months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
        monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
        weekStart: 1,
        yearStart: 4,
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd D MMMM YYYY HH:mm"
        },
        relativeTime: {
          future: "dans %s",
          past: "il y a %s",
          s: "quelques secondes",
          m: "une minute",
          mm: "%d minutes",
          h: "une heure",
          hh: "%d heures",
          d: "un jour",
          dd: "%d jours",
          M: "un mois",
          MM: "%d mois",
          y: "un an",
          yy: "%d ans"
        },
        ordinal: function (e) {
          return "" + e + (1 === e ? "er" : "");
        }
      };
    return t.default.locale(i, null, !0), i;
  });
})(fr$1);

var fr = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var fy$1 = {exports: {}};

(function (module, exports) {
  !function (e, n) {
    module.exports = n(require$$0) ;
  }(commonjsGlobal, function (e) {

    function n(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var i = n(e),
      t = {
        name: "fy",
        weekdays: "snein_moandei_tiisdei_woansdei_tongersdei_freed_sneon".split("_"),
        months: "jannewaris_febrewaris_maart_april_maaie_juny_july_augustus_septimber_oktober_novimber_desimber".split("_"),
        monthsShort: "jan._feb._mrt._apr._mai_jun._jul._aug._sep._okt._nov._des.".split("_"),
        weekStart: 1,
        weekdaysShort: "si._mo._ti._wo._to._fr._so.".split("_"),
        weekdaysMin: "Si_Mo_Ti_Wo_To_Fr_So".split("_"),
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD-MM-YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd D MMMM YYYY HH:mm"
        },
        relativeTime: {
          future: "oer %s",
          past: "%s lyn",
          s: "in pear sekonden",
          m: "ien minút",
          mm: "%d minuten",
          h: "ien oere",
          hh: "%d oeren",
          d: "ien dei",
          dd: "%d dagen",
          M: "ien moanne",
          MM: "%d moannen",
          y: "ien jier",
          yy: "%d jierren"
        }
      };
    return i.default.locale(t, null, !0), t;
  });
})(fy$1);

var fy = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var ga$1 = {exports: {}};

(function (module, exports) {
  !function (a, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (a) {

    function e(a) {
      return a && "object" == typeof a && "default" in a ? a : {
        default: a
      };
    }
    var i = e(a),
      n = {
        name: "ga",
        weekdays: "Dé Domhnaigh_Dé Luain_Dé Máirt_Dé Céadaoin_Déardaoin_Dé hAoine_Dé Satharn".split("_"),
        months: "Eanáir_Feabhra_Márta_Aibreán_Bealtaine_Méitheamh_Iúil_Lúnasa_Meán Fómhair_Deaireadh Fómhair_Samhain_Nollaig".split("_"),
        weekStart: 1,
        weekdaysShort: "Dom_Lua_Mái_Céa_Déa_hAo_Sat".split("_"),
        monthsShort: "Eaná_Feab_Márt_Aibr_Beal_Méit_Iúil_Lúna_Meán_Deai_Samh_Noll".split("_"),
        weekdaysMin: "Do_Lu_Má_Ce_Dé_hA_Sa".split("_"),
        ordinal: function (a) {
          return a;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        relativeTime: {
          future: "i %s",
          past: "%s ó shin",
          s: "cúpla soicind",
          m: "nóiméad",
          mm: "%d nóiméad",
          h: "uair an chloig",
          hh: "%d uair an chloig",
          d: "lá",
          dd: "%d lá",
          M: "mí",
          MM: "%d mí",
          y: "bliain",
          yy: "%d bliain"
        }
      };
    return i.default.locale(n, null, !0), n;
  });
})(ga$1);

var ga = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var gd$1 = {exports: {}};

(function (module, exports) {
  !function (a, i) {
    module.exports = i(require$$0) ;
  }(commonjsGlobal, function (a) {

    function i(a) {
      return a && "object" == typeof a && "default" in a ? a : {
        default: a
      };
    }
    var n = i(a),
      e = {
        name: "gd",
        weekdays: "Didòmhnaich_Diluain_Dimàirt_Diciadain_Diardaoin_Dihaoine_Disathairne".split("_"),
        months: "Am Faoilleach_An Gearran_Am Màrt_An Giblean_An Cèitean_An t-Ògmhios_An t-Iuchar_An Lùnastal_An t-Sultain_An Dàmhair_An t-Samhain_An Dùbhlachd".split("_"),
        weekStart: 1,
        weekdaysShort: "Did_Dil_Dim_Dic_Dia_Dih_Dis".split("_"),
        monthsShort: "Faoi_Gear_Màrt_Gibl_Cèit_Ògmh_Iuch_Lùn_Sult_Dàmh_Samh_Dùbh".split("_"),
        weekdaysMin: "Dò_Lu_Mà_Ci_Ar_Ha_Sa".split("_"),
        ordinal: function (a) {
          return a;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        relativeTime: {
          future: "ann an %s",
          past: "bho chionn %s",
          s: "beagan diogan",
          m: "mionaid",
          mm: "%d mionaidean",
          h: "uair",
          hh: "%d uairean",
          d: "latha",
          dd: "%d latha",
          M: "mìos",
          MM: "%d mìosan",
          y: "bliadhna",
          yy: "%d bliadhna"
        }
      };
    return n.default.locale(e, null, !0), e;
  });
})(gd$1);

var gd = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var gl$1 = {exports: {}};

(function (module, exports) {
  !function (e, o) {
    module.exports = o(require$$0) ;
  }(commonjsGlobal, function (e) {

    function o(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var s = o(e),
      d = {
        name: "gl",
        weekdays: "domingo_luns_martes_mércores_xoves_venres_sábado".split("_"),
        months: "xaneiro_febreiro_marzo_abril_maio_xuño_xullo_agosto_setembro_outubro_novembro_decembro".split("_"),
        weekStart: 1,
        weekdaysShort: "dom._lun._mar._mér._xov._ven._sáb.".split("_"),
        monthsShort: "xan._feb._mar._abr._mai._xuñ._xul._ago._set._out._nov._dec.".split("_"),
        weekdaysMin: "do_lu_ma_mé_xo_ve_sá".split("_"),
        ordinal: function (e) {
          return e + "º";
        },
        formats: {
          LT: "H:mm",
          LTS: "H:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D [de] MMMM [de] YYYY",
          LLL: "D [de] MMMM [de] YYYY H:mm",
          LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
        },
        relativeTime: {
          future: "en %s",
          past: "fai %s",
          s: "uns segundos",
          m: "un minuto",
          mm: "%d minutos",
          h: "unha hora",
          hh: "%d horas",
          d: "un día",
          dd: "%d días",
          M: "un mes",
          MM: "%d meses",
          y: "un ano",
          yy: "%d anos"
        }
      };
    return s.default.locale(d, null, !0), d;
  });
})(gl$1);

var gl = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var gomLatn$1 = {exports: {}};

(function (module, exports) {
  !function (e, t) {
    module.exports = t(require$$0) ;
  }(commonjsGlobal, function (e) {

    function t(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var a = t(e),
      _ = {
        name: "gom-latn",
        weekdays: "Aitar_Somar_Mongllar_Budvar_Brestar_Sukrar_Son'var".split("_"),
        months: "Janer_Febrer_Mars_Abril_Mai_Jun_Julai_Agost_Setembr_Otubr_Novembr_Dezembr".split("_"),
        weekStart: 1,
        weekdaysShort: "Ait._Som._Mon._Bud._Bre._Suk._Son.".split("_"),
        monthsShort: "Jan._Feb._Mars_Abr._Mai_Jun_Jul._Ago._Set._Otu._Nov._Dez.".split("_"),
        weekdaysMin: "Ai_Sm_Mo_Bu_Br_Su_Sn".split("_"),
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "A h:mm [vazta]",
          LTS: "A h:mm:ss [vazta]",
          L: "DD-MM-YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY A h:mm [vazta]",
          LLLL: "dddd, MMMM[achea] Do, YYYY, A h:mm [vazta]",
          llll: "ddd, D MMM YYYY, A h:mm [vazta]"
        }
      };
    return a.default.locale(_, null, !0), _;
  });
})(gomLatn$1);

var gomLatn = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var gu$1 = {exports: {}};

(function (module, exports) {
  !function (_, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (_) {

    function e(_) {
      return _ && "object" == typeof _ && "default" in _ ? _ : {
        default: _
      };
    }
    var t = e(_),
      d = {
        name: "gu",
        weekdays: "રવિવાર_સોમવાર_મંગળવાર_બુધ્વાર_ગુરુવાર_શુક્રવાર_શનિવાર".split("_"),
        months: "જાન્યુઆરી_ફેબ્રુઆરી_માર્ચ_એપ્રિલ_મે_જૂન_જુલાઈ_ઑગસ્ટ_સપ્ટેમ્બર_ઑક્ટ્બર_નવેમ્બર_ડિસેમ્બર".split("_"),
        weekdaysShort: "રવિ_સોમ_મંગળ_બુધ્_ગુરુ_શુક્ર_શનિ".split("_"),
        monthsShort: "જાન્યુ._ફેબ્રુ._માર્ચ_એપ્રિ._મે_જૂન_જુલા._ઑગ._સપ્ટે._ઑક્ટ્._નવે._ડિસે.".split("_"),
        weekdaysMin: "ર_સો_મં_બુ_ગુ_શુ_શ".split("_"),
        ordinal: function (_) {
          return _;
        },
        formats: {
          LT: "A h:mm વાગ્યે",
          LTS: "A h:mm:ss વાગ્યે",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY, A h:mm વાગ્યે",
          LLLL: "dddd, D MMMM YYYY, A h:mm વાગ્યે"
        },
        relativeTime: {
          future: "%s મા",
          past: "%s પેહલા",
          s: "અમુક પળો",
          m: "એક મિનિટ",
          mm: "%d મિનિટ",
          h: "એક કલાક",
          hh: "%d કલાક",
          d: "એક દિવસ",
          dd: "%d દિવસ",
          M: "એક મહિનો",
          MM: "%d મહિનો",
          y: "એક વર્ષ",
          yy: "%d વર્ષ"
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(gu$1);

var gu = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var he$1 = {exports: {}};

(function (module, exports) {
  !function (Y, M) {
    module.exports = M(require$$0) ;
  }(commonjsGlobal, function (Y) {

    function M(Y) {
      return Y && "object" == typeof Y && "default" in Y ? Y : {
        default: Y
      };
    }
    var d = M(Y),
      e = {
        s: "מספר שניות",
        ss: "%d שניות",
        m: "דקה",
        mm: "%d דקות",
        h: "שעה",
        hh: "%d שעות",
        hh2: "שעתיים",
        d: "יום",
        dd: "%d ימים",
        dd2: "יומיים",
        M: "חודש",
        MM: "%d חודשים",
        MM2: "חודשיים",
        y: "שנה",
        yy: "%d שנים",
        yy2: "שנתיים"
      };
    function _(Y, M, d) {
      return (e[d + (2 === Y ? "2" : "")] || e[d]).replace("%d", Y);
    }
    var l = {
      name: "he",
      weekdays: "ראשון_שני_שלישי_רביעי_חמישי_שישי_שבת".split("_"),
      weekdaysShort: "א׳_ב׳_ג׳_ד׳_ה׳_ו׳_ש׳".split("_"),
      weekdaysMin: "א׳_ב׳_ג׳_ד׳_ה׳_ו_ש׳".split("_"),
      months: "ינואר_פברואר_מרץ_אפריל_מאי_יוני_יולי_אוגוסט_ספטמבר_אוקטובר_נובמבר_דצמבר".split("_"),
      monthsShort: "ינו_פבר_מרץ_אפר_מאי_יונ_יול_אוג_ספט_אוק_נוב_דצמ".split("_"),
      relativeTime: {
        future: "בעוד %s",
        past: "לפני %s",
        s: _,
        m: _,
        mm: _,
        h: _,
        hh: _,
        d: _,
        dd: _,
        M: _,
        MM: _,
        y: _,
        yy: _
      },
      ordinal: function (Y) {
        return Y;
      },
      format: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D [ב]MMMM YYYY",
        LLL: "D [ב]MMMM YYYY HH:mm",
        LLLL: "dddd, D [ב]MMMM YYYY HH:mm",
        l: "D/M/YYYY",
        ll: "D MMM YYYY",
        lll: "D MMM YYYY HH:mm",
        llll: "ddd, D MMM YYYY HH:mm"
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD/MM/YYYY",
        LL: "D [ב]MMMM YYYY",
        LLL: "D [ב]MMMM YYYY HH:mm",
        LLLL: "dddd, D [ב]MMMM YYYY HH:mm",
        l: "D/M/YYYY",
        ll: "D MMM YYYY",
        lll: "D MMM YYYY HH:mm",
        llll: "ddd, D MMM YYYY HH:mm"
      }
    };
    return d.default.locale(l, null, !0), l;
  });
})(he$1);

var he = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var hi$1 = {exports: {}};

(function (module, exports) {
  !function (_, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (_) {

    function e(_) {
      return _ && "object" == typeof _ && "default" in _ ? _ : {
        default: _
      };
    }
    var t = e(_),
      d = {
        name: "hi",
        weekdays: "रविवार_सोमवार_मंगलवार_बुधवार_गुरूवार_शुक्रवार_शनिवार".split("_"),
        months: "जनवरी_फ़रवरी_मार्च_अप्रैल_मई_जून_जुलाई_अगस्त_सितम्बर_अक्टूबर_नवम्बर_दिसम्बर".split("_"),
        weekdaysShort: "रवि_सोम_मंगल_बुध_गुरू_शुक्र_शनि".split("_"),
        monthsShort: "जन._फ़र._मार्च_अप्रै._मई_जून_जुल._अग._सित._अक्टू._नव._दिस.".split("_"),
        weekdaysMin: "र_सो_मं_बु_गु_शु_श".split("_"),
        ordinal: function (_) {
          return _;
        },
        formats: {
          LT: "A h:mm बजे",
          LTS: "A h:mm:ss बजे",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY, A h:mm बजे",
          LLLL: "dddd, D MMMM YYYY, A h:mm बजे"
        },
        relativeTime: {
          future: "%s में",
          past: "%s पहले",
          s: "कुछ ही क्षण",
          m: "एक मिनट",
          mm: "%d मिनट",
          h: "एक घंटा",
          hh: "%d घंटे",
          d: "एक दिन",
          dd: "%d दिन",
          M: "एक महीने",
          MM: "%d महीने",
          y: "एक वर्ष",
          yy: "%d वर्ष"
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(hi$1);

var hi = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var hr$1 = {exports: {}};

(function (module, exports) {
  !function (e, a) {
    module.exports = a(require$$0) ;
  }(commonjsGlobal, function (e) {

    function a(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = a(e),
      s = "siječnja_veljače_ožujka_travnja_svibnja_lipnja_srpnja_kolovoza_rujna_listopada_studenoga_prosinca".split("_"),
      n = "siječanj_veljača_ožujak_travanj_svibanj_lipanj_srpanj_kolovoz_rujan_listopad_studeni_prosinac".split("_"),
      _ = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/,
      o = function (e, a) {
        return _.test(a) ? s[e.month()] : n[e.month()];
      };
    o.s = n, o.f = s;
    var i = {
      name: "hr",
      weekdays: "nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),
      weekdaysShort: "ned._pon._uto._sri._čet._pet._sub.".split("_"),
      weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"),
      months: o,
      monthsShort: "sij._velj._ožu._tra._svi._lip._srp._kol._ruj._lis._stu._pro.".split("_"),
      weekStart: 1,
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY H:mm",
        LLLL: "dddd, D. MMMM YYYY H:mm"
      },
      relativeTime: {
        future: "za %s",
        past: "prije %s",
        s: "sekunda",
        m: "minuta",
        mm: "%d minuta",
        h: "sat",
        hh: "%d sati",
        d: "dan",
        dd: "%d dana",
        M: "mjesec",
        MM: "%d mjeseci",
        y: "godina",
        yy: "%d godine"
      },
      ordinal: function (e) {
        return e + ".";
      }
    };
    return t.default.locale(i, null, !0), i;
  });
})(hr$1);

var hr = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var ht$1 = {exports: {}};

(function (module, exports) {
  !function (e, n) {
    module.exports = n(require$$0) ;
  }(commonjsGlobal, function (e) {

    function n(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var d = n(e),
      a = {
        name: "ht",
        weekdays: "dimanch_lendi_madi_mèkredi_jedi_vandredi_samdi".split("_"),
        months: "janvye_fevriye_mas_avril_me_jen_jiyè_out_septanm_oktòb_novanm_desanm".split("_"),
        weekdaysShort: "dim._len._mad._mèk._jed._van._sam.".split("_"),
        monthsShort: "jan._fev._mas_avr._me_jen_jiyè._out_sept._okt._nov._des.".split("_"),
        weekdaysMin: "di_le_ma_mè_je_va_sa".split("_"),
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd D MMMM YYYY HH:mm"
        },
        relativeTime: {
          future: "nan %s",
          past: "sa gen %s",
          s: "kèk segond",
          m: "yon minit",
          mm: "%d minit",
          h: "inèdtan",
          hh: "%d zè",
          d: "yon jou",
          dd: "%d jou",
          M: "yon mwa",
          MM: "%d mwa",
          y: "yon ane",
          yy: "%d ane"
        }
      };
    return d.default.locale(a, null, !0), a;
  });
})(ht$1);

var ht = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var hu$1 = {exports: {}};

(function (module, exports) {
  !function (e, n) {
    module.exports = n(require$$0) ;
  }(commonjsGlobal, function (e) {

    function n(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = n(e),
      r = {
        name: "hu",
        weekdays: "vasárnap_hétfő_kedd_szerda_csütörtök_péntek_szombat".split("_"),
        weekdaysShort: "vas_hét_kedd_sze_csüt_pén_szo".split("_"),
        weekdaysMin: "v_h_k_sze_cs_p_szo".split("_"),
        months: "január_február_március_április_május_június_július_augusztus_szeptember_október_november_december".split("_"),
        monthsShort: "jan_feb_márc_ápr_máj_jún_júl_aug_szept_okt_nov_dec".split("_"),
        ordinal: function (e) {
          return e + ".";
        },
        weekStart: 1,
        relativeTime: {
          future: "%s múlva",
          past: "%s",
          s: function (e, n, t, r) {
            return "néhány másodperc" + (r || n ? "" : "e");
          },
          m: function (e, n, t, r) {
            return "egy perc" + (r || n ? "" : "e");
          },
          mm: function (e, n, t, r) {
            return e + " perc" + (r || n ? "" : "e");
          },
          h: function (e, n, t, r) {
            return "egy " + (r || n ? "óra" : "órája");
          },
          hh: function (e, n, t, r) {
            return e + " " + (r || n ? "óra" : "órája");
          },
          d: function (e, n, t, r) {
            return "egy " + (r || n ? "nap" : "napja");
          },
          dd: function (e, n, t, r) {
            return e + " " + (r || n ? "nap" : "napja");
          },
          M: function (e, n, t, r) {
            return "egy " + (r || n ? "hónap" : "hónapja");
          },
          MM: function (e, n, t, r) {
            return e + " " + (r || n ? "hónap" : "hónapja");
          },
          y: function (e, n, t, r) {
            return "egy " + (r || n ? "év" : "éve");
          },
          yy: function (e, n, t, r) {
            return e + " " + (r || n ? "év" : "éve");
          }
        },
        formats: {
          LT: "H:mm",
          LTS: "H:mm:ss",
          L: "YYYY.MM.DD.",
          LL: "YYYY. MMMM D.",
          LLL: "YYYY. MMMM D. H:mm",
          LLLL: "YYYY. MMMM D., dddd H:mm"
        }
      };
    return t.default.locale(r, null, !0), r;
  });
})(hu$1);

var hu = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var hyAm$1 = {exports: {}};

(function (module, exports) {
  !function (_, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (_) {

    function e(_) {
      return _ && "object" == typeof _ && "default" in _ ? _ : {
        default: _
      };
    }
    var t = e(_),
      d = {
        name: "hy-am",
        weekdays: "կիրակի_երկուշաբթի_երեքշաբթի_չորեքշաբթի_հինգշաբթի_ուրբաթ_շաբաթ".split("_"),
        months: "հունվարի_փետրվարի_մարտի_ապրիլի_մայիսի_հունիսի_հուլիսի_օգոստոսի_սեպտեմբերի_հոկտեմբերի_նոյեմբերի_դեկտեմբերի".split("_"),
        weekStart: 1,
        weekdaysShort: "կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),
        monthsShort: "հնվ_փտր_մրտ_ապր_մյս_հնս_հլս_օգս_սպտ_հկտ_նմբ_դկտ".split("_"),
        weekdaysMin: "կրկ_երկ_երք_չրք_հնգ_ուրբ_շբթ".split("_"),
        ordinal: function (_) {
          return _;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD.MM.YYYY",
          LL: "D MMMM YYYY թ.",
          LLL: "D MMMM YYYY թ., HH:mm",
          LLLL: "dddd, D MMMM YYYY թ., HH:mm"
        },
        relativeTime: {
          future: "%s հետո",
          past: "%s առաջ",
          s: "մի քանի վայրկյան",
          m: "րոպե",
          mm: "%d րոպե",
          h: "ժամ",
          hh: "%d ժամ",
          d: "օր",
          dd: "%d օր",
          M: "ամիս",
          MM: "%d ամիս",
          y: "տարի",
          yy: "%d տարի"
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(hyAm$1);

var hyAm = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var id$1 = {exports: {}};

(function (module, exports) {
  !function (e, a) {
    module.exports = a(require$$0) ;
  }(commonjsGlobal, function (e) {

    function a(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = a(e),
      _ = {
        name: "id",
        weekdays: "Minggu_Senin_Selasa_Rabu_Kamis_Jumat_Sabtu".split("_"),
        months: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_November_Desember".split("_"),
        weekdaysShort: "Min_Sen_Sel_Rab_Kam_Jum_Sab".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Agt_Sep_Okt_Nov_Des".split("_"),
        weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sb".split("_"),
        weekStart: 1,
        formats: {
          LT: "HH.mm",
          LTS: "HH.mm.ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY [pukul] HH.mm",
          LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
        },
        relativeTime: {
          future: "dalam %s",
          past: "%s yang lalu",
          s: "beberapa detik",
          m: "semenit",
          mm: "%d menit",
          h: "sejam",
          hh: "%d jam",
          d: "sehari",
          dd: "%d hari",
          M: "sebulan",
          MM: "%d bulan",
          y: "setahun",
          yy: "%d tahun"
        },
        ordinal: function (e) {
          return e + ".";
        }
      };
    return t.default.locale(_, null, !0), _;
  });
})(id$1);

var id = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var is$1 = {exports: {}};

(function (module, exports) {
  !function (u, r) {
    module.exports = r(require$$0) ;
  }(commonjsGlobal, function (u) {

    function r(u) {
      return u && "object" == typeof u && "default" in u ? u : {
        default: u
      };
    }
    var n = r(u),
      e = {
        s: ["nokkrar sekúndur", "nokkrar sekúndur", "nokkrum sekúndum"],
        m: ["mínúta", "mínútu", "mínútu"],
        mm: ["mínútur", "mínútur", "mínútum"],
        h: ["klukkustund", "klukkustund", "klukkustund"],
        hh: ["klukkustundir", "klukkustundir", "klukkustundum"],
        d: ["dagur", "dag", "degi"],
        dd: ["dagar", "daga", "dögum"],
        M: ["mánuður", "mánuð", "mánuði"],
        MM: ["mánuðir", "mánuði", "mánuðum"],
        y: ["ár", "ár", "ári"],
        yy: ["ár", "ár", "árum"]
      };
    function t(u, r, n, t) {
      var a = function (u, r, n, t) {
        var a = t ? 0 : n ? 1 : 2,
          d = 2 === u.length && r % 10 == 1 ? u[0] : u,
          m = e[d][a];
        return 1 === u.length ? m : "%d " + m;
      }(n, u, t, r);
      return a.replace("%d", u);
    }
    var a = {
      name: "is",
      weekdays: "sunnudagur_mánudagur_þriðjudagur_miðvikudagur_fimmtudagur_föstudagur_laugardagur".split("_"),
      months: "janúar_febrúar_mars_apríl_maí_júní_júlí_ágúst_september_október_nóvember_desember".split("_"),
      weekStart: 1,
      weekdaysShort: "sun_mán_þri_mið_fim_fös_lau".split("_"),
      monthsShort: "jan_feb_mar_apr_maí_jún_júl_ágú_sep_okt_nóv_des".split("_"),
      weekdaysMin: "Su_Má_Þr_Mi_Fi_Fö_La".split("_"),
      ordinal: function (u) {
        return u;
      },
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY [kl.] H:mm",
        LLLL: "dddd, D. MMMM YYYY [kl.] H:mm"
      },
      relativeTime: {
        future: "eftir %s",
        past: "fyrir %s síðan",
        s: t,
        m: t,
        mm: t,
        h: t,
        hh: t,
        d: t,
        dd: t,
        M: t,
        MM: t,
        y: t,
        yy: t
      }
    };
    return n.default.locale(a, null, !0), a;
  });
})(is$1);

var is = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var itCh$1 = {exports: {}};

(function (module, exports) {
  !function (e, o) {
    module.exports = o(require$$0) ;
  }(commonjsGlobal, function (e) {

    function o(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var n = o(e),
      t = {
        name: "it-ch",
        weekdays: "domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato".split("_"),
        months: "gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"),
        weekStart: 1,
        weekdaysShort: "dom_lun_mar_mer_gio_ven_sab".split("_"),
        monthsShort: "gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),
        weekdaysMin: "do_lu_ma_me_gi_ve_sa".split("_"),
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD.MM.YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd D MMMM YYYY HH:mm"
        },
        relativeTime: {
          future: "tra %s",
          past: "%s fa",
          s: "alcuni secondi",
          m: "un minuto",
          mm: "%d minuti",
          h: "un'ora",
          hh: "%d ore",
          d: "un giorno",
          dd: "%d giorni",
          M: "un mese",
          MM: "%d mesi",
          y: "un anno",
          yy: "%d anni"
        }
      };
    return n.default.locale(t, null, !0), t;
  });
})(itCh$1);

var itCh = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var it$1 = {exports: {}};

(function (module, exports) {
  !function (e, o) {
    module.exports = o(require$$0) ;
  }(commonjsGlobal, function (e) {

    function o(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = o(e),
      n = {
        name: "it",
        weekdays: "domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato".split("_"),
        weekdaysShort: "dom_lun_mar_mer_gio_ven_sab".split("_"),
        weekdaysMin: "do_lu_ma_me_gi_ve_sa".split("_"),
        months: "gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split("_"),
        weekStart: 1,
        monthsShort: "gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd D MMMM YYYY HH:mm"
        },
        relativeTime: {
          future: "tra %s",
          past: "%s fa",
          s: "qualche secondo",
          m: "un minuto",
          mm: "%d minuti",
          h: "un' ora",
          hh: "%d ore",
          d: "un giorno",
          dd: "%d giorni",
          M: "un mese",
          MM: "%d mesi",
          y: "un anno",
          yy: "%d anni"
        },
        ordinal: function (e) {
          return e + "º";
        }
      };
    return t.default.locale(n, null, !0), n;
  });
})(it$1);

var it = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var ja$1 = {exports: {}};

(function (module, exports) {
  !function (e, _) {
    module.exports = _(require$$0) ;
  }(commonjsGlobal, function (e) {

    function _(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = _(e),
      d = {
        name: "ja",
        weekdays: "日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"),
        weekdaysShort: "日_月_火_水_木_金_土".split("_"),
        weekdaysMin: "日_月_火_水_木_金_土".split("_"),
        months: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        ordinal: function (e) {
          return e + "日";
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "YYYY/MM/DD",
          LL: "YYYY年M月D日",
          LLL: "YYYY年M月D日 HH:mm",
          LLLL: "YYYY年M月D日 dddd HH:mm",
          l: "YYYY/MM/DD",
          ll: "YYYY年M月D日",
          lll: "YYYY年M月D日 HH:mm",
          llll: "YYYY年M月D日(ddd) HH:mm"
        },
        meridiem: function (e) {
          return e < 12 ? "午前" : "午後";
        },
        relativeTime: {
          future: "%s後",
          past: "%s前",
          s: "数秒",
          m: "1分",
          mm: "%d分",
          h: "1時間",
          hh: "%d時間",
          d: "1日",
          dd: "%d日",
          M: "1ヶ月",
          MM: "%dヶ月",
          y: "1年",
          yy: "%d年"
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(ja$1);

var ja = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var jv$1 = {exports: {}};

(function (module, exports) {
  !function (e, n) {
    module.exports = n(require$$0) ;
  }(commonjsGlobal, function (e) {

    function n(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = n(e),
      _ = {
        name: "jv",
        weekdays: "Minggu_Senen_Seloso_Rebu_Kemis_Jemuwah_Septu".split("_"),
        months: "Januari_Februari_Maret_April_Mei_Juni_Juli_Agustus_September_Oktober_Nopember_Desember".split("_"),
        weekStart: 1,
        weekdaysShort: "Min_Sen_Sel_Reb_Kem_Jem_Sep".split("_"),
        monthsShort: "Jan_Feb_Mar_Apr_Mei_Jun_Jul_Ags_Sep_Okt_Nop_Des".split("_"),
        weekdaysMin: "Mg_Sn_Sl_Rb_Km_Jm_Sp".split("_"),
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "HH.mm",
          LTS: "HH.mm.ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY [pukul] HH.mm",
          LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
        },
        relativeTime: {
          future: "wonten ing %s",
          past: "%s ingkang kepengker",
          s: "sawetawis detik",
          m: "setunggal menit",
          mm: "%d menit",
          h: "setunggal jam",
          hh: "%d jam",
          d: "sedinten",
          dd: "%d dinten",
          M: "sewulan",
          MM: "%d wulan",
          y: "setaun",
          yy: "%d taun"
        }
      };
    return t.default.locale(_, null, !0), _;
  });
})(jv$1);

var jv = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var ka$1 = {exports: {}};

(function (module, exports) {
  !function (_, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (_) {

    function e(_) {
      return _ && "object" == typeof _ && "default" in _ ? _ : {
        default: _
      };
    }
    var t = e(_),
      d = {
        name: "ka",
        weekdays: "კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი".split("_"),
        weekdaysShort: "კვი_ორშ_სამ_ოთხ_ხუთ_პარ_შაბ".split("_"),
        weekdaysMin: "კვ_ორ_სა_ოთ_ხუ_პა_შა".split("_"),
        months: "იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი".split("_"),
        monthsShort: "იან_თებ_მარ_აპრ_მაი_ივნ_ივლ_აგვ_სექ_ოქტ_ნოე_დეკ".split("_"),
        weekStart: 1,
        formats: {
          LT: "h:mm A",
          LTS: "h:mm:ss A",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY h:mm A",
          LLLL: "dddd, D MMMM YYYY h:mm A"
        },
        relativeTime: {
          future: "%s შემდეგ",
          past: "%s წინ",
          s: "წამი",
          m: "წუთი",
          mm: "%d წუთი",
          h: "საათი",
          hh: "%d საათის",
          d: "დღეს",
          dd: "%d დღის განმავლობაში",
          M: "თვის",
          MM: "%d თვის",
          y: "წელი",
          yy: "%d წლის"
        },
        ordinal: function (_) {
          return _;
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(ka$1);

var ka = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var kk$1 = {exports: {}};

(function (module, exports) {
  !function (_, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (_) {

    function e(_) {
      return _ && "object" == typeof _ && "default" in _ ? _ : {
        default: _
      };
    }
    var t = e(_),
      d = {
        name: "kk",
        weekdays: "жексенбі_дүйсенбі_сейсенбі_сәрсенбі_бейсенбі_жұма_сенбі".split("_"),
        weekdaysShort: "жек_дүй_сей_сәр_бей_жұм_сен".split("_"),
        weekdaysMin: "жк_дй_сй_ср_бй_жм_сн".split("_"),
        months: "қаңтар_ақпан_наурыз_сәуір_мамыр_маусым_шілде_тамыз_қыркүйек_қазан_қараша_желтоқсан".split("_"),
        monthsShort: "қаң_ақп_нау_сәу_мам_мау_шіл_там_қыр_қаз_қар_жел".split("_"),
        weekStart: 1,
        relativeTime: {
          future: "%s ішінде",
          past: "%s бұрын",
          s: "бірнеше секунд",
          m: "бір минут",
          mm: "%d минут",
          h: "бір сағат",
          hh: "%d сағат",
          d: "бір күн",
          dd: "%d күн",
          M: "бір ай",
          MM: "%d ай",
          y: "бір жыл",
          yy: "%d жыл"
        },
        ordinal: function (_) {
          return _;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD.MM.YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd, D MMMM YYYY HH:mm"
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(kk$1);

var kk = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var ko$1 = {exports: {}};

(function (module, exports) {
  !function (e, _) {
    module.exports = _(require$$0) ;
  }(commonjsGlobal, function (e) {

    function _(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var d = _(e),
      t = {
        name: "ko",
        weekdays: "일요일_월요일_화요일_수요일_목요일_금요일_토요일".split("_"),
        weekdaysShort: "일_월_화_수_목_금_토".split("_"),
        weekdaysMin: "일_월_화_수_목_금_토".split("_"),
        months: "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),
        monthsShort: "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"),
        ordinal: function (e) {
          return e + "일";
        },
        formats: {
          LT: "A h:mm",
          LTS: "A h:mm:ss",
          L: "YYYY.MM.DD.",
          LL: "YYYY년 MMMM D일",
          LLL: "YYYY년 MMMM D일 A h:mm",
          LLLL: "YYYY년 MMMM D일 dddd A h:mm",
          l: "YYYY.MM.DD.",
          ll: "YYYY년 MMMM D일",
          lll: "YYYY년 MMMM D일 A h:mm",
          llll: "YYYY년 MMMM D일 dddd A h:mm"
        },
        meridiem: function (e) {
          return e < 12 ? "오전" : "오후";
        },
        relativeTime: {
          future: "%s 후",
          past: "%s 전",
          s: "몇 초",
          m: "1분",
          mm: "%d분",
          h: "한 시간",
          hh: "%d시간",
          d: "하루",
          dd: "%d일",
          M: "한 달",
          MM: "%d달",
          y: "일 년",
          yy: "%d년"
        }
      };
    return d.default.locale(t, null, !0), t;
  });
})(ko$1);

var ko = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var ku$1 = {exports: {}};

(function (module, exports) {
  !function (e, t) {
    t(exports, require$$0) ;
  }(commonjsGlobal, function (e, t) {

    function n(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var r = n(t),
      d = {
        1: "١",
        2: "٢",
        3: "٣",
        4: "٤",
        5: "٥",
        6: "٦",
        7: "٧",
        8: "٨",
        9: "٩",
        0: "٠"
      },
      o = {
        "١": "1",
        "٢": "2",
        "٣": "3",
        "٤": "4",
        "٥": "5",
        "٦": "6",
        "٧": "7",
        "٨": "8",
        "٩": "9",
        "٠": "0"
      },
      u = ["کانوونی دووەم", "شوبات", "ئادار", "نیسان", "ئایار", "حوزەیران", "تەممووز", "ئاب", "ئەیلوول", "تشرینی یەکەم", "تشرینی دووەم", "کانوونی یەکەم"],
      i = {
        name: "ku",
        months: u,
        monthsShort: u,
        weekdays: "یەکشەممە_دووشەممە_سێشەممە_چوارشەممە_پێنجشەممە_هەینی_شەممە".split("_"),
        weekdaysShort: "یەکشەم_دووشەم_سێشەم_چوارشەم_پێنجشەم_هەینی_شەممە".split("_"),
        weekStart: 6,
        weekdaysMin: "ی_د_س_چ_پ_هـ_ش".split("_"),
        preparse: function (e) {
          return e.replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (e) {
            return o[e];
          }).replace(/،/g, ",");
        },
        postformat: function (e) {
          return e.replace(/\d/g, function (e) {
            return d[e];
          }).replace(/,/g, "،");
        },
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        meridiem: function (e) {
          return e < 12 ? "پ.ن" : "د.ن";
        },
        relativeTime: {
          future: "لە %s",
          past: "لەمەوپێش %s",
          s: "چەند چرکەیەک",
          m: "یەک خولەک",
          mm: "%d خولەک",
          h: "یەک کاتژمێر",
          hh: "%d کاتژمێر",
          d: "یەک ڕۆژ",
          dd: "%d ڕۆژ",
          M: "یەک مانگ",
          MM: "%d مانگ",
          y: "یەک ساڵ",
          yy: "%d ساڵ"
        }
      };
    r.default.locale(i, null, !0), e.default = i, e.englishToArabicNumbersMap = d, Object.defineProperty(e, "__esModule", {
      value: !0
    });
  });
})(ku$1, ku$1.exports);

var ku = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var ky$1 = {exports: {}};

(function (module, exports) {
  !function (_, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (_) {

    function e(_) {
      return _ && "object" == typeof _ && "default" in _ ? _ : {
        default: _
      };
    }
    var t = e(_),
      d = {
        name: "ky",
        weekdays: "Жекшемби_Дүйшөмбү_Шейшемби_Шаршемби_Бейшемби_Жума_Ишемби".split("_"),
        months: "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),
        weekStart: 1,
        weekdaysShort: "Жек_Дүй_Шей_Шар_Бей_Жум_Ише".split("_"),
        monthsShort: "янв_фев_март_апр_май_июнь_июль_авг_сен_окт_ноя_дек".split("_"),
        weekdaysMin: "Жк_Дй_Шй_Шр_Бй_Жм_Иш".split("_"),
        ordinal: function (_) {
          return _;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD.MM.YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        relativeTime: {
          future: "%s ичинде",
          past: "%s мурун",
          s: "бирнече секунд",
          m: "бир мүнөт",
          mm: "%d мүнөт",
          h: "бир саат",
          hh: "%d саат",
          d: "бир күн",
          dd: "%d күн",
          M: "бир ай",
          MM: "%d ай",
          y: "бир жыл",
          yy: "%d жыл"
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(ky$1);

var ky = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var lb$1 = {exports: {}};

(function (module, exports) {
  !function (e, _) {
    module.exports = _(require$$0) ;
  }(commonjsGlobal, function (e) {

    function _(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = _(e),
      n = {
        name: "lb",
        weekdays: "Sonndeg_Méindeg_Dënschdeg_Mëttwoch_Donneschdeg_Freideg_Samschdeg".split("_"),
        months: "Januar_Februar_Mäerz_Abrëll_Mee_Juni_Juli_August_September_Oktober_November_Dezember".split("_"),
        weekStart: 1,
        weekdaysShort: "So._Mé._Dë._Më._Do._Fr._Sa.".split("_"),
        monthsShort: "Jan._Febr._Mrz._Abr._Mee_Jun._Jul._Aug._Sept._Okt._Nov._Dez.".split("_"),
        weekdaysMin: "So_Mé_Dë_Më_Do_Fr_Sa".split("_"),
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "H:mm [Auer]",
          LTS: "H:mm:ss [Auer]",
          L: "DD.MM.YYYY",
          LL: "D. MMMM YYYY",
          LLL: "D. MMMM YYYY H:mm [Auer]",
          LLLL: "dddd, D. MMMM YYYY H:mm [Auer]"
        }
      };
    return t.default.locale(n, null, !0), n;
  });
})(lb$1);

var lb = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var lo$1 = {exports: {}};

(function (module, exports) {
  !function (_, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (_) {

    function e(_) {
      return _ && "object" == typeof _ && "default" in _ ? _ : {
        default: _
      };
    }
    var t = e(_),
      d = {
        name: "lo",
        weekdays: "ອາທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ".split("_"),
        months: "ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ".split("_"),
        weekdaysShort: "ທິດ_ຈັນ_ອັງຄານ_ພຸດ_ພະຫັດ_ສຸກ_ເສົາ".split("_"),
        monthsShort: "ມັງກອນ_ກຸມພາ_ມີນາ_ເມສາ_ພຶດສະພາ_ມິຖຸນາ_ກໍລະກົດ_ສິງຫາ_ກັນຍາ_ຕຸລາ_ພະຈິກ_ທັນວາ".split("_"),
        weekdaysMin: "ທ_ຈ_ອຄ_ພ_ພຫ_ສກ_ສ".split("_"),
        ordinal: function (_) {
          return _;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "ວັນdddd D MMMM YYYY HH:mm"
        },
        relativeTime: {
          future: "ອີກ %s",
          past: "%sຜ່ານມາ",
          s: "ບໍ່ເທົ່າໃດວິນາທີ",
          m: "1 ນາທີ",
          mm: "%d ນາທີ",
          h: "1 ຊົ່ວໂມງ",
          hh: "%d ຊົ່ວໂມງ",
          d: "1 ມື້",
          dd: "%d ມື້",
          M: "1 ເດືອນ",
          MM: "%d ເດືອນ",
          y: "1 ປີ",
          yy: "%d ປີ"
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(lo$1);

var lo = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var lt$1 = {exports: {}};

(function (module, exports) {
  !function (e, s) {
    module.exports = s(require$$0) ;
  }(commonjsGlobal, function (e) {

    function s(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var i = s(e),
      d = "sausio_vasario_kovo_balandžio_gegužės_birželio_liepos_rugpjūčio_rugsėjo_spalio_lapkričio_gruodžio".split("_"),
      a = "sausis_vasaris_kovas_balandis_gegužė_birželis_liepa_rugpjūtis_rugsėjis_spalis_lapkritis_gruodis".split("_"),
      l = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?|MMMM?(\[[^\[\]]*\]|\s)+D[oD]?/,
      M = function (e, s) {
        return l.test(s) ? d[e.month()] : a[e.month()];
      };
    M.s = a, M.f = d;
    var t = {
      name: "lt",
      weekdays: "sekmadienis_pirmadienis_antradienis_trečiadienis_ketvirtadienis_penktadienis_šeštadienis".split("_"),
      weekdaysShort: "sek_pir_ant_tre_ket_pen_šeš".split("_"),
      weekdaysMin: "s_p_a_t_k_pn_š".split("_"),
      months: M,
      monthsShort: "sau_vas_kov_bal_geg_bir_lie_rgp_rgs_spa_lap_grd".split("_"),
      ordinal: function (e) {
        return e + ".";
      },
      weekStart: 1,
      relativeTime: {
        future: "už %s",
        past: "prieš %s",
        s: "kelias sekundes",
        m: "minutę",
        mm: "%d minutes",
        h: "valandą",
        hh: "%d valandas",
        d: "dieną",
        dd: "%d dienas",
        M: "mėnesį",
        MM: "%d mėnesius",
        y: "metus",
        yy: "%d metus"
      },
      format: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "YYYY-MM-DD",
        LL: "YYYY [m.] MMMM D [d.]",
        LLL: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
        LLLL: "YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]",
        l: "YYYY-MM-DD",
        ll: "YYYY [m.] MMMM D [d.]",
        lll: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
        llll: "YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]"
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "YYYY-MM-DD",
        LL: "YYYY [m.] MMMM D [d.]",
        LLL: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
        LLLL: "YYYY [m.] MMMM D [d.], dddd, HH:mm [val.]",
        l: "YYYY-MM-DD",
        ll: "YYYY [m.] MMMM D [d.]",
        lll: "YYYY [m.] MMMM D [d.], HH:mm [val.]",
        llll: "YYYY [m.] MMMM D [d.], ddd, HH:mm [val.]"
      }
    };
    return i.default.locale(t, null, !0), t;
  });
})(lt$1);

var lt = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var lv$1 = {exports: {}};

(function (module, exports) {
  !function (e, s) {
    module.exports = s(require$$0) ;
  }(commonjsGlobal, function (e) {

    function s(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = s(e),
      d = {
        name: "lv",
        weekdays: "svētdiena_pirmdiena_otrdiena_trešdiena_ceturtdiena_piektdiena_sestdiena".split("_"),
        months: "janvāris_februāris_marts_aprīlis_maijs_jūnijs_jūlijs_augusts_septembris_oktobris_novembris_decembris".split("_"),
        weekStart: 1,
        weekdaysShort: "Sv_P_O_T_C_Pk_S".split("_"),
        monthsShort: "jan_feb_mar_apr_mai_jūn_jūl_aug_sep_okt_nov_dec".split("_"),
        weekdaysMin: "Sv_P_O_T_C_Pk_S".split("_"),
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD.MM.YYYY.",
          LL: "YYYY. [gada] D. MMMM",
          LLL: "YYYY. [gada] D. MMMM, HH:mm",
          LLLL: "YYYY. [gada] D. MMMM, dddd, HH:mm"
        },
        relativeTime: {
          future: "pēc %s",
          past: "pirms %s",
          s: "dažām sekundēm",
          m: "minūtes",
          mm: "%d minūtēm",
          h: "stundas",
          hh: "%d stundām",
          d: "dienas",
          dd: "%d dienām",
          M: "mēneša",
          MM: "%d mēnešiem",
          y: "gada",
          yy: "%d gadiem"
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(lv$1);

var lv = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var me$1 = {exports: {}};

(function (module, exports) {
  !function (e, t) {
    module.exports = t(require$$0) ;
  }(commonjsGlobal, function (e) {

    function t(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var _ = t(e),
      a = {
        name: "me",
        weekdays: "nedjelja_ponedjeljak_utorak_srijeda_četvrtak_petak_subota".split("_"),
        months: "januar_februar_mart_april_maj_jun_jul_avgust_septembar_oktobar_novembar_decembar".split("_"),
        weekStart: 1,
        weekdaysShort: "ned._pon._uto._sri._čet._pet._sub.".split("_"),
        monthsShort: "jan._feb._mar._apr._maj_jun_jul_avg._sep._okt._nov._dec.".split("_"),
        weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"),
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "H:mm",
          LTS: "H:mm:ss",
          L: "DD.MM.YYYY",
          LL: "D. MMMM YYYY",
          LLL: "D. MMMM YYYY H:mm",
          LLLL: "dddd, D. MMMM YYYY H:mm"
        }
      };
    return _.default.locale(a, null, !0), a;
  });
})(me$1);

var me = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var mi$1 = {exports: {}};

(function (module, exports) {
  !function (e, a) {
    module.exports = a(require$$0) ;
  }(commonjsGlobal, function (e) {

    function a(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var i = a(e),
      t = {
        name: "mi",
        weekdays: "Rātapu_Mane_Tūrei_Wenerei_Tāite_Paraire_Hātarei".split("_"),
        months: "Kohi-tāte_Hui-tanguru_Poutū-te-rangi_Paenga-whāwhā_Haratua_Pipiri_Hōngoingoi_Here-turi-kōkā_Mahuru_Whiringa-ā-nuku_Whiringa-ā-rangi_Hakihea".split("_"),
        weekStart: 1,
        weekdaysShort: "Ta_Ma_Tū_We_Tāi_Pa_Hā".split("_"),
        monthsShort: "Kohi_Hui_Pou_Pae_Hara_Pipi_Hōngoi_Here_Mahu_Whi-nu_Whi-ra_Haki".split("_"),
        weekdaysMin: "Ta_Ma_Tū_We_Tāi_Pa_Hā".split("_"),
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY [i] HH:mm",
          LLLL: "dddd, D MMMM YYYY [i] HH:mm"
        },
        relativeTime: {
          future: "i roto i %s",
          past: "%s i mua",
          s: "te hēkona ruarua",
          m: "he meneti",
          mm: "%d meneti",
          h: "te haora",
          hh: "%d haora",
          d: "he ra",
          dd: "%d ra",
          M: "he marama",
          MM: "%d marama",
          y: "he tau",
          yy: "%d tau"
        }
      };
    return i.default.locale(t, null, !0), t;
  });
})(mi$1);

var mi = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var mk$1 = {exports: {}};

(function (module, exports) {
  !function (e, _) {
    module.exports = _(require$$0) ;
  }(commonjsGlobal, function (e) {

    function _(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = _(e),
      d = {
        name: "mk",
        weekdays: "недела_понеделник_вторник_среда_четврток_петок_сабота".split("_"),
        months: "јануари_февруари_март_април_мај_јуни_јули_август_септември_октомври_ноември_декември".split("_"),
        weekStart: 1,
        weekdaysShort: "нед_пон_вто_сре_чет_пет_саб".split("_"),
        monthsShort: "јан_фев_мар_апр_мај_јун_јул_авг_сеп_окт_ное_дек".split("_"),
        weekdaysMin: "нe_пo_вт_ср_че_пе_сa".split("_"),
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "H:mm",
          LTS: "H:mm:ss",
          L: "D.MM.YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY H:mm",
          LLLL: "dddd, D MMMM YYYY H:mm"
        },
        relativeTime: {
          future: "после %s",
          past: "пред %s",
          s: "неколку секунди",
          m: "минута",
          mm: "%d минути",
          h: "час",
          hh: "%d часа",
          d: "ден",
          dd: "%d дена",
          M: "месец",
          MM: "%d месеци",
          y: "година",
          yy: "%d години"
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(mk$1);

var mk = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var ml$1 = {exports: {}};

(function (module, exports) {
  !function (_, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (_) {

    function e(_) {
      return _ && "object" == typeof _ && "default" in _ ? _ : {
        default: _
      };
    }
    var t = e(_),
      d = {
        name: "ml",
        weekdays: "ഞായറാഴ്ച_തിങ്കളാഴ്ച_ചൊവ്വാഴ്ച_ബുധനാഴ്ച_വ്യാഴാഴ്ച_വെള്ളിയാഴ്ച_ശനിയാഴ്ച".split("_"),
        months: "ജനുവരി_ഫെബ്രുവരി_മാർച്ച്_ഏപ്രിൽ_മേയ്_ജൂൺ_ജൂലൈ_ഓഗസ്റ്റ്_സെപ്റ്റംബർ_ഒക്ടോബർ_നവംബർ_ഡിസംബർ".split("_"),
        weekdaysShort: "ഞായർ_തിങ്കൾ_ചൊവ്വ_ബുധൻ_വ്യാഴം_വെള്ളി_ശനി".split("_"),
        monthsShort: "ജനു._ഫെബ്രു._മാർ._ഏപ്രി._മേയ്_ജൂൺ_ജൂലൈ._ഓഗ._സെപ്റ്റ._ഒക്ടോ._നവം._ഡിസം.".split("_"),
        weekdaysMin: "ഞാ_തി_ചൊ_ബു_വ്യാ_വെ_ശ".split("_"),
        ordinal: function (_) {
          return _;
        },
        formats: {
          LT: "A h:mm -നു",
          LTS: "A h:mm:ss -നു",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY, A h:mm -നു",
          LLLL: "dddd, D MMMM YYYY, A h:mm -നു"
        },
        relativeTime: {
          future: "%s കഴിഞ്ഞ്",
          past: "%s മുൻപ്",
          s: "അൽപ നിമിഷങ്ങൾ",
          m: "ഒരു മിനിറ്റ്",
          mm: "%d മിനിറ്റ്",
          h: "ഒരു മണിക്കൂർ",
          hh: "%d മണിക്കൂർ",
          d: "ഒരു ദിവസം",
          dd: "%d ദിവസം",
          M: "ഒരു മാസം",
          MM: "%d മാസം",
          y: "ഒരു വർഷം",
          yy: "%d വർഷം"
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(ml$1);

var ml = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var mn$1 = {exports: {}};

(function (module, exports) {
  !function (_, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (_) {

    function e(_) {
      return _ && "object" == typeof _ && "default" in _ ? _ : {
        default: _
      };
    }
    var t = e(_),
      d = {
        name: "mn",
        weekdays: "Ням_Даваа_Мягмар_Лхагва_Пүрэв_Баасан_Бямба".split("_"),
        months: "Нэгдүгээр сар_Хоёрдугаар сар_Гуравдугаар сар_Дөрөвдүгээр сар_Тавдугаар сар_Зургадугаар сар_Долдугаар сар_Наймдугаар сар_Есдүгээр сар_Аравдугаар сар_Арван нэгдүгээр сар_Арван хоёрдугаар сар".split("_"),
        weekdaysShort: "Ням_Дав_Мяг_Лха_Пүр_Баа_Бям".split("_"),
        monthsShort: "1 сар_2 сар_3 сар_4 сар_5 сар_6 сар_7 сар_8 сар_9 сар_10 сар_11 сар_12 сар".split("_"),
        weekdaysMin: "Ня_Да_Мя_Лх_Пү_Ба_Бя".split("_"),
        ordinal: function (_) {
          return _;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "YYYY-MM-DD",
          LL: "YYYY оны MMMMын D",
          LLL: "YYYY оны MMMMын D HH:mm",
          LLLL: "dddd, YYYY оны MMMMын D HH:mm"
        },
        relativeTime: {
          future: "%s",
          past: "%s",
          s: "саяхан",
          m: "м",
          mm: "%dм",
          h: "1ц",
          hh: "%dц",
          d: "1ө",
          dd: "%dө",
          M: "1с",
          MM: "%dс",
          y: "1ж",
          yy: "%dж"
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(mn$1);

var mn = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var msMy$1 = {exports: {}};

(function (module, exports) {
  !function (e, a) {
    module.exports = a(require$$0) ;
  }(commonjsGlobal, function (e) {

    function a(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = a(e),
      _ = {
        name: "ms-my",
        weekdays: "Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),
        months: "Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),
        weekStart: 1,
        weekdaysShort: "Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),
        monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),
        weekdaysMin: "Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "HH.mm",
          LTS: "HH.mm.ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY [pukul] HH.mm",
          LLLL: "dddd, D MMMM YYYY [pukul] HH.mm"
        },
        relativeTime: {
          future: "dalam %s",
          past: "%s yang lepas",
          s: "beberapa saat",
          m: "seminit",
          mm: "%d minit",
          h: "sejam",
          hh: "%d jam",
          d: "sehari",
          dd: "%d hari",
          M: "sebulan",
          MM: "%d bulan",
          y: "setahun",
          yy: "%d tahun"
        }
      };
    return t.default.locale(_, null, !0), _;
  });
})(msMy$1);

var msMy = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var ms$1 = {exports: {}};

(function (module, exports) {
  !function (e, a) {
    module.exports = a(require$$0) ;
  }(commonjsGlobal, function (e) {

    function a(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = a(e),
      s = {
        name: "ms",
        weekdays: "Ahad_Isnin_Selasa_Rabu_Khamis_Jumaat_Sabtu".split("_"),
        weekdaysShort: "Ahd_Isn_Sel_Rab_Kha_Jum_Sab".split("_"),
        weekdaysMin: "Ah_Is_Sl_Rb_Km_Jm_Sb".split("_"),
        months: "Januari_Februari_Mac_April_Mei_Jun_Julai_Ogos_September_Oktober_November_Disember".split("_"),
        monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ogs_Sep_Okt_Nov_Dis".split("_"),
        weekStart: 1,
        formats: {
          LT: "HH.mm",
          LTS: "HH.mm.ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH.mm",
          LLLL: "dddd, D MMMM YYYY HH.mm"
        },
        relativeTime: {
          future: "dalam %s",
          past: "%s yang lepas",
          s: "beberapa saat",
          m: "seminit",
          mm: "%d minit",
          h: "sejam",
          hh: "%d jam",
          d: "sehari",
          dd: "%d hari",
          M: "sebulan",
          MM: "%d bulan",
          y: "setahun",
          yy: "%d tahun"
        },
        ordinal: function (e) {
          return e + ".";
        }
      };
    return t.default.locale(s, null, !0), s;
  });
})(ms$1);

var ms = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var mt$1 = {exports: {}};

(function (module, exports) {
  !function (e, t) {
    module.exports = t(require$$0) ;
  }(commonjsGlobal, function (e) {

    function t(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var a = t(e),
      i = {
        name: "mt",
        weekdays: "Il-Ħadd_It-Tnejn_It-Tlieta_L-Erbgħa_Il-Ħamis_Il-Ġimgħa_Is-Sibt".split("_"),
        months: "Jannar_Frar_Marzu_April_Mejju_Ġunju_Lulju_Awwissu_Settembru_Ottubru_Novembru_Diċembru".split("_"),
        weekStart: 1,
        weekdaysShort: "Ħad_Tne_Tli_Erb_Ħam_Ġim_Sib".split("_"),
        monthsShort: "Jan_Fra_Mar_Apr_Mej_Ġun_Lul_Aww_Set_Ott_Nov_Diċ".split("_"),
        weekdaysMin: "Ħa_Tn_Tl_Er_Ħa_Ġi_Si".split("_"),
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        relativeTime: {
          future: "f’ %s",
          past: "%s ilu",
          s: "ftit sekondi",
          m: "minuta",
          mm: "%d minuti",
          h: "siegħa",
          hh: "%d siegħat",
          d: "ġurnata",
          dd: "%d ġranet",
          M: "xahar",
          MM: "%d xhur",
          y: "sena",
          yy: "%d sni"
        }
      };
    return a.default.locale(i, null, !0), i;
  });
})(mt$1);

var mt = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var my$1 = {exports: {}};

(function (module, exports) {
  !function (_, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (_) {

    function e(_) {
      return _ && "object" == typeof _ && "default" in _ ? _ : {
        default: _
      };
    }
    var t = e(_),
      d = {
        name: "my",
        weekdays: "တနင်္ဂနွေ_တနင်္လာ_အင်္ဂါ_ဗုဒ္ဓဟူး_ကြာသပတေး_သောကြာ_စနေ".split("_"),
        months: "ဇန်နဝါရီ_ဖေဖော်ဝါရီ_မတ်_ဧပြီ_မေ_ဇွန်_ဇူလိုင်_သြဂုတ်_စက်တင်ဘာ_အောက်တိုဘာ_နိုဝင်ဘာ_ဒီဇင်ဘာ".split("_"),
        weekStart: 1,
        weekdaysShort: "နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ".split("_"),
        monthsShort: "ဇန်_ဖေ_မတ်_ပြီ_မေ_ဇွန်_လိုင်_သြ_စက်_အောက်_နို_ဒီ".split("_"),
        weekdaysMin: "နွေ_လာ_ဂါ_ဟူး_ကြာ_သော_နေ".split("_"),
        ordinal: function (_) {
          return _;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd D MMMM YYYY HH:mm"
        },
        relativeTime: {
          future: "လာမည့် %s မှာ",
          past: "လွန်ခဲ့သော %s က",
          s: "စက္ကန်.အနည်းငယ်",
          m: "တစ်မိနစ်",
          mm: "%d မိနစ်",
          h: "တစ်နာရီ",
          hh: "%d နာရီ",
          d: "တစ်ရက်",
          dd: "%d ရက်",
          M: "တစ်လ",
          MM: "%d လ",
          y: "တစ်နှစ်",
          yy: "%d နှစ်"
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(my$1);

var my = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var nb$1 = {exports: {}};

(function (module, exports) {
  !function (e, t) {
    module.exports = t(require$$0) ;
  }(commonjsGlobal, function (e) {

    function t(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var n = t(e),
      a = {
        name: "nb",
        weekdays: "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),
        weekdaysShort: "sø._ma._ti._on._to._fr._lø.".split("_"),
        weekdaysMin: "sø_ma_ti_on_to_fr_lø".split("_"),
        months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),
        monthsShort: "jan._feb._mars_april_mai_juni_juli_aug._sep._okt._nov._des.".split("_"),
        ordinal: function (e) {
          return e + ".";
        },
        weekStart: 1,
        yearStart: 4,
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD.MM.YYYY",
          LL: "D. MMMM YYYY",
          LLL: "D. MMMM YYYY [kl.] HH:mm",
          LLLL: "dddd D. MMMM YYYY [kl.] HH:mm"
        },
        relativeTime: {
          future: "om %s",
          past: "%s siden",
          s: "noen sekunder",
          m: "ett minutt",
          mm: "%d minutter",
          h: "en time",
          hh: "%d timer",
          d: "en dag",
          dd: "%d dager",
          M: "en måned",
          MM: "%d måneder",
          y: "ett år",
          yy: "%d år"
        }
      };
    return n.default.locale(a, null, !0), a;
  });
})(nb$1);

var nb = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var ne$1 = {exports: {}};

(function (module, exports) {
  !function (e, _) {
    module.exports = _(require$$0) ;
  }(commonjsGlobal, function (e) {

    function _(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = _(e),
      d = {
        name: "ne",
        weekdays: "आइतबार_सोमबार_मङ्गलबार_बुधबार_बिहिबार_शुक्रबार_शनिबार".split("_"),
        weekdaysShort: "आइत._सोम._मङ्गल._बुध._बिहि._शुक्र._शनि.".split("_"),
        weekdaysMin: "आ._सो._मं._बु._बि._शु._श.".split("_"),
        months: "जनवरी_फेब्रुवरी_मार्च_अप्रिल_मे_जुन_जुलाई_अगष्ट_सेप्टेम्बर_अक्टोबर_नोभेम्बर_डिसेम्बर".split("_"),
        monthsShort: "जन._फेब्रु._मार्च_अप्रि._मई_जुन_जुलाई._अग._सेप्ट._अक्टो._नोभे._डिसे.".split("_"),
        relativeTime: {
          future: "%s पछि",
          past: "%s अघि",
          s: "सेकेन्ड",
          m: "एक मिनेट",
          mm: "%d मिनेट",
          h: "घन्टा",
          hh: "%d घन्टा",
          d: "एक दिन",
          dd: "%d दिन",
          M: "एक महिना",
          MM: "%d महिना",
          y: "एक वर्ष",
          yy: "%d वर्ष"
        },
        ordinal: function (e) {
          return ("" + e).replace(/\d/g, function (e) {
            return "०१२३४५६७८९"[e];
          });
        },
        formats: {
          LT: "Aको h:mm बजे",
          LTS: "Aको h:mm:ss बजे",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY, Aको h:mm बजे",
          LLLL: "dddd, D MMMM YYYY, Aको h:mm बजे"
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(ne$1);

var ne = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var nlBe$1 = {exports: {}};

(function (module, exports) {
  !function (e, a) {
    module.exports = a(require$$0) ;
  }(commonjsGlobal, function (e) {

    function a(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var n = a(e),
      d = {
        name: "nl-be",
        weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
        months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),
        monthsShort: "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"),
        weekStart: 1,
        weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"),
        weekdaysMin: "zo_ma_di_wo_do_vr_za".split("_"),
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd D MMMM YYYY HH:mm"
        },
        relativeTime: {
          future: "over %s",
          past: "%s geleden",
          s: "een paar seconden",
          m: "één minuut",
          mm: "%d minuten",
          h: "één uur",
          hh: "%d uur",
          d: "één dag",
          dd: "%d dagen",
          M: "één maand",
          MM: "%d maanden",
          y: "één jaar",
          yy: "%d jaar"
        }
      };
    return n.default.locale(d, null, !0), d;
  });
})(nlBe$1);

var nlBe = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var nl$1 = {exports: {}};

(function (module, exports) {
  !function (e, a) {
    module.exports = a(require$$0) ;
  }(commonjsGlobal, function (e) {

    function a(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var d = a(e),
      n = {
        name: "nl",
        weekdays: "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
        weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"),
        weekdaysMin: "zo_ma_di_wo_do_vr_za".split("_"),
        months: "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_"),
        monthsShort: "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),
        ordinal: function (e) {
          return "[" + e + (1 === e || 8 === e || e >= 20 ? "ste" : "de") + "]";
        },
        weekStart: 1,
        yearStart: 4,
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD-MM-YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd D MMMM YYYY HH:mm"
        },
        relativeTime: {
          future: "over %s",
          past: "%s geleden",
          s: "een paar seconden",
          m: "een minuut",
          mm: "%d minuten",
          h: "een uur",
          hh: "%d uur",
          d: "een dag",
          dd: "%d dagen",
          M: "een maand",
          MM: "%d maanden",
          y: "een jaar",
          yy: "%d jaar"
        }
      };
    return d.default.locale(n, null, !0), n;
  });
})(nl$1);

var nl = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var nn$1 = {exports: {}};

(function (module, exports) {
  !function (e, t) {
    module.exports = t(require$$0) ;
  }(commonjsGlobal, function (e) {

    function t(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var n = t(e),
      a = {
        name: "nn",
        weekdays: "sundag_måndag_tysdag_onsdag_torsdag_fredag_laurdag".split("_"),
        weekdaysShort: "sun_mån_tys_ons_tor_fre_lau".split("_"),
        weekdaysMin: "su_må_ty_on_to_fr_la".split("_"),
        months: "januar_februar_mars_april_mai_juni_juli_august_september_oktober_november_desember".split("_"),
        monthsShort: "jan_feb_mar_apr_mai_jun_jul_aug_sep_okt_nov_des".split("_"),
        ordinal: function (e) {
          return e + ".";
        },
        weekStart: 1,
        relativeTime: {
          future: "om %s",
          past: "for %s sidan",
          s: "nokre sekund",
          m: "eitt minutt",
          mm: "%d minutt",
          h: "ein time",
          hh: "%d timar",
          d: "ein dag",
          dd: "%d dagar",
          M: "ein månad",
          MM: "%d månadar",
          y: "eitt år",
          yy: "%d år"
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD.MM.YYYY",
          LL: "D. MMMM YYYY",
          LLL: "D. MMMM YYYY [kl.] H:mm",
          LLLL: "dddd D. MMMM YYYY [kl.] HH:mm"
        }
      };
    return n.default.locale(a, null, !0), a;
  });
})(nn$1);

var nn = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var ocLnc$1 = {exports: {}};

(function (module, exports) {
  !function (e, d) {
    module.exports = d(require$$0) ;
  }(commonjsGlobal, function (e) {

    function d(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var n = d(e),
      s = {
        name: "oc-lnc",
        weekdays: "dimenge_diluns_dimars_dimècres_dijòus_divendres_dissabte".split("_"),
        weekdaysShort: "Dg_Dl_Dm_Dc_Dj_Dv_Ds".split("_"),
        weekdaysMin: "dg_dl_dm_dc_dj_dv_ds".split("_"),
        months: "genièr_febrièr_març_abrial_mai_junh_julhet_agost_setembre_octòbre_novembre_decembre".split("_"),
        monthsShort: "gen_feb_març_abr_mai_junh_julh_ago_set_oct_nov_dec".split("_"),
        weekStart: 1,
        formats: {
          LT: "H:mm",
          LTS: "H:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM [de] YYYY",
          LLL: "D MMMM [de] YYYY [a] H:mm",
          LLLL: "dddd D MMMM [de] YYYY [a] H:mm"
        },
        relativeTime: {
          future: "d'aquí %s",
          past: "fa %s",
          s: "unas segondas",
          m: "una minuta",
          mm: "%d minutas",
          h: "una ora",
          hh: "%d oras",
          d: "un jorn",
          dd: "%d jorns",
          M: "un mes",
          MM: "%d meses",
          y: "un an",
          yy: "%d ans"
        },
        ordinal: function (e) {
          return e + "º";
        }
      };
    return n.default.locale(s, null, !0), s;
  });
})(ocLnc$1);

var ocLnc = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var paIn$1 = {exports: {}};

(function (module, exports) {
  !function (_, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (_) {

    function e(_) {
      return _ && "object" == typeof _ && "default" in _ ? _ : {
        default: _
      };
    }
    var t = e(_),
      d = {
        name: "pa-in",
        weekdays: "ਐਤਵਾਰ_ਸੋਮਵਾਰ_ਮੰਗਲਵਾਰ_ਬੁਧਵਾਰ_ਵੀਰਵਾਰ_ਸ਼ੁੱਕਰਵਾਰ_ਸ਼ਨੀਚਰਵਾਰ".split("_"),
        months: "ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ".split("_"),
        weekdaysShort: "ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ".split("_"),
        monthsShort: "ਜਨਵਰੀ_ਫ਼ਰਵਰੀ_ਮਾਰਚ_ਅਪ੍ਰੈਲ_ਮਈ_ਜੂਨ_ਜੁਲਾਈ_ਅਗਸਤ_ਸਤੰਬਰ_ਅਕਤੂਬਰ_ਨਵੰਬਰ_ਦਸੰਬਰ".split("_"),
        weekdaysMin: "ਐਤ_ਸੋਮ_ਮੰਗਲ_ਬੁਧ_ਵੀਰ_ਸ਼ੁਕਰ_ਸ਼ਨੀ".split("_"),
        ordinal: function (_) {
          return _;
        },
        formats: {
          LT: "A h:mm ਵਜੇ",
          LTS: "A h:mm:ss ਵਜੇ",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY, A h:mm ਵਜੇ",
          LLLL: "dddd, D MMMM YYYY, A h:mm ਵਜੇ"
        },
        relativeTime: {
          future: "%s ਵਿੱਚ",
          past: "%s ਪਿਛਲੇ",
          s: "ਕੁਝ ਸਕਿੰਟ",
          m: "ਇਕ ਮਿੰਟ",
          mm: "%d ਮਿੰਟ",
          h: "ਇੱਕ ਘੰਟਾ",
          hh: "%d ਘੰਟੇ",
          d: "ਇੱਕ ਦਿਨ",
          dd: "%d ਦਿਨ",
          M: "ਇੱਕ ਮਹੀਨਾ",
          MM: "%d ਮਹੀਨੇ",
          y: "ਇੱਕ ਸਾਲ",
          yy: "%d ਸਾਲ"
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(paIn$1);

var paIn = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var pl$1 = {exports: {}};

(function (module, exports) {
  !function (e, t) {
    module.exports = t(require$$0) ;
  }(commonjsGlobal, function (e) {

    function t(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var i = t(e);
    function a(e) {
      return e % 10 < 5 && e % 10 > 1 && ~~(e / 10) % 10 != 1;
    }
    function n(e, t, i) {
      var n = e + " ";
      switch (i) {
        case "m":
          return t ? "minuta" : "minutę";
        case "mm":
          return n + (a(e) ? "minuty" : "minut");
        case "h":
          return t ? "godzina" : "godzinę";
        case "hh":
          return n + (a(e) ? "godziny" : "godzin");
        case "MM":
          return n + (a(e) ? "miesiące" : "miesięcy");
        case "yy":
          return n + (a(e) ? "lata" : "lat");
      }
    }
    var r = "stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split("_"),
      _ = "styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split("_"),
      s = /D MMMM/,
      d = function (e, t) {
        return s.test(t) ? r[e.month()] : _[e.month()];
      };
    d.s = _, d.f = r;
    var o = {
      name: "pl",
      weekdays: "niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"),
      weekdaysShort: "ndz_pon_wt_śr_czw_pt_sob".split("_"),
      weekdaysMin: "Nd_Pn_Wt_Śr_Cz_Pt_So".split("_"),
      months: d,
      monthsShort: "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),
      ordinal: function (e) {
        return e + ".";
      },
      weekStart: 1,
      yearStart: 4,
      relativeTime: {
        future: "za %s",
        past: "%s temu",
        s: "kilka sekund",
        m: n,
        mm: n,
        h: n,
        hh: n,
        d: "1 dzień",
        dd: "%d dni",
        M: "miesiąc",
        MM: n,
        y: "rok",
        yy: n
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY HH:mm",
        LLLL: "dddd, D MMMM YYYY HH:mm"
      }
    };
    return i.default.locale(o, null, !0), o;
  });
})(pl$1);

var pl = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var ptBr$1 = {exports: {}};

(function (module, exports) {
  !function (e, o) {
    module.exports = o(require$$0) ;
  }(commonjsGlobal, function (e) {

    function o(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var a = o(e),
      s = {
        name: "pt-br",
        weekdays: "domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado".split("_"),
        weekdaysShort: "dom_seg_ter_qua_qui_sex_sáb".split("_"),
        weekdaysMin: "Do_2ª_3ª_4ª_5ª_6ª_Sá".split("_"),
        months: "janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split("_"),
        monthsShort: "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),
        ordinal: function (e) {
          return e + "º";
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D [de] MMMM [de] YYYY",
          LLL: "D [de] MMMM [de] YYYY [às] HH:mm",
          LLLL: "dddd, D [de] MMMM [de] YYYY [às] HH:mm"
        },
        relativeTime: {
          future: "em %s",
          past: "há %s",
          s: "poucos segundos",
          m: "um minuto",
          mm: "%d minutos",
          h: "uma hora",
          hh: "%d horas",
          d: "um dia",
          dd: "%d dias",
          M: "um mês",
          MM: "%d meses",
          y: "um ano",
          yy: "%d anos"
        }
      };
    return a.default.locale(s, null, !0), s;
  });
})(ptBr$1);

var ptBr = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var pt$1 = {exports: {}};

(function (module, exports) {
  !function (e, a) {
    module.exports = a(require$$0) ;
  }(commonjsGlobal, function (e) {

    function a(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var o = a(e),
      t = {
        name: "pt",
        weekdays: "domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado".split("_"),
        weekdaysShort: "dom_seg_ter_qua_qui_sex_sab".split("_"),
        weekdaysMin: "Do_2ª_3ª_4ª_5ª_6ª_Sa".split("_"),
        months: "janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split("_"),
        monthsShort: "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),
        ordinal: function (e) {
          return e + "º";
        },
        weekStart: 1,
        yearStart: 4,
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D [de] MMMM [de] YYYY",
          LLL: "D [de] MMMM [de] YYYY [às] HH:mm",
          LLLL: "dddd, D [de] MMMM [de] YYYY [às] HH:mm"
        },
        relativeTime: {
          future: "em %s",
          past: "há %s",
          s: "alguns segundos",
          m: "um minuto",
          mm: "%d minutos",
          h: "uma hora",
          hh: "%d horas",
          d: "um dia",
          dd: "%d dias",
          M: "um mês",
          MM: "%d meses",
          y: "um ano",
          yy: "%d anos"
        }
      };
    return o.default.locale(t, null, !0), t;
  });
})(pt$1);

var pt = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var rn$1 = {exports: {}};

(function (module, exports) {
  !function (a, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (a) {

    function e(a) {
      return a && "object" == typeof a && "default" in a ? a : {
        default: a
      };
    }
    var t = e(a),
      u = {
        name: "rn",
        weekdays: "Ku wa Mungu_Ku wa Mbere_Ku wa Kabiri_Ku wa Gatatu_Ku wa Kane_Ku wa Gatanu_Ku wa Gatandatu".split("_"),
        weekdaysShort: "Kngu_Kmbr_Kbri_Ktat_Kkan_Ktan_Kdat".split("_"),
        weekdaysMin: "K7_K1_K2_K3_K4_K5_K6".split("_"),
        months: "Nzero_Ruhuhuma_Ntwarante_Ndamukiza_Rusama_Ruhenshi_Mukakaro_Myandagaro_Nyakanga_Gitugutu_Munyonyo_Kigarama".split("_"),
        monthsShort: "Nzer_Ruhuh_Ntwar_Ndam_Rus_Ruhen_Muk_Myand_Nyak_Git_Muny_Kig".split("_"),
        weekStart: 1,
        ordinal: function (a) {
          return a;
        },
        relativeTime: {
          future: "mu %s",
          past: "%s",
          s: "amasegonda",
          m: "Umunota",
          mm: "%d iminota",
          h: "isaha",
          hh: "%d amasaha",
          d: "Umunsi",
          dd: "%d iminsi",
          M: "ukwezi",
          MM: "%d amezi",
          y: "umwaka",
          yy: "%d imyaka"
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd, D MMMM YYYY HH:mm"
        }
      };
    return t.default.locale(u, null, !0), u;
  });
})(rn$1);

var rn = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var ro$1 = {exports: {}};

(function (module, exports) {
  !function (e, i) {
    module.exports = i(require$$0) ;
  }(commonjsGlobal, function (e) {

    function i(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = i(e),
      _ = {
        name: "ro",
        weekdays: "Duminică_Luni_Marți_Miercuri_Joi_Vineri_Sâmbătă".split("_"),
        weekdaysShort: "Dum_Lun_Mar_Mie_Joi_Vin_Sâm".split("_"),
        weekdaysMin: "Du_Lu_Ma_Mi_Jo_Vi_Sâ".split("_"),
        months: "Ianuarie_Februarie_Martie_Aprilie_Mai_Iunie_Iulie_August_Septembrie_Octombrie_Noiembrie_Decembrie".split("_"),
        monthsShort: "Ian._Febr._Mart._Apr._Mai_Iun._Iul._Aug._Sept._Oct._Nov._Dec.".split("_"),
        weekStart: 1,
        formats: {
          LT: "H:mm",
          LTS: "H:mm:ss",
          L: "DD.MM.YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY H:mm",
          LLLL: "dddd, D MMMM YYYY H:mm"
        },
        relativeTime: {
          future: "peste %s",
          past: "acum %s",
          s: "câteva secunde",
          m: "un minut",
          mm: "%d minute",
          h: "o oră",
          hh: "%d ore",
          d: "o zi",
          dd: "%d zile",
          M: "o lună",
          MM: "%d luni",
          y: "un an",
          yy: "%d ani"
        },
        ordinal: function (e) {
          return e;
        }
      };
    return t.default.locale(_, null, !0), _;
  });
})(ro$1);

var ro = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var ru$1 = {exports: {}};

(function (module, exports) {
  !function (_, t) {
    module.exports = t(require$$0) ;
  }(commonjsGlobal, function (_) {

    function t(_) {
      return _ && "object" == typeof _ && "default" in _ ? _ : {
        default: _
      };
    }
    var e = t(_),
      n = "января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split("_"),
      s = "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),
      r = "янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.".split("_"),
      o = "янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.".split("_"),
      i = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/;
    function d(_, t, e) {
      var n, s;
      return "m" === e ? t ? "минута" : "минуту" : _ + " " + (n = +_, s = {
        mm: t ? "минута_минуты_минут" : "минуту_минуты_минут",
        hh: "час_часа_часов",
        dd: "день_дня_дней",
        MM: "месяц_месяца_месяцев",
        yy: "год_года_лет"
      }[e].split("_"), n % 10 == 1 && n % 100 != 11 ? s[0] : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? s[1] : s[2]);
    }
    var u = function (_, t) {
      return i.test(t) ? n[_.month()] : s[_.month()];
    };
    u.s = s, u.f = n;
    var a = function (_, t) {
      return i.test(t) ? r[_.month()] : o[_.month()];
    };
    a.s = o, a.f = r;
    var m = {
      name: "ru",
      weekdays: "воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split("_"),
      weekdaysShort: "вск_пнд_втр_срд_чтв_птн_сбт".split("_"),
      weekdaysMin: "вс_пн_вт_ср_чт_пт_сб".split("_"),
      months: u,
      monthsShort: a,
      weekStart: 1,
      yearStart: 4,
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY г.",
        LLL: "D MMMM YYYY г., H:mm",
        LLLL: "dddd, D MMMM YYYY г., H:mm"
      },
      relativeTime: {
        future: "через %s",
        past: "%s назад",
        s: "несколько секунд",
        m: d,
        mm: d,
        h: "час",
        hh: d,
        d: "день",
        dd: d,
        M: "месяц",
        MM: d,
        y: "год",
        yy: d
      },
      ordinal: function (_) {
        return _;
      },
      meridiem: function (_) {
        return _ < 4 ? "ночи" : _ < 12 ? "утра" : _ < 17 ? "дня" : "вечера";
      }
    };
    return e.default.locale(m, null, !0), m;
  });
})(ru$1);

var ru = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var rw$1 = {exports: {}};

(function (module, exports) {
  !function (a, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (a) {

    function e(a) {
      return a && "object" == typeof a && "default" in a ? a : {
        default: a
      };
    }
    var u = e(a),
      t = {
        name: "rw",
        weekdays: "Ku Cyumweru_Kuwa Mbere_Kuwa Kabiri_Kuwa Gatatu_Kuwa Kane_Kuwa Gatanu_Kuwa Gatandatu".split("_"),
        months: "Mutarama_Gashyantare_Werurwe_Mata_Gicurasi_Kamena_Nyakanga_Kanama_Nzeri_Ukwakira_Ugushyingo_Ukuboza".split("_"),
        relativeTime: {
          future: "mu %s",
          past: "%s",
          s: "amasegonda",
          m: "Umunota",
          mm: "%d iminota",
          h: "isaha",
          hh: "%d amasaha",
          d: "Umunsi",
          dd: "%d iminsi",
          M: "ukwezi",
          MM: "%d amezi",
          y: "umwaka",
          yy: "%d imyaka"
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        ordinal: function (a) {
          return a;
        }
      };
    return u.default.locale(t, null, !0), t;
  });
})(rw$1);

var rw = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var sd$1 = {exports: {}};

(function (module, exports) {
  !function (_, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (_) {

    function e(_) {
      return _ && "object" == typeof _ && "default" in _ ? _ : {
        default: _
      };
    }
    var t = e(_),
      d = {
        name: "sd",
        weekdays: "آچر_سومر_اڱارو_اربع_خميس_جمع_ڇنڇر".split("_"),
        months: "جنوري_فيبروري_مارچ_اپريل_مئي_جون_جولاءِ_آگسٽ_سيپٽمبر_آڪٽوبر_نومبر_ڊسمبر".split("_"),
        weekStart: 1,
        weekdaysShort: "آچر_سومر_اڱارو_اربع_خميس_جمع_ڇنڇر".split("_"),
        monthsShort: "جنوري_فيبروري_مارچ_اپريل_مئي_جون_جولاءِ_آگسٽ_سيپٽمبر_آڪٽوبر_نومبر_ڊسمبر".split("_"),
        weekdaysMin: "آچر_سومر_اڱارو_اربع_خميس_جمع_ڇنڇر".split("_"),
        ordinal: function (_) {
          return _;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd، D MMMM YYYY HH:mm"
        },
        relativeTime: {
          future: "%s پوء",
          past: "%s اڳ",
          s: "چند سيڪنڊ",
          m: "هڪ منٽ",
          mm: "%d منٽ",
          h: "هڪ ڪلاڪ",
          hh: "%d ڪلاڪ",
          d: "هڪ ڏينهن",
          dd: "%d ڏينهن",
          M: "هڪ مهينو",
          MM: "%d مهينا",
          y: "هڪ سال",
          yy: "%d سال"
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(sd$1);

var sd = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var se$1 = {exports: {}};

(function (module, exports) {
  !function (e, a) {
    module.exports = a(require$$0) ;
  }(commonjsGlobal, function (e) {

    function a(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var n = a(e),
      t = {
        name: "se",
        weekdays: "sotnabeaivi_vuossárga_maŋŋebárga_gaskavahkku_duorastat_bearjadat_lávvardat".split("_"),
        months: "ođđajagemánnu_guovvamánnu_njukčamánnu_cuoŋománnu_miessemánnu_geassemánnu_suoidnemánnu_borgemánnu_čakčamánnu_golggotmánnu_skábmamánnu_juovlamánnu".split("_"),
        weekStart: 1,
        weekdaysShort: "sotn_vuos_maŋ_gask_duor_bear_láv".split("_"),
        monthsShort: "ođđj_guov_njuk_cuo_mies_geas_suoi_borg_čakč_golg_skáb_juov".split("_"),
        weekdaysMin: "s_v_m_g_d_b_L".split("_"),
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD.MM.YYYY",
          LL: "MMMM D. [b.] YYYY",
          LLL: "MMMM D. [b.] YYYY [ti.] HH:mm",
          LLLL: "dddd, MMMM D. [b.] YYYY [ti.] HH:mm"
        },
        relativeTime: {
          future: "%s geažes",
          past: "maŋit %s",
          s: "moadde sekunddat",
          m: "okta minuhta",
          mm: "%d minuhtat",
          h: "okta diimmu",
          hh: "%d diimmut",
          d: "okta beaivi",
          dd: "%d beaivvit",
          M: "okta mánnu",
          MM: "%d mánut",
          y: "okta jahki",
          yy: "%d jagit"
        }
      };
    return n.default.locale(t, null, !0), t;
  });
})(se$1);

var se = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var si$1 = {exports: {}};

(function (module, exports) {
  !function (_, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (_) {

    function e(_) {
      return _ && "object" == typeof _ && "default" in _ ? _ : {
        default: _
      };
    }
    var t = e(_),
      d = {
        name: "si",
        weekdays: "ඉරිදා_සඳුදා_අඟහරුවාදා_බදාදා_බ්‍රහස්පතින්දා_සිකුරාදා_සෙනසුරාදා".split("_"),
        months: "දුරුතු_නවම්_මැදින්_බක්_වෙසක්_පොසොන්_ඇසළ_නිකිණි_බිනර_වප්_ඉල්_උඳුවප්".split("_"),
        weekdaysShort: "ඉරි_සඳු_අඟ_බදා_බ්‍රහ_සිකු_සෙන".split("_"),
        monthsShort: "දුරු_නව_මැදි_බක්_වෙස_පොසො_ඇස_නිකි_බින_වප්_ඉල්_උඳු".split("_"),
        weekdaysMin: "ඉ_ස_අ_බ_බ්‍ර_සි_සෙ".split("_"),
        ordinal: function (_) {
          return _;
        },
        formats: {
          LT: "a h:mm",
          LTS: "a h:mm:ss",
          L: "YYYY/MM/DD",
          LL: "YYYY MMMM D",
          LLL: "YYYY MMMM D, a h:mm",
          LLLL: "YYYY MMMM D [වැනි] dddd, a h:mm:ss"
        },
        relativeTime: {
          future: "%sකින්",
          past: "%sකට පෙර",
          s: "තත්පර කිහිපය",
          m: "විනාඩිය",
          mm: "විනාඩි %d",
          h: "පැය",
          hh: "පැය %d",
          d: "දිනය",
          dd: "දින %d",
          M: "මාසය",
          MM: "මාස %d",
          y: "වසර",
          yy: "වසර %d"
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(si$1);

var si = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var sk$1 = {exports: {}};

(function (module, exports) {
  !function (e, t) {
    module.exports = t(require$$0) ;
  }(commonjsGlobal, function (e) {

    function t(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var n = t(e);
    function r(e) {
      return e > 1 && e < 5 && 1 != ~~(e / 10);
    }
    function o(e, t, n, o) {
      var a = e + " ";
      switch (n) {
        case "s":
          return t || o ? "pár sekúnd" : "pár sekundami";
        case "m":
          return t ? "minúta" : o ? "minútu" : "minútou";
        case "mm":
          return t || o ? a + (r(e) ? "minúty" : "minút") : a + "minútami";
        case "h":
          return t ? "hodina" : o ? "hodinu" : "hodinou";
        case "hh":
          return t || o ? a + (r(e) ? "hodiny" : "hodín") : a + "hodinami";
        case "d":
          return t || o ? "deň" : "dňom";
        case "dd":
          return t || o ? a + (r(e) ? "dni" : "dní") : a + "dňami";
        case "M":
          return t || o ? "mesiac" : "mesiacom";
        case "MM":
          return t || o ? a + (r(e) ? "mesiace" : "mesiacov") : a + "mesiacmi";
        case "y":
          return t || o ? "rok" : "rokom";
        case "yy":
          return t || o ? a + (r(e) ? "roky" : "rokov") : a + "rokmi";
      }
    }
    var a = {
      name: "sk",
      weekdays: "nedeľa_pondelok_utorok_streda_štvrtok_piatok_sobota".split("_"),
      weekdaysShort: "ne_po_ut_st_št_pi_so".split("_"),
      weekdaysMin: "ne_po_ut_st_št_pi_so".split("_"),
      months: "január_február_marec_apríl_máj_jún_júl_august_september_október_november_december".split("_"),
      monthsShort: "jan_feb_mar_apr_máj_jún_júl_aug_sep_okt_nov_dec".split("_"),
      weekStart: 1,
      yearStart: 4,
      ordinal: function (e) {
        return e + ".";
      },
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY H:mm",
        LLLL: "dddd D. MMMM YYYY H:mm",
        l: "D. M. YYYY"
      },
      relativeTime: {
        future: "za %s",
        past: "pred %s",
        s: o,
        m: o,
        mm: o,
        h: o,
        hh: o,
        d: o,
        dd: o,
        M: o,
        MM: o,
        y: o,
        yy: o
      }
    };
    return n.default.locale(a, null, !0), a;
  });
})(sk$1);

var sk = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var sl$1 = {exports: {}};

(function (module, exports) {
  !function (e, n) {
    module.exports = n(require$$0) ;
  }(commonjsGlobal, function (e) {

    function n(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = n(e);
    function r(e) {
      return e % 100 == 2;
    }
    function a(e) {
      return e % 100 == 3 || e % 100 == 4;
    }
    function s(e, n, t, s) {
      var m = e + " ";
      switch (t) {
        case "s":
          return n || s ? "nekaj sekund" : "nekaj sekundami";
        case "m":
          return n ? "ena minuta" : "eno minuto";
        case "mm":
          return r(e) ? m + (n || s ? "minuti" : "minutama") : a(e) ? m + (n || s ? "minute" : "minutami") : m + (n || s ? "minut" : "minutami");
        case "h":
          return n ? "ena ura" : "eno uro";
        case "hh":
          return r(e) ? m + (n || s ? "uri" : "urama") : a(e) ? m + (n || s ? "ure" : "urami") : m + (n || s ? "ur" : "urami");
        case "d":
          return n || s ? "en dan" : "enim dnem";
        case "dd":
          return r(e) ? m + (n || s ? "dneva" : "dnevoma") : m + (n || s ? "dni" : "dnevi");
        case "M":
          return n || s ? "en mesec" : "enim mesecem";
        case "MM":
          return r(e) ? m + (n || s ? "meseca" : "mesecema") : a(e) ? m + (n || s ? "mesece" : "meseci") : m + (n || s ? "mesecev" : "meseci");
        case "y":
          return n || s ? "eno leto" : "enim letom";
        case "yy":
          return r(e) ? m + (n || s ? "leti" : "letoma") : a(e) ? m + (n || s ? "leta" : "leti") : m + (n || s ? "let" : "leti");
      }
    }
    var m = {
      name: "sl",
      weekdays: "nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota".split("_"),
      months: "januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"),
      weekStart: 1,
      weekdaysShort: "ned._pon._tor._sre._čet._pet._sob.".split("_"),
      monthsShort: "jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),
      weekdaysMin: "ne_po_to_sr_če_pe_so".split("_"),
      ordinal: function (e) {
        return e + ".";
      },
      formats: {
        LT: "H:mm",
        LTS: "H:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D. MMMM YYYY",
        LLL: "D. MMMM YYYY H:mm",
        LLLL: "dddd, D. MMMM YYYY H:mm",
        l: "D. M. YYYY"
      },
      relativeTime: {
        future: "čez %s",
        past: "pred %s",
        s: s,
        m: s,
        mm: s,
        h: s,
        hh: s,
        d: s,
        dd: s,
        M: s,
        MM: s,
        y: s,
        yy: s
      }
    };
    return t.default.locale(m, null, !0), m;
  });
})(sl$1);

var sl = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var sq$1 = {exports: {}};

(function (module, exports) {
  !function (e, t) {
    module.exports = t(require$$0) ;
  }(commonjsGlobal, function (e) {

    function t(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var _ = t(e),
      n = {
        name: "sq",
        weekdays: "E Diel_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë".split("_"),
        months: "Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor".split("_"),
        weekStart: 1,
        weekdaysShort: "Die_Hën_Mar_Mër_Enj_Pre_Sht".split("_"),
        monthsShort: "Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj".split("_"),
        weekdaysMin: "D_H_Ma_Më_E_P_Sh".split("_"),
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        relativeTime: {
          future: "në %s",
          past: "%s më parë",
          s: "disa sekonda",
          m: "një minutë",
          mm: "%d minuta",
          h: "një orë",
          hh: "%d orë",
          d: "një ditë",
          dd: "%d ditë",
          M: "një muaj",
          MM: "%d muaj",
          y: "një vit",
          yy: "%d vite"
        }
      };
    return _.default.locale(n, null, !0), n;
  });
})(sq$1);

var sq = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var sr$1 = {exports: {}};

(function (module, exports) {
  !function (e, t) {
    module.exports = t(require$$0) ;
  }(commonjsGlobal, function (e) {

    function t(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var a = t(e),
      r = {
        words: {
          m: ["jedan minut", "jednog minuta"],
          mm: ["%d minut", "%d minuta", "%d minuta"],
          h: ["jedan sat", "jednog sata"],
          hh: ["%d sat", "%d sata", "%d sati"],
          d: ["jedan dan", "jednog dana"],
          dd: ["%d dan", "%d dana", "%d dana"],
          M: ["jedan mesec", "jednog meseca"],
          MM: ["%d mesec", "%d meseca", "%d meseci"],
          y: ["jednu godinu", "jedne godine"],
          yy: ["%d godinu", "%d godine", "%d godina"]
        },
        correctGrammarCase: function (e, t) {
          return e % 10 >= 1 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? e % 10 == 1 ? t[0] : t[1] : t[2];
        },
        relativeTimeFormatter: function (e, t, a, d) {
          var n = r.words[a];
          if (1 === a.length) return "y" === a && t ? "jedna godina" : d || t ? n[0] : n[1];
          var i = r.correctGrammarCase(e, n);
          return "yy" === a && t && "%d godinu" === i ? e + " godina" : i.replace("%d", e);
        }
      },
      d = {
        name: "sr",
        weekdays: "Nedelja_Ponedeljak_Utorak_Sreda_Četvrtak_Petak_Subota".split("_"),
        weekdaysShort: "Ned._Pon._Uto._Sre._Čet._Pet._Sub.".split("_"),
        weekdaysMin: "ne_po_ut_sr_če_pe_su".split("_"),
        months: "Januar_Februar_Mart_April_Maj_Jun_Jul_Avgust_Septembar_Oktobar_Novembar_Decembar".split("_"),
        monthsShort: "Jan._Feb._Mar._Apr._Maj_Jun_Jul_Avg._Sep._Okt._Nov._Dec.".split("_"),
        weekStart: 1,
        relativeTime: {
          future: "za %s",
          past: "pre %s",
          s: "nekoliko sekundi",
          m: r.relativeTimeFormatter,
          mm: r.relativeTimeFormatter,
          h: r.relativeTimeFormatter,
          hh: r.relativeTimeFormatter,
          d: r.relativeTimeFormatter,
          dd: r.relativeTimeFormatter,
          M: r.relativeTimeFormatter,
          MM: r.relativeTimeFormatter,
          y: r.relativeTimeFormatter,
          yy: r.relativeTimeFormatter
        },
        ordinal: function (e) {
          return e + ".";
        },
        formats: {
          LT: "H:mm",
          LTS: "H:mm:ss",
          L: "D. M. YYYY.",
          LL: "D. MMMM YYYY.",
          LLL: "D. MMMM YYYY. H:mm",
          LLLL: "dddd, D. MMMM YYYY. H:mm"
        }
      };
    return a.default.locale(d, null, !0), d;
  });
})(sr$1);

var sr = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var srCyrl$1 = {exports: {}};

(function (module, exports) {
  !function (e, t) {
    module.exports = t(require$$0) ;
  }(commonjsGlobal, function (e) {

    function t(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var r = t(e),
      a = {
        words: {
          m: ["један минут", "једног минута"],
          mm: ["%d минут", "%d минута", "%d минута"],
          h: ["један сат", "једног сата"],
          hh: ["%d сат", "%d сата", "%d сати"],
          d: ["један дан", "једног дана"],
          dd: ["%d дан", "%d дана", "%d дана"],
          M: ["један месец", "једног месеца"],
          MM: ["%d месец", "%d месеца", "%d месеци"],
          y: ["једну годину", "једне године"],
          yy: ["%d годину", "%d године", "%d година"]
        },
        correctGrammarCase: function (e, t) {
          return e % 10 >= 1 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? e % 10 == 1 ? t[0] : t[1] : t[2];
        },
        relativeTimeFormatter: function (e, t, r, d) {
          var i = a.words[r];
          if (1 === r.length) return "y" === r && t ? "једна година" : d || t ? i[0] : i[1];
          var m = a.correctGrammarCase(e, i);
          return "yy" === r && t && "%d годину" === m ? e + " година" : m.replace("%d", e);
        }
      },
      d = {
        name: "sr-cyrl",
        weekdays: "Недеља_Понедељак_Уторак_Среда_Четвртак_Петак_Субота".split("_"),
        weekdaysShort: "Нед._Пон._Уто._Сре._Чет._Пет._Суб.".split("_"),
        weekdaysMin: "не_по_ут_ср_че_пе_су".split("_"),
        months: "Јануар_Фебруар_Март_Април_Мај_Јун_Јул_Август_Септембар_Октобар_Новембар_Децембар".split("_"),
        monthsShort: "Јан._Феб._Мар._Апр._Мај_Јун_Јул_Авг._Сеп._Окт._Нов._Дец.".split("_"),
        weekStart: 1,
        relativeTime: {
          future: "за %s",
          past: "пре %s",
          s: "неколико секунди",
          m: a.relativeTimeFormatter,
          mm: a.relativeTimeFormatter,
          h: a.relativeTimeFormatter,
          hh: a.relativeTimeFormatter,
          d: a.relativeTimeFormatter,
          dd: a.relativeTimeFormatter,
          M: a.relativeTimeFormatter,
          MM: a.relativeTimeFormatter,
          y: a.relativeTimeFormatter,
          yy: a.relativeTimeFormatter
        },
        ordinal: function (e) {
          return e + ".";
        },
        formats: {
          LT: "H:mm",
          LTS: "H:mm:ss",
          L: "D. M. YYYY.",
          LL: "D. MMMM YYYY.",
          LLL: "D. MMMM YYYY. H:mm",
          LLLL: "dddd, D. MMMM YYYY. H:mm"
        }
      };
    return r.default.locale(d, null, !0), d;
  });
})(srCyrl$1);

var srCyrl = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var ss$1 = {exports: {}};

(function (module, exports) {
  !function (e, n) {
    module.exports = n(require$$0) ;
  }(commonjsGlobal, function (e) {

    function n(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var a = n(e),
      i = {
        name: "ss",
        weekdays: "Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo".split("_"),
        months: "Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split("_"),
        weekStart: 1,
        weekdaysShort: "Lis_Umb_Lsb_Les_Lsi_Lsh_Umg".split("_"),
        monthsShort: "Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo".split("_"),
        weekdaysMin: "Li_Us_Lb_Lt_Ls_Lh_Ug".split("_"),
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "h:mm A",
          LTS: "h:mm:ss A",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY h:mm A",
          LLLL: "dddd, D MMMM YYYY h:mm A"
        },
        relativeTime: {
          future: "nga %s",
          past: "wenteka nga %s",
          s: "emizuzwana lomcane",
          m: "umzuzu",
          mm: "%d emizuzu",
          h: "lihora",
          hh: "%d emahora",
          d: "lilanga",
          dd: "%d emalanga",
          M: "inyanga",
          MM: "%d tinyanga",
          y: "umnyaka",
          yy: "%d iminyaka"
        }
      };
    return a.default.locale(i, null, !0), i;
  });
})(ss$1);

var ss = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var svFi$1 = {exports: {}};

(function (module, exports) {
  !function (e, t) {
    module.exports = t(require$$0) ;
  }(commonjsGlobal, function (e) {

    function t(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var a = t(e),
      d = {
        name: "sv-fi",
        weekdays: "söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split("_"),
        weekdaysShort: "sön_mån_tis_ons_tor_fre_lör".split("_"),
        weekdaysMin: "sö_må_ti_on_to_fr_lö".split("_"),
        months: "januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),
        monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
        weekStart: 1,
        yearStart: 4,
        ordinal: function (e) {
          var t = e % 10;
          return "[" + e + (1 === t || 2 === t ? "a" : "e") + "]";
        },
        formats: {
          LT: "HH.mm",
          LTS: "HH.mm.ss",
          L: "DD.MM.YYYY",
          LL: "D. MMMM YYYY",
          LLL: "D. MMMM YYYY, [kl.] HH.mm",
          LLLL: "dddd, D. MMMM YYYY, [kl.] HH.mm",
          l: "D.M.YYYY",
          ll: "D. MMM YYYY",
          lll: "D. MMM YYYY, [kl.] HH.mm",
          llll: "ddd, D. MMM YYYY, [kl.] HH.mm"
        },
        relativeTime: {
          future: "om %s",
          past: "för %s sedan",
          s: "några sekunder",
          m: "en minut",
          mm: "%d minuter",
          h: "en timme",
          hh: "%d timmar",
          d: "en dag",
          dd: "%d dagar",
          M: "en månad",
          MM: "%d månader",
          y: "ett år",
          yy: "%d år"
        }
      };
    return a.default.locale(d, null, !0), d;
  });
})(svFi$1);

var svFi = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var sv$1 = {exports: {}};

(function (module, exports) {
  !function (e, t) {
    module.exports = t(require$$0) ;
  }(commonjsGlobal, function (e) {

    function t(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var a = t(e),
      d = {
        name: "sv",
        weekdays: "söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split("_"),
        weekdaysShort: "sön_mån_tis_ons_tor_fre_lör".split("_"),
        weekdaysMin: "sö_må_ti_on_to_fr_lö".split("_"),
        months: "januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split("_"),
        monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
        weekStart: 1,
        yearStart: 4,
        ordinal: function (e) {
          var t = e % 10;
          return "[" + e + (1 === t || 2 === t ? "a" : "e") + "]";
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "YYYY-MM-DD",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY [kl.] HH:mm",
          LLLL: "dddd D MMMM YYYY [kl.] HH:mm",
          lll: "D MMM YYYY HH:mm",
          llll: "ddd D MMM YYYY HH:mm"
        },
        relativeTime: {
          future: "om %s",
          past: "för %s sedan",
          s: "några sekunder",
          m: "en minut",
          mm: "%d minuter",
          h: "en timme",
          hh: "%d timmar",
          d: "en dag",
          dd: "%d dagar",
          M: "en månad",
          MM: "%d månader",
          y: "ett år",
          yy: "%d år"
        }
      };
    return a.default.locale(d, null, !0), d;
  });
})(sv$1);

var sv = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var sw$1 = {exports: {}};

(function (module, exports) {
  !function (a, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (a) {

    function e(a) {
      return a && "object" == typeof a && "default" in a ? a : {
        default: a
      };
    }
    var i = e(a),
      t = {
        name: "sw",
        weekdays: "Jumapili_Jumatatu_Jumanne_Jumatano_Alhamisi_Ijumaa_Jumamosi".split("_"),
        weekdaysShort: "Jpl_Jtat_Jnne_Jtan_Alh_Ijm_Jmos".split("_"),
        weekdaysMin: "J2_J3_J4_J5_Al_Ij_J1".split("_"),
        months: "Januari_Februari_Machi_Aprili_Mei_Juni_Julai_Agosti_Septemba_Oktoba_Novemba_Desemba".split("_"),
        monthsShort: "Jan_Feb_Mac_Apr_Mei_Jun_Jul_Ago_Sep_Okt_Nov_Des".split("_"),
        weekStart: 1,
        ordinal: function (a) {
          return a;
        },
        relativeTime: {
          future: "%s baadaye",
          past: "tokea %s",
          s: "hivi punde",
          m: "dakika moja",
          mm: "dakika %d",
          h: "saa limoja",
          hh: "masaa %d",
          d: "siku moja",
          dd: "masiku %d",
          M: "mwezi mmoja",
          MM: "miezi %d",
          y: "mwaka mmoja",
          yy: "miaka %d"
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD.MM.YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd, D MMMM YYYY HH:mm"
        }
      };
    return i.default.locale(t, null, !0), t;
  });
})(sw$1);

var sw = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var ta$1 = {exports: {}};

(function (module, exports) {
  !function (_, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (_) {

    function e(_) {
      return _ && "object" == typeof _ && "default" in _ ? _ : {
        default: _
      };
    }
    var t = e(_),
      d = {
        name: "ta",
        weekdays: "ஞாயிற்றுக்கிழமை_திங்கட்கிழமை_செவ்வாய்கிழமை_புதன்கிழமை_வியாழக்கிழமை_வெள்ளிக்கிழமை_சனிக்கிழமை".split("_"),
        months: "ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"),
        weekdaysShort: "ஞாயிறு_திங்கள்_செவ்வாய்_புதன்_வியாழன்_வெள்ளி_சனி".split("_"),
        monthsShort: "ஜனவரி_பிப்ரவரி_மார்ச்_ஏப்ரல்_மே_ஜூன்_ஜூலை_ஆகஸ்ட்_செப்டெம்பர்_அக்டோபர்_நவம்பர்_டிசம்பர்".split("_"),
        weekdaysMin: "ஞா_தி_செ_பு_வி_வெ_ச".split("_"),
        ordinal: function (_) {
          return _;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY, HH:mm",
          LLLL: "dddd, D MMMM YYYY, HH:mm"
        },
        relativeTime: {
          future: "%s இல்",
          past: "%s முன்",
          s: "ஒரு சில விநாடிகள்",
          m: "ஒரு நிமிடம்",
          mm: "%d நிமிடங்கள்",
          h: "ஒரு மணி நேரம்",
          hh: "%d மணி நேரம்",
          d: "ஒரு நாள்",
          dd: "%d நாட்கள்",
          M: "ஒரு மாதம்",
          MM: "%d மாதங்கள்",
          y: "ஒரு வருடம்",
          yy: "%d ஆண்டுகள்"
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(ta$1);

var ta = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var te$1 = {exports: {}};

(function (module, exports) {
  !function (_, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (_) {

    function e(_) {
      return _ && "object" == typeof _ && "default" in _ ? _ : {
        default: _
      };
    }
    var t = e(_),
      d = {
        name: "te",
        weekdays: "ఆదివారం_సోమవారం_మంగళవారం_బుధవారం_గురువారం_శుక్రవారం_శనివారం".split("_"),
        months: "జనవరి_ఫిబ్రవరి_మార్చి_ఏప్రిల్_మే_జూన్_జులై_ఆగస్టు_సెప్టెంబర్_అక్టోబర్_నవంబర్_డిసెంబర్".split("_"),
        weekdaysShort: "ఆది_సోమ_మంగళ_బుధ_గురు_శుక్ర_శని".split("_"),
        monthsShort: "జన._ఫిబ్ర._మార్చి_ఏప్రి._మే_జూన్_జులై_ఆగ._సెప్._అక్టో._నవ._డిసె.".split("_"),
        weekdaysMin: "ఆ_సో_మం_బు_గు_శు_శ".split("_"),
        ordinal: function (_) {
          return _;
        },
        formats: {
          LT: "A h:mm",
          LTS: "A h:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY, A h:mm",
          LLLL: "dddd, D MMMM YYYY, A h:mm"
        },
        relativeTime: {
          future: "%s లో",
          past: "%s క్రితం",
          s: "కొన్ని క్షణాలు",
          m: "ఒక నిమిషం",
          mm: "%d నిమిషాలు",
          h: "ఒక గంట",
          hh: "%d గంటలు",
          d: "ఒక రోజు",
          dd: "%d రోజులు",
          M: "ఒక నెల",
          MM: "%d నెలలు",
          y: "ఒక సంవత్సరం",
          yy: "%d సంవత్సరాలు"
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(te$1);

var te = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var tg$1 = {exports: {}};

(function (module, exports) {
  !function (_, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (_) {

    function e(_) {
      return _ && "object" == typeof _ && "default" in _ ? _ : {
        default: _
      };
    }
    var t = e(_),
      d = {
        name: "tg",
        weekdays: "якшанбе_душанбе_сешанбе_чоршанбе_панҷшанбе_ҷумъа_шанбе".split("_"),
        months: "январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр".split("_"),
        weekStart: 1,
        weekdaysShort: "яшб_дшб_сшб_чшб_пшб_ҷум_шнб".split("_"),
        monthsShort: "янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек".split("_"),
        weekdaysMin: "яш_дш_сш_чш_пш_ҷм_шб".split("_"),
        ordinal: function (_) {
          return _;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        relativeTime: {
          future: "баъди %s",
          past: "%s пеш",
          s: "якчанд сония",
          m: "як дақиқа",
          mm: "%d дақиқа",
          h: "як соат",
          hh: "%d соат",
          d: "як рӯз",
          dd: "%d рӯз",
          M: "як моҳ",
          MM: "%d моҳ",
          y: "як сол",
          yy: "%d сол"
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(tg$1);

var tg = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var th$1 = {exports: {}};

(function (module, exports) {
  !function (_, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (_) {

    function e(_) {
      return _ && "object" == typeof _ && "default" in _ ? _ : {
        default: _
      };
    }
    var t = e(_),
      d = {
        name: "th",
        weekdays: "อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัสบดี_ศุกร์_เสาร์".split("_"),
        weekdaysShort: "อาทิตย์_จันทร์_อังคาร_พุธ_พฤหัส_ศุกร์_เสาร์".split("_"),
        weekdaysMin: "อา._จ._อ._พ._พฤ._ศ._ส.".split("_"),
        months: "มกราคม_กุมภาพันธ์_มีนาคม_เมษายน_พฤษภาคม_มิถุนายน_กรกฎาคม_สิงหาคม_กันยายน_ตุลาคม_พฤศจิกายน_ธันวาคม".split("_"),
        monthsShort: "ม.ค._ก.พ._มี.ค._เม.ย._พ.ค._มิ.ย._ก.ค._ส.ค._ก.ย._ต.ค._พ.ย._ธ.ค.".split("_"),
        formats: {
          LT: "H:mm",
          LTS: "H:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY เวลา H:mm",
          LLLL: "วันddddที่ D MMMM YYYY เวลา H:mm"
        },
        relativeTime: {
          future: "อีก %s",
          past: "%sที่แล้ว",
          s: "ไม่กี่วินาที",
          m: "1 นาที",
          mm: "%d นาที",
          h: "1 ชั่วโมง",
          hh: "%d ชั่วโมง",
          d: "1 วัน",
          dd: "%d วัน",
          M: "1 เดือน",
          MM: "%d เดือน",
          y: "1 ปี",
          yy: "%d ปี"
        },
        ordinal: function (_) {
          return _ + ".";
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(th$1);

var th = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var tk$1 = {exports: {}};

(function (module, exports) {
  !function (e, n) {
    module.exports = n(require$$0) ;
  }(commonjsGlobal, function (e) {

    function n(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = n(e),
      _ = {
        name: "tk",
        weekdays: "Ýekşenbe_Duşenbe_Sişenbe_Çarşenbe_Penşenbe_Anna_Şenbe".split("_"),
        weekdaysShort: "Ýek_Duş_Siş_Çar_Pen_Ann_Şen".split("_"),
        weekdaysMin: "Ýk_Dş_Sş_Çr_Pn_An_Şn".split("_"),
        months: "Ýanwar_Fewral_Mart_Aprel_Maý_Iýun_Iýul_Awgust_Sentýabr_Oktýabr_Noýabr_Dekabr".split("_"),
        monthsShort: "Ýan_Few_Mar_Apr_Maý_Iýn_Iýl_Awg_Sen_Okt_Noý_Dek".split("_"),
        weekStart: 1,
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD.MM.YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        relativeTime: {
          future: "%s soň",
          past: "%s öň",
          s: "birnäçe sekunt",
          m: "bir minut",
          mm: "%d minut",
          h: "bir sagat",
          hh: "%d sagat",
          d: "bir gün",
          dd: "%d gün",
          M: "bir aý",
          MM: "%d aý",
          y: "bir ýyl",
          yy: "%d ýyl"
        },
        ordinal: function (e) {
          return e + ".";
        }
      };
    return t.default.locale(_, null, !0), _;
  });
})(tk$1);

var tk = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var tlPh$1 = {exports: {}};

(function (module, exports) {
  !function (e, a) {
    module.exports = a(require$$0) ;
  }(commonjsGlobal, function (e) {

    function a(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var n = a(e),
      t = {
        name: "tl-ph",
        weekdays: "Linggo_Lunes_Martes_Miyerkules_Huwebes_Biyernes_Sabado".split("_"),
        months: "Enero_Pebrero_Marso_Abril_Mayo_Hunyo_Hulyo_Agosto_Setyembre_Oktubre_Nobyembre_Disyembre".split("_"),
        weekStart: 1,
        weekdaysShort: "Lin_Lun_Mar_Miy_Huw_Biy_Sab".split("_"),
        monthsShort: "Ene_Peb_Mar_Abr_May_Hun_Hul_Ago_Set_Okt_Nob_Dis".split("_"),
        weekdaysMin: "Li_Lu_Ma_Mi_Hu_Bi_Sab".split("_"),
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "MM/D/YYYY",
          LL: "MMMM D, YYYY",
          LLL: "MMMM D, YYYY HH:mm",
          LLLL: "dddd, MMMM DD, YYYY HH:mm"
        },
        relativeTime: {
          future: "sa loob ng %s",
          past: "%s ang nakalipas",
          s: "ilang segundo",
          m: "isang minuto",
          mm: "%d minuto",
          h: "isang oras",
          hh: "%d oras",
          d: "isang araw",
          dd: "%d araw",
          M: "isang buwan",
          MM: "%d buwan",
          y: "isang taon",
          yy: "%d taon"
        }
      };
    return n.default.locale(t, null, !0), t;
  });
})(tlPh$1);

var tlPh = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var tlh$1 = {exports: {}};

(function (module, exports) {
  !function (a, j) {
    module.exports = j(require$$0) ;
  }(commonjsGlobal, function (a) {

    function j(a) {
      return a && "object" == typeof a && "default" in a ? a : {
        default: a
      };
    }
    var t = j(a),
      e = {
        name: "tlh",
        weekdays: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),
        months: "tera’ jar wa’_tera’ jar cha’_tera’ jar wej_tera’ jar loS_tera’ jar vagh_tera’ jar jav_tera’ jar Soch_tera’ jar chorgh_tera’ jar Hut_tera’ jar wa’maH_tera’ jar wa’maH wa’_tera’ jar wa’maH cha’".split("_"),
        weekStart: 1,
        weekdaysShort: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),
        monthsShort: "jar wa’_jar cha’_jar wej_jar loS_jar vagh_jar jav_jar Soch_jar chorgh_jar Hut_jar wa’maH_jar wa’maH wa’_jar wa’maH cha’".split("_"),
        weekdaysMin: "lojmItjaj_DaSjaj_povjaj_ghItlhjaj_loghjaj_buqjaj_ghInjaj".split("_"),
        ordinal: function (a) {
          return a;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD.MM.YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd, D MMMM YYYY HH:mm"
        }
      };
    return t.default.locale(e, null, !0), e;
  });
})(tlh$1);

var tlh = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var tr$1 = {exports: {}};

(function (module, exports) {
  !function (a, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (a) {

    function e(a) {
      return a && "object" == typeof a && "default" in a ? a : {
        default: a
      };
    }
    var t = e(a),
      _ = {
        name: "tr",
        weekdays: "Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi".split("_"),
        weekdaysShort: "Paz_Pts_Sal_Çar_Per_Cum_Cts".split("_"),
        weekdaysMin: "Pz_Pt_Sa_Ça_Pe_Cu_Ct".split("_"),
        months: "Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık".split("_"),
        monthsShort: "Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara".split("_"),
        weekStart: 1,
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD.MM.YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        relativeTime: {
          future: "%s sonra",
          past: "%s önce",
          s: "birkaç saniye",
          m: "bir dakika",
          mm: "%d dakika",
          h: "bir saat",
          hh: "%d saat",
          d: "bir gün",
          dd: "%d gün",
          M: "bir ay",
          MM: "%d ay",
          y: "bir yıl",
          yy: "%d yıl"
        },
        ordinal: function (a) {
          return a + ".";
        }
      };
    return t.default.locale(_, null, !0), _;
  });
})(tr$1);

var tr = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var tzl$1 = {exports: {}};

(function (module, exports) {
  !function (e, _) {
    module.exports = _(require$$0) ;
  }(commonjsGlobal, function (e) {

    function _(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = _(e),
      a = {
        name: "tzl",
        weekdays: "Súladi_Lúneçi_Maitzi_Márcuri_Xhúadi_Viénerçi_Sáturi".split("_"),
        months: "Januar_Fevraglh_Març_Avrïu_Mai_Gün_Julia_Guscht_Setemvar_Listopäts_Noemvar_Zecemvar".split("_"),
        weekStart: 1,
        weekdaysShort: "Súl_Lún_Mai_Már_Xhú_Vié_Sát".split("_"),
        monthsShort: "Jan_Fev_Mar_Avr_Mai_Gün_Jul_Gus_Set_Lis_Noe_Zec".split("_"),
        weekdaysMin: "Sú_Lú_Ma_Má_Xh_Vi_Sá".split("_"),
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "HH.mm",
          LTS: "HH.mm.ss",
          L: "DD.MM.YYYY",
          LL: "D. MMMM [dallas] YYYY",
          LLL: "D. MMMM [dallas] YYYY HH.mm",
          LLLL: "dddd, [li] D. MMMM [dallas] YYYY HH.mm"
        }
      };
    return t.default.locale(a, null, !0), a;
  });
})(tzl$1);

var tzl = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var tzmLatn$1 = {exports: {}};

(function (module, exports) {
  !function (a, s) {
    module.exports = s(require$$0) ;
  }(commonjsGlobal, function (a) {

    function s(a) {
      return a && "object" == typeof a && "default" in a ? a : {
        default: a
      };
    }
    var n = s(a),
      i = {
        name: "tzm-latn",
        weekdays: "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),
        months: "innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),
        weekStart: 6,
        weekdaysShort: "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),
        monthsShort: "innayr_brˤayrˤ_marˤsˤ_ibrir_mayyw_ywnyw_ywlywz_ɣwšt_šwtanbir_ktˤwbrˤ_nwwanbir_dwjnbir".split("_"),
        weekdaysMin: "asamas_aynas_asinas_akras_akwas_asimwas_asiḍyas".split("_"),
        ordinal: function (a) {
          return a;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd D MMMM YYYY HH:mm"
        },
        relativeTime: {
          future: "dadkh s yan %s",
          past: "yan %s",
          s: "imik",
          m: "minuḍ",
          mm: "%d minuḍ",
          h: "saɛa",
          hh: "%d tassaɛin",
          d: "ass",
          dd: "%d ossan",
          M: "ayowr",
          MM: "%d iyyirn",
          y: "asgas",
          yy: "%d isgasn"
        }
      };
    return n.default.locale(i, null, !0), i;
  });
})(tzmLatn$1);

var tzmLatn = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var tzm$1 = {exports: {}};

(function (module, exports) {
  !function (_, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (_) {

    function e(_) {
      return _ && "object" == typeof _ && "default" in _ ? _ : {
        default: _
      };
    }
    var t = e(_),
      d = {
        name: "tzm",
        weekdays: "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),
        months: "ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"),
        weekStart: 6,
        weekdaysShort: "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),
        monthsShort: "ⵉⵏⵏⴰⵢⵔ_ⴱⵕⴰⵢⵕ_ⵎⴰⵕⵚ_ⵉⴱⵔⵉⵔ_ⵎⴰⵢⵢⵓ_ⵢⵓⵏⵢⵓ_ⵢⵓⵍⵢⵓⵣ_ⵖⵓⵛⵜ_ⵛⵓⵜⴰⵏⴱⵉⵔ_ⴽⵟⵓⴱⵕ_ⵏⵓⵡⴰⵏⴱⵉⵔ_ⴷⵓⵊⵏⴱⵉⵔ".split("_"),
        weekdaysMin: "ⴰⵙⴰⵎⴰⵙ_ⴰⵢⵏⴰⵙ_ⴰⵙⵉⵏⴰⵙ_ⴰⴽⵔⴰⵙ_ⴰⴽⵡⴰⵙ_ⴰⵙⵉⵎⵡⴰⵙ_ⴰⵙⵉⴹⵢⴰⵙ".split("_"),
        ordinal: function (_) {
          return _;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd D MMMM YYYY HH:mm"
        },
        relativeTime: {
          future: "ⴷⴰⴷⵅ ⵙ ⵢⴰⵏ %s",
          past: "ⵢⴰⵏ %s",
          s: "ⵉⵎⵉⴽ",
          m: "ⵎⵉⵏⵓⴺ",
          mm: "%d ⵎⵉⵏⵓⴺ",
          h: "ⵙⴰⵄⴰ",
          hh: "%d ⵜⴰⵙⵙⴰⵄⵉⵏ",
          d: "ⴰⵙⵙ",
          dd: "%d oⵙⵙⴰⵏ",
          M: "ⴰⵢoⵓⵔ",
          MM: "%d ⵉⵢⵢⵉⵔⵏ",
          y: "ⴰⵙⴳⴰⵙ",
          yy: "%d ⵉⵙⴳⴰⵙⵏ"
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(tzm$1);

var tzm = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var ugCn$1 = {exports: {}};

(function (module, exports) {
  !function (_, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (_) {

    function e(_) {
      return _ && "object" == typeof _ && "default" in _ ? _ : {
        default: _
      };
    }
    var t = e(_),
      d = {
        name: "ug-cn",
        weekdays: "يەكشەنبە_دۈشەنبە_سەيشەنبە_چارشەنبە_پەيشەنبە_جۈمە_شەنبە".split("_"),
        months: "يانۋار_فېۋرال_مارت_ئاپرېل_ماي_ئىيۇن_ئىيۇل_ئاۋغۇست_سېنتەبىر_ئۆكتەبىر_نويابىر_دېكابىر".split("_"),
        weekStart: 1,
        weekdaysShort: "يە_دۈ_سە_چا_پە_جۈ_شە".split("_"),
        monthsShort: "يانۋار_فېۋرال_مارت_ئاپرېل_ماي_ئىيۇن_ئىيۇل_ئاۋغۇست_سېنتەبىر_ئۆكتەبىر_نويابىر_دېكابىر".split("_"),
        weekdaysMin: "يە_دۈ_سە_چا_پە_جۈ_شە".split("_"),
        ordinal: function (_) {
          return _;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "YYYY-MM-DD",
          LL: "YYYY-يىلىM-ئاينىڭD-كۈنى",
          LLL: "YYYY-يىلىM-ئاينىڭD-كۈنى، HH:mm",
          LLLL: "dddd، YYYY-يىلىM-ئاينىڭD-كۈنى، HH:mm"
        },
        relativeTime: {
          future: "%s كېيىن",
          past: "%s بۇرۇن",
          s: "نەچچە سېكونت",
          m: "بىر مىنۇت",
          mm: "%d مىنۇت",
          h: "بىر سائەت",
          hh: "%d سائەت",
          d: "بىر كۈن",
          dd: "%d كۈن",
          M: "بىر ئاي",
          MM: "%d ئاي",
          y: "بىر يىل",
          yy: "%d يىل"
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(ugCn$1);

var ugCn = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var uk$1 = {exports: {}};

(function (module, exports) {
  !function (_, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (_) {

    function e(_) {
      return _ && "object" == typeof _ && "default" in _ ? _ : {
        default: _
      };
    }
    var t = e(_),
      s = "січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня".split("_"),
      n = "січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень".split("_"),
      o = /D[oD]?(\[[^[\]]*\]|\s)+MMMM?/;
    function d(_, e, t) {
      var s, n;
      return "m" === t ? e ? "хвилина" : "хвилину" : "h" === t ? e ? "година" : "годину" : _ + " " + (s = +_, n = {
        ss: e ? "секунда_секунди_секунд" : "секунду_секунди_секунд",
        mm: e ? "хвилина_хвилини_хвилин" : "хвилину_хвилини_хвилин",
        hh: e ? "година_години_годин" : "годину_години_годин",
        dd: "день_дні_днів",
        MM: "місяць_місяці_місяців",
        yy: "рік_роки_років"
      }[t].split("_"), s % 10 == 1 && s % 100 != 11 ? n[0] : s % 10 >= 2 && s % 10 <= 4 && (s % 100 < 10 || s % 100 >= 20) ? n[1] : n[2]);
    }
    var i = function (_, e) {
      return o.test(e) ? s[_.month()] : n[_.month()];
    };
    i.s = n, i.f = s;
    var r = {
      name: "uk",
      weekdays: "неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота".split("_"),
      weekdaysShort: "ндл_пнд_втр_срд_чтв_птн_сбт".split("_"),
      weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"),
      months: i,
      monthsShort: "січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд".split("_"),
      weekStart: 1,
      relativeTime: {
        future: "за %s",
        past: "%s тому",
        s: "декілька секунд",
        m: d,
        mm: d,
        h: d,
        hh: d,
        d: "день",
        dd: d,
        M: "місяць",
        MM: d,
        y: "рік",
        yy: d
      },
      ordinal: function (_) {
        return _;
      },
      formats: {
        LT: "HH:mm",
        LTS: "HH:mm:ss",
        L: "DD.MM.YYYY",
        LL: "D MMMM YYYY р.",
        LLL: "D MMMM YYYY р., HH:mm",
        LLLL: "dddd, D MMMM YYYY р., HH:mm"
      }
    };
    return t.default.locale(r, null, !0), r;
  });
})(uk$1);

var uk = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var ur$1 = {exports: {}};

(function (module, exports) {
  !function (_, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (_) {

    function e(_) {
      return _ && "object" == typeof _ && "default" in _ ? _ : {
        default: _
      };
    }
    var t = e(_),
      d = {
        name: "ur",
        weekdays: "اتوار_پیر_منگل_بدھ_جمعرات_جمعہ_ہفتہ".split("_"),
        months: "جنوری_فروری_مارچ_اپریل_مئی_جون_جولائی_اگست_ستمبر_اکتوبر_نومبر_دسمبر".split("_"),
        weekStart: 1,
        weekdaysShort: "اتوار_پیر_منگل_بدھ_جمعرات_جمعہ_ہفتہ".split("_"),
        monthsShort: "جنوری_فروری_مارچ_اپریل_مئی_جون_جولائی_اگست_ستمبر_اکتوبر_نومبر_دسمبر".split("_"),
        weekdaysMin: "اتوار_پیر_منگل_بدھ_جمعرات_جمعہ_ہفتہ".split("_"),
        ordinal: function (_) {
          return _;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd، D MMMM YYYY HH:mm"
        },
        relativeTime: {
          future: "%s بعد",
          past: "%s قبل",
          s: "چند سیکنڈ",
          m: "ایک منٹ",
          mm: "%d منٹ",
          h: "ایک گھنٹہ",
          hh: "%d گھنٹے",
          d: "ایک دن",
          dd: "%d دن",
          M: "ایک ماہ",
          MM: "%d ماہ",
          y: "ایک سال",
          yy: "%d سال"
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(ur$1);

var ur = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var uzLatn$1 = {exports: {}};

(function (module, exports) {
  !function (a, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (a) {

    function e(a) {
      return a && "object" == typeof a && "default" in a ? a : {
        default: a
      };
    }
    var _ = e(a),
      n = {
        name: "uz-latn",
        weekdays: "Yakshanba_Dushanba_Seshanba_Chorshanba_Payshanba_Juma_Shanba".split("_"),
        months: "Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentabr_Oktabr_Noyabr_Dekabr".split("_"),
        weekStart: 1,
        weekdaysShort: "Yak_Dush_Sesh_Chor_Pay_Jum_Shan".split("_"),
        monthsShort: "Yan_Fev_Mar_Apr_May_Iyun_Iyul_Avg_Sen_Okt_Noy_Dek".split("_"),
        weekdaysMin: "Ya_Du_Se_Cho_Pa_Ju_Sha".split("_"),
        ordinal: function (a) {
          return a;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "D MMMM YYYY, dddd HH:mm"
        },
        relativeTime: {
          future: "Yaqin %s ichida",
          past: "%s oldin",
          s: "soniya",
          m: "bir daqiqa",
          mm: "%d daqiqa",
          h: "bir soat",
          hh: "%d soat",
          d: "bir kun",
          dd: "%d kun",
          M: "bir oy",
          MM: "%d oy",
          y: "bir yil",
          yy: "%d yil"
        }
      };
    return _.default.locale(n, null, !0), n;
  });
})(uzLatn$1);

var uzLatn = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var uz$1 = {exports: {}};

(function (module, exports) {
  !function (_, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (_) {

    function e(_) {
      return _ && "object" == typeof _ && "default" in _ ? _ : {
        default: _
      };
    }
    var t = e(_),
      d = {
        name: "uz",
        weekdays: "Якшанба_Душанба_Сешанба_Чоршанба_Пайшанба_Жума_Шанба".split("_"),
        months: "январ_феврал_март_апрел_май_июн_июл_август_сентябр_октябр_ноябр_декабр".split("_"),
        weekStart: 1,
        weekdaysShort: "Якш_Душ_Сеш_Чор_Пай_Жум_Шан".split("_"),
        monthsShort: "янв_фев_мар_апр_май_июн_июл_авг_сен_окт_ноя_дек".split("_"),
        weekdaysMin: "Як_Ду_Се_Чо_Па_Жу_Ша".split("_"),
        ordinal: function (_) {
          return _;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "D MMMM YYYY, dddd HH:mm"
        },
        relativeTime: {
          future: "Якин %s ичида",
          past: "%s олдин",
          s: "фурсат",
          m: "бир дакика",
          mm: "%d дакика",
          h: "бир соат",
          hh: "%d соат",
          d: "бир кун",
          dd: "%d кун",
          M: "бир ой",
          MM: "%d ой",
          y: "бир йил",
          yy: "%d йил"
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(uz$1);

var uz = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var vi$1 = {exports: {}};

(function (module, exports) {
  !function (t, n) {
    module.exports = n(require$$0) ;
  }(commonjsGlobal, function (t) {

    function n(t) {
      return t && "object" == typeof t && "default" in t ? t : {
        default: t
      };
    }
    var h = n(t),
      _ = {
        name: "vi",
        weekdays: "chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy".split("_"),
        months: "tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12".split("_"),
        weekStart: 1,
        weekdaysShort: "CN_T2_T3_T4_T5_T6_T7".split("_"),
        monthsShort: "Th01_Th02_Th03_Th04_Th05_Th06_Th07_Th08_Th09_Th10_Th11_Th12".split("_"),
        weekdaysMin: "CN_T2_T3_T4_T5_T6_T7".split("_"),
        ordinal: function (t) {
          return t;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM [năm] YYYY",
          LLL: "D MMMM [năm] YYYY HH:mm",
          LLLL: "dddd, D MMMM [năm] YYYY HH:mm",
          l: "DD/M/YYYY",
          ll: "D MMM YYYY",
          lll: "D MMM YYYY HH:mm",
          llll: "ddd, D MMM YYYY HH:mm"
        },
        relativeTime: {
          future: "%s tới",
          past: "%s trước",
          s: "vài giây",
          m: "một phút",
          mm: "%d phút",
          h: "một giờ",
          hh: "%d giờ",
          d: "một ngày",
          dd: "%d ngày",
          M: "một tháng",
          MM: "%d tháng",
          y: "một năm",
          yy: "%d năm"
        }
      };
    return h.default.locale(_, null, !0), _;
  });
})(vi$1);

var vi = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var xPseudo$1 = {exports: {}};

(function (module, exports) {
  !function (e, t) {
    module.exports = t(require$$0) ;
  }(commonjsGlobal, function (e) {

    function t(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var _ = t(e),
      d = {
        name: "x-pseudo",
        weekdays: "S~úñdá~ý_Mó~ñdáý~_Túé~sdáý~_Wéd~ñésd~áý_T~húrs~dáý_~Fríd~áý_S~átúr~dáý".split("_"),
        months: "J~áñúá~rý_F~ébrú~árý_~Márc~h_Áp~ríl_~Máý_~Júñé~_Júl~ý_Áú~gúst~_Sép~témb~ér_Ó~ctób~ér_Ñ~óvém~bér_~Décé~mbér".split("_"),
        weekStart: 1,
        weekdaysShort: "S~úñ_~Móñ_~Túé_~Wéd_~Thú_~Frí_~Sát".split("_"),
        monthsShort: "J~áñ_~Féb_~Már_~Ápr_~Máý_~Júñ_~Júl_~Áúg_~Sép_~Óct_~Ñóv_~Déc".split("_"),
        weekdaysMin: "S~ú_Mó~_Tú_~Wé_T~h_Fr~_Sá".split("_"),
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY HH:mm",
          LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        relativeTime: {
          future: "í~ñ %s",
          past: "%s á~gó",
          s: "á ~féw ~sécó~ñds",
          m: "á ~míñ~úté",
          mm: "%d m~íñú~tés",
          h: "á~ñ hó~úr",
          hh: "%d h~óúrs",
          d: "á ~dáý",
          dd: "%d d~áýs",
          M: "á ~móñ~th",
          MM: "%d m~óñt~hs",
          y: "á ~ýéár",
          yy: "%d ý~éárs"
        }
      };
    return _.default.locale(d, null, !0), d;
  });
})(xPseudo$1);

var xPseudo = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var yo$1 = {exports: {}};

(function (module, exports) {
  !function (e, _) {
    module.exports = _(require$$0) ;
  }(commonjsGlobal, function (e) {

    function _(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = _(e),
      a = {
        name: "yo",
        weekdays: "Àìkú_Ajé_Ìsẹ́gun_Ọjọ́rú_Ọjọ́bọ_Ẹtì_Àbámẹ́ta".split("_"),
        months: "Sẹ́rẹ́_Èrèlè_Ẹrẹ̀nà_Ìgbé_Èbibi_Òkùdu_Agẹmo_Ògún_Owewe_Ọ̀wàrà_Bélú_Ọ̀pẹ̀̀".split("_"),
        weekStart: 1,
        weekdaysShort: "Àìk_Ajé_Ìsẹ́_Ọjr_Ọjb_Ẹtì_Àbá".split("_"),
        monthsShort: "Sẹ́r_Èrl_Ẹrn_Ìgb_Èbi_Òkù_Agẹ_Ògú_Owe_Ọ̀wà_Bél_Ọ̀pẹ̀̀".split("_"),
        weekdaysMin: "Àì_Aj_Ìs_Ọr_Ọb_Ẹt_Àb".split("_"),
        ordinal: function (e) {
          return e;
        },
        formats: {
          LT: "h:mm A",
          LTS: "h:mm:ss A",
          L: "DD/MM/YYYY",
          LL: "D MMMM YYYY",
          LLL: "D MMMM YYYY h:mm A",
          LLLL: "dddd, D MMMM YYYY h:mm A"
        },
        relativeTime: {
          future: "ní %s",
          past: "%s kọjá",
          s: "ìsẹjú aayá die",
          m: "ìsẹjú kan",
          mm: "ìsẹjú %d",
          h: "wákati kan",
          hh: "wákati %d",
          d: "ọjọ́ kan",
          dd: "ọjọ́ %d",
          M: "osù kan",
          MM: "osù %d",
          y: "ọdún kan",
          yy: "ọdún %d"
        }
      };
    return t.default.locale(a, null, !0), a;
  });
})(yo$1);

var yo = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var zhCn$1 = {exports: {}};

(function (module, exports) {
  !function (e, _) {
    module.exports = _(require$$0) ;
  }(commonjsGlobal, function (e) {

    function _(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = _(e),
      d = {
        name: "zh-cn",
        weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
        weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"),
        weekdaysMin: "日_一_二_三_四_五_六".split("_"),
        months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
        monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        ordinal: function (e, _) {
          return "W" === _ ? e + "周" : e + "日";
        },
        weekStart: 1,
        yearStart: 4,
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "YYYY/MM/DD",
          LL: "YYYY年M月D日",
          LLL: "YYYY年M月D日Ah点mm分",
          LLLL: "YYYY年M月D日ddddAh点mm分",
          l: "YYYY/M/D",
          ll: "YYYY年M月D日",
          lll: "YYYY年M月D日 HH:mm",
          llll: "YYYY年M月D日dddd HH:mm"
        },
        relativeTime: {
          future: "%s内",
          past: "%s前",
          s: "几秒",
          m: "1 分钟",
          mm: "%d 分钟",
          h: "1 小时",
          hh: "%d 小时",
          d: "1 天",
          dd: "%d 天",
          M: "1 个月",
          MM: "%d 个月",
          y: "1 年",
          yy: "%d 年"
        },
        meridiem: function (e, _) {
          var t = 100 * e + _;
          return t < 600 ? "凌晨" : t < 900 ? "早上" : t < 1100 ? "上午" : t < 1300 ? "中午" : t < 1800 ? "下午" : "晚上";
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(zhCn$1);

var zhCn = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var zhHk$1 = {exports: {}};

(function (module, exports) {
  !function (_, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (_) {

    function e(_) {
      return _ && "object" == typeof _ && "default" in _ ? _ : {
        default: _
      };
    }
    var d = e(_),
      t = {
        name: "zh-hk",
        months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
        monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
        weekdaysShort: "週日_週一_週二_週三_週四_週五_週六".split("_"),
        weekdaysMin: "日_一_二_三_四_五_六".split("_"),
        ordinal: function (_, e) {
          return "W" === e ? _ + "週" : _ + "日";
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "YYYY/MM/DD",
          LL: "YYYY年M月D日",
          LLL: "YYYY年M月D日 HH:mm",
          LLLL: "YYYY年M月D日dddd HH:mm",
          l: "YYYY/M/D",
          ll: "YYYY年M月D日",
          lll: "YYYY年M月D日 HH:mm",
          llll: "YYYY年M月D日dddd HH:mm"
        },
        relativeTime: {
          future: "%s內",
          past: "%s前",
          s: "幾秒",
          m: "一分鐘",
          mm: "%d 分鐘",
          h: "一小時",
          hh: "%d 小時",
          d: "一天",
          dd: "%d 天",
          M: "一個月",
          MM: "%d 個月",
          y: "一年",
          yy: "%d 年"
        },
        meridiem: function (_, e) {
          var d = 100 * _ + e;
          return d < 600 ? "凌晨" : d < 900 ? "早上" : d < 1100 ? "上午" : d < 1300 ? "中午" : d < 1800 ? "下午" : "晚上";
        }
      };
    return d.default.locale(t, null, !0), t;
  });
})(zhHk$1);

var zhHk = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var zhTw$1 = {exports: {}};

(function (module, exports) {
  !function (_, e) {
    module.exports = e(require$$0) ;
  }(commonjsGlobal, function (_) {

    function e(_) {
      return _ && "object" == typeof _ && "default" in _ ? _ : {
        default: _
      };
    }
    var t = e(_),
      d = {
        name: "zh-tw",
        weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
        weekdaysShort: "週日_週一_週二_週三_週四_週五_週六".split("_"),
        weekdaysMin: "日_一_二_三_四_五_六".split("_"),
        months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
        monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        ordinal: function (_, e) {
          return "W" === e ? _ + "週" : _ + "日";
        },
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "YYYY/MM/DD",
          LL: "YYYY年M月D日",
          LLL: "YYYY年M月D日 HH:mm",
          LLLL: "YYYY年M月D日dddd HH:mm",
          l: "YYYY/M/D",
          ll: "YYYY年M月D日",
          lll: "YYYY年M月D日 HH:mm",
          llll: "YYYY年M月D日dddd HH:mm"
        },
        relativeTime: {
          future: "%s內",
          past: "%s前",
          s: "幾秒",
          m: "1 分鐘",
          mm: "%d 分鐘",
          h: "1 小時",
          hh: "%d 小時",
          d: "1 天",
          dd: "%d 天",
          M: "1 個月",
          MM: "%d 個月",
          y: "1 年",
          yy: "%d 年"
        },
        meridiem: function (_, e) {
          var t = 100 * _ + e;
          return t < 600 ? "凌晨" : t < 900 ? "早上" : t < 1100 ? "上午" : t < 1300 ? "中午" : t < 1800 ? "下午" : "晚上";
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(zhTw$1);

var zhTw = /*#__PURE__*/Object.freeze({
    __proto__: null
});

var zh$1 = {exports: {}};

(function (module, exports) {
  !function (e, _) {
    module.exports = _(require$$0) ;
  }(commonjsGlobal, function (e) {

    function _(e) {
      return e && "object" == typeof e && "default" in e ? e : {
        default: e
      };
    }
    var t = _(e),
      d = {
        name: "zh",
        weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
        weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"),
        weekdaysMin: "日_一_二_三_四_五_六".split("_"),
        months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
        monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        ordinal: function (e, _) {
          return "W" === _ ? e + "周" : e + "日";
        },
        weekStart: 1,
        yearStart: 4,
        formats: {
          LT: "HH:mm",
          LTS: "HH:mm:ss",
          L: "YYYY/MM/DD",
          LL: "YYYY年M月D日",
          LLL: "YYYY年M月D日Ah点mm分",
          LLLL: "YYYY年M月D日ddddAh点mm分",
          l: "YYYY/M/D",
          ll: "YYYY年M月D日",
          lll: "YYYY年M月D日 HH:mm",
          llll: "YYYY年M月D日dddd HH:mm"
        },
        relativeTime: {
          future: "%s后",
          past: "%s前",
          s: "几秒",
          m: "1 分钟",
          mm: "%d 分钟",
          h: "1 小时",
          hh: "%d 小时",
          d: "1 天",
          dd: "%d 天",
          M: "1 个月",
          MM: "%d 个月",
          y: "1 年",
          yy: "%d 年"
        },
        meridiem: function (e, _) {
          var t = 100 * e + _;
          return t < 600 ? "凌晨" : t < 900 ? "早上" : t < 1100 ? "上午" : t < 1300 ? "中午" : t < 1800 ? "下午" : "晚上";
        }
      };
    return t.default.locale(d, null, !0), d;
  });
})(zh$1);

var zh = /*#__PURE__*/Object.freeze({
    __proto__: null
});

export { Datepicker as default };
//# sourceMappingURL=index.esm.js.map
