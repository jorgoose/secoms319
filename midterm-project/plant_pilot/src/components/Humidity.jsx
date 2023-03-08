import { color } from "d3-color";
import { interpolateRgb } from "d3-interpolate";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import LiquidFillGauge from "react-liquid-gauge";

function Humidity() {
  const state = {
    value: 60,
  };
  const startColor = "#D0AE8B"; // cornflowerblue
  const endColor = "#52B1D2"; // crimson

  const radius = 100;
  const interpolate = interpolateRgb(startColor, endColor);
  const fillColor = interpolate(state.value / 100);
  const gradientStops = [
    {
      key: "0%",
      stopColor: color(fillColor).darker(0.5).toString(),
      stopOpacity: 1,
      offset: "0%",
    },
    {
      key: "50%",
      stopColor: fillColor,
      stopOpacity: 0.75,
      offset: "50%",
    },
    {
      key: "100%",
      stopColor: color(fillColor).brighter(0.5).toString(),
      stopOpacity: 0.5,
      offset: "100%",
    },
  ];

  return (
    <div className="p-12">
      <LiquidFillGauge
        style={{ margin: "auto" }}
        width={radius * 2}
        height={radius * 2}
        value={state.value}
        percent="%"
        textSize={1}
        textOffsetX={0}
        textOffsetY={0}
        textRenderer={(props) => {
          const value = Math.round(props.value);
          const radius = Math.min(props.height / 2, props.width / 2);
          const textPixels = (props.textSize * radius) / 2;
          const valueStyle = {
            fontSize: textPixels,
          };
          const percentStyle = {
            fontSize: textPixels * 0.6,
          };

          return (
            <tspan>
              <tspan className="value" style={valueStyle}>
                {value}
              </tspan>
              <tspan style={percentStyle}>{props.percent}</tspan>
            </tspan>
          );
        }}
        riseAnimation
        waveAnimation
        waveFrequency={2}
        waveAmplitude={1}
        gradient
        gradientStops={gradientStops}
        circleStyle={{
          fill: fillColor,
        }}
        waveStyle={{
          fill: fillColor,
        }}
        textStyle={{
          fill: color("#444").toString(),
          fontFamily: "Arial",
        }}
        waveTextStyle={{
          fill: color("#fff").toString(),
          fontFamily: "Arial",
        }}
        onClick={() => {
          this.setState({ value: Math.random() * 100 });
        }}
      />
      <div
        style={{
          margin: "20px auto",
          width: 120,
        }}
      ></div>
    </div>
  );
}

export default Humidity;
