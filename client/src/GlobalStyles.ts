import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  --gray-0: #f8f9fa;
  --gray-1: #f1f3f5;
  --gray-2: #e9ecef;
  --gray-3: #dee2e6;
  --gray-4: #ced4da;
  --gray-5: #adb5bd;
  --gray-6: #868e96;
  --gray-7: #495057;
  --gray-8: #343a40;
  --gray-9: #212529;

  --gray-light-0: #f8f9fa;
  --gray-light-1: #f1f3f5;
  --gray-light-2: #e9ecef;
  --gray-light-3: #dee2e6;
  --gray-light-4: #ced4da;
  --gray-light-5: #adb5bd;
  --gray-light-6: #868e96;
  --gray-light-7: #495057;
  --gray-light-8: #343a40;
  --gray-light-9: #212529;

  --orange-0: #fff4e6;
  --orange-1: #ffe8cc;
  --orange-2: #ffd8a8;
  --orange-3: #ffc078;
  --orange-4: #ffa94d;
  --orange-5: #ff922b;
  --orange-6: #fd7e14;
  --orange-7: #f76707;
  --orange-8: #e8590c;
  --orange-9: #d9480f;

  --red: #FF0000;
  --yellow: #fab005;
  --green-6: #40C057;
  --green-7: #37B24D;

  --skew: 5deg;
  --skew-negative: -5deg;
}

&body.dark-mode {
  --gray-9: #f8f9fa;
  --gray-8: #f1f3f5;
  --gray-7: #e9ecef;
  --gray-6: #dee2e6;
  --gray-5: #ced4da;
  --gray-4: #adb5bd;
  --gray-3: #868e96;
  --gray-2: #495057;
  --gray-1: #343a40;
  --gray-0: #212529;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  font-size: 62.5%;
  scroll-behavior: smooth;
}

body {
    background-color: var(--gray-2);
    color: var(--gray-8);
    font-family: "Inter", sans-serif;

    font-size: 1.6rem;
    overflow-x: hidden;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

ul {
  list-style: none;
}

img {
  max-width: 100%;
}

@media (max-width: 64em) {
  html {
    font-size: 56.25%;
  }
}

@media (max-width: 49em) {
  html {
    font-size: 43.725%;
  }
}
`;

export default GlobalStyles;
