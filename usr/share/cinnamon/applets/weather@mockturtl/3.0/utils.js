var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var UUID = "weather@mockturtl";
imports.gettext.bindtextdomain(UUID, imports.gi.GLib.get_home_dir() + "/.local/share/locale");
function _(str) {
    return imports.gettext.dgettext(UUID, str);
}
var _a = imports.mainloop, timeout_add = _a.timeout_add, source_remove = _a.source_remove;
var util_format_date = imports.gi.Cinnamon.util_format_date;
var IconType = imports.gi.St.IconType;
var IconTheme = imports.gi.Gtk.IconTheme;
var setTimeout = function (func, ms) {
    var args = [];
    if (arguments.length > 2) {
        args = args.slice.call(arguments, 2);
    }
    var id = timeout_add(ms, function () {
        func.apply(null, args);
        return false;
    }, null);
    return id;
};
var delay = function (ms) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            resolve();
                        }, ms);
                    })];
                case 1: return [2, _a.sent()];
            }
        });
    });
};
var clearTimeout = function (id) {
    source_remove(id);
};
var setInterval = function (func, ms) {
    var args = [];
    if (arguments.length > 2) {
        args = args.slice.call(arguments, 2);
    }
    var id = timeout_add(ms, function () {
        func.apply(null, args);
        return true;
    }, null);
    return id;
};
var clearInterval = function (id) {
    source_remove(id);
};
var isLocaleStringSupported = function () {
    var date = new Date(1565548657987);
    try {
        var output = date.toLocaleString('en-GB', { timeZone: 'Europe/London', hour: "numeric" });
        if (output !== "19")
            return "none";
        return "full";
    }
    catch (e) {
        return "notz";
    }
};
var GetDayName = function (date, locale, tz) {
    var support = isLocaleStringSupported();
    if (!tz && support == "full")
        support = "notz";
    switch (support) {
        case "full":
            return date.toLocaleString(locale, { timeZone: tz, weekday: "long" });
        case "notz":
            return date.toLocaleString(locale, { timeZone: "UTC", weekday: "long" });
        case "none":
            return getDayName(date.getUTCDay());
            ;
    }
};
var GetHoursMinutes = function (date, locale, hours24Format, tz) {
    var support = isLocaleStringSupported();
    if (!tz && support == "full")
        support = "notz";
    switch (support) {
        case "full":
            return date.toLocaleString(locale, { timeZone: tz, hour: "numeric", minute: "numeric", hour12: !hours24Format });
        case "notz":
            return date.toLocaleString(locale, { hour: "numeric", minute: "numeric", hour12: !hours24Format });
        case "none":
            return timeToUserUnits(date, hours24Format);
    }
};
var AwareDateString = function (date, locale, hours24Format) {
    var support = isLocaleStringSupported();
    var now = new Date();
    var params = {
        hour: "numeric",
        minute: "numeric",
        hour12: !hours24Format
    };
    if (date.toDateString() != now.toDateString()) {
        params.month = "short";
        params.day = "numeric";
    }
    if (date.getFullYear() != now.getFullYear()) {
        params.year = "numeric";
    }
    switch (support) {
        case "full":
        case "notz":
            return date.toLocaleString(locale, { hour: "numeric", minute: "numeric", hour12: !hours24Format });
        case "none":
            return timeToUserUnits(date, hours24Format);
    }
};
var getDayName = function (dayNum) {
    var days = [_('Sunday'), _('Monday'), _('Tuesday'), _('Wednesday'), _('Thursday'), _('Friday'), _('Saturday')];
    return days[dayNum];
};
var timeToUserUnits = function (date, show24Hours) {
    var timeStr = util_format_date('%H:%M', date.getTime());
    var time = timeStr.split(':');
    if (time[0].charAt(0) == "0") {
        time[0] = time[0].substr(1);
    }
    if (show24Hours) {
        return time[0] + ":" + time[1];
    }
    else {
        if (parseInt(time[0]) > 12) {
            return (parseInt(time[0]) - 12) + ":" + time[1] + " pm";
        }
        else {
            return time[0] + ":" + time[1] + " am";
        }
    }
};
var WEATHER_CONV_MPH_IN_MPS = 2.23693629;
var WEATHER_CONV_KPH_IN_MPS = 3.6;
var WEATHER_CONV_KNOTS_IN_MPS = 1.94384449;
var capitalizeFirstLetter = function (description) {
    if ((description == undefined || description == null)) {
        return "";
    }
    return description.charAt(0).toUpperCase() + description.slice(1);
};
var KPHtoMPS = function (speed) {
    return speed / WEATHER_CONV_KPH_IN_MPS;
};
var get = function (p, o) {
    return p.reduce(function (xs, x) {
        return (xs && xs[x]) ? xs[x] : null;
    }, o);
};
var MPStoUserUnits = function (mps, units) {
    if (mps == null)
        return null;
    switch (units) {
        case "mph":
            return (Math.round((mps * WEATHER_CONV_MPH_IN_MPS) * 10) / 10).toString();
        case "kph":
            return (Math.round((mps * WEATHER_CONV_KPH_IN_MPS) * 10) / 10).toString();
        case "m/s":
            return (Math.round(mps * 10) / 10).toString();
        case "Knots":
            return Math.round(mps * WEATHER_CONV_KNOTS_IN_MPS).toString();
        case "Beaufort":
            if (mps < 0.5) {
                return "0 (" + _("Calm") + ")";
            }
            if (mps < 1.5) {
                return "1 (" + _("Light air") + ")";
            }
            if (mps < 3.3) {
                return "2 (" + _("Light breeze") + ")";
            }
            if (mps < 5.5) {
                return "3 (" + _("Gentle breeze") + ")";
            }
            if (mps < 7.9) {
                return "4 (" + _("Moderate breeze") + ")";
            }
            if (mps < 10.7) {
                return "5 (" + _("Fresh breeze") + ")";
            }
            if (mps < 13.8) {
                return "6 (" + _("Strong breeze") + ")";
            }
            if (mps < 17.1) {
                return "7 (" + _("Near gale") + ")";
            }
            if (mps < 20.7) {
                return "8 (" + _("Gale") + ")";
            }
            if (mps < 24.4) {
                return "9 (" + _("Strong gale") + ")";
            }
            if (mps < 28.4) {
                return "10 (" + _("Storm") + ")";
            }
            if (mps < 32.6) {
                return "11 (" + _("Violent storm") + ")";
            }
            return "12 (" + _("Hurricane") + ")";
    }
};
var TempToUserConfig = function (kelvin, units, russianStyle) {
    var temp;
    if (units == "celsius") {
        temp = Math.round((kelvin - 273.15));
    }
    if (units == "fahrenheit") {
        temp = Math.round((9 / 5 * (kelvin - 273.15) + 32));
    }
    if (!russianStyle)
        return temp.toString();
    if (temp < 0)
        temp = "−" + Math.abs(temp).toString();
    else if (temp > 0)
        temp = "+" + temp.toString();
    return temp.toString();
};
var CelsiusToKelvin = function (celsius) {
    return (celsius + 273.15);
};
var FahrenheitToKelvin = function (fahr) {
    return ((fahr - 32) / 1.8 + 273.15);
};
var MPHtoMPS = function (speed) {
    return speed * 0.44704;
};
var PressToUserUnits = function (hpa, units) {
    switch (units) {
        case "hPa":
            return hpa;
        case "at":
            return Math.round((hpa * 0.001019716) * 1000) / 1000;
        case "atm":
            return Math.round((hpa * 0.0009869233) * 1000) / 1000;
        case "in Hg":
            return Math.round((hpa * 0.029529983071445) * 10) / 10;
        case "mm Hg":
            return Math.round((hpa * 0.7500638));
        case "Pa":
            return Math.round((hpa * 100));
        case "psi":
            return Math.round((hpa * 0.01450377) * 100) / 100;
    }
};
var isNumeric = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
var isString = function (text) {
    if (typeof text == 'string' || text instanceof String) {
        return true;
    }
    return false;
};
var isID = function (text) {
    if (text.length == 7 && isNumeric(text)) {
        return true;
    }
    return false;
};
var isCoordinate = function (text) {
    if (/^-?\d{1,3}(?:\.\d*)?,-?\d{1,3}(?:\.\d*)?/.test(text)) {
        return true;
    }
    return false;
};
var nonempty = function (str) {
    return (str != null && str.length > 0 && str != undefined);
};
var compassDirection = function (deg) {
    var directions = [_('N'), _('NE'), _('E'), _('SE'), _('S'), _('SW'), _('W'), _('NW')];
    return directions[Math.round(deg / 45) % directions.length];
};
var isLangSupported = function (lang, languages) {
    if (languages.indexOf(lang) != -1) {
        return true;
    }
    return false;
};
var icons = {
    clear_day: 'weather-clear',
    clear_night: 'weather-clear-night',
    few_clouds_day: 'weather-few-clouds',
    few_clouds_night: 'weather-few-clouds-night',
    clouds: 'weather-clouds',
    overcast: 'weather_overcast',
    showers_scattered: 'weather-showers-scattered',
    showers: 'weather-showers',
    rain: 'weather-rain',
    rain_freezing: 'weather-freezing-rain',
    snow: 'weather-snow',
    storm: 'weather-storm',
    fog: 'weather-fog',
    alert: 'weather-severe-alert'
};
var weatherIconSafely = function (code, icon_type) {
    for (var i = 0; i < code.length; i++) {
        if (hasIcon(code[i], icon_type))
            return code[i];
    }
    return 'weather-severe-alert';
};
var hasIcon = function (icon, icon_type) {
    return IconTheme.get_default().has_icon(icon + (icon_type == IconType.SYMBOLIC ? '-symbolic' : ''));
};
