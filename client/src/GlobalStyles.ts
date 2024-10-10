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

`;

export default GlobalStyles;
