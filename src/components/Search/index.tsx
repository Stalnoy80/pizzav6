import React, { useCallback, useRef, useState } from "react";
import styles from "./Search.module.scss";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";
const Search = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearchValue = useCallback(
    debounce((str: string) => dispatch(setSearchValue(str)), 200),
    []
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.searchIcon}
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="1280.000000pt"
        height="1170.000000pt"
        viewBox="0 0 1280.000000 1170.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <metadata>
          Created by potrace 1.15, written by Peter Selinger 2001-2017
        </metadata>
        <g
          transform="translate(0.000000,1170.000000) scale(0.100000,-0.100000)"
          fill="#000000"
          stroke="none"
        >
          <path
            d="M4410 11694 c-25 -2 -101 -8 -170 -14 -1172 -101 -2251 -603 -3040
-1416 -328 -338 -575 -684 -775 -1087 -562 -1129 -565 -2421 -9 -3553 516
-1051 1483 -1880 2654 -2276 581 -197 1171 -280 1808 -256 1438 54 2770 730
3618 1838 450 587 723 1259 820 2015 26 198 26 692 1 890 -86 678 -299 1253
-671 1810 -259 389 -630 780 -1018 1073 -719 542 -1537 860 -2463 957 -140 15
-653 28 -755 19z m550 -1284 c586 -50 1148 -243 1615 -555 192 -128 311 -223
465 -371 444 -428 731 -934 854 -1504 44 -204 59 -349 60 -580 0 -227 -10
-343 -50 -545 -246 -1259 -1345 -2251 -2719 -2454 -183 -27 -288 -34 -510 -35
-317 0 -554 28 -846 100 -1170 287 -2088 1160 -2359 2244 -62 250 -83 419 -82
685 0 525 137 1013 408 1461 531 877 1492 1457 2572 1553 129 12 461 12 592 1z"
          />
          <path
            d="M8874 4562 c-261 -356 -702 -760 -1061 -972 -40 -23 -73 -46 -73 -50
0 -5 467 -435 1038 -956 570 -521 1439 -1315 1930 -1763 491 -449 896 -817
901 -819 10 -4 1193 1078 1189 1088 -2 6 -3749 3430 -3854 3522 -20 17 -22 16
-70 -50z"
          />
        </g>
      </svg>
      <input
        ref={inputRef}
        type="text"
        className={styles.input}
        placeholder="Поиск..."
        value={value} //контролируемый инпут
        onChange={onChangeInput}
      />

      {value && (
        <svg
          onClick={() => {
            dispatch(setSearchValue(""));
            setValue("");

            if (inputRef.current) {
              inputRef.current.focus();
            }
          }} //очистка поиска
          className={styles.closeIcon}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m0 0h24v24h-24z" fill="none" />
          <path d="m18.3 5.71c-.39-.39-1.02-.39-1.41 0l-4.89 4.88-4.89-4.89c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41l4.89 4.89-4.89 4.89c-.39.39-.39 1.02 0 1.41s1.02.39 1.41 0l4.89-4.89 4.89 4.89c.39.39 1.02.39 1.41 0s.39-1.02 0-1.41l-4.89-4.89 4.89-4.89c.38-.38.38-1.02 0-1.4z" />
        </svg>
      )}
    </div>
  );
};

export default Search;
