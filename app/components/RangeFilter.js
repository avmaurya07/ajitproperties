"use client";

import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const RangeFilter = ({
  min,
  max,
  initialMin,
  initialMax,
  minName,
  maxName,
  name, // For single input mode
  isSingle = false,
  formatLabel,
}) => {
  // Ensure we have valid numbers
  const safeMin = Number(min) || 0;
  const safeMax = Number(max) || 1000000;
  const startMin = Number(initialMin) || safeMin;
  const startMax = Number(initialMax) || safeMax;

  // State: Array for range, Number for single
  const [range, setRange] = useState(
    isSingle ? startMin : [startMin, startMax],
  );
  const [mounted, setMounted] = useState(false);

  // Handle hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Removed prop syncing useEffect. Parent must use key to reset state.

  const handleChange = (value) => {
    setRange(value);
  };

  const defaultFormat = (val) => val.toLocaleString("en-IN");
  const formatter = formatLabel || defaultFormat;

  if (!mounted) {
    const displayVal = isSingle ? safeMin : startMin; // Show safe initial on server
    const displayMax = startMax;

    return (
      <div className="range-filter px-2">
        <div className="d-flex justify-content-between mb-2">
          {isSingle ? (
            <>
              <span className="fw-bold">{formatter(startMin)}</span>
              <span className="fw-bold">{formatter(safeMax)}</span>
            </>
          ) : (
            <>
              <span className="fw-bold">{formatter(startMin)}</span>
              <span className="fw-bold">{formatter(startMax)}</span>
            </>
          )}
        </div>
        <Slider
          range={!isSingle}
          min={safeMin}
          max={safeMax}
          value={isSingle ? startMin : [startMin, startMax]}
          disabled
          trackStyle={[{ backgroundColor: "#fd5631" }]}
          handleStyle={[
            { borderColor: "#fd5631", backgroundColor: "#fff" },
            { borderColor: "#fd5631", backgroundColor: "#fff" },
          ]}
          railStyle={{ backgroundColor: "#e9e9e9" }}
        />
        {isSingle ? (
          <input type="hidden" name={name} value={startMin} />
        ) : (
          <>
            <input type="hidden" name={minName} value={startMin} />
            <input type="hidden" name={maxName} value={startMax} />
          </>
        )}
      </div>
    );
  }

  return (
    <div className="range-filter px-2">
      <div className="d-flex justify-content-between mb-2">
        {isSingle ? (
          <>
            <span className="fw-bold">{formatter(range)}</span>
            <span className="fw-bold">{formatter(safeMax)}</span>
          </>
        ) : (
          <>
            <span className="fw-bold">{formatter(range[0])}</span>
            <span className="fw-bold">{formatter(range[1])}</span>
          </>
        )}
      </div>

      <Slider
        range={!isSingle}
        min={safeMin}
        max={safeMax}
        value={range}
        onChange={handleChange}
        trackStyle={[{ backgroundColor: "#fd5631" }]}
        handleStyle={[
          { borderColor: "#fd5631", backgroundColor: "#fff" },
          { borderColor: "#fd5631", backgroundColor: "#fff" },
        ]}
        railStyle={{ backgroundColor: "#e9e9e9" }}
      />

      {/* Hidden inputs to participate in the native form submission */}
      {isSingle ? (
        <input type="hidden" name={name} value={range} />
      ) : (
        <>
          <input type="hidden" name={minName} value={range[0]} />
          <input type="hidden" name={maxName} value={range[1]} />
        </>
      )}
    </div>
  );
};

export default RangeFilter;
