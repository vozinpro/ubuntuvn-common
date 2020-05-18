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
function importModule(path) {
    if (typeof require !== 'undefined') {
        return require('./' + path);
    }
    else {
        if (!AppletDir)
            var AppletDir = imports.ui.appletManager.applets['weather@mockturtl'];
        return AppletDir[path];
    }
}
var UUID = "weather@mockturtl";
imports.gettext.bindtextdomain(UUID, imports.gi.GLib.get_home_dir() + "/.local/share/locale");
function _(str) {
    return imports.gettext.dgettext(UUID, str);
}
var utils = importModule("utils");
var isCoordinate = utils.isCoordinate;
var isLangSupported = utils.isLangSupported;
var isID = utils.isID;
var icons = utils.icons;
var weatherIconSafely = utils.weatherIconSafely;
var get = utils.get;
var nonempty = utils.nonempty;
var OpenWeatherMap = (function () {
    function OpenWeatherMap(_app) {
        this.supportedLanguages = ["af", "ar", "az", "bg", "ca", "cz", "da", "de", "el", "en", "eu", "fa", "fi",
            "fr", "gl", "he", "hi", "hr", "hu", "id", "it", "ja", "kr", "la", "lt", "mk", "no", "nl", "pl",
            "pt", "pt_br", "ro", "ru", "se", "sk", "sl", "sp", "es", "sr", "th", "tr", "ua", "uk", "vi", "zh_cn", "zh_tw", "zu"];
        this.base_url = "https://api.openweathermap.org/data/2.5/onecall?";
        this.app = _app;
    }
    OpenWeatherMap.prototype.GetWeather = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, json, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.ConstructQuery(this.base_url);
                        if (!(query != null)) return [3, 5];
                        this.app.log.Debug("Query: " + query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.app.LoadJsonAsync(query)];
                    case 2:
                        json = _a.sent();
                        return [3, 4];
                    case 3:
                        e_1 = _a.sent();
                        this.app.HandleHTTPError("openweathermap", e_1, this.app, this.HandleHTTPError);
                        return [2, null];
                    case 4:
                        if (json == null) {
                            this.app.HandleError({ type: "soft", detail: "no api response", service: "openweathermap" });
                            return [2, null];
                        }
                        return [2, this.ParseWeather(json, this)];
                    case 5: return [2, null];
                }
            });
        });
    };
    ;
    OpenWeatherMap.prototype.ParseWeather = function (json, self) {
        try {
            var weather = {
                coord: {
                    lat: json.lat,
                    lon: json.lon
                },
                location: {
                    url: null,
                    timeZone: json.timezone
                },
                date: new Date((json.current.dt) * 1000),
                sunrise: new Date((json.current.sunrise) * 1000),
                sunset: new Date((json.current.sunset) * 1000),
                wind: {
                    speed: json.current.wind_speed,
                    degree: json.current.wind_deg
                },
                temperature: json.current.temp,
                pressure: json.current.pressure,
                humidity: json.current.humidity,
                condition: {
                    main: get(["current", "weather", "0", "main"], json),
                    description: get(["current", "weather", "0", "description"], json),
                    icon: weatherIconSafely(self.ResolveIcon(get(["current", "weather", "0", "icon"], json)), self.app.config.IconType()),
                    customIcon: self.ResolveCustomIcon(get(["current", "weather", "0", "icon"], json))
                },
                extra_field: {
                    name: _("Cloudiness"),
                    value: json.current.clouds,
                    type: "percent"
                },
                forecasts: []
            };
            var forecasts = [];
            for (var i = 0; i < self.app.config._forecastDays; i++) {
                var day = json.daily[i];
                var forecast = {
                    date: new Date(day.dt * 1000),
                    temp_min: day.temp.min,
                    temp_max: day.temp.max,
                    condition: {
                        main: day.weather[0].main,
                        description: day.weather[0].description,
                        icon: weatherIconSafely(self.ResolveIcon(day.weather[0].icon), self.app.config.IconType()),
                        customIcon: self.ResolveCustomIcon(day.weather[0].icon)
                    },
                };
                forecasts.push(forecast);
            }
            weather.forecasts = forecasts;
            return weather;
        }
        catch (e) {
            self.app.log.Error("OpenWeathermap Weather Parsing error: " + e);
            self.app.HandleError({ type: "soft", service: "openweathermap", detail: "unusal payload", message: _("Failed to Process Current Weather Info") });
            return null;
        }
    };
    ;
    OpenWeatherMap.prototype.ConstructQuery = function (baseUrl) {
        var query = baseUrl;
        var locString = this.ParseLocation();
        if (locString != null) {
            query = query + locString + "&appid=";
            query += "1c73f8259a86c6fd43c7163b543c8640";
            var locale = this.ConvertToAPILocale(this.app.currentLocale);
            if (this.app.config._translateCondition && isLangSupported(locale, this.supportedLanguages)) {
                query = query + "&lang=" + locale;
            }
            return query;
        }
        return null;
    };
    ;
    OpenWeatherMap.prototype.ParseLocation = function () {
        var loc = this.app.config._location.replace(/ /g, "");
        if (!nonempty(loc)) {
            this.app.HandleError({ type: "hard", userError: true, "detail": "no location", message: _("Please enter a Location in settings") });
            this.app.log.Error("OpenWeatherMap: No Location was provided");
            return null;
        }
        if (!isCoordinate(loc)) {
            this.app.HandleError({ type: "hard", userError: true, "detail": "bad location format", message: _("Please enter location in the correct format (coordinates)") });
            this.app.log.Error("OpenWeatherMap: Location was provided in bad format");
            return null;
        }
        var locArr = loc.split(',');
        return "lat=" + locArr[0] + "&lon=" + locArr[1];
    };
    ;
    OpenWeatherMap.prototype.ConvertToAPILocale = function (systemLocale) {
        if (systemLocale == "zh-cn" || systemLocale == "zh-cn" || systemLocale == "pt-br") {
            return systemLocale;
        }
        var lang = systemLocale.split("-")[0];
        if (lang == "sv") {
            return "se";
        }
        else if (lang == "cs") {
            return "cz";
        }
        else if (lang == "ko") {
            return "kr";
        }
        else if (lang == "lv") {
            return "la";
        }
        else if (lang == "nn" || lang == "nb") {
            return "no";
        }
        return lang;
    };
    OpenWeatherMap.prototype.HandleResponseErrors = function (json) {
        var errorMsg = "OpenWeathermap Response: ";
        var error = {
            service: "openweathermap",
            type: "hard",
        };
        switch (json.cod) {
            case ("400"):
                error.detail = "bad location format";
                error.message = _("Please make sure Location is in the correct format in the Settings");
                break;
            case ("401"):
                error.detail = "bad key";
                error.message = _("Make sure you entered the correct key in settings");
                break;
            case ("404"):
                error.detail = "location not found";
                error.message = _("Location not found, make sure location is available or it is in the correct format");
                break;
            case ("429"):
                error.detail = "key blocked";
                error.message = _("If this problem persists, please contact the Author of this applet");
                break;
            default:
                error.detail = "unknown";
                error.message = _("Unknown Error, please see the logs in Looking Glass");
                break;
        }
        ;
        this.app.HandleError(error);
        this.app.log.Debug("OpenWeatherMap Error Code: " + json.cod);
        this.app.log.Error(errorMsg + json.message);
    };
    ;
    OpenWeatherMap.prototype.HandleHTTPError = function (error, uiError) {
        if (error.code == 404) {
            uiError.detail = "location not found";
            uiError.message = _("Location not found, make sure location is available or it is in the correct format");
            uiError.userError = true;
            uiError.type = "hard";
        }
        return uiError;
    };
    OpenWeatherMap.prototype.ResolveIcon = function (icon) {
        switch (icon) {
            case "10d":
                return [icons.rain, icons.showers_scattered, icons.rain_freezing];
            case "10n":
                return [icons.rain, icons.showers_scattered, icons.rain_freezing];
            case "09n":
                return [icons.showers];
            case "09d":
                return [icons.showers];
            case "13d":
                return [icons.snow];
            case "13n":
                return [icons.snow];
            case "50d":
                return [icons.fog];
            case "50n":
                return [icons.fog];
            case "04d":
                return [icons.overcast, icons.clouds, icons.few_clouds_day];
            case "04n":
                return [icons.overcast, icons.clouds, icons.few_clouds_day];
            case "03n":
                return ['weather-clouds-night', icons.few_clouds_night];
            case "03d":
                return [icons.clouds, icons.overcast, icons.few_clouds_day];
            case "02n":
                return [icons.few_clouds_night];
            case "02d":
                return [icons.few_clouds_day];
            case "01n":
                return [icons.clear_night];
            case "01d":
                return [icons.clear_day];
            case "11d":
                return [icons.storm];
            case "11n":
                return [icons.storm];
            default:
                return [icons.alert];
        }
    };
    ;
    OpenWeatherMap.prototype.ResolveCustomIcon = function (icon) {
        switch (icon) {
            case "10d":
                return "day-rain-symbolic";
            case "10n":
                return "night-rain-symbolic";
            case "09n":
                return "night-showers-symbolic";
            case "09d":
                return "day-showers-symbolic";
            case "13d":
                return "day-snow-symbolic";
            case "13n":
                return "night-alt-snow-symbolic";
            case "50d":
                return "day-fog-symbolic";
            case "50n":
                return "night-fog-symbolic";
            case "04d":
                return "day-cloudy-symbolic";
            case "04n":
                return "night-alt-cloudy-symbolic";
            case "03n":
                return "night-alt-cloudy-symbolic";
            case "03d":
                return "day-cloudy-symbolic";
            case "02n":
                return "night-alt-cloudy-symbolic";
            case "02d":
                return "day-cloudy-symbolic";
            case "01n":
                return "night-clear-symbolic";
            case "01d":
                return "day-sunny-symbolic";
            case "11d":
                return "day-thunderstorm-symbolic";
            case "11n":
                return "night-alt-thunderstorm-symbolic";
            default:
                return "cloud-refresh-symbolic";
        }
    };
    ;
    return OpenWeatherMap;
}());
;
var openWeatherMapConditionLibrary = [
    _("Thunderstorm with light rain"),
    _("Thunderstorm with rain"),
    _("Thunderstorm with heavy rain"),
    _("Light thunderstorm"),
    _("Thunderstorm"),
    _("Heavy thunderstorm"),
    _("Ragged thunderstorm"),
    _("Thunderstorm with light drizzle"),
    _("Thunderstorm with drizzle"),
    _("Thunderstorm with heavy drizzle"),
    _("Light intensity drizzle"),
    _("Drizzle"),
    _("Heavy intensity drizzle"),
    _("Light intensity drizzle rain"),
    _("Drizzle rain"),
    _("Heavy intensity drizzle rain"),
    _("Shower rain and drizzle"),
    _("Heavy shower rain and drizzle"),
    _("Shower drizzle"),
    _("Light rain"),
    _("Moderate rain"),
    _("Heavy intensity rain"),
    _("Very heavy rain"),
    _("Extreme rain"),
    _("Freezing rain"),
    _("Light intensity shower rain"),
    _("Shower rain"),
    _("Heavy intensity shower rain"),
    _("Ragged shower rain"),
    _("Light snow"),
    _("Snow"),
    _("Heavy snow"),
    _("Sleet"),
    _("Shower sleet"),
    _("Light rain and snow"),
    _("Rain and snow"),
    _("Light shower snow"),
    _("Shower snow"),
    _("Heavy shower snow"),
    _("Mist"),
    _("Smoke"),
    _("Haze"),
    _("Sand, dust whirls"),
    _("Fog"),
    _("Sand"),
    _("Dust"),
    _("Volcanic ash"),
    _("Squalls"),
    _("Tornado"),
    _("Clear"),
    _("Clear sky"),
    _("Sky is clear"),
    _("Clouds"),
    _("Few clouds"),
    _("Scattered clouds"),
    _("Broken clouds"),
    _("Overcast clouds")
];
