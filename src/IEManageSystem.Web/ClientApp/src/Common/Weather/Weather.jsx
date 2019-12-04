import React from 'react';
import ReactDOM from 'react-dom';

import './Weather.css'

import ClearNight from './ClearNight.svg';
import CloudyWithSun from './CloudyWithSun.svg';
import CloudyWithMoon from './CloudyWithMoon.svg';
import Rainy from './Rainy.svg';
import CloudyWithLightning from './CloudyWithLightning.svg';
import CloudyWithRainAndLightning from './CloudyWithRainAndLightning.svg';
import Sunny from './Sunny.svg';
import SunnyWithWind from './SunnyWithWind.svg';
import Snowy from './Snowy.svg';

const weatherIcon = {
    ClearNight: ClearNight,
    CloudyWithSun: CloudyWithSun,
    CloudyWithMoon: CloudyWithMoon,
    Rainy: Rainy,
    CloudyWithLightning: CloudyWithLightning,
    CloudyWithRainAndLightning: CloudyWithRainAndLightning,
    Sunny: Sunny,
    SunnyWithWind: SunnyWithWind,
    Snowy: Snowy
}

// 多云
const cloudy = [
    "阴", "多云", "晴转多云", "多云转阴", "晴转阴", "阴转多云", "小雪转多云", "小雨转多云", "阵雨转多云", "小雪转阴", "阵雪转多云", "阵雪转阴", "扬沙转多云", "小雨转阴", "中雨转多云", "雾转多云", "中雨转阴", "阵雨转阴", "雨夹雪转多云", "小到中雨转阴", "雨夹雪转阴", "中雪转多云", "雷阵雨转多云", "扬沙转阴", "霾转阴", "霾转多云", "小到中雪转多云", "大雪转多云", "大雨转阴", "浮尘转多云", "雾", "霾", "多云转雾", "浮尘转霾", "晴转霾", "多云转霾", "晴转雾", "阴转雾"
];

// 多云白天
const cloudyWithSun = [];

// 多云夜晚
const cloudyWithMoon = [];

// 下雨
const rainy = [
    "小雨", "中雨", "阵雨", "大雨", "大暴雨", "多云转小雨", "多云转阵雨", "阴转小雨", "小雨转中雨", "中雨转小雨", "阴转中雨", "多云转中雨", "小雨转大雨", "阵雨转中雨", "阵雨转大雨", "阴转大雨", "阵雨转小雨", "晴转小雨", "多云转大雨", "小雨转暴雨", "阵雨转中到大雨", "小雨转阵雨", "阴转阵雨", "小雨转小到中雨", "小到中雨转小雨", "晴转阵雨", "中雨转阵雨", "中雨转大雨", "多云转小到中雨", "小到中雨", "小到中雨转阵雨", "雨夹雪转小雨", "雷阵雨转阵雨", "暴雨"
];

// 多云打雷
const cloudyWithLightning = [
];

// 多云下雨打雷
const cloudyWithRainAndLightning = [
    "雷阵雨", "阵雨转雷阵雨", "晴转雷阵雨"
];

// 晴朗白天
const sunny = [
    "晴", "小雪转晴", "多云转晴", "阵雪转晴", "阴转晴", "扬沙转晴", "浮尘转晴", "阵雨转晴", "小雨转晴", "雨夹雪转晴", "霾转晴"
];

// 晴朗夜晚
const clearNight = [];

// 多风
const sunnyWithWind = [
    "扬沙", "浮尘", "多云转扬沙", "晴转扬沙"
];

// 下雪
const snowy = [
    "雨夹雪", "小雪", "中雪", "大雪", "阵雪", "暴雪", "多云转小雪", "晴转阵雪", "晴转小雪", "多云转雨夹雪", "多云转阵雪", "阵雪转小雪", "阴转小雪", "阴转阵雪", "晴转雨夹雪", "多云转中雪", "晴转中雪", "小雨转小雪", "小雪转雨夹雪", "多云转大雪", "阴转中雪", "阴转大雪", "雨夹雪转小雪", "小雨转大雪", "雨夹雪转大雪", "雨夹雪转中雪", "中雨转小雪", "中雨转中雪", "晴转大雪", "小雨转雨夹雪", "阴转雨夹雪", "小雪转阵雪", "小雪转中雪", "多云转小到中雪", "中雪转小雪", "大雪转小雪", "阵雨转雨夹雪", "小雨转阵雪", "小雨转中雪", "阵雨转小雪"
];

function getIcon(weather) {
    let curHour = (new Date()).getHours();       //获取当前小时数(0-23)

    for (let item in cloudy) {
        if (cloudy[item] == weather) {
            if (curHour >= 6 && curHour <= 17) {
                return weatherIcon.CloudyWithSun;
            }
            else {
                return weatherIcon.CloudyWithMoon;
            }

            // return "Cloudy.svg";
        }
    }

    for (let item in rainy) {
        if (rainy[item] == weather) {
            return weatherIcon.Rainy;
        }
    }

    for (let item in cloudyWithLightning) {
        if (cloudyWithLightning[item] == weather) {
            return weatherIcon.CloudyWithLightning;
        }
    }

    for (let item in cloudyWithRainAndLightning) {
        if (cloudyWithRainAndLightning[item] == weather) {
            return weatherIcon.CloudyWithRainAndLightning;
        }
    }

    for (let item in sunny) {
        if (sunny[item] == weather) {
            if (curHour >= 6 && curHour <= 17) {
                return weatherIcon.Sunny;
            }
            else {
                return weatherIcon.ClearNight;
            }
        }
    }

    for (let item in sunnyWithWind) {
        if (sunnyWithWind[item] == weather) {
            return weatherIcon.SunnyWithWind;
        }
    }

    for (let item in snowy) {
        if (snowy[item] == weather) {
            return weatherIcon.Snowy;
        }
    }

    if (/云/.test(weather)) {
        return weatherIcon.Cloudy;
    }

    if (/雨/.test(weather)) {
        return weatherIcon.Rainy;
    }

    if (/雷/.test(weather)) {
        return weatherIcon.CloudyWithRainAndLightning;
    }

    if (/晴/.test(weather)) {
        return weatherIcon.Sunny;
    }

    if (/雪/.test(weather)) {
        return weatherIcon.Snowy;
    }

    return weatherIcon.Sunny;
}

function createWeather(city, weather, tips, hours, windPower) {
    let icon = getIcon(weather);

    $(".weather-icon>img").attr("src", icon);
    $(".weather-city").text(city);
    $(".weather-text").text(weather);
    $(".weather-tip").text(tips);
    $(".weather-wind-power").text(windPower);
    let minTem = null;
    let maxTem = null;
    for (let item in hours) {
        let temString = hours[item].tem.replace("℃", "");
        let tem = parseInt(temString);
        if (minTem == null) {
            minTem = tem;
        }
        if (maxTem == null) {
            maxTem = tem;
        }

        if (tem < minTem) {
            minTem = tem;
        }
        if (tem > maxTem) {
            maxTem = tem;
        }
    }

    $(".weather-temperature").text(minTem + "℃" + "~" + maxTem + "℃");

    let height = $(".weather").height();
    let fonsize = height / 10;
    $(".weather").css("font-size", fonsize + "px");
}

function showLocation(cityid) {
    // let postdata = 'version=v1&cityid=' + cityid;
    let postdata = `version=v1&cityid=${cityid}&appid=75481967&appsecret=Wqzq1aUV`

    $.ajax({
        type: 'GET',
        url: 'https://www.tianqiapi.com/api/',
        data: postdata,
        dataType: 'JSON',
        error: function () {

        },
        success: function (res) {
            // 城市 res.city
            // 天气 res.data[0].wea
            // 提示 res.data[0].air_tips
            // 时间 res.data[0].hours[i].day
            // 气温 res.data[0].hours[i].tem
            createWeather(res.city, res.data[0].wea, res.data[0].air_tips, res.data[0].hours, res.data[0].win_speed);
        }
    });
}

export default class Weather extends React.Component
{
    // props.showWeatherTip
    // props.showWeatherCityandtext
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $.getScript('http://pv.sohu.com/cityjson?ie=utf-8')
            .done(function (script, textStatus, jqxhr) {
                showLocation(returnCitySN.cid);
            })
            .fail(function () {
                console.log('访问错误');
            });
    }

    render()
    {
        return (
            <div className="d-flex justify-content-center w-100 h-100 weather">
                <div className="elements weather-left">
                    <div className="weather-temperature">
                    </div>
                    <div className="weather-wind-power">
                    </div>
                    {
                        this.props.showWeatherTip == true &&
                        <div className="weather-tip"></div>
                    }
                </div>
                <div className="elements weather-right">
                    <div className="weather-icon">
                        <img src="" />
                    </div>
                    {
                        this.props.showWeatherCityandtext == true &&
                        <div className="weather-cityandtext">
                            <span className="weather-city"></span>：<span className="weather-text"></span>
                        </div>
                    }
                </div>
            </div>
        );
    }
}